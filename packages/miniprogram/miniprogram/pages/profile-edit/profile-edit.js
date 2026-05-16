// miniprogram/pages/profile-edit/profile-edit.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    avatarUrl: '',
    nickname: '',
    bio: '',
    gender: '',
    birthday: '',
    city: '',
    province: '',
    interests: [],
    companionTypes: [],

    genderOptions: [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' },
      { value: 'other', label: '其他' }
    ],

    allInterests: [
      '旅行', '美食', '摄影', '电影', '音乐', '读书',
      '运动', '绘画', '游戏', '手工', '宠物', '舞蹈'
    ],

    allCompanionTypes: [
      '饭搭子', '运动搭子', '旅游搭子', '学习搭子',
      '影迷搭子', '游戏搭子', '宠物搭子', '咖啡搭子'
    ]
  },

  onLoad() {
    this.loadUserData()
  },

  loadUserData() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      const gender = userInfo.gender || ''
      const genderOption = this.data.genderOptions.find(g => g.value === gender)
      this.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatar || '',
        nickname: userInfo.nickname || '',
        bio: userInfo.bio || '',
        gender: gender,
        genderLabel: genderOption ? genderOption.label : '',
        birthday: userInfo.birthday || '',
        city: userInfo.city || '',
        province: userInfo.province || '',
        interests: userInfo.interests || [],
        companionTypes: userInfo.companionTypes || []
      })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.uploadAvatar(avatarUrl)
  },

  uploadAvatar(tempFilePath) {
    wx.showLoading({ title: '上传中...' })

    const cloudPath = `avatars/${app.globalData.userInfo.openid}_${Date.now()}.png`

    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempFilePath
    }).then(res => {
      this.setData({
        avatarUrl: res.fileID
      })
      wx.hideLoading()
      wx.showToast({
        title: '头像上传成功',
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

  onNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  onBioInput(e) {
    this.setData({
      bio: e.detail.value
    })
  },

  onGenderChange(e) {
    const option = this.data.genderOptions[e.detail.value]
    this.setData({
      gender: option.value,
      genderLabel: option.label
    })
  },

  onBirthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  onRegionChange(e) {
    const [province, city] = e.detail.value
    this.setData({
      province: province,
      city: city
    })
  },

  toggleInterest(e) {
    const { interest } = e.currentTarget.dataset
    let interests = [...this.data.interests]

    const index = interests.indexOf(interest)
    if (index > -1) {
      interests.splice(index, 1)
    } else {
      interests.push(interest)
    }

    this.setData({ interests })
  },

  toggleCompanionType(e) {
    const { type } = e.currentTarget.dataset
    let companionTypes = [...this.data.companionTypes]

    const index = companionTypes.indexOf(type)
    if (index > -1) {
      companionTypes.splice(index, 1)
    } else {
      companionTypes.push(type)
    }

    this.setData({ companionTypes })
  },

  handleSave() {
    const { nickname, bio, avatarUrl, gender, birthday, city, province, interests, companionTypes } = this.data

    if (!nickname || nickname.trim() === '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }

    wx.showLoading({ title: '保存中...' })

    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'updateProfile',
        openid: app.globalData.userInfo.openid,
        profile: {
          nickname: nickname.trim(),
          bio: bio.trim(),
          avatar: avatarUrl,
          gender,
          birthday,
          city,
          province,
          interests,
          companionTypes
        }
      }
    }).then(res => {
      wx.hideLoading()

      if (res.result.success) {
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          nickname: nickname.trim(),
          bio: bio.trim(),
          avatar: avatarUrl,
          gender,
          birthday,
          city,
          province,
          interests,
          companionTypes
        }

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
