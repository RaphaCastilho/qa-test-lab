const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'mobile-sm', width: 375, height: 812 },
  { name: 'mobile-md', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1920, height: 1080 },
];

const pages = ['/', '/scenarios.html', '/history.html', '/endpoints.html'];

for (const pagePath of pages) {
  for (const vp of viewports) {
    test(`responsive — ${pagePath} at ${vp.name} (${vp.width}x${vp.height}) has no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(pagePath);

      const overflowWidth = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      expect(overflowWidth).toBe(0);

      await expect(page.locator('.navbar')).toBeVisible();
    });
  }
}

test('responsive — dashboard metrics grid adapts at mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const grid = page.locator('.metrics-grid');
  const gridGap = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
  expect(gridGap.split(' ').filter(c => c.trim()).length).toBeLessThanOrEqual(2);
});

test('responsive — scenario grid is single column on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/scenarios.html');

  const grid = page.locator('.scenario-grid');
  const cols = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
  const colCount = cols.split(' ').filter(c => c.trim()).length;
  expect(colCount).toBe(1);
});
