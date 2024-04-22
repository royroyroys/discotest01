/* SPEC from docs: 
● Enterprise - Custom Pricing

1. Test for content
*/

// includes & vars
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const checkPricingStr = 'For enterprise pricing please get in touch';

test(`ENTERPRISE pricing shows "${checkPricingStr}"`, async ({ page }) => {
  // Navigate to the pricing page using the base URL from .env
  await page.goto(`${process.env.BASE_URL}/pricing`);

  // Wait for the div containing the specific class to be available
  await page.waitForSelector('div.PricingPlan_SubDescription--Enterprise');
  
  // Evaluate the page's HTML to check the content of our target div
  const contentMatches = await page.evaluate((searchText) => {  
    const divs = Array.from(document.querySelectorAll('div.PricingPlan_SubDescription--Enterprise'));  
    // Use searchText directly since it's passed as an argument
    const regex = new RegExp(searchText.split('').join('\\s*').replace(/\s+/g, '\\s*'), 'i');

    return divs.some(div => regex.test(div.textContent));  
  }, checkPricingStr);

  // Assert that the expected text was found
  expect(contentMatches).toBe(true);
});
