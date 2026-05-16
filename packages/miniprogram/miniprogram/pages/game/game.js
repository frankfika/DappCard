const app = getApp();
const cardData = require('../../data/cards.js');
const tagConfig = require('../../data/tags.js');
const i18n = require('../../utils/i18n.js');

Page({
  data: {
    selectedTags: [],
    sessionKey: '',
    currentCard: null,
    isFlipped: false,
    isFavorited: false,
    cardType: 'question',
    cardTypeIcon: '💬',
    cardTypeLabel: '',
    completedCount: 0,
    totalCount: 0,
    allCards: [],
    remainingCards: [],
    tagData: tagConfig.tags,
    t: {},
    // 卡片历史
    cardHistory: [],
    canGoBack: false,
    // 滑动相关
    touchStartX: 0,
    touchStartY: 0,
    // 动画
    cardAnimClass: ''
  },

  onLoad(options) {
    this.initLanguage();

    // 解析标签参数
    let selectedTags = [];

    if (options.collection) {
      // 从 index 页传来的合集参数
      try {
        const collectionData = JSON.parse(decodeURIComponent(options.collection));
        if (collectionData && collectionData.source) {
          // 来源合集：根据 source 筛选
          const sourceCards = cardData.getCardsBySource(collectionData.source);
          this.initGameWithCards(sourceCards, 'source_' + collectionData.source);
          return;
        } else if (Array.isArray(collectionData)) {
          selectedTags = collectionData;
        }
      } catch (e) {
        console.error('Failed to parse collection:', e);
      }
    } else if (options.tags) {
      try {
        selectedTags = JSON.parse(decodeURIComponent(options.tags));
      } catch (e) {
        console.error('Failed to parse tags:', e);
      }
    }

    this.initGame(selectedTags);
  },

  initLanguage() {
    const t = i18n.t();
    this.setData({ t });
  },

  // 使用指定卡片初始化游戏
  initGameWithCards(cards, sessionKey) {
    const progress = wx.getStorageSync('progress') || {};
    const sessionProgress = progress[sessionKey] || { completed: [], total: 0 };
    const completedIds = sessionProgress.completed || [];
    const remainingCards = cards.filter(card => !completedIds.includes(card.id));

    this.setData({
      selectedTags: [],
      sessionKey,
      allCards: cards,
      remainingCards,
      totalCount: cards.length,
      completedCount: completedIds.length
    });

    sessionProgress.total = cards.length;
    progress[sessionKey] = sessionProgress;
    wx.setStorageSync('progress', progress);

    this.drawCard();
  },

  // 初始化游戏
  initGame(selectedTags) {
    const allCards = cardData.getCardsByTags(selectedTags, 'any');

    const sessionKey = selectedTags.length > 0
      ? 'tags_' + selectedTags.sort().join('_').substring(0, 50)
      : 'all_cards';

    const progress = wx.getStorageSync('progress') || {};
    const sessionProgress = progress[sessionKey] || { completed: [], total: 0 };
    const completedIds = sessionProgress.completed || [];
    const remainingCards = allCards.filter(card => !completedIds.includes(card.id));

    this.setData({
      selectedTags,
      sessionKey,
      allCards,
      remainingCards,
      totalCount: allCards.length,
      completedCount: completedIds.length
    });

    sessionProgress.total = allCards.length;
    progress[sessionKey] = sessionProgress;
    wx.setStorageSync('progress', progress);

    this.drawCard();
  },

  // 抽卡
  drawCard() {
    const { remainingCards } = this.data;

    if (remainingCards.length === 0) {
      this.setData({
        currentCard: null,
        isFlipped: false,
        canGoBack: this.data.cardHistory.length > 0
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const card = remainingCards[randomIndex];
    const typeConfig = this.getCardTypeFromTags(card.tags);

    wx.vibrateShort({ type: 'heavy' });

    this.setData({
      currentCard: card,
      isFlipped: false,
      isFavorited: this.checkFavorited(card.id),
      cardType: typeConfig.type,
      cardTypeIcon: typeConfig.icon,
      cardTypeLabel: typeConfig.label,
      canGoBack: this.data.cardHistory.length > 0,
      cardAnimClass: 'card-enter'
    });

    // 清除入场动画
    setTimeout(() => {
      this.setData({ cardAnimClass: '' });
    }, 300);
  },

  getCardTypeFromTags(tags) {
    const { tagData } = this.data;
    const gameTypeTags = ['灵魂拷问', '二选一', '真心话大冒险', '两真一假',
                          'Never Have I Ever', '默契考验', '情景模拟',
                          '快问快答', '亲密挑战', '荒岛求生'];

    for (const tag of tags) {
      if (gameTypeTags.includes(tag) && tagData[tag]) {
        return {
          type: tag,
          icon: tagData[tag].icon,
          label: tagData[tag].name
        };
      }
    }

    return {
      type: 'question',
      icon: '💭',
      label: '灵魂拷问'
    };
  },

  // 翻牌
  flipCard() {
    if (!this.data.currentCard) return;
    wx.vibrateShort({ type: 'heavy' });
    this.setData({
      isFlipped: !this.data.isFlipped
    });
  },

  // 下一张
  nextCard() {
    const { currentCard, remainingCards } = this.data;

    if (!currentCard && remainingCards.length === 0) {
      this.resetProgress();
      return;
    }

    wx.vibrateShort({ type: 'medium' });

    if (currentCard) {
      // 保存到历史
      const cardHistory = [...this.data.cardHistory, currentCard];
      if (cardHistory.length > 20) cardHistory.shift();

      this.markCompleted(currentCard.id);

      const newRemaining = remainingCards.filter(c => c.id !== currentCard.id);
      this.setData({
        remainingCards: newRemaining,
        completedCount: this.data.completedCount + 1,
        cardHistory,
        cardAnimClass: 'card-exit-left'
      });
    }

    setTimeout(() => {
      this.drawCard();
    }, 150);
  },

  // 回看上一张
  prevCard() {
    const { cardHistory } = this.data;
    if (cardHistory.length === 0) return;

    wx.vibrateShort({ type: 'light' });

    const prevCard = cardHistory[cardHistory.length - 1];
    const newHistory = cardHistory.slice(0, -1);
    const typeConfig = this.getCardTypeFromTags(prevCard.tags);

    this.setData({
      cardHistory: newHistory,
      currentCard: prevCard,
      isFlipped: true,
      isFavorited: this.checkFavorited(prevCard.id),
      cardType: typeConfig.type,
      cardTypeIcon: typeConfig.icon,
      cardTypeLabel: typeConfig.label,
      canGoBack: newHistory.length > 0,
      cardAnimClass: 'card-enter-right'
    });

    setTimeout(() => {
      this.setData({ cardAnimClass: '' });
    }, 300);
  },

  // 跳过
  skipCard() {
    wx.vibrateShort({ type: 'light' });
    this.setData({ cardAnimClass: 'card-exit-right' });
    setTimeout(() => {
      this.drawCard();
    }, 150);
  },

  // 滑动开始
  onTouchStart(e) {
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY
    });
  },

  // 滑动结束
  onTouchEnd(e) {
    const { touchStartX, touchStartY } = this.data;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX;
    const deltaY = endY - touchStartY;

    // 水平滑动距离大于50px，且水平距离大于垂直距离
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // 左滑 → 下一张
        this.nextCard();
      } else {
        // 右滑 → 上一张
        this.prevCard();
      }
    }
  },

  markCompleted(cardId) {
    const progress = wx.getStorageSync('progress') || {};
    const sessionProgress = progress[this.data.sessionKey] || { completed: [], total: 0 };

    if (!sessionProgress.completed.includes(cardId)) {
      sessionProgress.completed.push(cardId);
    }

    progress[this.data.sessionKey] = sessionProgress;
    wx.setStorageSync('progress', progress);
  },

  resetProgress() {
    const progress = wx.getStorageSync('progress') || {};
    progress[this.data.sessionKey] = {
      completed: [],
      total: this.data.allCards.length
    };
    wx.setStorageSync('progress', progress);

    this.setData({
      remainingCards: [...this.data.allCards],
      completedCount: 0,
      cardHistory: []
    });

    wx.vibrateShort({ type: 'heavy' });
    this.drawCard();

    wx.showToast({
      title: '已重置进度',
      icon: 'success'
    });
  },

  toggleFavorite() {
    const { currentCard, isFavorited } = this.data;
    if (!currentCard) return;

    const favorites = wx.getStorageSync('favorites') || [];
    wx.vibrateShort({ type: 'medium' });

    if (isFavorited) {
      const newFavorites = favorites.filter(id => id !== currentCard.id);
      wx.setStorageSync('favorites', newFavorites);
    } else {
      favorites.push(currentCard.id);
      wx.setStorageSync('favorites', favorites);
    }

    this.setData({ isFavorited: !isFavorited });

    wx.showToast({
      title: isFavorited ? '已取消收藏' : '已收藏',
      icon: 'none'
    });
  },

  checkFavorited(cardId) {
    const favorites = wx.getStorageSync('favorites') || [];
    return favorites.includes(cardId);
  },

  onShareAppMessage() {
    const { currentCard } = this.data;
    const question = currentCard ? currentCard.question : '';
    return {
      title: question ? `来回答这道题：${question.substring(0, 20)}...` : '心动卡片 - 和TA一起玩',
      path: '/pages/welcome/welcome',
      imageUrl: '/images/share.png'
    };
  },

  onShareTimeline() {
    return {
      title: '心动卡片 - 让每一次互动都充满激情',
      imageUrl: '/images/share.png'
    };
  }
});
