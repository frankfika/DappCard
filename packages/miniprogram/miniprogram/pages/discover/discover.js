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
      mockActivities.forEach(a => store.addActivity({ ...a, joined: false }));
      activities = store.getActivities();
    }
    const enriched = activities.map(a => {
      const cat = this.getCategoryInfo(a.category);
      return { ...a, _categoryColor: cat ? cat.color : '#999', _categoryIcon: cat ? cat.icon : '', _categoryName: cat ? cat.name : '' };
    });
    this.setData({ activities: enriched });
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
    store.joinActivity(id);
    this.loadActivities();
  },

  leaveActivity(e) {
    const id = e.currentTarget.dataset.id;
    store.leaveActivity(id);
    this.loadActivities();
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
      avatar: '',
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
