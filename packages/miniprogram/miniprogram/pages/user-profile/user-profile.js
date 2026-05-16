// pages/user-profile/user-profile.js
Page({
  data: {
    openid: '',
    userInfo: null,
    stats: {
      createdCount: 0,
      joinedCount: 0,
      rating: 0,
      reviewCount: 0
    },
    interests: [],
    recentActivities: [],
    reviews: [],
    loading: true,
    isBlocked: false
  },

  onLoad(options) {
    if (options.openid) {
      this.setData({ openid: options.openid });
      this.loadUserProfile();
    }
  },

  async loadUserProfile() {
    try {
      wx.showLoading({ title: '加载中...' });

      // Get user info
      const userResult = await wx.cloud.callFunction({
        name: 'user',
        data: {
          action: 'getUser',
          targetOpenid: this.data.openid
        }
      });

      const userInfo = userResult.result;

      // Get user's activities (filter client-side by creator)
      const activitiesResult = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'getActivities'
        }
      });

      const allActivities = activitiesResult.result.data || [];
      const recentActivities = allActivities
        .filter(a => a.creatorOpenid === this.data.openid)
        .slice(0, 5);

      // Check if blocked
      const app = getApp();
      const currentUser = app.globalData.userInfo;
      const isBlocked = currentUser && currentUser.blockedUsers
        ? currentUser.blockedUsers.includes(this.data.openid)
        : false;

      this.setData({
        userInfo,
        interests: userInfo.namecard?.interests || [],
        recentActivities,
        isBlocked,
        loading: false
      });

      wx.hideLoading();
    } catch (err) {
      console.error('Failed to load user profile:', err);
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  onViewNamecard() {
    wx.navigateTo({
      url: `/pages/namecard/namecard?openid=${this.data.openid}`
    });
  },

  onReport() {
    wx.showActionSheet({
      itemList: ['广告骚扰', '不当内容', '欺诈行为', '其他'],
      success: (res) => {
        if (!res.cancel) {
          this.submitReport(res.tapIndex);
        }
      }
    });
  },

  async submitReport(reasonIndex) {
    const reasons = ['广告骚扰', '不当内容', '欺诈行为', '其他'];

    try {
      wx.showLoading({ title: '提交中...' });

      await wx.cloud.callFunction({
        name: 'report',
        data: {
          action: 'reportUser',
          targetOpenid: this.data.openid,
          reason: reasons[reasonIndex]
        }
      });

      wx.hideLoading();
      wx.showToast({
        title: '举报成功',
        icon: 'success'
      });
    } catch (err) {
      console.error('Failed to report:', err);
      wx.hideLoading();
      wx.showToast({
        title: '举报失败',
        icon: 'none'
      });
    }
  },

  onBlock() {
    wx.showModal({
      title: '确认拉黑',
      content: '拉黑后将无法看到对方的活动和消息',
      confirmColor: '#ff8a80',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '处理中...' });

            await wx.cloud.callFunction({
              name: 'report',
              data: {
                action: 'blockUser',
                targetOpenid: this.data.openid
              }
            });

            wx.hideLoading();
            wx.showToast({
              title: '已拉黑',
              icon: 'success'
            });

            this.setData({ isBlocked: true });
          } catch (err) {
            console.error('Failed to block:', err);
            wx.hideLoading();
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  onUnblock() {
    wx.showModal({
      title: '确认取消拉黑',
      content: '取消后可以重新看到对方的活动和消息',
      confirmColor: '#ff8a80',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '处理中...' });

            await wx.cloud.callFunction({
              name: 'report',
              data: {
                action: 'unblockUser',
                targetOpenid: this.data.openid
              }
            });

            wx.hideLoading();
            wx.showToast({
              title: '已取消拉黑',
              icon: 'success'
            });

            this.setData({ isBlocked: false });
          } catch (err) {
            console.error('Failed to unblock:', err);
            wx.hideLoading();
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  onActivityTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${id}`
    });
  },

  renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '⭐' : '☆');
    }
    return stars.join('');
  }
});
