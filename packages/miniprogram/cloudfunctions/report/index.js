const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { action } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    switch (action) {
      case 'reportUser':
        return await reportUser(openid, event);

      case 'reportActivity':
        return await reportActivity(openid, event);

      case 'blockUser':
        return await blockUser(openid, event);

      case 'unblockUser':
        return await unblockUser(openid, event);

      case 'getBlockedUsers':
        return await getBlockedUsers(openid);

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Report function error:', error);
    throw error;
  }
};

async function reportUser(openid, event) {
  const { targetOpenid, reason, description } = event;

  if (!targetOpenid || !reason) {
    throw new Error('Missing required fields');
  }

  if (targetOpenid === openid) {
    throw new Error('Cannot report yourself');
  }

  const report = {
    type: 'user',
    reporterOpenid: openid,
    targetOpenid: targetOpenid,
    targetId: null,
    reason: reason,
    description: description || '',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('reports').add({
    data: report
  });

  return {
    success: true,
    reportId: result._id
  };
}

async function reportActivity(openid, event) {
  const { activityId, reason, description } = event;

  if (!activityId || !reason) {
    throw new Error('Missing required fields');
  }

  const report = {
    type: 'activity',
    reporterOpenid: openid,
    targetOpenid: null,
    targetId: activityId,
    reason: reason,
    description: description || '',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('reports').add({
    data: report
  });

  return {
    success: true,
    reportId: result._id
  };
}

async function blockUser(openid, event) {
  const { targetOpenid } = event;

  if (!targetOpenid) {
    throw new Error('Target openid is required');
  }

  if (targetOpenid === openid) {
    throw new Error('Cannot block yourself');
  }

  // Get user to check if already blocked
  const user = await db.collection('users').where({
    openid: openid
  }).get();

  if (user.data.length === 0) {
    throw new Error('User not found');
  }

  const blockedUsers = user.data[0].blockedUsers || [];
  if (blockedUsers.includes(targetOpenid)) {
    throw new Error('User already blocked');
  }

  // Add to blocked users
  await db.collection('users').where({
    openid: openid
  }).update({
    data: {
      blockedUsers: _.addToSet(targetOpenid),
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function unblockUser(openid, event) {
  const { targetOpenid } = event;

  if (!targetOpenid) {
    throw new Error('Target openid is required');
  }

  // Remove from blocked users
  await db.collection('users').where({
    openid: openid
  }).update({
    data: {
      blockedUsers: _.pull(targetOpenid),
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function getBlockedUsers(openid) {
  // Get user's blocked list
  const user = await db.collection('users').where({
    openid: openid
  }).get();

  if (user.data.length === 0) {
    throw new Error('User not found');
  }

  const blockedUsers = user.data[0].blockedUsers || [];

  if (blockedUsers.length === 0) {
    return [];
  }

  // Get blocked users info
  const users = await db.collection('users').where({
    openid: _.in(blockedUsers)
  }).get();

  return users.data.map(u => ({
    openid: u.openid,
    nickname: u.nickname,
    avatar: u.avatar
  }));
}
