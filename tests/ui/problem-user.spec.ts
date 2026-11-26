
import { test, expect } from '@playwright/test';

test.describe('Problem user exploratory tests', () => {

  test('problem_user should sort products by price low to high', async ({ page }) => {

    // Mark this as an expected failure because of the known application defect.
    test.fail(
      true,
      'Known defect: problem_user cannot sort products by price'
    );

    // Login
    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('problem_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);

    // Select Price (low to high)
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    // Read the displayed product prices
    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    // Convert price strings into numbers
    const actualPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    // Calculate the expected ascending order
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    // Verify that the products are sorted correctly
    expect(actualPrices).toEqual(expectedPrices);
  });

});
