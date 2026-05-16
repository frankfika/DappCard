const cardData = require('../../data/cards.js');
const i18n = require('../../utils/i18n.js');

Page({
  data: {
    favorites: [],
    showModal: false,
    currentCard: null,
    t: {}
  },

  onLoad() {
    this.initLanguage();
  },

  onShow() {
    const t = i18n.t();
    this.setData({ t });
    this.loadFavorites();
  },

  initLanguage() {
    const t = i18n.t();
    this.setData({ t });
  },

  loadFavorites() {
    const favoriteIds = wx.getStorageSync('favorites') || [];
    const allCards = cardData.getAllCards();

    const favorites = allCards
      .filter(card => favoriteIds.includes(card.id))
      .map(card => ({
        ...card,
        typeIcon: '💭',
        typeLabel: card.source || '问题卡'
      }));

    this.setData({ favorites });
  },

  viewCard(e) {
    const index = e.currentTarget.dataset.index;
    const card = this.data.favorites[index];

    wx.vibrateShort({ type: 'medium' });

    this.setData({
      showModal: true,
      currentCard: card
    });
  },

  closeModal() {
    this.setData({
      showModal: false,
      currentCard: null
    });
  },

  removeFavorite(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '确认移除',
      content: '确定要移除这张卡片的收藏吗？',
      confirmColor: '#FF5A79',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const favoriteIds = wx.getStorageSync('favorites') || [];
          const newFavorites = favoriteIds.filter(fid => fid !== id);
          wx.setStorageSync('favorites', newFavorites);

          wx.vibrateShort({ type: 'heavy' });
          this.loadFavorites();

          wx.showToast({
            title: '已移除',
            icon: 'none'
          });
        }
      }
    });
  },

  goPlay() {
    wx.vibrateShort({ type: 'medium' });
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
