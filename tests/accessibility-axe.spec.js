// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1
require('dotenv').config();

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/pricing`); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});