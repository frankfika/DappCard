#!/usr/bin/env node
/**
 * Screenshot capture script for DappCard
 * Generates screenshots for README from the real running app
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const assetsDir = join(rootDir, 'docs', 'assets');

const VIEWPORT = { width: 1280, height: 900 };

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshot(page, name, options = {}) {
  const path = join(assetsDir, `${name}.png`);
  const { wait = 1000, fullPage = false } = options;

  await sleep(wait);
  await page.screenshot({ path, type: 'png', fullPage });

  console.log(`📸 Screenshot saved: ${path}`);
  return path;
}

async function captureScreenshots() {
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const BASE_URL = 'http://localhost:3000';

  try {
    // 1. Card tab - onboarding flow
    console.log('\n📷 Capturing card tab (onboarding)...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await captureScreenshot(page, 'card-onboarding', { wait: 1500 });

    // Fill onboarding and complete profile
    console.log('🔐 Completing onboarding...');
    await page.fill('input[placeholder="Your name"]', 'Alex Chen');
    await page.fill('textarea[placeholder="What brings you here?"]', 'Building cool stuff with AI');
    await page.click('button:has-text("Next")');
    await sleep(500);
    await page.click('button:has-text("Next")');
    await sleep(500);
    await page.click('button:has-text("Create Card")');
    await sleep(800);

    console.log('📷 Capturing card tab (profile)...');
    await captureScreenshot(page, 'card-profile', { wait: 1000 });

    // 2. Games tab
    console.log('\n📷 Capturing games tab...');
    await page.click('button:has-text("互动")');
    await sleep(500);
    await captureScreenshot(page, 'games', { wait: 1000 });

    // Draw a card
    console.log('🎲 Drawing a card...');
    await page.click('button:has-text("抽一张")');
    await sleep(800);
    await captureScreenshot(page, 'games-card', { wait: 1000 });

    // 3. Discover tab
    console.log('\n📷 Capturing discover tab...');
    await page.click('button:has-text("发现")');
    await sleep(500);
    await captureScreenshot(page, 'discover-empty', { wait: 1000 });

    // Create an activity
    console.log('➕ Creating activity...');
    await page.click('button:has-text("+")');
    await sleep(500);
    await captureScreenshot(page, 'discover-create', { wait: 1000 });

    console.log('\n✨ All screenshots generated!');
    console.log(`📁 Location: ${assetsDir}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots().catch(console.error);
