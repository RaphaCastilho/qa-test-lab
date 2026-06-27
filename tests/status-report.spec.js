const { test, expect } = require('@playwright/test');

test.describe('Status Report page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/status-report.html');
  });

  test('displays page header with period', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText(/Status Report/i);
    await expect(page.locator('#report-period')).not.toBeEmpty();
  });

  test('shows readiness gauge with score', async ({ page }) => {
    await expect(page.locator('.sr-gauge')).toBeVisible();
    const label = page.locator('#sr-gauge-label');
    await expect(label).not.toBeEmpty();
    const score = parseInt(await label.textContent());
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test('shows readiness status label', async ({ page }) => {
    const status = page.locator('#sr-readiness-status');
    await expect(status).toBeVisible();
    const text = await status.textContent();
    expect(['Ready', 'At Risk', 'Blocked']).toContain(text);
  });

  test('displays four summary metric cards', async ({ page }) => {
    const cards = page.locator('#sr-summary .metric-card');
    expect(await cards.count()).toBe(4);
    await expect(cards.filter({ hasText: 'Total Tests' }).locator('.metric-value')).toHaveText('102');
  });

  test('shows bug breakdown bars', async ({ page }) => {
    const bars = page.locator('.sr-bar-row');
    expect(await bars.count()).toBe(4);
    const labels = await bars.locator('.sr-bar-label').evaluateAll(el => el.map(e => e.textContent));
    expect(labels).toEqual(['critical', 'high', 'medium', 'low']);
  });

  test('shows stacked test execution bar', async ({ page }) => {
    await expect(page.locator('.sr-stacked-bar')).toBeVisible();
    await expect(page.locator('.sr-stacked-legend')).toBeVisible();
  });

  test('displays risk register table', async ({ page }) => {
    const rows = page.locator('#sr-risk-table tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
    const headers = page.locator('.section-card table thead th');
    const texts = await headers.evaluateAll(h => h.map(el => el.textContent.trim()));
    expect(texts).toEqual(expect.arrayContaining(['ID', 'Description', 'Likelihood', 'Impact', 'Status', 'Owner']));
  });

  test('each risk row has ID, status, and owner', async ({ page }) => {
    const rows = page.locator('#sr-risk-table tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      await expect(row.locator('td').nth(0)).not.toBeEmpty();
      await expect(row.locator('td').nth(4)).not.toBeEmpty();
      await expect(row.locator('td').nth(5)).not.toBeEmpty();
    }
  });

  test('displays recent activity timeline', async ({ page }) => {
    const items = page.locator('.sr-activity-item');
    expect(await items.count()).toBeGreaterThanOrEqual(1);
    const dates = await items.locator('.sr-activity-date').evaluateAll(el => el.map(e => e.textContent));
    for (const d of dates) {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('activity items have event text and colored dot', async ({ page }) => {
    const items = page.locator('.sr-activity-item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await expect(item.locator('.sr-activity-event')).not.toBeEmpty();
      await expect(item.locator('.sr-activity-dot')).toBeVisible();
    }
  });
});
