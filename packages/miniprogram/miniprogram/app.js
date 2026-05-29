App({
  onLaunch() {
    const info = wx.getSystemInfoSync();
    const majorMinor = (info.SDKVersion || '').split('.');
    const major = parseInt(majorMinor[0], 10) || 0;
    const minor = parseInt(majorMinor[1], 10) || 0;
    if (major < 2 || (major === 2 && minor < 20)) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本较低，部分界面可能显示异常，建议升级微信以获得最佳体验。',
        showCancel: false,
      });
    }

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
