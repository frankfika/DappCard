export type IMBrowser = 'wechat' | 'telegram' | 'discord' | 'line' | 'twitter' | 'douyin' | 'tiktok' | 'none';

export interface BrowserEnv {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isIMBrowser: boolean;
  imBrowser: IMBrowser;
  hasEthereum: boolean;
  isInAppWebView: boolean;
  userAgent: string;
}

export function detectBrowser(): BrowserEnv {
  const ua = navigator.userAgent.toLowerCase();

  const isWechat = /micromessenger/i.test(ua);
  const isTelegram = /telegramwebview|telegram/i.test(ua);
  const isDiscord = /discord/i.test(ua);
  const isLine = /line/i.test(ua);
  const isTwitter = /twitter|xapp/i.test(ua);
  const isDouyin = /aweme|douyin|bytedance/i.test(ua);
  const isTikTok = /tiktok|musical/i.test(ua);
  const isIMBrowser = isWechat || isTelegram || isDiscord || isLine || isTwitter || isDouyin || isTikTok;

  let imBrowser: IMBrowser = 'none';
  if (isWechat) imBrowser = 'wechat';
  else if (isTelegram) imBrowser = 'telegram';
  else if (isDiscord) imBrowser = 'discord';
  else if (isLine) imBrowser = 'line';
  else if (isTwitter) imBrowser = 'twitter';
  else if (isDouyin) imBrowser = 'douyin';
  else if (isTikTok) imBrowser = 'tiktok';

  return {
    isMobile: /mobile|android|iphone|ipad|ipod/i.test(ua),
    isIOS: /iphone|ipad|ipod/i.test(ua),
    isAndroid: /android/i.test(ua),
    isIMBrowser,
    imBrowser,
    hasEthereum: typeof window !== 'undefined' && !!window.ethereum,
    isInAppWebView: isIMBrowser || /webview|wv\)/i.test(ua),
    userAgent: ua,
  };
}

export function getIMBrowserName(imBrowser: IMBrowser): string {
  const names: Record<IMBrowser, string> = {
    wechat: '微信',
    telegram: 'Telegram',
    discord: 'Discord',
    line: 'LINE',
    twitter: 'Twitter/X',
    douyin: '抖音',
    tiktok: 'TikTok',
    none: '浏览器',
  };
  return names[imBrowser];
}

export function shouldShowExternalBrowserTip(env: BrowserEnv): boolean {
  return env.isIMBrowser && !env.hasEthereum;
}

export function getWalletConnectDeepLink(env: BrowserEnv): string | null {
  if (!env.isIMBrowser) return null;

  const currentUrl = encodeURIComponent(window.location.href);

  switch (env.imBrowser) {
    case 'telegram':
      return `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
    case 'wechat':
      return null;
    default:
      return `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
  }
}

export function copyCurrentUrl(): Promise<void> {
  return navigator.clipboard.writeText(window.location.href);
}
