import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Page Object for "Checkout: Complete" — the confirmation screen reached after a
 * successful purchase (checkout-complete.html).
 */
export class CheckoutCompletePage {
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  static readonly PAGE_DETAILS = {
    URL_PATTERN: /.*checkout-complete.html/,
    HEADER: 'Thank you for your order!',
  } as const;

  constructor(private readonly page: Page) {
    this.completeHeader = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  /** Return to the inventory page. */
  async returnToProducts(): Promise<void> {
    await test.step('Return to the products page', async () => {
      await this.backHomeButton.click();
    });
  }

  /** Assert the order completed: confirmation URL and "Thank you" header. */
  async expectOrderComplete(): Promise<void> {
    await test.step('Verify the order confirmation', async () => {
      await expect(this.page).toHaveURL(CheckoutCompletePage.PAGE_DETAILS.URL_PATTERN);
      await expect(this.completeHeader).toHaveText(CheckoutCompletePage.PAGE_DETAILS.HEADER);
    });
  }
}
