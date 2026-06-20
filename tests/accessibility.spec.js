const { test, expect } = require('@playwright/test');

test.describe('Accessibility checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has a lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('nav links are keyboard accessible', async ({ page }) => {
    const links = page.locator('.navbar-links a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('href');
    }
  });

  test('images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('search input has accessible label', async ({ page }) => {
    await page.goto('/scenarios.html');
    const input = page.locator('#search-input');
    await expect(input).toHaveAttribute('aria-label', /search/i);
  });

  test('filter selects have accessible labels', async ({ page }) => {
    await page.goto('/scenarios.html');
    const selects = page.locator('.filter-select');
    const count = await selects.count();
    for (let i = 0; i < count; i++) {
      await expect(selects.nth(i)).toHaveAttribute('aria-label');
    }
  });

  test('headings follow logical hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2 = page.locator('h2');
    expect(await h2.count()).toBeGreaterThanOrEqual(1);
  });
});
