const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

// Rate limits
const MAX_ACTIVITIES_PER_DAY = 3;
const MAX_APPLICATIONS_PER_DAY = 10;

exports.main = async (event, context) => {
  const { action } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    switch (action) {
      case 'createActivity':
        return await createActivity(openid, event);

      case 'getActivities':
        return await getActivities(event);

      case 'getActivity':
        return await getActivity(openid, event.activityId);

      case 'applyActivity':
        return await applyActivity(openid, event);

      case 'approveApplicant':
        return await approveApplicant(openid, event);

      case 'rejectApplicant':
        return await rejectApplicant(openid, event);

      case 'getMyActivities':
        return await getMyActivities(openid);

      case 'completeActivity':
        return await completeActivity(openid, event);

      case 'cancelActivity':
        return await cancelActivity(openid, event);

      case 'getComments':
        return await getComments(event.activityId);

      case 'addComment':
        return await addComment(openid, event);

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Companion function error:', error);
    throw error;
  }
};

async function createActivity(openid, event) {
  // Check rate limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayActivities = await db.collection('activities').where({
    creatorOpenid: openid,
    createdAt: _.gte(today)
  }).count();

  if (todayActivities.total >= MAX_ACTIVITIES_PER_DAY) {
    throw new Error(`Daily limit reached: maximum ${MAX_ACTIVITIES_PER_DAY} activities per day`);
  }

  const activityData = event.activity || event;
  const { title, category, datetime, location, maxParticipants, description, contactInfo } = activityData;

  if (!title || !category || !datetime || !location) {
    throw new Error('Missing required fields');
  }

  const newActivity = {
    title,
    category,
    datetime: new Date(datetime),
    location: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
      city: location.city,
      address: location.address
    },
    maxParticipants: maxParticipants || 2,
    description: description || '',
    contactInfo: contactInfo || '',
    creatorOpenid: openid,
    status: 'open',
    applicants: [],
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('activities').add({
    data: newActivity
  });

  return {
    success: true,
    activityId: result._id
  };
}

async function getActivities(event) {
  const { category, city, nearby, status } = event;
  let query = db.collection('activities').where({
    status: status || 'open'
  });

  // Filter by category
  if (category && category !== 'all') {
    query = query.where({
      category: category
    });
  }

  // Filter by city
  if (city) {
    query = query.where({
      'location.city': city
    });
  }

  // Nearby search (requires geoNear aggregation in real implementation)
  // For now, just get all matching activities
  const result = await query.orderBy('createdAt', 'desc').limit(50).get();

  // Populate creator info
  const activities = await Promise.all(result.data.map(async (activity) => {
    const creator = await db.collection('users').where({
      openid: activity.creatorOpenid
    }).get();

    return {
      ...activity,
      creator: creator.data[0] ? {
        nickname: creator.data[0].nickname,
        avatar: creator.data[0].avatar
      } : null
    };
  }));

  return {
    success: true,
    data: activities
  };
}

async function getActivity(openid, activityId) {
  if (!activityId) {
    throw new Error('Activity ID is required');
  }

  const result = await db.collection('activities').doc(activityId).get();

  if (!result.data) {
    throw new Error('Activity not found');
  }

  const activity = result.data;

  // Populate creator info
  const creatorResult = await db.collection('users').where({
    openid: activity.creatorOpenid
  }).get();

  const creator = creatorResult.data[0] ? {
    _openid: creatorResult.data[0].openid,
    nickname: creatorResult.data[0].nickname,
    avatar: creatorResult.data[0].avatar,
    namecard: creatorResult.data[0].namecard
  } : null;

  // Populate applicants info
  const applicants = await Promise.all((activity.applicants || []).map(async (applicant) => {
    const user = await db.collection('users').where({
      openid: applicant.openid
    }).get();

    return {
      ...applicant,
      user: user.data[0] ? {
        nickname: user.data[0].nickname,
        avatar: user.data[0].avatar,
        namecard: user.data[0].namecard
      } : null
    };
  }));

  // Get participants info
  const participantOpenids = (activity.participants || []);
  const participants = [];
  for (const pid of participantOpenids) {
    const pUser = await db.collection('users').where({ openid: pid }).get();
    if (pUser.data[0]) {
      participants.push({
        openid: pid,
        nickname: pUser.data[0].nickname,
        avatar: pUser.data[0].avatar
      });
    }
  }

  // Determine user's relationship to this activity
  const isCreator = activity.creatorOpenid === openid;
  const isParticipant = participantOpenids.includes(openid);
  const hasApplied = (activity.applicants || []).some(a => a.openid === openid);

  return {
    activity,
    creator,
    participants,
    applicants,
    isCreator,
    isParticipant,
    hasApplied
  };
}

async function applyActivity(openid, event) {
  const { activityId, message } = event;

  if (!activityId) {
    throw new Error('Activity ID is required');
  }

  // Check rate limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayApplications = await db.collection('activities').where({
    applicants: _.elemMatch({
      openid: openid,
      appliedAt: _.gte(today)
    })
  }).count();

  if (todayApplications.total >= MAX_APPLICATIONS_PER_DAY) {
    throw new Error(`Daily limit reached: maximum ${MAX_APPLICATIONS_PER_DAY} applications per day`);
  }

  // Get activity
  const activity = await db.collection('activities').doc(activityId).get();

  if (!activity.data) {
    throw new Error('Activity not found');
  }

  // Check if already applied
  const alreadyApplied = activity.data.applicants.some(a => a.openid === openid);
  if (alreadyApplied) {
    throw new Error('Already applied to this activity');
  }

  // Check if creator
  if (activity.data.creatorOpenid === openid) {
    throw new Error('Cannot apply to your own activity');
  }

  // Add applicant
  await db.collection('activities').doc(activityId).update({
    data: {
      applicants: _.push({
        openid,
        message: message || '',
        status: 'pending',
        appliedAt: new Date()
      }),
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function approveApplicant(openid, event) {
  const { activityId, applicantOpenid } = event;

  if (!activityId || !applicantOpenid) {
    throw new Error('Missing required fields');
  }

  // Get activity
  const activity = await db.collection('activities').doc(activityId).get();

  if (!activity.data) {
    throw new Error('Activity not found');
  }

  // Check if user is creator
  if (activity.data.creatorOpenid !== openid) {
    throw new Error('Only creator can approve applicants');
  }

  // Check if max participants reached
  const approvedCount = activity.data.applicants.filter(a => a.status === 'approved').length;
  if (approvedCount >= activity.data.maxParticipants) {
    throw new Error('Maximum participants reached');
  }

  // Update applicant status
  const updatedApplicants = activity.data.applicants.map(a => {
    if (a.openid === applicantOpenid) {
      return { ...a, status: 'approved' };
    }
    return a;
  });

  await db.collection('activities').doc(activityId).update({
    data: {
      applicants: updatedApplicants,
      participants: _.addToSet(applicantOpenid),
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function rejectApplicant(openid, event) {
  const { activityId, applicantOpenid } = event;

  if (!activityId || !applicantOpenid) {
    throw new Error('Missing required fields');
  }

  // Get activity
  const activity = await db.collection('activities').doc(activityId).get();

  if (!activity.data) {
    throw new Error('Activity not found');
  }

  // Check if user is creator
  if (activity.data.creatorOpenid !== openid) {
    throw new Error('Only creator can reject applicants');
  }

  // Update applicant status
  const updatedApplicants = activity.data.applicants.map(a => {
    if (a.openid === applicantOpenid) {
      return { ...a, status: 'rejected' };
    }
    return a;
  });

  await db.collection('activities').doc(activityId).update({
    data: {
      applicants: updatedApplicants,
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function getMyActivities(openid) {
  // Get activities created by user
  const created = await db.collection('activities').where({
    creatorOpenid: openid
  }).orderBy('createdAt', 'desc').get();

  // Get activities applied by user
  const applied = await db.collection('activities').where({
    applicants: _.elemMatch({
      openid: openid
    })
  }).orderBy('createdAt', 'desc').get();

  // Filter joined (approved) from applied
  const joined = applied.data.filter(activity => {
    return (activity.applicants || []).some(
      a => a.openid === openid && a.status === 'approved'
    );
  });

  return {
    created: created.data,
    joined: joined,
    applied: applied.data
  };
}

async function completeActivity(openid, event) {
  const { activityId } = event;

  if (!activityId) {
    throw new Error('Activity ID is required');
  }

  // Get activity
  const activity = await db.collection('activities').doc(activityId).get();

  if (!activity.data) {
    throw new Error('Activity not found');
  }

  // Check if user is creator
  if (activity.data.creatorOpenid !== openid) {
    throw new Error('Only creator can complete activity');
  }

  await db.collection('activities').doc(activityId).update({
    data: {
      status: 'completed',
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function cancelActivity(openid, event) {
  const { activityId } = event;

  if (!activityId) {
    throw new Error('Activity ID is required');
  }

  // Get activity
  const activity = await db.collection('activities').doc(activityId).get();

  if (!activity.data) {
    throw new Error('Activity not found');
  }

  // Check if user is creator
  if (activity.data.creatorOpenid !== openid) {
    throw new Error('Only creator can cancel activity');
  }

  await db.collection('activities').doc(activityId).update({
    data: {
      status: 'cancelled',
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function getComments(activityId) {
  if (!activityId) {
    throw new Error('Activity ID is required');
  }

  const result = await db.collection('messages').where({
    activityId: activityId
  }).orderBy('createdAt', 'asc').limit(100).get();

  // Populate user info for each comment
  const comments = await Promise.all(result.data.map(async (msg) => {
    const user = await db.collection('users').where({
      openid: msg.openid
    }).get();

    return {
      ...msg,
      nickname: user.data[0] ? user.data[0].nickname : '匿名用户',
      avatar: user.data[0] ? user.data[0].avatar : ''
    };
  }));

  return { comments };
}

async function addComment(openid, event) {
  const { activityId, content } = event;

  if (!activityId || !content) {
    throw new Error('Activity ID and content are required');
  }

  // Content safety check
  try {
    const checkResult = await cloud.callFunction({
      name: 'content-check',
      data: { action: 'checkText', content: content }
    });

    if (checkResult.result && !checkResult.result.safe) {
      return { success: false, message: '内容包含敏感信息' };
    }
  } catch (err) {
    console.error('Content check failed:', err);
  }

  const message = {
    activityId: activityId,
    openid: openid,
    content: content,
    createdAt: new Date()
  };

  await db.collection('messages').add({
    data: message
  });

  return { success: true };
}
