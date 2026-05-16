// pages/create-activity/create-activity.js
const { getAllCategories } = require('../../data/companion-types.js');

Page({
  data: {
    title: '',
    description: '',
    categories: getAllCategories(),
    categoryIndex: 0,
    subcategories: [],
    subcategoryIndex: 0,
    datetime: '',
    location: null,
    maxParticipants: 4,
    images: [],
    submitting: false,
    showPrivacy: false
  },

  onLoad(options) {
    this.updateSubcategories();
    // Set default datetime to 2 hours later
    const now = new Date();
    now.setHours(now.getHours() + 2);
    this.setData({
      datetime: this.formatDateTime(now)
    });
  },

  // 隐私协议弹窗处理
  onNeedPrivacyAuthorization(resolve, eventInfo) {
    this.privacyResolve = resolve;
    this.setData({ showPrivacy: true });
  },

  handleAgreePrivacy() {
    this.setData({ showPrivacy: false });
    if (this.privacyResolve) {
      this.privacyResolve({ buttonId: 'agree-btn', event: 'agree' });
    }
  },

  handleRejectPrivacy() {
    this.setData({ showPrivacy: false });
    if (this.privacyResolve) {
      this.privacyResolve({ buttonId: 'reject-btn', event: 'disagree' });
    }
  },

  openPrivacyContract() {
    wx.openPrivacyContract();
  },

  onTitleInput(e) {
    this.setData({ title: e.detail.value });
  },

  onDescriptionInput(e) {
    this.setData({ description: e.detail.value });
  },

  onCategoryChange(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      categoryIndex: index,
      subcategoryIndex: 0
    });
    this.updateSubcategories();
  },

  onSubcategoryChange(e) {
    this.setData({
      subcategoryIndex: parseInt(e.detail.value)
    });
  },

  updateSubcategories() {
    const category = this.data.categories[this.data.categoryIndex];
    this.setData({
      subcategories: category.subcategories || []
    });
  },

  onDatetimeChange(e) {
    this.setData({ datetime: e.detail.value });
  },

  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: {
            name: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          }
        });
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '需要位置权限',
            content: '请在设置中开启位置权限',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        }
      }
    });
  },

  onMaxParticipantsChange(e) {
    this.setData({ maxParticipants: e.detail.value });
  },

  onChooseImage() {
    const maxCount = 3 - this.data.images.length;
    if (maxCount <= 0) {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: maxCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        });
      }
    });
  },

  onRemoveImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({ images });
  },

  async onSubmit() {
    // Validation
    if (!this.data.title.trim()) {
      wx.showToast({
        title: '请输入活动标题',
        icon: 'none'
      });
      return;
    }

    if (!this.data.description.trim()) {
      wx.showToast({
        title: '请输入活动描述',
        icon: 'none'
      });
      return;
    }

    if (!this.data.location) {
      wx.showToast({
        title: '请选择活动地点',
        icon: 'none'
      });
      return;
    }

    if (!this.data.datetime) {
      wx.showToast({
        title: '请选择活动时间',
        icon: 'none'
      });
      return;
    }

    this.setData({ submitting: true });

    try {
      // Content safety check
      await this.checkContentSafety();

      // Upload images
      const imageUrls = await this.uploadImages();

      // Create activity
      const category = this.data.categories[this.data.categoryIndex];
      const subcategory = this.data.subcategories[this.data.subcategoryIndex];

      const result = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'createActivity',
          activity: {
            title: this.data.title.trim(),
            description: this.data.description.trim(),
            category: {
              id: category.id,
              name: category.name,
              subcategory: subcategory ? subcategory.name : ''
            },
            datetime: new Date(this.data.datetime).getTime(),
            location: this.data.location,
            maxParticipants: this.data.maxParticipants,
            images: imageUrls
          }
        }
      });

      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.navigateBack();
      }, 1500);

    } catch (err) {
      console.error('Failed to create activity:', err);
      wx.showToast({
        title: err.message || '发布失败',
        icon: 'none'
      });
    } finally {
      this.setData({ submitting: false });
    }
  },

  async checkContentSafety() {
    const content = this.data.title + ' ' + this.data.description;
    const result = await wx.cloud.callFunction({
      name: 'content-check',
      data: {
        action: 'checkText',
        content: content
      }
    });

    if (!result.result.safe) {
      throw new Error('内容包含敏感信息，请修改后重试');
    }
  },

  async uploadImages() {
    const uploadPromises = this.data.images.map(async (tempPath) => {
      const ext = tempPath.split('.').pop();
      const cloudPath = `activities/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const result = await wx.cloud.uploadFile({
        cloudPath,
        filePath: tempPath
      });
      return result.fileID;
    });

    return await Promise.all(uploadPromises);
  },

  formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
});
