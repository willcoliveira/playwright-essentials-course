import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Shared header component — the cart badge and cart link appear on every
 * authenticated page. Modelling it once and composing it into the pages that use
 * it avoids duplicating these locators (POM: component composition).
 */
export class HeaderComponent {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  /** Navigate to the cart via the header icon. */
  async openCart(): Promise<void> {
    await test.step('Open the shopping cart', async () => {
      await this.cartLink.click();
    });
  }

  /** Assert the cart badge shows the expected item count. */
  async expectCartCount(count: number): Promise<void> {
    await test.step(`Verify the cart badge shows ${count}`, async () => {
      await expect(this.cartBadge).toHaveText(String(count));
    });
  }

  /** Assert the cart is empty (the badge is removed from the DOM). */
  async expectCartEmpty(): Promise<void> {
    await test.step('Verify the cart badge is hidden (empty cart)', async () => {
      await expect(this.cartBadge).toBeHidden();
    });
  }
}
