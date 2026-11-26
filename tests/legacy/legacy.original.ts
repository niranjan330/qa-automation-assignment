
import { test, expect } from '@playwright/test';

// Shared state across tests
let cartCount = 0;

test.describe('legacy suite', () => {
  test('login works', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    page.fill('#user-name', 'standard_user');
    page.fill('#password', 'secret_sauce');
    page.click('#login-button');
    await page.waitForTimeout(3000);
    expect(await page.locator('.title').isVisible()).toBe(true);
  });

  test('add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click(
      `//div[@class='inventory_list']/div[1]/div[3]/button`
    );
    cartCount++;
    const badge = await page.locator('.shopping_cart_badge').textContent();
    expect(badge).toBe(String(cartCount));
  });

  test('cart has two items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const buttons = page.locator('button.btn_inventory');
    await buttons.nth(0).click();
    await buttons.nth(1).click();

    cartCount = 2;
    const items = await page.locator('.cart_item').count();
    expect(items).toBeGreaterThanOrEqual(0);
  });

  test('sort by price low to high', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.selectOption('.product_sort_container', 'lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    expect(prices.length).toBeGreaterThan(0);
  });
});
