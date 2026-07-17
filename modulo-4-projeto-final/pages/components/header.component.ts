import { type Locator, type Page, test, expect } from '@playwright/test';

/**
 * Shared header component — the cart badge, cart link and burger menu appear on
 * every authenticated page. Modelling it once and composing it into the pages
 * that use it avoids duplicating these locators (POM: component composition).
 */
export class HeaderComponent {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly burgerMenuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
  }

  /** Navigate to the cart via the header icon. */
  async openCart(): Promise<void> {
    await test.step('Open the shopping cart', async () => {
      await this.cartLink.click();
    });
  }

  /** Open the burger menu and wait for the logout link to be actionable. */
  async openMenu(): Promise<void> {
    await test.step('Open the burger menu', async () => {
      await this.burgerMenuButton.click();
      await expect(this.logoutLink).toBeVisible();
    });
  }

  /** Open the menu and log the user out. */
  async logout(): Promise<void> {
    await test.step('Log out', async () => {
      await this.openMenu();
      await this.logoutLink.click();
    });
  }

  /** Open the menu and reset the application state (clears the cart). */
  async resetAppState(): Promise<void> {
    await test.step('Reset app state', async () => {
      await this.openMenu();
      await this.resetAppStateLink.click();
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
