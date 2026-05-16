const app = getApp();
const cardData = require('../../data/cards.js');
const tagConfig = require('../../data/tags.js');
const i18n = require('../../utils/i18n.js');

const SOURCE_CONFIG = {
  'Arthur Aron 36问': { color: '#ff6b6b', icon: '💕', short: '36问' },
  'Gottman研究所': { color: '#4ecdc4', icon: '🔬', short: 'Gottman' },
  '普鲁斯特问卷': { color: '#a66cff', icon: '📜', short: 'Proust' },
  '五种爱的语言': { color: '#ff8fab', icon: '💝', short: '爱的语言' },
  '依恋理论': { color: '#ffd93d', icon: '🤗', short: '依恋理论' },
  'The Skin Deep': { color: '#6c5ce7', icon: '🎬', short: '{THE AND}' },
  'School of Life': { color: '#00b894', icon: '🎓', short: 'School of Life' },
  'Esther Perel': { color: '#e17055', icon: '🔥', short: 'Esther Perel' },
  '经典派对游戏': { color: '#74b9ff', icon: '🎲', short: '派对游戏' },
  '经典破冰游戏': { color: '#81ecec', icon: '⚡', short: '快问快答' },
  '默契考验游戏': { color: '#fdcb6e', icon: '🎯', short: '默契考验' },
  '情景模拟问题': { color: '#a29bfe', icon: '🎭', short: '情景模拟' },
  '荒岛问题': { color: '#55a3ff', icon: '🏝️', short: '荒岛问题' },
  '亲密挑战': { color: '#fd79a8', icon: '💋', short: '亲密挑战' },
  '浪漫问题': { color: '#fab1a0', icon: '🥰', short: '浪漫问题' },
  '趣味破冰': { color: '#ffeaa7', icon: '😂', short: '趣味破冰' }
};

Page({
  data: {
    t: {},
    totalCards: 0,
    presetCollections: [],
    sourceCollections: [],
    // 每日推荐
    dailyCard: null,
    dailyTip: '',
    // 搜索
    searchKeyword: '',
    searchResults: [],
    showSearch: false
  },

  onLoad() {
    this.initLanguage();
    this.initCollections();
    this.initDaily();
  },

  onShow() {
    this.initDaily();
  },

  initLanguage() {
    const t = i18n.t();
    this.setData({ t });
  },

  initDaily() {
    const dailyCard = cardData.getDailyCard();
    const t = i18n.t();
    const tips = t.dailyTips || [];
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dailyTip = tips[dayOfYear % tips.length] || '';

    this.setData({ dailyCard, dailyTip });
  },

  initCollections() {
    const allCards = cardData.getAllCards();
    const totalCards = allCards.length;

    const presetCollections = tagConfig.presets.map(preset => {
      const cards = cardData.getCardsByTags(preset.tags, 'any');
      return {
        id: preset.id,
        name: preset.name,
        icon: preset.icon,
        desc: preset.desc,
        count: cards.length,
        tags: preset.tags,
        type: 'preset'
      };
    });

    const sourceCounts = cardData.getCardCountBySource();
    const sourceCollections = Object.entries(sourceCounts)
      .map(([source, count]) => {
        const config = SOURCE_CONFIG[source] || {};
        return {
          id: source,
          name: config.short || source,
          fullName: source,
          icon: config.icon || '📚',
          color: config.color || '#b8b5b2',
          count: count,
          type: 'source'
        };
      })
      .sort((a, b) => b.count - a.count);

    this.setData({ totalCards, presetCollections, sourceCollections });
  },

  // 搜索
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });

    if (keyword.trim().length > 0) {
      const results = cardData.searchCards(keyword).slice(0, 20);
      this.setData({ searchResults: results, showSearch: true });
    } else {
      this.setData({ searchResults: [], showSearch: false });
    }
  },

  onSearchFocus() {
    if (this.data.searchKeyword.trim().length > 0) {
      this.setData({ showSearch: true });
    }
  },

  onSearchClear() {
    this.setData({ searchKeyword: '', searchResults: [], showSearch: false });
  },

  // 点击搜索结果
  viewSearchResult(e) {
    const { id } = e.currentTarget.dataset;
    wx.vibrateShort({ type: 'medium' });
    this.setData({ showSearch: false });
    wx.navigateTo({
      url: `/pages/game/game?tags=${encodeURIComponent(JSON.stringify([]))}&startIndex=0`
    });
  },

  // 点击每日推荐
  viewDailyCard() {
    wx.vibrateShort({ type: 'medium' });
    wx.navigateTo({
      url: '/pages/game/game?startIndex=0'
    });
  },

  viewCollection(e) {
    const { type, id, tags } = e.currentTarget.dataset;
    wx.vibrateShort({ type: 'medium' });

    let tagsParam = '';
    if (type === 'preset' && tags) {
      tagsParam = encodeURIComponent(JSON.stringify(tags));
    } else if (type === 'source') {
      tagsParam = encodeURIComponent(JSON.stringify({ source: id }));
    }

    wx.navigateTo({
      url: `/pages/game/game?collection=${tagsParam}&startIndex=0`
    });
  },

  viewAllCards() {
    wx.vibrateShort({ type: 'medium' });
    wx.navigateTo({
      url: '/pages/game/game?startIndex=0'
    });
  },

  onShareAppMessage() {
    return {
      title: '心动卡片 - 和TA一起玩，让感情升温',
      path: '/pages/welcome/welcome',
      imageUrl: '/images/share.png'
    };
  },

  onShareTimeline() {
    return {
      title: '心动卡片 - 和TA一起玩，让感情升温',
      imageUrl: '/images/share.png'
    };
  }
});
