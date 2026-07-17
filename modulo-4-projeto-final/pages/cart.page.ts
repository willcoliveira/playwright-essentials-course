import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Page Object for the Shopping Cart screen.
 */
export class CartPage {
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;

  static readonly URL_PATTERN = /.*cart.html/;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
    this.cartItemNames = page.getByTestId('inventory-item-name');
  }

  /** Move on to the checkout information step. */
  async proceedToCheckout(): Promise<void> {
    await test.step('Proceed to checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  /** Remove a product from the cart by its visible name. */
  async removeProduct(productName: string): Promise<void> {
    await test.step(`Remove "${productName}" from the cart`, async () => {
      await this.cartItems
        .filter({ hasText: productName })
        .getByRole('button', { name: /remove/i })
        .click();
    });
  }

  /** Assert a product is listed in the cart. */
  async expectProductInCart(productName: string): Promise<void> {
    await test.step(`Verify "${productName}" is in the cart`, async () => {
      await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
    });
  }

  /** Assert a product is no longer listed in the cart. */
  async expectProductNotInCart(productName: string): Promise<void> {
    await test.step(`Verify "${productName}" is not in the cart`, async () => {
      await expect(this.cartItems.filter({ hasText: productName })).toHaveCount(0);
    });
  }

  /** Read every product name currently in the cart. */
  async getProductNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  /** Assert the cart page is open. */
  async expectOnCartPage(): Promise<void> {
    await test.step('Verify the cart page is open', async () => {
      await expect(this.page).toHaveURL(CartPage.URL_PATTERN);
    });
  }

  /** Assert a specific product is listed with the expected quantity. */
  async expectProductQuantity(productName: string, quantity: number): Promise<void> {
    await test.step(`Verify "${productName}" quantity is ${quantity}`, async () => {
      const quantityLabel = this.cartItems
        .filter({ hasText: productName })
        .getByTestId('item-quantity');
      await expect(quantityLabel).toHaveText(String(quantity));
    });
  }
}
