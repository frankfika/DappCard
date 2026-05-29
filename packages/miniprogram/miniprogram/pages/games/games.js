const { allCards, getCardsByTags, shuffleArray, presets, tags } = require('../../utils/cards-data.js');
const store = require('../../utils/store.js');

Page({
  data: {
    currentCard: null,
    selectedPreset: null,
    selectedTags: [],
    showFilters: false,
    showHistory: false,
    tags: tags,
    presets: presets,
    history: [],
    favorites: [],
    totalPlayed: 0,
    filteredCount: 0,
    isCurrentFav: false,
  },

  onLoad() {
    this.loadSession();
  },

  onShow() {
    this.loadSession();
  },

  loadSession() {
    const session = store.getGameSession();
    this.setData({
      history: session.history || [],
      favorites: session.favorites || [],
      selectedPreset: session.presetId,
      selectedTags: session.selectedTags || [],
      totalPlayed: (session.history || []).length,
    }, () => this.updateComputed());
  },

  getFilteredCards() {
    let cards;
    if (this.data.selectedPreset) {
      const preset = presets.find(p => p.id === this.data.selectedPreset);
      cards = preset ? getCardsByTags(preset.tags) : allCards;
    } else if (this.data.selectedTags.length > 0) {
      cards = getCardsByTags(this.data.selectedTags);
    } else {
      cards = allCards;
    }
    return cards.filter(c => !this.data.history.includes(c.id));
  },

  drawCard() {
    const cards = this.getFilteredCards();
    if (cards.length === 0) {
      wx.showToast({ title: '所有卡片已抽完', icon: 'none' });
      return;
    }
    const shuffled = shuffleArray(cards);
    const card = shuffled[0];
    store.addToHistory(card.id);
    this.setData({
      currentCard: card,
      history: [...this.data.history, card.id],
      totalPlayed: this.data.totalPlayed + 1,
    }, () => this.updateComputed());
  },

  toggleFavorite() {
    if (!this.data.currentCard) return;
    const session = store.toggleFavorite(this.data.currentCard.id);
    this.setData({ favorites: session.favorites }, () => this.updateComputed());
  },

  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    const selected = this.data.selectedTags;
    if (selected.includes(tag)) {
      this.setData({ selectedTags: selected.filter(t => t !== tag), selectedPreset: null });
    } else {
      this.setData({ selectedTags: [...selected, tag], selectedPreset: null });
    }
    this.saveSession();
  },

  selectPreset(e) {
    const presetId = e.currentTarget.dataset.preset;
    this.setData({
      selectedPreset: this.data.selectedPreset === presetId ? null : presetId,
      selectedTags: [],
    });
    this.saveSession();
  },

  toggleFilters() {
    this.setData({ showFilters: !this.data.showFilters });
  },

  toggleHistory() {
    this.setData({ showHistory: !this.data.showHistory });
  },

  resetAll() {
    store.resetHistory();
    this.setData({ history: [], totalPlayed: 0, currentCard: null }, () => this.updateComputed());
    wx.showToast({ title: '已重置', icon: 'success' });
  },

  updateComputed() {
    const filteredCount = this.getFilteredCards().length;
    const isCurrentFav = !!(this.data.currentCard && this.data.favorites.includes(this.data.currentCard.id));
    this.setData({ filteredCount, isCurrentFav });
  },

  saveSession() {
    store.setGameSession({
      presetId: this.data.selectedPreset,
      selectedTags: this.data.selectedTags,
    });
    this.updateComputed();
  },

  getFilteredCount() {
    return this.getFilteredCards().length;
  },

  isFav() {
    return this.data.currentCard && this.data.favorites.includes(this.data.currentCard.id);
  },

  getHistoryCards() {
    return allCards.filter(c => this.data.history.includes(c.id));
  },
});
