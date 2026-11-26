
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('SauceDemo Shopping Cart', () => {

  test('should add a product to the cart and verify its contents @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    const firstProductName = await inventoryPage.productNames.first().textContent();

    await inventoryPage.addFirstProductToCart();
    await inventoryPage.verifyCartCount('1');
    await inventoryPage.openCart();

    await expect(page.locator('.cart_item .inventory_item_name'))
      .toHaveText(firstProductName!.trim());
  });

  test('should remove a product from the cart @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    await cartPage.removeFirstProduct();
    await cartPage.verifyCartIsEmpty();
  });

  test('should preserve cart contents after page reload @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    const firstProductName = await inventoryPage.productNames.first().textContent();

    await inventoryPage.addFirstProductToCart();
    await inventoryPage.verifyCartCount('1');

    // Reload the page
    await page.reload();

    // Verify the cart badge still shows one item
    await inventoryPage.verifyCartCount('1');

    // Verify the product is still in the cart
    await inventoryPage.openCart();

    await expect(page.locator('.cart_item .inventory_item_name'))
      .toHaveText(firstProductName!.trim());
  });

});

