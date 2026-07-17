import { type Locator, type Page, test, expect } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

/**
 * Page Object for the Inventory (product gallery) screen.
 *
 * Composes the shared {@link HeaderComponent} for all cart-badge interactions,
 * so cart assertions read as `inventoryPage.header.expectCartCount(1)`.
 */
export class InventoryPage {
  /** Shared header (cart badge, cart link, menu). */
  readonly header: HeaderComponent;

  private readonly url = '/inventory.html';
  private readonly title: Locator;
  private readonly sortDropdown: Locator;
  private readonly inventoryItems: Locator;
  private readonly inventoryItemNames: Locator;
  private readonly removeButtons: Locator;

  static readonly PAGE_DETAILS = {
    URL_PATTERN: /.*inventory.html/,
    TITLE: 'Products',
  } as const;

  static readonly SORT_OPTIONS = {
    NAME_AZ: 'az',
    NAME_ZA: 'za',
    PRICE_LOHI: 'lohi',
    PRICE_HILO: 'hilo',
  } as const;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.inventoryItemNames = page.getByTestId('inventory-item-name');
    this.removeButtons = page.getByRole('button', { name: /remove/i });
  }

  /** Valid entry point: open the inventory page directly (requires a session). */
  async goto(): Promise<void> {
    await test.step('Open the inventory page', async () => {
      await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    });
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

  /** Clear the cart by clicking every visible Remove button. */
  async removeAllItemsFromCart(): Promise<void> {
    await test.step('Remove every item from the cart', async () => {
      // Re-read the count each pass: the DOM re-renders as items are removed.
      for (
        let remaining = await this.removeButtons.count();
        remaining > 0;
        remaining = await this.removeButtons.count()
      ) {
        await this.removeButtons.first().click();
      }
    });
  }

  /** Change the product ordering. */
  async sortBy(
    option: (typeof InventoryPage.SORT_OPTIONS)[keyof typeof InventoryPage.SORT_OPTIONS],
  ): Promise<void> {
    await test.step(`Sort products by "${option}"`, async () => {
      await this.sortDropdown.selectOption(option);
    });
  }

  /** Read every product name currently rendered, in display order. */
  async getProductNames(): Promise<string[]> {
    return this.inventoryItemNames.allTextContents();
  }

  /** Assert we landed on the inventory page and its title is shown. */
  async expectLoaded(): Promise<void> {
    await test.step('Verify the inventory page is loaded', async () => {
      await expect(this.page).toHaveURL(InventoryPage.PAGE_DETAILS.URL_PATTERN);
      await expect(this.title).toHaveText(InventoryPage.PAGE_DETAILS.TITLE);
    });
  }
}
