const cardData = require('../../data/cards.js');
const i18n = require('../../utils/i18n.js');

Page({
  data: {
    totalCompleted: 0,
    favoriteCount: 0,
    daysPlayed: 1,
    totalCards: 0,
    overallProgress: 0,
    t: {}
  },

  onLoad() {
    this.initLanguage();
  },

  onShow() {
    this.loadStats();
  },

  initLanguage() {
    const t = i18n.t();
    this.setData({ t });
  },

  loadStats() {
    const progressData = wx.getStorageSync('progress') || {};
    const favorites = wx.getStorageSync('favorites') || [];
    const totalCards = cardData.getCardCount();

    // 统计所有会话的已完成卡片（去重）
    const allCompletedIds = new Set();
    Object.values(progressData).forEach(session => {
      if (session && session.completed) {
        session.completed.forEach(id => allCompletedIds.add(id));
      }
    });

    const totalCompleted = allCompletedIds.size;
    const overallProgress = totalCards > 0 ? Math.round((totalCompleted / totalCards) * 100) : 0;

    const firstLaunch = wx.getStorageSync('firstLaunch');
    let daysPlayed = 1;
    if (firstLaunch) {
      const days = Math.floor((Date.now() - firstLaunch) / (1000 * 60 * 60 * 24));
      daysPlayed = Math.max(1, days + 1);
    } else {
      wx.setStorageSync('firstLaunch', Date.now());
    }

    this.setData({
      totalCompleted,
      favoriteCount: favorites.length,
      daysPlayed,
      totalCards,
      overallProgress
    });
  },

  resetAllProgress() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有进度吗？',
      confirmColor: '#FF5A79',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('progress', {});
          wx.vibrateShort({ type: 'heavy' });
          this.loadStats();
          wx.showToast({ title: '已重置所有进度', icon: 'success' });
        }
      }
    });
  },

  clearFavorites() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有收藏吗？',
      confirmColor: '#FF5A79',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('favorites', []);
          wx.vibrateShort({ type: 'heavy' });
          this.loadStats();
          wx.showToast({ title: '已清空收藏', icon: 'none' });
        }
      }
    });
  },

  clearAllData() {
    wx.showModal({
      title: '警告',
      content: '这将清除所有进度、收藏和设置，确定继续吗？',
      confirmText: '确定清除',
      confirmColor: '#FF4444',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.vibrateShort({ type: 'heavy' });
          wx.showToast({ title: '已清除所有数据', icon: 'success', duration: 2000 });
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/welcome/welcome' });
          }, 1500);
        }
      }
    });
  },

  shareApp() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goToAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
  },

  goToPrivacy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },

  onShareAppMessage() {
    return {
      title: '心动卡片 - 让每一次互动都充满心动',
      path: '/pages/welcome/welcome',
      imageUrl: '/images/share.png'
    };
  },

  onShareTimeline() {
    return {
      title: '心动卡片 - 让每一次互动都充满心动',
      imageUrl: '/images/share.png'
    };
  }
});
