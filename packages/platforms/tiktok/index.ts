import { detectBrowser } from '../../../web/src/lib/compatibility/browser';

// TikTok Mini App / WebView SDK 适配
// 海外版本可以完整使用区块链功能

declare global {
  interface Window {
    TikTokSDK?: {
      init: (config: { appId: string; env?: 'production' | 'sandbox' }) => Promise<void>;
      login: () => Promise<{ accessToken: string; openId: string }>;
      getUserInfo: () => Promise<{
        openId: string;
        unionId: string;
        avatarUrl: string;
        displayName: string;
      }>;
      share: (options: {
        title?: string;
        desc?: string;
        url?: string;
        imageUrl?: string;
      }) => Promise<void>;
      trackEvent: (eventName: string, params?: Record<string, unknown>) => void;
    };
    tt?: {
      shareToApp: (options: {
        channel: string;
        title?: string;
        desc?: string;
        imageUrl?: string;
        url?: string;
      }) => Promise<{ channel: string }>;
      request: (options: {
        url: string;
        method?: string;
        data?: unknown;
        header?: Record<string, string>;
      }) => Promise<{ data: unknown; statusCode: number }>;
    };
  }
}

export {};

export function isTikTokBrowser(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return /tiktok|musical/i.test(ua) || detectBrowser().imBrowser === 'tiktok';
}

export function isTikTokMiniApp(): boolean {
  return !!window.TikTokSDK || isTikTokBrowser();
}

export async function initTikTokSDK(appId: string): Promise<boolean> {
  if (!window.TikTokSDK) return false;
  try {
    await window.TikTokSDK.init({ appId, env: 'production' });
    return true;
  } catch (error) {
    console.error('TikTok SDK init failed:', error);
    return false;
  }
}

export async function tikTokLogin(): Promise<{ accessToken: string; openId: string } | null> {
  if (!window.TikTokSDK) return null;
  try {
    return await window.TikTokSDK.login();
  } catch {
    return null;
  }
}

export async function getTikTokUserInfo(): Promise<{
  openId: string;
  unionId: string;
  avatarUrl: string;
  displayName: string;
} | null> {
  if (!window.TikTokSDK) return null;
  try {
    return await window.TikTokSDK.getUserInfo();
  } catch {
    return null;
  }
}

export async function shareToTikTok(options: {
  title?: string;
  desc?: string;
  url?: string;
  imageUrl?: string;
}): Promise<void> {
  if (window.TikTokSDK) {
    await window.TikTokSDK.share(options);
    return;
  }
  if (window.tt?.shareToApp) {
    await window.tt.shareToApp({
      channel: 'tiktok',
      ...options,
    });
    return;
  }
  // Fallback: copy link
  if (options.url) {
    await navigator.clipboard.writeText(options.url);
  }
}

export function trackTikTokEvent(eventName: string, params?: Record<string, unknown>) {
  window.TikTokSDK?.trackEvent(eventName, params);
}
