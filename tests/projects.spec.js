const { test, expect } = require('@playwright/test');

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects.html');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText(/Related Projects/i);
  });

  test('shows project showcase header with title', async ({ page }) => {
    await expect(page.locator('.showcase-header h2')).toContainText(/Playwright \+ ServeRest/i);
  });

  test('displays technology tags', async ({ page }) => {
    const tags = page.locator('.showcase-tags span');
    expect(await tags.count()).toBeGreaterThanOrEqual(5);
  });

  test('shows four stat cards', async ({ page }) => {
    const cards = page.locator('.stat-card');
    expect(await cards.count()).toBe(4);
  });

  test('stat cards have value and label', async ({ page }) => {
    const cards = page.locator('.stat-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.stat-value')).not.toBeEmpty();
      await expect(card.locator('.stat-label')).not.toBeEmpty();
    }
  });

  test('shows architecture highlights', async ({ page }) => {
    const items = page.locator('.showcase-item');
    expect(await items.count()).toBe(4);
  });

  test('shows k6 load profiles', async ({ page }) => {
    const profiles = page.locator('.profile-card');
    expect(await profiles.count()).toBe(3);
  });

  test('shows pipeline visualization', async ({ page }) => {
    const steps = page.locator('.pipeline-step');
    expect(await steps.count()).toBe(5);
  });

  test('has GitHub link button', async ({ page }) => {
    const btn = page.locator('.showcase-cta a');
    await expect(btn).toBeVisible();
    const href = await btn.getAttribute('href');
    expect(href).toContain('github.com/RaphaCastilho/playwright-serverest');
  });
});
