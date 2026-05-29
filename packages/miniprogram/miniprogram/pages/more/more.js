const store = require('../../utils/store.js');

Page({
  data: {
    profile: null,
    profileComplete: false,
  },

  onShow() {
    const profile = store.getProfile();
    const complete = !!(profile.name && profile.bio && profile.tags && profile.tags.length >= 3);
    this.setData({ profile, profileComplete: complete });
  },

  goDiscover() {
    wx.navigateTo({ url: '/pages/discover/discover' });
  },

  goGames() {
    wx.navigateTo({ url: '/pages/games/games' });
  },
});
