import { type IMBrowser } from './browser';

export interface IMAdapter {
  name: string;
  icon: string;
  tipTitle: string;
  tipMessage: string;
  actionLabel: string;
  supportsWalletConnect: boolean;
  supportsDeepLink: boolean;
}

const adapters: Record<IMBrowser, IMAdapter> = {
  wechat: {
    name: '微信',
    icon: 'MessageCircle',
    tipTitle: '微信内置浏览器限制',
    tipMessage:
      '微信内置浏览器不支持直接连接加密钱包。点击右上角"···"，选择"在浏览器打开"以获得完整体验。',
    actionLabel: '复制链接',
    supportsWalletConnect: false,
    supportsDeepLink: false,
  },
  telegram: {
    name: 'Telegram',
    icon: 'Send',
    tipTitle: 'Telegram WebView 限制',
    tipMessage:
      'Telegram 内置浏览器无法直接连接 MetaMask。你可以使用 WalletConnect 二维码，或在系统浏览器中打开。',
    actionLabel: '在外部浏览器打开',
    supportsWalletConnect: true,
    supportsDeepLink: true,
  },
  discord: {
    name: 'Discord',
    icon: 'Gamepad2',
    tipTitle: 'Discord 内置浏览器限制',
    tipMessage:
      'Discord 内置浏览器不支持钱包插件。请复制链接到 Chrome/Safari 中打开以连接钱包。',
    actionLabel: '复制链接',
    supportsWalletConnect: false,
    supportsDeepLink: false,
  },
  line: {
    name: 'LINE',
    icon: 'MessageSquare',
    tipTitle: 'LINE 内置浏览器限制',
    tipMessage:
      'LINE 内置浏览器不支持加密钱包连接。请在外部浏览器中打开此页面。',
    actionLabel: '复制链接',
    supportsWalletConnect: false,
    supportsDeepLink: false,
  },
  twitter: {
    name: 'Twitter/X',
    icon: 'Twitter',
    tipTitle: 'Twitter/X 内置浏览器限制',
    tipMessage:
      'Twitter 内置浏览器无法连接钱包。请在 Chrome/Safari 中打开以使用完整功能。',
    actionLabel: '复制链接',
    supportsWalletConnect: false,
    supportsDeepLink: false,
  },
  douyin: {
    name: '抖音',
    icon: 'Music',
    tipTitle: '抖音内置浏览器限制',
    tipMessage:
      '抖音内置浏览器不支持加密钱包连接。国内版本使用中心化云存储，链上功能请在海外版或外部浏览器中体验。',
    actionLabel: '复制链接',
    supportsWalletConnect: false,
    supportsDeepLink: false,
  },
  tiktok: {
    name: 'TikTok',
    icon: 'Music',
    tipTitle: 'TikTok WebView 限制',
    tipMessage:
      'TikTok 内置浏览器无法直接连接钱包。请在外部浏览器中打开以使用完整的区块链功能。',
    actionLabel: '在外部浏览器打开',
    supportsWalletConnect: true,
    supportsDeepLink: true,
  },
  none: {
    name: '浏览器',
    icon: 'Globe',
    tipTitle: '',
    tipMessage: '',
    actionLabel: '',
    supportsWalletConnect: true,
    supportsDeepLink: true,
  },
};

export function getIMAdapter(imBrowser: IMBrowser): IMAdapter {
  return adapters[imBrowser];
}
