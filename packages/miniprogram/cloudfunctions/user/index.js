const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const { action } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    switch (action) {
      case 'getProfile':
        return await getProfile(openid);

      case 'updateProfile':
        return await updateProfile(openid, event);

      case 'updateNamecard':
        return await updateNamecard(openid, event);

      case 'getNamecard':
        return await getNamecard(event.openid || openid);

      case 'getStats':
        return await getStats(event.openid || openid);

      case 'migrateData':
        return await migrateData(openid, event);

      case 'getUser':
        return await getUser(event.targetOpenid);

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('User function error:', error);
    throw error;
  }
};

async function getProfile(openid) {
  const result = await db.collection('users').where({
    openid: openid
  }).get();

  if (result.data.length === 0) {
    throw new Error('User not found');
  }

  return result.data[0];
}

async function updateProfile(openid, event) {
  const profile = event.profile || event;
  const { nickname, avatar, gender, birthday, city, bio, province, interests, companionTypes } = profile;
  const updateData = {
    updatedAt: new Date()
  };

  if (nickname !== undefined) updateData.nickname = nickname;
  if (avatar !== undefined) updateData.avatar = avatar;
  if (gender !== undefined) updateData.gender = gender;
  if (birthday !== undefined) updateData.birthday = birthday;
  if (city !== undefined) updateData.city = city;
  if (bio !== undefined) updateData.bio = bio;
  if (province !== undefined) updateData.province = province;
  if (interests !== undefined) updateData.interests = interests;
  if (companionTypes !== undefined) updateData.companionTypes = companionTypes;

  await db.collection('users').where({
    openid: openid
  }).update({
    data: updateData
  });

  return { success: true };
}

async function updateNamecard(openid, event) {
  const namecard = event.namecard || {};

  await db.collection('users').where({
    openid: openid
  }).update({
    data: {
      namecard: namecard,
      updatedAt: new Date()
    }
  });

  return { success: true };
}

async function migrateData(openid, event) {
  const { localData } = event;

  if (!localData) {
    throw new Error('No local data provided');
  }

  const updateData = {
    updatedAt: new Date()
  };

  // Merge local data into update
  if (localData.nickname) updateData.nickname = localData.nickname;
  if (localData.avatar) updateData.avatar = localData.avatar;
  if (localData.gender !== undefined) updateData.gender = localData.gender;
  if (localData.birthday) updateData.birthday = localData.birthday;
  if (localData.city) updateData.city = localData.city;
  if (localData.namecard) updateData.namecard = localData.namecard;

  await db.collection('users').where({
    openid: openid
  }).update({
    data: updateData
  });

  return { success: true };
}

async function getNamecard(targetOpenid) {
  if (!targetOpenid) {
    throw new Error('Openid is required');
  }

  const result = await db.collection('users').where({
    openid: targetOpenid
  }).get();

  if (result.data.length === 0) {
    throw new Error('User not found');
  }

  const user = result.data[0];
  const namecardData = {
    avatarUrl: user.avatar || '',
    nickname: user.nickname || '',
    bio: user.namecard?.intro || '',
    interests: user.namecard?.interests || [],
    socialLinks: user.namecard?.socialLinks || [],
    motto: user.namecard?.motto || '',
    theme: user.namecard?.theme || 'romantic',
    coverImage: user.namecard?.coverImage || ''
  };

  return {
    success: true,
    data: namecardData
  };
}

async function getStats(targetOpenid) {
  if (!targetOpenid) {
    throw new Error('Openid is required');
  }

  const _ = db.command;

  // Count activities created by user
  const createdResult = await db.collection('activities').where({
    creatorOpenid: targetOpenid
  }).count();

  // Count activities where user is a participant (approved applicant)
  const joinedResult = await db.collection('activities').where({
    applicants: _.elemMatch({
      openid: targetOpenid,
      status: 'approved'
    })
  }).count();

  return {
    success: true,
    data: {
      activitiesCreated: createdResult.total,
      activitiesJoined: joinedResult.total,
      companionsFound: createdResult.total + joinedResult.total
    }
  };
}

async function getUser(targetOpenid) {
  if (!targetOpenid) {
    throw new Error('Target openid is required');
  }

  const result = await db.collection('users').where({
    openid: targetOpenid
  }).get();

  if (result.data.length === 0) {
    throw new Error('User not found');
  }

  const user = result.data[0];

  // Return only public information
  return {
    _id: user._id,
    openid: user.openid,
    nickname: user.nickname,
    avatar: user.avatar,
    gender: user.gender,
    city: user.city,
    namecard: user.namecard
  };
}
