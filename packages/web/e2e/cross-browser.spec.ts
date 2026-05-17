import { test, expect } from '@playwright/test';

test.describe('Cross-browser compatibility', () => {
  test('renders correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000');
    await expect(page.locator('text=名片')).toBeVisible();
    await expect(page.locator('text=互动')).toBeVisible();
    await expect(page.locator('text=发现')).toBeVisible();
  });

  test('renders correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await expect(page.locator('text=名片')).toBeVisible();
  });

  test('tab switching works', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=互动');
    await expect(page.locator('text=互动卡片')).toBeVisible();
    await page.click('text=发现');
    await expect(page.locator('text=发现搭子')).toBeVisible();
  });
});
