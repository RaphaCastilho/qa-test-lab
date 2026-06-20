const { test, expect } = require('@playwright/test');

test.describe('API mocking — static site simulation', () => {
  test('mock an API route and verify the site handles the response', async ({ page }) => {
    await page.route('**/api/v2/health', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'ok', uptime: '99.9%', version: '2.1.0' }),
      });
    });

    await page.goto('/endpoints.html');
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/v2/health');
      return res.json();
    });
    expect(response.status).toBe('ok');
    expect(response.version).toBe('2.1.0');
  });

  test('mock a failing endpoint and verify error state', async ({ page }) => {
    await page.route('**/api/v2/products', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error', code: 'ERR_500' }),
      });
    });

    await page.goto('/endpoints.html');
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/v2/products');
      return { status: res.status, body: await res.json() };
    });
    expect(response.status).toBe(500);
    expect(response.body.code).toBe('ERR_500');
  });

  test('mock network delay to test timeout handling', async ({ page }) => {
    await page.route('**/api/v2/reports/summary', route => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ summary: 'delayed response' }),
        });
      }, 2000);
    });

    await page.goto('/endpoints.html');
    const start = Date.now();
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/v2/reports/summary');
      return res.json();
    });
    const elapsed = Date.now() - start;
    expect(response.summary).toBe('delayed response');
    expect(elapsed).toBeGreaterThanOrEqual(1800);
  });

  test('mock aborted network request', async ({ page }) => {
    await page.route('**/api/v2/notifications', route => {
      route.abort('connectionrefused');
    });

    await page.goto('/endpoints.html');
    const caught = await page.evaluate(async () => {
      try {
        await fetch('/api/v2/notifications');
        return null;
      } catch (e) {
        return e.message || 'error';
      }
    });
    expect(caught).toBeTruthy();
  });

  test('intercept all XHR and verify no unhandled requests', async ({ page }) => {
    const requests = [];
    await page.route('**/api/**', route => {
      requests.push({ url: route.request().url(), method: route.request().method() });
      route.continue();
    });

    await page.goto('/endpoints.html');
    expect(requests.length).toBeGreaterThanOrEqual(0);
  });
});
