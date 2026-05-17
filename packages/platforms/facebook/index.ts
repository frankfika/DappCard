import { detectBrowser } from '../../../web/src/lib/compatibility/browser';

// Facebook Instant Games / Mini App SDK wrapper
// Reference: https://developers.facebook.com/docs/games/instant-games

declare global {
  interface Window {
    FBInstant?: {
      initializeAsync: () => Promise<void>;
      setLoadingProgress: (progress: number) => void;
      startGameAsync: () => Promise<void>;
      getEntryPointData: () => Record<string, unknown>;
      getEntryPointAsync: () => Promise<string>;
      getPlatform: () => string;
      getLocale: () => string;
      getSDKVersion: () => string;
      getSupportedAPIs: () => string[];
      shareAsync: (payload: {
        intent?: string;
        image?: string;
        text?: string;
        data?: Record<string, unknown>;
        playerID?: string;
        cta?: string;
      }) => Promise<void>;
      updateAsync: (payload: {
        action: string;
        template?: string;
        cta?: string;
        image?: string;
        text?: string;
        strategy?: string;
        notification?: string;
        data?: Record<string, unknown>;
      }) => Promise<void>;
      quit: () => void;
      logEvent: (eventName: string, valueToSum?: number, parameters?: Record<string, unknown>) => void;
      onPause: (callback: () => void) => void;
      getInterstitialAdAsync: (placementID: string) => Promise<FBAdInstance>;
      getRewardedVideoAsync: (placementID: string) => Promise<FBAdInstance>;
      getLeaderboardAsync: (name: string) => Promise<FBLeaderboard>;
      player: {
        getID: () => string;
        getSignedPlayerInfoAsync: (payload?: string) => Promise<{ getSignature: () => string; getPlayerID: () => string }>;
        getName: () => string;
        getPhoto: () => string;
        getDataAsync: (keys: string[]) => Promise<Record<string, unknown>>;
        setDataAsync: (data: Record<string, unknown>) => Promise<void>;
        flushDataAsync: () => Promise<void>;
        getConnectedPlayersAsync: () => Promise<Array<{ getID: () => string; getName: () => string; getPhoto: () => string }>>;
        canSubscribeBotAsync: () => Promise<boolean>;
        subscribeBotAsync: () => Promise<void>;
      };
      context: {
        getID: () => string;
        getType: () => string;
        isSizeBetween: (minSize: number, maxSize: number) => { answer: boolean; minSize: number; maxSize: number } | null;
        switchAsync: (id?: string) => Promise<void>;
        chooseAsync: (options?: { filters?: string[]; minSize?: number; maxSize?: number }) => Promise<void>;
        createAsync: (playerID: string) => Promise<void>;
        getPlayersAsync: () => Promise<Array<{ getID: () => string; getName: () => string; getPhoto: () => string }>>;
      };
      payments: {
        onReady: (callback: () => void) => void;
        getCatalogAsync: () => Promise<Array<{ title: string; productID: string; description: string; imageURI: string; price: string; priceAmount: number; currency: string }>>;
        purchaseAsync: (config: { productID: string; developerPayload?: string }) => Promise<{ productID: string; purchaseToken: string; developerPayload?: string; signedRequest: string }>;
        getPurchasesAsync: () => Promise<Array<{ productID: string; purchaseToken: string; developerPayload?: string; signedRequest: string }>>;
        consumePurchaseAsync: (purchaseToken: string) => Promise<void>;
        setPendingPurchase: (productID: string) => void;
      };
    };
  }
}

interface FBAdInstance {
  getPlacementID: () => string;
  loadAsync: () => Promise<void>;
  showAsync: () => Promise<void>;
}

interface FBLeaderboard {
  getName: () => string;
  getContextID: () => string;
  getEntryCountAsync: () => Promise<number>;
  setScoreAsync: (score: number, extraData?: string) => Promise<FBLeaderboardEntry>;
  getPlayerEntryAsync: () => Promise<FBLeaderboardEntry>;
  getEntriesAsync: () => Promise<FBLeaderboardEntry[]>;
  getConnectedPlayerEntriesAsync: () => Promise<FBLeaderboardEntry[]>;
}

interface FBLeaderboardEntry {
  getRank: () => number;
  getScore: () => number;
  getExtraData: () => string;
  getPlayer: () => { getID: () => string; getName: () => string; getPhoto: () => string };
  getTimestamp: () => number;
}

export {};

let fbInitialized = false;

export async function initFacebookInstant(): Promise<boolean> {
  const env = detectBrowser();
  if (!window.FBInstant) return false;

  try {
    await window.FBInstant.initializeAsync();
    window.FBInstant.setLoadingProgress(100);
    await window.FBInstant.startGameAsync();
    fbInitialized = true;
    return true;
  } catch (error) {
    console.error('Facebook Instant Games init failed:', error);
    return false;
  }
}

export function isFacebookInstant(): boolean {
  return !!window.FBInstant && fbInitialized;
}

export function getFacebookPlayer() {
  if (!window.FBInstant) return null;
  return {
    id: window.FBInstant.player.getID(),
    name: window.FBInstant.player.getName(),
    photo: window.FBInstant.player.getPhoto(),
  };
}

export async function saveToFacebookCloud(data: Record<string, unknown>): Promise<void> {
  if (!window.FBInstant) return;
  await window.FBInstant.player.setDataAsync(data);
  await window.FBInstant.player.flushDataAsync();
}

export async function loadFromFacebookCloud(keys: string[]): Promise<Record<string, unknown>> {
  if (!window.FBInstant) return {};
  return await window.FBInstant.player.getDataAsync(keys);
}

export function shareOnFacebook(payload: {
  image?: string;
  text?: string;
  data?: Record<string, unknown>;
}): Promise<void> {
  if (!window.FBInstant) return Promise.resolve();
  return window.FBInstant.shareAsync({
    intent: 'SHARE',
    ...payload,
  });
}

export function facebookLogEvent(eventName: string, valueToSum?: number, parameters?: Record<string, unknown>) {
  window.FBInstant?.logEvent(eventName, valueToSum, parameters);
}
