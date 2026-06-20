const { test, expect } = require('@playwright/test');

test.describe('Dashboard content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays 4 metric cards', async ({ page }) => {
    const cards = page.locator('.metric-card');
    await expect(cards).toHaveCount(4);
  });

  test('metric cards have label, value, and sub text', async ({ page }) => {
    const cards = page.locator('.metric-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.metric-label')).not.toBeEmpty();
      await expect(card.locator('.metric-value')).not.toBeEmpty();
      await expect(card.locator('.metric-sub')).not.toBeEmpty();
    }
  });

  test('displays recent test runs table', async ({ page }) => {
    await expect(page.locator('h2')).toContainText(/Recent Test Runs/i);
    const rows = page.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });

  test('table headers are correct', async ({ page }) => {
    const headers = page.locator('thead th');
    const texts = await headers.evaluateAll(h => h.map(el => el.textContent.trim()));
    expect(texts).toEqual(expect.arrayContaining(['Run', 'Date', 'Status', 'Passed', 'Failed', 'Duration']));
  });
});

test.describe('Scenarios page content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scenarios.html');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText(/Test Scenarios/i);
  });

  test('shows scenario cards', async ({ page }) => {
    const cards = page.locator('.scenario-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test('each scenario card has title, description, and meta', async ({ page }) => {
    const cards = page.locator('.scenario-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('h3')).not.toBeEmpty();
    }
  });
});

test.describe('History page content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/history.html');
  });

  test('displays execution history table', async ({ page }) => {
    const rows = page.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Endpoints page content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/endpoints.html');
  });

  test('displays endpoint list', async ({ page }) => {
    const items = page.locator('.endpoint-item');
    expect(await items.count()).toBeGreaterThanOrEqual(1);
  });

  test('endpoints show method, path, and status', async ({ page }) => {
    const items = page.locator('.endpoint-item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await expect(item.locator('.endpoint-method')).toBeVisible();
      await expect(item.locator('.endpoint-path')).toBeVisible();
    }
  });
});
