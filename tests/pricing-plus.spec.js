/* SPEC from docs: 
● Plus - Base: 1 User, 1,000 Tracks - $15 PCM
    ■ $15 per additional user
    ■ $6 per additional 1000 tracks
● Discount - 10% if paying annually

1. Test for content
2. Test for change price toggle discount
*/

// includes & vars
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const monthlyPrice = 15;
const annualPrice = monthlyPrice*0.9;

const monthlyPriceTracks = 6;
const annualPriceTracks = monthlyPriceTracks*0.9;

const checkPricingStr = '1 user and 1K tracks';


test(`PLUS pricing shows $${monthlyPrice} & "${checkPricingStr}`, async ({ page }) => {  
  // Navigate to the pricing page using the base URL from .env  
  await page.goto(`${process.env.BASE_URL}/pricing`);

  // Select the PLUS section by finding a section containing the "Plus" title
  const pageSection = page.locator('.PricingPlan:has(.PricingPlan_Title.heading--H4:has-text("Plus"))');
  await pageSection.waitFor();

  // Check if the PLUS pricing is correctly set by directly using the locator inside the pageSection
  const initialPrice = await pageSection.locator('.Price').textContent();
  expect(initialPrice.trim()).toMatch(new RegExp(`\\$${monthlyPrice}`));

  // Adjusted to use the pageSection scope correctly for checking content
  const contentMatches = await pageSection.evaluate((section, searchText) => {  
    const divs = section.querySelectorAll('div.PricingPlan_SubDescription');  
    const regex = new RegExp(searchText.split('').join('\\s*').replace(/\s+/g, '\\s*'), 'i');

    return Array.from(divs).some(div => regex.test(div.textContent));  
    // Note: The context (section) for this query is passed as an argument
  }, checkPricingStr);

  // Assert that the expected text was found within the section
  expect(contentMatches).toBe(true);  
});

test(`PLUS pricing toggle to Annual price of $${monthlyPrice} -> $${annualPrice}`, async ({ page }) => {
  // Navigate to the pricing page using the base URL from .env
  await page.goto(`${process.env.BASE_URL}/pricing`);

  // Click on the "Pay Annually/Monthly" toggle
  await page.locator('div').filter({ hasText: /^Pay monthlyPay Annually$/ }).locator('div').nth(1).click();

  // Check if the PLUS pricing updates
  const updatedPrice = await page.locator('xpath=/html/body/div[1]/div/main/div[3]/div/div/div/div/div[1]/div/div/div[4]/div[2]/div/div[2]/div/div/div[1]/div[1]/div/span[2]').textContent();
  expect(updatedPrice.trim()).toMatch(new RegExp(`\\$${annualPrice}`));


  //check additional user & tracks
  // TODO: make use of an actual input slider on site to modify this.
});