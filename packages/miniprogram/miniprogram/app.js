App({
  onLaunch() {
    // 初始化本地存储默认值
    const profile = wx.getStorageSync('dappcard_profile');
    if (!profile) {
      wx.setStorageSync('dappcard_profile', {
        name: '', handle: '', avatar: '', bio: '', tags: [],
        lookingFor: '', highlights: [],
        verified: { wallet: '', twitter: '', discord: '', wechat: '' },
        event: ''
      });
    }
    const threads = wx.getStorageSync('dappcard_threads');
    if (!threads) wx.setStorageSync('dappcard_threads', []);
    const activities = wx.getStorageSync('dappcard_activities');
    if (!activities) wx.setStorageSync('dappcard_activities', []);
    const gameSession = wx.getStorageSync('dappcard_game');
    if (!gameSession) {
      wx.setStorageSync('dappcard_game', { presetId: null, selectedTags: [], history: [], favorites: [] });
    }
  },
  globalData: {}
});
