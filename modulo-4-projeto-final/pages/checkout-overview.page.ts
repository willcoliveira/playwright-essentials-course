import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Page Object for "Checkout: Overview" — the second checkout step
 * (checkout-step-two.html). The final summary before the order is placed.
 */
export class CheckoutOverviewPage {
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly summaryItems: Locator;

  static readonly URL_PATTERN = /.*checkout-step-two.html/;

  constructor(page: Page) {
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.summaryItems = page.getByTestId('inventory-item');
  }

  /** Place the order. */
  async finishOrder(): Promise<void> {
    await test.step('Finish the order', async () => {
      await this.finishButton.click();
    });
  }

  /** Abandon the overview and return to the inventory. */
  async cancelOrder(): Promise<void> {
    await test.step('Cancel the order', async () => {
      await this.cancelButton.click();
    });
  }

  /** Assert a product appears in the order summary. */
  async expectSummaryContainsProduct(productName: string): Promise<void> {
    await test.step(`Verify "${productName}" is in the order summary`, async () => {
      await expect(this.summaryItems.filter({ hasText: productName })).toBeVisible();
    });
  }

  /** Assert the price breakdown (subtotal, tax, total) is shown. */
  async expectTotalsVisible(): Promise<void> {
    await test.step('Verify the price summary is visible', async () => {
      await expect(this.subtotalLabel).toBeVisible();
      await expect(this.taxLabel).toBeVisible();
      await expect(this.totalLabel).toContainText('Total: $');
    });
  }
}
