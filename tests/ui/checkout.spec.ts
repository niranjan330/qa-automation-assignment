
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('SauceDemo Checkout', () => {

  test('should complete checkout and verify order total @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    // Add product and open cart
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    // Start checkout
    await checkoutPage.startCheckout();

    // Enter customer information
    await checkoutPage.fillCustomerInformation(
      'John',
      'Doe',
      '500001'
    );

    // Continue to order overview
    await checkoutPage.continueToOverview();

    // Verify subtotal + tax = total
    await checkoutPage.verifyOrderTotal();

    // Complete order
    await checkoutPage.finishOrder();
  });

  test('should show an error when checkout information is missing @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    // Add product and open cart
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    // Start checkout
    await checkoutPage.startCheckout();

    // Click Continue without entering customer information
    await checkoutPage.continueButton.click();

    // Verify the required-field error
    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');
  });

});
