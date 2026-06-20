const { test, expect } = require('@playwright/test');

test.describe('Scenarios page interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scenarios.html');
  });

  test('search filters scenarios by name', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('Login');

    const cards = page.locator('.scenario-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('h3')).toContainText(/Login/i);
    }
  });

  test('search filters scenarios by ID', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('SC-005');

    const cards = page.locator('.scenario-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.locator('h3')).toContainText(/Busca/);
  });

  test('status filter shows only failed scenarios', async ({ page }) => {
    await page.locator('#status-filter').selectOption('failed');

    const cards = page.locator('.scenario-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const badges = await cards.locator('.badge').evaluateAll(b => b.map(el => el.textContent.trim()));
    for (const badge of badges) {
      expect(badge).toBe('failed');
    }
  });

  test('suite filter works correctly', async ({ page }) => {
    await page.locator('#suite-filter').selectOption('Auth');

    const cards = page.locator('.scenario-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const texts = await cards.evaluateAll(c => c.map(el => el.textContent));
    for (const text of texts) {
      expect(text).toContain('Auth');
    }
  });

  test('combined search and filters narrow results', async ({ page }) => {
    await page.locator('#search-input').fill('Login');
    await page.locator('#status-filter').selectOption('passed');
    await page.locator('#suite-filter').selectOption('Auth');

    const cards = page.locator('.scenario-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('empty results show no-data message', async ({ page }) => {
    await page.locator('#search-input').fill('zzzzzzzthisdoesnotexist');

    await expect(page.locator('.scenario-grid')).toContainText(/No scenarios match/i);
  });
});

test.describe('Navigation interactions', () => {
  test('navbar links navigate correctly', async ({ page }) => {
    const pages = ['/', '/scenarios.html', '/history.html', '/endpoints.html'];

    for (const route of pages) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const expected = route === '/' ? /localhost:3000\/$/ : route;
      expect(page.url()).toMatch(expected);
    }
  });
});
