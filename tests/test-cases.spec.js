const { test, expect } = require('@playwright/test');

test.describe('Test Cases page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-cases.html');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText(/Test Cases/i);
  });

  test('shows test case cards', async ({ page }) => {
    const cards = page.locator('.tc-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test('each card has ID, title, description, steps, and expected result', async ({ page }) => {
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.tc-id')).not.toBeEmpty();
      await expect(card.locator('.tc-title')).not.toBeEmpty();
      await expect(card.locator('.tc-desc')).not.toBeEmpty();
      await expect(card.locator('.tc-section ol')).toBeVisible();
      await expect(card.locator('.tc-expected')).not.toBeEmpty();
    }
  });

  test('each card shows status badge', async ({ page }) => {
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.badge')).toBeVisible();
    }
  });

  test('each card has suite and priority metadata', async ({ page }) => {
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.tc-meta')).toBeVisible();
    }
  });

  test('filter bar has search input and three filter selects', async ({ page }) => {
    await expect(page.locator('#search-input')).toBeVisible();
    await expect(page.locator('#status-filter')).toBeVisible();
    await expect(page.locator('#priority-filter')).toBeVisible();
    await expect(page.locator('#suite-filter')).toBeVisible();
  });

  test('search filters cards by title', async ({ page }) => {
    await page.locator('#search-input').fill('login');
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.tc-title')).toContainText(/login/i);
    }
  });

  test('search filters cards by ID', async ({ page }) => {
    await page.locator('#search-input').fill('TC-001');
    const cards = page.locator('.tc-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.locator('.tc-id')).toContainText('TC-001');
  });

  test('status filter shows only matching cards', async ({ page }) => {
    await page.locator('#status-filter').selectOption('failed');
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.badge')).toHaveClass(/failed/);
    }
  });

  test('priority filter shows only matching cards', async ({ page }) => {
    await page.locator('#priority-filter').selectOption('critical');
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.tc-meta')).toContainText(/critical/i);
    }
  });

  test('suite filter shows only matching cards', async ({ page }) => {
    await page.locator('#suite-filter').selectOption('Auth');
    const cards = page.locator('.tc-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.tc-meta')).toContainText(/Auth/);
    }
  });

  test('empty state shown when no match', async ({ page }) => {
    await page.locator('#search-input').fill('ZZZZNOMATCH');
    await expect(page.locator('.tc-grid p')).toContainText(/No test cases match/i);
  });

  test('reset filters shows all cards', async ({ page }) => {
    await page.locator('#status-filter').selectOption('failed');
    await page.locator('#status-filter').selectOption('all');
    const allCards = page.locator('.tc-card');
    expect(await allCards.count()).toBe(12);
  });
});
