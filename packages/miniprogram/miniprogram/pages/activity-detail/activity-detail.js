// pages/activity-detail/activity-detail.js
Page({
  data: {
    activityId: '',
    activity: null,
    creator: null,
    participants: [],
    applicants: [],
    comments: [],
    isCreator: false,
    isParticipant: false,
    hasApplied: false,
    commentText: '',
    loading: true,
    commentPollingTimer: null
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ activityId: options.id });
      this.loadActivityDetail();
    }
  },

  onShow() {
    // Start polling for comments
    this.startCommentPolling();
  },

  onHide() {
    this.stopCommentPolling();
  },

  onUnload() {
    this.stopCommentPolling();
  },

  async loadActivityDetail() {
    try {
      wx.showLoading({ title: '加载中...' });

      const result = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'getActivity',
          activityId: this.data.activityId
        }
      });

      const { activity, creator, participants, applicants, isCreator, isParticipant, hasApplied } = result.result;

      this.setData({
        activity,
        creator,
        participants,
        applicants,
        isCreator,
        isParticipant,
        hasApplied,
        loading: false
      });

      this.loadComments();

      wx.hideLoading();
    } catch (err) {
      console.error('Failed to load activity detail:', err);
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  async loadComments() {
    try {
      const result = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'getComments',
          activityId: this.data.activityId
        }
      });

      this.setData({
        comments: result.result.comments || []
      });
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  },

  startCommentPolling() {
    this.stopCommentPolling();
    this.commentPollingTimer = setInterval(() => {
      this.loadComments();
    }, 5000);
  },

  stopCommentPolling() {
    if (this.commentPollingTimer) {
      clearInterval(this.commentPollingTimer);
      this.commentPollingTimer = null;
    }
  },

  onImagePreview(e) {
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: this.data.activity.images
    });
  },

  onLocationTap() {
    const { latitude, longitude, name, address } = this.data.activity.location;
    wx.openLocation({
      latitude,
      longitude,
      name,
      address,
      scale: 16
    });
  },

  onCreatorTap() {
    wx.navigateTo({
      url: `/pages/user-profile/user-profile?openid=${this.data.creator._openid}`
    });
  },

  onParticipantTap(e) {
    const openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: `/pages/user-profile/user-profile?openid=${openid}`
    });
  },

  async onApplyTap() {
    try {
      wx.showLoading({ title: '申请中...' });

      await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'applyActivity',
          activityId: this.data.activityId
        }
      });

      wx.hideLoading();
      wx.showToast({
        title: '申请成功',
        icon: 'success'
      });

      this.loadActivityDetail();
    } catch (err) {
      console.error('Failed to apply:', err);
      wx.hideLoading();
      wx.showToast({
        title: err.message || '申请失败',
        icon: 'none'
      });
    }
  },

  async onApproveApplicant(e) {
    const openid = e.currentTarget.dataset.openid;

    try {
      wx.showLoading({ title: '处理中...' });

      await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'approveApplicant',
          activityId: this.data.activityId,
          applicantOpenid: openid
        }
      });

      wx.hideLoading();
      wx.showToast({
        title: '已通过',
        icon: 'success'
      });

      this.loadActivityDetail();
    } catch (err) {
      console.error('Failed to approve:', err);
      wx.hideLoading();
      wx.showToast({
        title: err.message || '操作失败',
        icon: 'none'
      });
    }
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  async onSendComment() {
    if (!this.data.commentText.trim()) {
      return;
    }

    try {
      await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'addComment',
          activityId: this.data.activityId,
          content: this.data.commentText.trim()
        }
      });

      this.setData({ commentText: '' });
      this.loadComments();
    } catch (err) {
      console.error('Failed to send comment:', err);
      wx.showToast({
        title: '发送失败',
        icon: 'none'
      });
    }
  }
});
