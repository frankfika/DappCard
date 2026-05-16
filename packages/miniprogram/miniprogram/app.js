App({
  onLaunch() {
    // 初始化云开发
    this.globalData.cloudReady = false;
    if (wx.cloud) {
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true
      });
      // 用一次轻量调用探测云开发是否真正可用
      wx.cloud.callFunction({
        name: 'login',
        success: (res) => {
          this.globalData.cloudReady = true;
          if (res.result && res.result.user) {
            this.globalData.userInfo = res.result.user;
            this.globalData.isLoggedIn = true;
            this.globalData.openid = res.result.openid;
          }
        },
        fail: () => {
          this.globalData.cloudReady = false;
        }
      });
    }

    // 初始化本地存储
    const progress = wx.getStorageSync('progress');
    if (!progress) {
      wx.setStorageSync('progress', {});
    }
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    openid: null,
    currentMode: null,
    currentCard: null,
    cloudReady: false
  }
});
