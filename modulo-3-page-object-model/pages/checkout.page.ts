import { type Locator, type Page, test, expect } from '@playwright/test';
import type { CustomerInfo } from '../data/checkout';

/**
 * Page Object for "Checkout: Your Information" — the first checkout step
 * (checkout-step-one.html).
 */
export class CheckoutPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;

  static readonly URL_PATTERN = /.*checkout-step-one.html/;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  /** Fill the customer information form and continue to the overview step. */
  async fillInformation(customer: CustomerInfo): Promise<void> {
    await test.step('Fill in the checkout information', async () => {
      await this.firstNameInput.fill(customer.firstName);
      await this.lastNameInput.fill(customer.lastName);
      await this.postalCodeInput.fill(customer.postalCode);
      await this.continueButton.click();
    });
  }

  /** Assert the information step is open. */
  async expectOnInformationPage(): Promise<void> {
    await test.step('Verify the checkout information step is open', async () => {
      await expect(this.page).toHaveURL(CheckoutPage.URL_PATTERN);
    });
  }
}
