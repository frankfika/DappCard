const i18n = require('../../utils/i18n.js');

Page({
  data: {
    show: false,
    t: {},
    currentStep: 0,
    steps: [
      {
        icon: '💕',
        title: '1204张互动卡片',
        desc: '涵盖36问、Gottman研究所等经典来源，从破冰到灵魂深度'
      },
      {
        icon: '🎮',
        title: '10种游戏类型',
        desc: '灵魂拷问、二选一、默契考验、情景模拟...总有适合你们的玩法'
      },
      {
        icon: '🤝',
        title: '找到你的搭子',
        desc: '发现同城活动、找运动/旅行/学习搭子，用卡片破冰交友'
      }
    ]
  },

  onLoad() {
    const t = i18n.t();
    this.setData({ t });

    const hasLaunched = wx.getStorageSync('hasLaunched');
    if (hasLaunched) {
      wx.switchTab({ url: '/pages/index/index' });
      return;
    }

    setTimeout(() => {
      this.setData({ show: true });
    }, 100);
  },

  onSwiperChange(e) {
    this.setData({ currentStep: e.detail.current });
  },

  start() {
    wx.vibrateShort({ type: 'heavy' });
    wx.setStorageSync('hasLaunched', true);
    wx.switchTab({ url: '/pages/index/index' });
  }
});
