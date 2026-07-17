import { type Locator, type Page, test, expect } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

/**
 * Page Object for the Inventory (product gallery) screen.
 *
 * Composes the shared {@link HeaderComponent} for cart-badge interactions, so
 * cart assertions read as `inventoryPage.header.expectCartCount(1)`.
 */
export class InventoryPage {
  /** Shared header (cart badge, cart link). */
  readonly header: HeaderComponent;

  private readonly title: Locator;
  private readonly inventoryItems: Locator;

  static readonly PAGE_DETAILS = {
    URL_PATTERN: /.*inventory.html/,
    TITLE: 'Products',
  } as const;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
  }

  /** Add a single product to the cart by its visible name. */
  async addItemToCart(productName: string): Promise<void> {
    await test.step(`Add "${productName}" to the cart`, async () => {
      await this.inventoryItems
        .filter({ hasText: productName })
        .getByRole('button', { name: /add to cart/i })
        .click();
    });
  }

  /** Assert we landed on the inventory page and its title is shown. */
  async expectLoaded(): Promise<void> {
    await test.step('Verify the inventory page is loaded', async () => {
      await expect(this.page).toHaveURL(InventoryPage.PAGE_DETAILS.URL_PATTERN);
      await expect(this.title).toHaveText(InventoryPage.PAGE_DETAILS.TITLE);
    });
  }
}
