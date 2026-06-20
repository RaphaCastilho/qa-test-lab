const { test, expect } = require('@playwright/test');

const pages = [
  { path: '/', title: /Playwright QA Lab.*Dashboard/i },
  { path: '/scenarios.html', title: /Playwright QA Lab.*Scenarios/i },
  { path: '/history.html', title: /Playwright QA Lab.*History/i },
  { path: '/endpoints.html', title: /Playwright QA Lab.*Endpoints/i },
  { path: '/test-cases.html', title: /Playwright QA Lab.*Test Cases/i },
  { path: '/bug-reports.html', title: /Playwright QA Lab.*Bug Reports/i },
  { path: '/status-report.html', title: /Playwright QA Lab.*Status Report/i },
  { path: '/projects.html', title: /Playwright QA Lab.*Projects/i },
];

for (const { path, title } of pages) {
  test(`smoke — ${path} loads with correct title`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  });
}

test('smoke — all nav links are present and clickable', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.navbar-links a');
  await expect(links).toHaveCount(9);

  const hrefs = await links.evaluateAll(list => list.map(l => l.getAttribute('href')));
  for (const href of hrefs) {
    await page.goto(href);
    await expect(page.locator('.main')).toBeVisible();
  }
});

test('smoke — 404 page is handled gracefully', async ({ page }) => {
  const response = await page.goto('/nonexistent.html');
  expect(response.status()).toBe(404);
});

test('smoke — page renders main content area', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.main')).toBeVisible();
  await expect(page.locator('.navbar')).toBeVisible();
  await expect(page.locator('.footer')).toBeVisible();
});
