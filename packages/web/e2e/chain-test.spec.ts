import { test, expect } from '@playwright/test';

test.describe('Blockchain integration', () => {
  test('wallet connect button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const walletBtn = page.locator('button:has-text("Connect")');
    await expect(walletBtn.first()).toBeVisible();
  });

  test('chain selector shows supported networks', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const connectBtn = page.locator('button:has-text("Connect")').first();
    await connectBtn.click();
    await expect(page.locator('text=Ethereum Sepolia')).toBeVisible();
    await expect(page.locator('text=Base Sepolia')).toBeVisible();
    await expect(page.locator('text=Arbitrum Sepolia')).toBeVisible();
    await expect(page.locator('text=Polygon Amoy')).toBeVisible();
  });
});
