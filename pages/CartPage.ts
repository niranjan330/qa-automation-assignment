
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.removeButton = page.locator('.cart_item button');
  }

  async removeFirstProduct() {
    await this.removeButton.first().click();
  }

  async verifyCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
  }
}
