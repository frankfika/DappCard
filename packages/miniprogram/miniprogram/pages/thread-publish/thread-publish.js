const store = require('../../utils/store.js');

const TAGS = ['Work', 'Life', 'Web3', 'Thoughts'];

Page({
  data: {
    content: '',
    selectedTag: 'Work',
    tags: TAGS,
    imagePreviews: [],
    authorAvatar: '',
  },

  onLoad() {
    const profile = store.getProfile();
    this.setData({
      authorAvatar: profile.avatar || '',
    });
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  selectTag(e) {
    this.setData({ selectedTag: e.currentTarget.dataset.tag });
  },

  chooseImage() {
    if (this.data.imagePreviews.length >= 3) {
      wx.showToast({ title: '最多3张图片', icon: 'none' });
      return;
    }
    wx.chooseMedia({
      count: 3 - this.data.imagePreviews.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const paths = res.tempFiles.map(f => f.tempFilePath);
        this.setData({
          imagePreviews: [...this.data.imagePreviews, ...paths],
        });
      },
    });
  },

  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const previews = this.data.imagePreviews.filter((_, i) => i !== index);
    this.setData({ imagePreviews: previews });
  },

  goBack() {
    wx.navigateBack();
  },

  handlePublish() {
    if (!this.data.content.trim() && this.data.imagePreviews.length === 0) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }
    const profile = store.getProfile();
    const thread = {
      id: Date.now().toString(),
      author: {
        name: profile.name || 'Anonymous',
        avatar: profile.avatar || '',
        handle: profile.handle || '0x...',
      },
      content: this.data.content.trim(),
      images: this.data.imagePreviews.length > 0 ? this.data.imagePreviews : [],
      tags: [this.data.selectedTag],
      likes: 0,
      timestamp: '刚刚',
      isLiked: false,
    };
    store.addThread(thread);
    wx.showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 600);
  },
});
