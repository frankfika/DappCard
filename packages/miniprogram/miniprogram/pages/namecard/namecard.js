// miniprogram/pages/namecard/namecard.js
const app = getApp()

Page({
  data: {
    isOwn: true,
    openid: '',
    namecard: {
      avatarUrl: '',
      nickname: '',
      bio: '',
      interests: [],
      socialLinks: [],
      motto: '',
      theme: 'romantic',
      coverImage: ''
    },
    themeClass: 'theme-romantic'
  },

  onLoad(options) {
    const openid = options.openid || app.globalData.userInfo?.openid

    if (openid) {
      this.setData({ openid })
      this.loadNamecard(openid)

      if (openid === app.globalData.userInfo?.openid) {
        this.setData({ isOwn: true })
      } else {
        this.setData({ isOwn: false })
      }
    }
  },

  onShareAppMessage() {
    return {
      title: `${this.data.namecard.nickname}的个人名片`,
      path: `/pages/namecard/namecard?openid=${this.data.openid}`,
      imageUrl: this.data.namecard.coverImage || this.data.namecard.avatarUrl
    }
  },

  loadNamecard(openid) {
    wx.showLoading({ title: '加载中...' })

    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'getNamecard',
        openid: openid
      }
    }).then(res => {
      wx.hideLoading()

      if (res.result.success) {
        const namecard = res.result.data
        const themeClass = `theme-${namecard.theme || 'romantic'}`

        this.setData({
          namecard: namecard,
          themeClass: themeClass
        })
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      console.error('Load namecard failed:', err)
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    })
  },

  handleEdit() {
    wx.navigateTo({
      url: '/pages/namecard-edit/namecard-edit'
    })
  },

  handleShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  handleSaveImage() {
    wx.showToast({
      title: '保存图片功能开发中',
      icon: 'none'
    })
  },

  handleSocialLink(e) {
    const { link } = e.currentTarget.dataset

    wx.setClipboardData({
      data: link,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  }
})
