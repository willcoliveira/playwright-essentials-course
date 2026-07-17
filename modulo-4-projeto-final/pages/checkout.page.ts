import { type Locator, type Page, test, expect } from '@playwright/test';
import type { CustomerInfo } from '../data/checkout';

/** The required fields on the checkout information form. */
export type CheckoutField = 'First Name' | 'Last Name' | 'Postal Code';

/**
 * Page Object for "Checkout: Your Information" — the first checkout step
 * (checkout-step-one.html).
 */
export class CheckoutPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  static readonly URL_PATTERN = /.*checkout-step-one.html/;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
  }

  /**
   * Fill the whole customer information form and continue to the overview step.
   * @example await checkoutPage.fillInformation(DEFAULT_CUSTOMER);
   */
  async fillInformation(customer: CustomerInfo): Promise<void> {
    await test.step('Fill in the checkout information', async () => {
      await this.firstNameInput.fill(customer.firstName);
      await this.lastNameInput.fill(customer.lastName);
      await this.postalCodeInput.fill(customer.postalCode);
      await this.continueButton.click();
    });
  }

  async fillFirstName(firstName: string): Promise<void> {
    await test.step(`Fill first name "${firstName}"`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastName(lastName: string): Promise<void> {
    await test.step(`Fill last name "${lastName}"`, async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  /** Submit the form (used both for the happy path and to trigger validation). */
  async continue(): Promise<void> {
    await test.step('Continue from the information step', async () => {
      await this.continueButton.click();
    });
  }

  /** Assert the information step is open. */
  async expectOnInformationPage(): Promise<void> {
    await test.step('Verify the checkout information step is open', async () => {
      await expect(this.page).toHaveURL(CheckoutPage.URL_PATTERN);
    });
  }

  /** Assert the "{field} is required" validation error is shown. */
  async expectFieldError(field: CheckoutField): Promise<void> {
    await test.step(`Verify "${field} is required" error`, async () => {
      await expect(this.errorMessage).toHaveText(`Error: ${field} is required`);
    });
  }
}
