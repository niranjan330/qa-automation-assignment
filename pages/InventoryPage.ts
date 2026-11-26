
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('.inventory_item_name');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('.inventory_item button');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async sortByNameAscending() {
    await this.sortDropdown.selectOption('az');
  }

  async verifyProductsAreSortedAscending() {
    const actualNames = await this.productNames.allTextContents();
    const expectedNames = [...actualNames].sort((a, b) =>
      a.localeCompare(b)
    );

    expect(actualNames).toEqual(expectedNames);
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async verifyCartCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

}
