import { detectBrowser } from '../../../web/src/lib/compatibility/browser';

// 抖音/头条小程序 SDK 适配
// 国内平台审核严格，区块链相关内容需要特殊处理
// 策略：国内版本使用中心化云存储，链上功能作为"可选扩展"

declare global {
  interface Window {
    tt?: {
      login: (options: {
        force?: boolean;
        success?: (res: { code: string; anonymousCode?: string; isLogin?: boolean }) => void;
        fail?: (res: { errMsg: string }) => void;
        complete?: () => void;
      }) => void;
      getUserInfo: (options: {
        withCredentials?: boolean;
        success?: (res: {
          userInfo: {
            avatarUrl: string;
            city: string;
            country: string;
            gender: number;
            language: string;
            nickName: string;
            province: string;
          };
          encryptedData?: string;
          iv?: string;
        }) => void;
        fail?: (res: { errMsg: string }) => void;
      }) => void;
      request: (options: {
        url: string;
        method?: string;
        data?: unknown;
        header?: Record<string, string>;
        success?: (res: { data: unknown; statusCode: number }) => void;
        fail?: (res: { errMsg: string }) => void;
      }) => void;
      showToast: (options: { title: string; icon?: string; duration?: number }) => void;
      navigateTo: (options: { url: string }) => void;
      navigateBack: (options?: { delta?: number }) => void;
      setStorageSync: (key: string, data: unknown) => void;
      getStorageSync: (key: string) => unknown;
      getSystemInfoSync: () => {
        platform: string;
        brand: string;
        model: string;
        screenWidth: number;
        screenHeight: number;
        windowWidth: number;
        windowHeight: number;
        statusBarHeight: number;
        pixelRatio: number;
      };
    };
  }
}

export {};

export function isDouyinMiniApp(): boolean {
  return detectBrowser().imBrowser === 'douyin' || typeof window !== 'undefined' && !!window.tt;
}

export function initDouyinApp() {
  if (!window.tt) return null;

  // 抖音小程序需要上报用户行为数据
  const sysInfo = window.tt.getSystemInfoSync();
  console.log('Douyin environment:', sysInfo.platform, sysInfo.model);

  return window.tt;
}

/**
 * 国内版本数据存储策略：
 * - 用户数据存储在自有服务器（避免敏感词审核）
 * - 区块链相关内容用"数字藏品"、"数字身份"等合规词汇替代
 * - 钱包地址展示为"数字ID"
 */
export function getDomesticComplianceText(original: string): string {
  const mappings: Record<string, string> = {
    '区块链': '分布式账本',
    'Blockchain': '分布式账本',
    'Web3': '下一代互联网',
    '钱包': '数字账户',
    'Wallet': '数字账户',
    '上链': '存证',
    'On-chain': '存证',
    '去中心化': '分布式',
    'Decentralized': '分布式',
    'Token': '数字凭证',
    'NFT': '数字藏品',
    '加密货币': '数字货币',
    'Crypto': '数字',
    '智能合约': '自动合约',
    'Smart Contract': '自动合约',
    '挖矿': '节点验证',
    'Mining': '节点验证',
  };

  let result = original;
  for (const [key, value] of Object.entries(mappings)) {
    result = result.replace(new RegExp(key, 'gi'), value);
  }
  return result;
}

export async function douyinLogin(): Promise<{ code: string; isLogin?: boolean } | null> {
  return new Promise((resolve) => {
    if (!window.tt) {
      resolve(null);
      return;
    }
    window.tt.login({
      force: true,
      success: (res) => resolve({ code: res.code, isLogin: res.isLogin }),
      fail: () => resolve(null),
    });
  });
}

export async function getDouyinUserInfo(): Promise<{
  nickName: string;
  avatarUrl: string;
  gender: number;
} | null> {
  return new Promise((resolve) => {
    if (!window.tt) {
      resolve(null);
      return;
    }
    window.tt.getUserInfo({
      withCredentials: false,
      success: (res) => resolve(res.userInfo),
      fail: () => resolve(null),
    });
  });
}

export function saveDouyinStorage(key: string, data: unknown): void {
  window.tt?.setStorageSync(key, data);
}

export function getDouyinStorage<T>(key: string, fallback: T): T {
  try {
    const data = window.tt?.getStorageSync(key);
    return data as T ?? fallback;
  } catch {
    return fallback;
  }
}
