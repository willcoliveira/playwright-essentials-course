import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Page Object for the Shopping Cart screen.
 */
export class CartPage {
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;

  static readonly URL_PATTERN = /.*cart.html/;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
  }

  /** Move on to the checkout information step. */
  async proceedToCheckout(): Promise<void> {
    await test.step('Proceed to checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  /** Assert the cart page is open. */
  async expectOnCartPage(): Promise<void> {
    await test.step('Verify the cart page is open', async () => {
      await expect(this.page).toHaveURL(CartPage.URL_PATTERN);
    });
  }

  /** Assert a product is listed in the cart. */
  async expectProductInCart(productName: string): Promise<void> {
    await test.step(`Verify "${productName}" is in the cart`, async () => {
      await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
    });
  }
}
