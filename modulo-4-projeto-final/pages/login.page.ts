import { type Locator, type Page, test, expect } from '@playwright/test';
import type { UserCredentials } from '../data/users';

/**
 * Page Object for the Login screen.
 *
 * Locators are private — tests never touch them. They drive the page through
 * semantic action methods (`login`) and verify it through `expect*` methods.
 * Every method is wrapped in `test.step()` so the trace reads as a narrative.
 */
export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /** Known error-message patterns, asserted against in tests. */
  static readonly ERROR_MESSAGES = {
    LOCKED_OUT: /.*locked out/i,
    NO_MATCH: /username and password do not match/i,
  } as const;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  /** Valid entry point: open the login page via the configured baseURL. */
  async goto(): Promise<void> {
    await test.step('Open the login page', async () => {
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    });
  }

  /**
   * Submit the login form.
   * @example await loginPage.login(USERS.standard);
   */
  async login(user: UserCredentials): Promise<void> {
    await test.step(`Log in as "${user.username}"`, async () => {
      await this.usernameInput.fill(user.username);
      await this.passwordInput.fill(user.password);
      await this.loginButton.click();
    });
  }

  /** Assert the login page is shown (used after logout). */
  async expectLoaded(): Promise<void> {
    await test.step('Verify the login page is loaded', async () => {
      await expect(this.loginButton).toBeVisible();
    });
  }

  /** Assert the login error banner is shown with the expected message. */
  async expectLoginError(message: string | RegExp): Promise<void> {
    await test.step('Verify the login error message', async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toHaveText(message);
    });
  }
}
