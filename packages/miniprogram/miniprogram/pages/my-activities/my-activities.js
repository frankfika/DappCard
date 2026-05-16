// pages/my-activities/my-activities.js
Page({
  data: {
    currentTab: 0,
    tabs: ['已创建', '已参加', '已申请'],
    createdActivities: [],
    joinedActivities: [],
    appliedActivities: [],
    loading: false
  },

  onLoad(options) {
    this.loadActivities();
  },

  onShow() {
    this.loadActivities();
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
  },

  async loadActivities() {
    this.setData({ loading: true });

    try {
      const result = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'getMyActivities'
        }
      });

      this.setData({
        createdActivities: result.result.created || [],
        joinedActivities: result.result.joined || [],
        appliedActivities: result.result.applied || [],
        loading: false
      });
    } catch (err) {
      console.error('Failed to load my activities:', err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  onActivityTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${id}`
    });
  },

  async onPullDownRefresh() {
    try {
      await this.loadActivities();
    } finally {
      wx.stopPullDownRefresh();
    }
  }
});
