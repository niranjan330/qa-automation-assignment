
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('SauceDemo Login', () => {
  test('should successfully login with valid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifySuccessfulLogin();
  });

  test('should reject locked out user @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.verifyLoginError(
      'Sorry, this user has been locked out'
    );
  });
});
