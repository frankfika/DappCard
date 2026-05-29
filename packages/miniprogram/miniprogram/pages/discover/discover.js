const store = require('../../utils/store.js');
const { companionTypes, mockActivities } = require('../../utils/cards-data.js');

Page({
  data: {
    companionTypes: companionTypes,
    activities: [],
    selectedCategory: null,
    showCreate: false,
    createTitle: '',
    createDesc: '',
    createLocation: '',
    createTime: '',
    createMaxParticipants: 4,
    createCategory: '',
  },

  onLoad() {
    this.loadActivities();
  },

  onShow() {
    this.loadActivities();
  },

  loadActivities() {
    let activities = store.getActivities();
    if (activities.length === 0) {
      activities = mockActivities.map(a => ({ ...a, joined: false }));
      wx.setStorageSync('dappcard_activities', activities);
    }
    this.setData({ activities });
  },

  selectCategory(e) {
    const cat = e.currentTarget.dataset.cat;
    this.setData({ selectedCategory: this.data.selectedCategory === cat ? null : cat });
  },

  getFilteredActivities() {
    const { activities, selectedCategory } = this.data;
    if (!selectedCategory) return activities;
    return activities.filter(a => a.category === selectedCategory);
  },

  getCategoryInfo(categoryId) {
    return companionTypes.find(c => c.id === categoryId);
  },

  joinActivity(e) {
    const id = e.currentTarget.dataset.id;
    const activities = store.joinActivity(id);
    this.setData({ activities });
  },

  leaveActivity(e) {
    const id = e.currentTarget.dataset.id;
    const activities = store.leaveActivity(id);
    this.setData({ activities });
  },

  openCreate() {
    this.setData({ showCreate: true });
  },

  closeCreate() {
    this.setData({ showCreate: false });
  },

  onCreateTitle(e) { this.setData({ createTitle: e.detail.value }); },
  onCreateDesc(e) { this.setData({ createDesc: e.detail.value }); },
  onCreateLocation(e) { this.setData({ createLocation: e.detail.value }); },
  onCreateTime(e) { this.setData({ createTime: e.detail.value }); },
  onCreateMax(e) { this.setData({ createMaxParticipants: parseInt(e.detail.value) || 4 }); },
  onCreateCategory(e) { this.setData({ createCategory: e.currentTarget.dataset.cat }); },

  noop() {},

  submitCreate() {
    if (!this.data.createTitle.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    const profile = store.getProfile();
    store.addActivity({
      title: this.data.createTitle.trim(),
      description: this.data.createDesc.trim(),
      location: this.data.createLocation.trim(),
      time: this.data.createTime.trim(),
      maxParticipants: this.data.createMaxParticipants,
      category: this.data.createCategory || 'sport',
      subcategory: '',
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${profile.name || 'user'}`,
      creator: profile.name || '匿名',
    });
    this.setData({
      showCreate: false,
      createTitle: '',
      createDesc: '',
      createLocation: '',
      createTime: '',
      createMaxParticipants: 4,
      createCategory: '',
    });
    this.loadActivities();
  },
});
