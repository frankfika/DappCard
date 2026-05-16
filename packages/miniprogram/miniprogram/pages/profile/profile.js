// miniprogram/pages/profile/profile.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    agreedToTerms: false,
    stats: {
      activitiesCreated: 0,
      activitiesJoined: 0,
      companionsFound: 0
    },
    menuItems: [
      {
        icon: '📇',
        title: '个人名片',
        path: '/pages/namecard/namecard'
      },
      {
        icon: '⭐',
        title: '我的收藏',
        path: '/pages/favorites/favorites'
      },
      {
        icon: '📅',
        title: '我的活动',
        path: '/pages/my-activities/my-activities'
      },
      {
        icon: '🌟',
        title: '动态广场',
        path: '/pages/moments/moments'
      },
      {
        icon: '⚙️',
        title: '设置',
        path: '/pages/settings/settings'
      }
    ]
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
    if (this.data.isLoggedIn) {
      this.loadUserStats()
    }
  },

  loadUserInfo() {
    const userInfo = app.globalData.userInfo
    if (userInfo && userInfo.openid) {
      this.setData({
        userInfo: userInfo,
        isLoggedIn: true
      })
    } else {
      this.setData({
        isLoggedIn: false
      })
    }
  },

  loadUserStats() {
    if (!app.globalData.cloudReady) return;

    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'getStats',
        openid: this.data.userInfo.openid
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          stats: res.result.data
        })
      }
    }).catch(err => {
      console.warn('加载用户统计失败，可能未开通云开发:', err.message || err)
    })
  },

  toggleAgreement() {
    this.setData({
      agreedToTerms: !this.data.agreedToTerms
    })
  },

  goToAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  },

  goToPrivacy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    })
  },

  handleLogin() {
    if (!this.data.agreedToTerms) {
      wx.showToast({
        title: '请先阅读并同意用户协议和隐私政策',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (!app.globalData.cloudReady) {
      // 云开发未就绪，使用本地模式
      app.globalData.userInfo = { openid: 'local_user', nickname: '本地用户' }
      app.globalData.isLoggedIn = true
      this.setData({
        userInfo: app.globalData.userInfo,
        isLoggedIn: true
      })
      wx.showToast({ title: '登录成功', icon: 'success' })
      return
    }

    wx.showLoading({ title: '登录中...' })

    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(result => {
      wx.hideLoading()
      if (result.result && result.result.success) {
        const userData = result.result.data || result.result.user
        app.globalData.userInfo = userData
        app.globalData.isLoggedIn = true
        app.globalData.openid = userData.openid
        this.setData({
          userInfo: userData,
          isLoggedIn: true
        })
        this.loadUserStats()
        wx.showToast({ title: '登录成功', icon: 'success' })
      } else {
        wx.showToast({ title: '登录失败，请重试', icon: 'none' })
      }
    }).catch(err => {
      wx.hideLoading()
      console.warn('登录失败:', err.message || err)
      wx.showToast({ title: '登录失败，请重试', icon: 'none' })
    })
  },

  handleEditProfile() {
    wx.navigateTo({
      url: '/pages/profile-edit/profile-edit'
    })
  },

  handleMenuTap(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  }
})
