// miniprogram/pages/namecard/namecard.js
const app = getApp()
const web3 = require('../../utils/web3.js')

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
      coverImage: '',
      walletAddress: ''
    },
    themeClass: 'theme-romantic',
    onChainProfile: null,
    hasWalletAddress: false,
    isLoadingOnChain: false
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
          themeClass: themeClass,
          hasWalletAddress: !!(namecard.walletAddress && namecard.walletAddress.startsWith('0x'))
        })

        // 如果有绑定钱包地址，自动加载链上数据
        if (namecard.walletAddress && namecard.walletAddress.startsWith('0x')) {
          this.loadOnChainProfile(namecard.walletAddress)
        }
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

  async loadOnChainProfile(walletAddress) {
    this.setData({ isLoadingOnChain: true })

    try {
      // 优先从 Base Sepolia 读取（Gas 最低）
      const chainId = 84532
      const ipfsHash = await web3.getLatestProfile(walletAddress, chainId)

      if (ipfsHash) {
        const content = await web3.fetchFromIPFS(ipfsHash)
        this.setData({
          onChainProfile: {
            ipfsHash,
            content,
            chainId,
            loaded: true
          }
        })
      } else {
        this.setData({
          onChainProfile: {
            loaded: true,
            empty: true
          }
        })
      }
    } catch (error) {
      console.error('Load on-chain profile failed:', error)
      this.setData({
        onChainProfile: {
          loaded: true,
          error: true
        }
      })
    } finally {
      this.setData({ isLoadingOnChain: false })
    }
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
  },

  handleOpenOnChainDetail() {
    const { onChainProfile } = this.data
    if (!onChainProfile || !onChainProfile.ipfsHash) return

    wx.showModal({
      title: '链上名片详情',
      content: `IPFS: ${onChainProfile.ipfsHash}\n网络: Base Sepolia`,
      showCancel: false
    })
  },

  handleBindWallet() {
    wx.showModal({
      title: '绑定钱包地址',
      content: '请在 Web 端完成钱包绑定，小程序端暂不支持直接操作钱包。',
      confirmText: '知道了',
      showCancel: false
    })
  }
})
