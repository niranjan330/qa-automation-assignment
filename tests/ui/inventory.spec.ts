
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('SauceDemo Product Sorting', () => {
  test('should sort products alphabetically from A to Z @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();

    await inventoryPage.sortByNameAscending();
    await inventoryPage.verifyProductsAreSortedAscending();
  });
});
