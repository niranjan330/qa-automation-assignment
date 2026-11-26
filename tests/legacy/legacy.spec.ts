
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Corrected legacy tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('login works', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('add item to cart', async ({ page }) => {
    await page.locator('.inventory_item').first()
      .getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('cart has two items', async ({ page }) => {
    const buttons = page.locator('.inventory_item')
      .getByRole('button', { name: 'Add to cart' });

    await buttons.nth(0).click();
    await buttons.nth(1).click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });

  test('sort by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    const priceTexts = await page.locator('.inventory_item_price')
      .allTextContents();

    const actualPrices = priceTexts.map(price =>
      Number(price.replace('$', ''))
    );

    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
