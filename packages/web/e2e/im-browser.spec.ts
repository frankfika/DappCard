import { test, expect } from '@playwright/test';

const IM_USER_AGENTS = [
  {
    name: 'WeChat',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2c) NetType/WIFI Language/zh_CN',
    expectedTip: '微信内置浏览器限制',
  },
  {
    name: 'Telegram',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 TelegramWebview',
    expectedTip: 'Telegram WebView 限制',
  },
  {
    name: 'Discord',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Discord',
    expectedTip: 'Discord 内置浏览器限制',
  },
  {
    name: 'LINE',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Line',
    expectedTip: 'LINE 内置浏览器限制',
  },
  {
    name: 'Twitter',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter',
    expectedTip: 'Twitter/X 内置浏览器限制',
  },
];

test.describe('IM Browser Detection', () => {
  for (const im of IM_USER_AGENTS) {
    test(`shows notice in ${im.name} browser`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.setExtraHTTPHeaders({});
      await page.goto('http://localhost:3000', {
        waitUntil: 'networkidle',
      });
      await page.evaluate((ua) => {
        Object.defineProperty(navigator, 'userAgent', {
          value: ua,
          configurable: true,
        });
      }, im.ua);
      await page.reload();
      await expect(page.locator(`text=${im.expectedTip}`)).toBeVisible();
    });
  }
});
