// miniprogram/pages/moments/moments.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    posts: [],
    loading: false,
    showModal: false,
    submitting: false,
    newPost: {
      content: '',
      images: [],
      activityId: '',
      activityName: '',
      activityIndex: -1
    },
    activities: [],
    userInfo: null
  },

  onLoad() {
    this.getUserInfo()
    this.loadActivities()
    this.loadPosts()
  },

  onPullDownRefresh() {
    this.loadPosts().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // Get user info
  getUserInfo() {
    const userInfo = app.globalData.userInfo
    this.setData({ userInfo })
  },

  // Load completed activities for selection
  async loadActivities() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'companion',
        data: {
          action: 'getActivities',
          status: 'completed'
        }
      })

      if (result.success) {
        this.setData({
          activities: result.data || []
        })
      }
    } catch (error) {
      console.error('加载活动失败:', error)
    }
  },

  // Load posts from database
  async loadPosts() {
    this.setData({ loading: true })

    try {
      const { data } = await db.collection('posts')
        .orderBy('createTime', 'desc')
        .limit(50)
        .get()

      // Format posts data
      const posts = data.map(post => {
        return {
          ...post,
          timeText: this.formatTime(post.createTime),
          likesCount: post.likes ? post.likes.length : 0,
          commentsCount: post.comments ? post.comments.length : 0,
          isLiked: post.likes && post.likes.includes(this.data.userInfo?.openid || ''),
          showComments: false,
          commentInput: ''
        }
      })

      this.setData({
        posts,
        loading: false
      })
    } catch (error) {
      console.error('加载动态失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      this.setData({ loading: false })
    }
  },

  // Format timestamp to readable text
  formatTime(timestamp) {
    const now = Date.now()
    const time = timestamp instanceof Date ? timestamp.getTime() : timestamp
    const diff = now - time

    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diff < minute) {
      return '刚刚'
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`
    } else if (diff < 7 * day) {
      return `${Math.floor(diff / day)}天前`
    } else {
      const date = new Date(time)
      return `${date.getMonth() + 1}-${date.getDate()}`
    }
  },

  // Show create post modal
  showCreatePost() {
    this.setData({
      showModal: true,
      newPost: {
        content: '',
        images: [],
        activityId: '',
        activityName: '',
        activityIndex: -1
      }
    })
  },

  // Hide create post modal
  hideCreatePost() {
    this.setData({ showModal: false })
  },

  // Stop propagation for modal content
  stopPropagation() {},

  // Content input
  onContentInput(e) {
    this.setData({
      'newPost.content': e.detail.value
    })
  },

  // Choose images
  async chooseImage() {
    try {
      const { tempFilePaths } = await wx.chooseImage({
        count: 3 - this.data.newPost.images.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      this.setData({
        'newPost.images': [...this.data.newPost.images, ...tempFilePaths]
      })
    } catch (error) {
      console.log('取消选择图片')
    }
  },

  // Remove image
  removeImage(e) {
    const { index } = e.currentTarget.dataset
    const images = [...this.data.newPost.images]
    images.splice(index, 1)
    this.setData({
      'newPost.images': images
    })
  },

  // Activity selection change
  onActivityChange(e) {
    const index = parseInt(e.detail.value)
    const activity = this.data.activities[index]
    this.setData({
      'newPost.activityIndex': index,
      'newPost.activityId': activity._id,
      'newPost.activityName': activity.name
    })
  },

  // Submit post
  async submitPost() {
    const { content, images, activityId, activityName } = this.data.newPost

    // Validation
    if (!content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    // Content safety check
    try {
      const checkResult = await wx.cloud.callFunction({
        name: 'content-check',
        data: { action: 'checkText', content: content }
      })

      if (!checkResult.result.safe) {
        wx.showToast({
          title: '内容包含敏感信息',
          icon: 'none'
        })
        return
      }
    } catch (error) {
      console.error('内容安全检查失败:', error)
    }

    this.setData({ submitting: true })

    try {
      // Upload images to cloud storage
      const uploadedImages = []
      for (let i = 0; i < images.length; i++) {
        const cloudPath = `posts/${Date.now()}_${i}.${images[i].split('.').pop()}`
        const { fileID } = await wx.cloud.uploadFile({
          cloudPath,
          filePath: images[i]
        })
        uploadedImages.push(fileID)
      }

      // Create post in database
      const postData = {
        content: content.trim(),
        images: uploadedImages,
        activityId: activityId || null,
        activityName: activityName || null,
        userId: this.data.userInfo?.openid || '',
        userName: this.data.userInfo?.nickname || '匿名用户',
        userAvatar: this.data.userInfo?.avatar || '',
        likes: [],
        comments: [],
        createTime: Date.now()
      }

      await db.collection('posts').add({
        data: postData
      })

      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })

      this.setData({
        showModal: false,
        submitting: false
      })

      // Reload posts
      this.loadPosts()
    } catch (error) {
      console.error('发布失败:', error)
      wx.showToast({
        title: '发布失败',
        icon: 'error'
      })
      this.setData({ submitting: false })
    }
  },

  // Toggle like
  async toggleLike(e) {
    const { id, index } = e.currentTarget.dataset
    const post = this.data.posts[index]
    const openid = this.data.userInfo?.openid || ''

    if (!openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    try {
      const isLiked = post.isLiked

      // Update database
      await db.collection('posts').doc(id).update({
        data: {
          likes: isLiked ? _.pull(openid) : _.addToSet(openid)
        }
      })

      // Update local data
      const posts = [...this.data.posts]
      posts[index].isLiked = !isLiked
      posts[index].likesCount = isLiked ? posts[index].likesCount - 1 : posts[index].likesCount + 1

      this.setData({ posts })
    } catch (error) {
      console.error('点赞失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  },

  // Toggle comments section
  toggleComments(e) {
    const { index } = e.currentTarget.dataset
    const posts = [...this.data.posts]
    posts[index].showComments = !posts[index].showComments
    this.setData({ posts })
  },

  // Add comment
  async addComment(e) {
    const { id, index } = e.currentTarget.dataset
    const content = e.detail.value.trim()

    if (!content) {
      return
    }

    const openid = this.data.userInfo?.openid || ''
    const userName = this.data.userInfo?.nickname || '匿名用户'

    if (!openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    // Content safety check
    try {
      const checkResult = await wx.cloud.callFunction({
        name: 'content-check',
        data: { action: 'checkText', content: content }
      })

      if (!checkResult.result.safe) {
        wx.showToast({
          title: '评论包含敏感信息',
          icon: 'none'
        })
        return
      }
    } catch (error) {
      console.error('内容安全检查失败:', error)
    }

    try {
      const comment = {
        userId: openid,
        userName: userName,
        content: content,
        createTime: Date.now()
      }

      // Update database
      await db.collection('posts').doc(id).update({
        data: {
          comments: _.push(comment)
        }
      })

      // Update local data
      const posts = [...this.data.posts]
      if (!posts[index].comments) {
        posts[index].comments = []
      }
      posts[index].comments.push(comment)
      posts[index].commentsCount = posts[index].comments.length
      posts[index].commentInput = ''

      this.setData({ posts })

      wx.showToast({
        title: '评论成功',
        icon: 'success'
      })
    } catch (error) {
      console.error('评论失败:', error)
      wx.showToast({
        title: '评论失败',
        icon: 'error'
      })
    }
  },

  // Preview image
  previewImage(e) {
    const { urls, current } = e.currentTarget.dataset
    wx.previewImage({
      urls: urls,
      current: current
    })
  }
})
