// pages/discover/discover.js
const { getAllCategories } = require('../../data/companion-types.js');
const app = getApp();

Page({
  data: {
    searchText: '',
    categories: getAllCategories(),
    selectedCategory: null,
    locationFilter: 'nearby', // 'nearby' | 'city' | 'area'
    locationRadius: 10,
    activities: [],
    page: 1,
    pageSize: 20,
    hasMore: true,
    loading: false,
    refreshing: false,
    showPrivacy: false
  },

  onLoad(options) {
    this.loadActivities();
  },

  // 隐私协议弹窗处理
  onNeedPrivacyAuthorization(resolve, eventInfo) {
    this.privacyResolve = resolve;
    this.setData({ showPrivacy: true });
  },

  handleAgreePrivacy() {
    this.setData({ showPrivacy: false });
    if (this.privacyResolve) {
      this.privacyResolve({ buttonId: 'agree-btn', event: 'agree' });
    }
  },

  handleRejectPrivacy() {
    this.setData({ showPrivacy: false });
    if (this.privacyResolve) {
      this.privacyResolve({ buttonId: 'reject-btn', event: 'disagree' });
    }
  },

  openPrivacyContract() {
    wx.openPrivacyContract();
  },

  onShow() {
    // Refresh if needed
  },

  onPullDownRefresh() {
    this.setData({
      refreshing: true,
      page: 1,
      activities: [],
      hasMore: true
    });
    this.loadActivities(() => {
      wx.stopPullDownRefresh();
      this.setData({ refreshing: false });
    });
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.setData({ page: this.data.page + 1 });
      this.loadActivities();
    }
  },

  onSearchInput(e) {
    this.setData({ searchText: e.detail.value });
  },

  onSearch() {
    this.setData({ page: 1, activities: [] });
    this.loadActivities();
  },

  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      selectedCategory: categoryId === this.data.selectedCategory ? null : categoryId,
      page: 1,
      activities: []
    });
    this.loadActivities();
  },

  onLocationFilterChange(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      locationFilter: filter,
      page: 1,
      activities: []
    });
    this.loadActivities();
  },

  loadActivities(callback) {
    if (this.data.loading) return;

    if (!app.globalData.cloudReady) {
      this.setData({ loading: false, hasMore: false });
      callback && callback();
      return;
    }

    this.setData({ loading: true });

    wx.cloud.callFunction({
      name: 'companion',
      data: {
        action: 'getActivities',
        page: this.data.page,
        pageSize: this.data.pageSize,
        category: this.data.selectedCategory,
        searchText: this.data.searchText,
        locationFilter: this.data.locationFilter,
        radius: this.data.locationRadius
      }
    }).then(res => {
      const newActivities = res.result.data || [];
      this.setData({
        activities: this.data.page === 1 ? newActivities : this.data.activities.concat(newActivities),
        hasMore: newActivities.length >= this.data.pageSize,
        loading: false
      });
      callback && callback();
    }).catch(err => {
      console.warn('云开发调用失败，可能未开通:', err.message || err);
      this.setData({ loading: false, hasMore: false });
      callback && callback();
    });
  },

  onCreateActivityTap() {
    wx.navigateTo({
      url: '/pages/create-activity/create-activity'
    });
  },

  onActivityTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${id}`
    });
  }
});
