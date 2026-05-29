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
      authorAvatar: profile.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=fallback&backgroundColor=transparent',
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
    wx.chooseImage({
      count: 3 - this.data.imagePreviews.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imagePreviews: [...this.data.imagePreviews, ...res.tempFilePaths],
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
        avatar: profile.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=fallback&backgroundColor=transparent`,
        handle: profile.handle || '0x...',
      },
      content: this.data.content.trim(),
      images: this.data.imagePreviews.length > 0 ? this.data.imagePreviews : undefined,
      tags: [this.data.selectedTag],
      likes: 0,
      timestamp: '刚刚',
      isLiked: false,
    };
    store.addThread(thread);
    wx.navigateBack();
  },
});
