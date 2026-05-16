// miniprogram/pages/namecard-edit/namecard-edit.js
const app = getApp()

Page({
  data: {
    namecard: {
      theme: 'romantic',
      coverImage: '',
      motto: '',
      socialLinks: []
    },

    themes: [
      { value: 'romantic', label: '浪漫粉', color: 'linear-gradient(135deg, #ff8a80 0%, #f48fb1 100%)' },
      { value: 'minimal', label: '简约白', color: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)' },
      { value: 'nature', label: '自然绿', color: 'linear-gradient(135deg, #81c784 0%, #aed581 100%)' },
      { value: 'ocean', label: '海洋蓝', color: 'linear-gradient(135deg, #4fc3f7 0%, #81d4fa 100%)' },
      { value: 'sunset', label: '落日橙', color: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)' }
    ],

    platformOptions: [
      '微信', '小红书', '抖音', '微博', '自定义'
    ],

    currentTheme: 'romantic'
  },

  onLoad() {
    this.loadNamecard()
  },

  loadNamecard() {
    wx.showLoading({ title: '加载中...' })

    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'getNamecard',
        openid: app.globalData.userInfo.openid
      }
    }).then(res => {
      wx.hideLoading()

      if (res.result.success) {
        const namecard = res.result.data
        this.setData({
          namecard: {
            theme: namecard.theme || 'romantic',
            coverImage: namecard.coverImage || '',
            motto: namecard.motto || '',
            socialLinks: namecard.socialLinks || []
          },
          currentTheme: namecard.theme || 'romantic'
        })
      }
    }).catch(err => {
      console.error('Load namecard failed:', err)
      wx.hideLoading()
    })
  },

  onThemeSelect(e) {
    const { theme } = e.currentTarget.dataset
    this.setData({
      currentTheme: theme,
      'namecard.theme': theme
    })
  },

  onMottoInput(e) {
    this.setData({
      'namecard.motto': e.detail.value
    })
  },

  handleChooseCover() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.uploadCoverImage(tempFilePath)
      }
    })
  },

  uploadCoverImage(tempFilePath) {
    wx.showLoading({ title: '上传中...' })

    const cloudPath = `covers/${app.globalData.userInfo.openid}_${Date.now()}.png`

    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempFilePath
    }).then(res => {
      this.setData({
        'namecard.coverImage': res.fileID
      })
      wx.hideLoading()
      wx.showToast({
        title: '封面上传成功',
        icon: 'success'
      })
    }).catch(err => {
      console.error('Upload failed:', err)
      wx.hideLoading()
      wx.showToast({
        title: '上传失败',
        icon: 'none'
      })
    })
  },

  handleAddSocialLink() {
    const socialLinks = this.data.namecard.socialLinks

    wx.showActionSheet({
      itemList: this.data.platformOptions,
      success: (res) => {
        const platform = this.data.platformOptions[res.tapIndex]

        this.showInputDialog(platform, (link) => {
          socialLinks.push({
            platform: platform,
            link: link
          })

          this.setData({
            'namecard.socialLinks': socialLinks
          })
        })
      }
    })
  },

  showInputDialog(platform, callback) {
    wx.showModal({
      title: `添加${platform}`,
      editable: true,
      placeholderText: '请输入链接或账号',
      success: (res) => {
        if (res.confirm && res.content) {
          callback(res.content)
        }
      }
    })
  },

  handleRemoveSocialLink(e) {
    const { index } = e.currentTarget.dataset
    const socialLinks = this.data.namecard.socialLinks

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个社交链接吗？',
      success: (res) => {
        if (res.confirm) {
          socialLinks.splice(index, 1)
          this.setData({
            'namecard.socialLinks': socialLinks
          })
        }
      }
    })
  },

  handleSave() {
    const { namecard } = this.data

    wx.showLoading({ title: '保存中...' })

    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'updateNamecard',
        openid: app.globalData.userInfo.openid,
        namecard: namecard
      }
    }).then(res => {
      wx.hideLoading()

      if (res.result.success) {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })

        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: res.result.message || '保存失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      console.error('Save failed:', err)
      wx.hideLoading()
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      })
    })
  }
})
