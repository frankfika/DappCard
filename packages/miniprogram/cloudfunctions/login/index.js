const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    // Query users collection
    const userResult = await db.collection('users').where({
      openid: openid
    }).get();

    let user;
    let isNew = false;

    if (userResult.data.length === 0) {
      // Create new user if not found
      const createTime = new Date();
      const newUser = {
        openid: openid,
        nickname: '',
        avatar: '',
        gender: 0,
        birthday: '',
        city: '',
        namecard: {
          name: '',
          wechat: '',
          intro: ''
        },
        blockedUsers: [],
        createdAt: createTime,
        updatedAt: createTime
      };

      const insertResult = await db.collection('users').add({
        data: newUser
      });

      user = {
        _id: insertResult._id,
        ...newUser
      };
      isNew = true;
    } else {
      user = userResult.data[0];
      isNew = false;
    }

    return {
      success: true,
      openid: openid,
      data: user,
      isNew: isNew
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
