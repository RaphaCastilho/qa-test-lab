const { test, expect } = require('@playwright/test');

test.describe('Bug Reports page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bug-reports.html');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText(/Bug Reports/i);
  });

  test('shows bug report cards', async ({ page }) => {
    const cards = page.locator('.br-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test('each card has ID, title, description, and environment', async ({ page }) => {
    const cards = page.locator('.br-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.br-id')).not.toBeEmpty();
      await expect(card.locator('.br-title')).not.toBeEmpty();
      await expect(card.locator('.br-desc')).not.toBeEmpty();
      await expect(card.locator('.br-env')).not.toBeEmpty();
    }
  });

  test('each card shows severity badge', async ({ page }) => {
    const cards = page.locator('.br-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.br-severity')).toBeVisible();
    }
  });

  test('each card has steps to reproduce, actual result, and expected result', async ({ page }) => {
    const cards = page.locator('.br-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.br-section ol')).toBeVisible();
      await expect(card.locator('.br-label-actual')).toBeVisible();
      await expect(card.locator('.br-label-expected')).toBeVisible();
    }
  });

  test('each card has suite metadata', async ({ page }) => {
    const cards = page.locator('.br-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.br-meta')).toBeVisible();
    }
  });

  test('filter bar has search input and two filter selects', async ({ page }) => {
    await expect(page.locator('#search-input')).toBeVisible();
    await expect(page.locator('#severity-filter')).toBeVisible();
    await expect(page.locator('#suite-filter')).toBeVisible();
  });

  test('search filters cards by title', async ({ page }) => {
    await page.locator('#search-input').fill('cart');
    const cards = page.locator('.br-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.br-title')).toContainText(/cart/i);
    }
  });

  test('severity filter shows only matching cards', async ({ page }) => {
    await page.locator('#severity-filter').selectOption('critical');
    const cards = page.locator('.br-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.br-severity')).toContainText(/critical/i);
    }
  });

  test('suite filter shows only matching cards', async ({ page }) => {
    await page.locator('#suite-filter').selectOption('Catalog');
    const cards = page.locator('.br-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.br-meta')).toContainText(/Catalog/);
    }
  });

  test('empty state shown when no match', async ({ page }) => {
    await page.locator('#search-input').fill('ZZZZNOMATCH');
    await expect(page.locator('.br-grid p')).toContainText(/No bug reports match/i);
  });

  test('reset filters shows all cards', async ({ page }) => {
    await page.locator('#severity-filter').selectOption('critical');
    await page.locator('#severity-filter').selectOption('all');
    const allCards = page.locator('.br-card');
    expect(await allCards.count()).toBe(10);
  });
});
