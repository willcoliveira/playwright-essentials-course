import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Page Object for "Checkout: Overview" — the second checkout step
 * (checkout-step-two.html), the final summary before the order is placed.
 */
export class CheckoutOverviewPage {
  private readonly finishButton: Locator;
  private readonly summaryItems: Locator;

  static readonly URL_PATTERN = /.*checkout-step-two.html/;

  constructor(page: Page) {
    this.finishButton = page.getByTestId('finish');
    this.summaryItems = page.getByTestId('inventory-item');
  }

  /** Place the order. */
  async finishOrder(): Promise<void> {
    await test.step('Finish the order', async () => {
      await this.finishButton.click();
    });
  }

  /** Assert a product appears in the order summary. */
  async expectSummaryContainsProduct(productName: string): Promise<void> {
    await test.step(`Verify "${productName}" is in the order summary`, async () => {
      await expect(this.summaryItems.filter({ hasText: productName })).toBeVisible();
    });
  }
}
