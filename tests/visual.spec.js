const { test, expect } = require('@playwright/test');

test.describe('Visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('dashboard matches screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('dashboard.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('scenarios page matches screenshot', async ({ page }) => {
    await page.goto('/scenarios.html');
    await expect(page).toHaveScreenshot('scenarios.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('history page matches screenshot', async ({ page }) => {
    await page.goto('/history.html');
    await expect(page).toHaveScreenshot('history.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('endpoints page matches screenshot', async ({ page }) => {
    await page.goto('/endpoints.html');
    await expect(page).toHaveScreenshot('endpoints.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('navbar is consistent across pages', async ({ page }) => {
    await expect(page.locator('.navbar')).toHaveScreenshot('navbar.png');
  });
});
