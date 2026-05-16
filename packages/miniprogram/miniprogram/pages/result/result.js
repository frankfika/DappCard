Page({
  data: {
    modeName: '',
    totalCount: 0,
    favoriteCount: 0
  },

  onLoad(options) {
    const mode = options.mode || 'dating_icebreaker';
    const modeNames = {
      'dating_icebreaker': '相亲破冰',
      'romance_spark': '约会心动',
      'couple_deep': '情侣升温',
      'marriage_fresh': '夫妻保鲜'
    };

    const progress = wx.getStorageSync('progress') || {};
    const modeProgress = progress[mode] || { completed: [], total: 0 };
    const favorites = wx.getStorageSync('favorites') || [];

    this.setData({
      modeName: modeNames[mode],
      totalCount: modeProgress.completed.length,
      favoriteCount: favorites.length,
      currentMode: mode
    });
  },

  playAgain() {
    const { currentMode } = this.data;

    // 重置进度
    const progress = wx.getStorageSync('progress') || {};
    progress[currentMode] = { completed: [], total: progress[currentMode]?.total || 0 };
    wx.setStorageSync('progress', progress);

    wx.redirectTo({
      url: `/pages/game/game?mode=${currentMode}`
    });
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
