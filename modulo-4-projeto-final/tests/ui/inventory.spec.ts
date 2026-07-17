import { test, expect } from '../../fixtures/test';
import { InventoryPage } from '../../pages/inventory.page';
import { PRODUCTS } from '../../data/products';

/**
 * Inventory: cart-badge state and sorting.
 * Runs in the "logged-in" projects, reusing the session saved by auth.setup.ts.
 */
test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('adds a product and updates the cart badge to 1', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.boltTShirt);

    await inventoryPage.header.expectCartCount(1);
  });

  test('removes all products and hides the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.boltTShirt);
    await inventoryPage.addItemToCart(PRODUCTS.bikeLight);
    await inventoryPage.header.expectCartCount(2);

    await inventoryPage.removeAllItemsFromCart();

    await inventoryPage.header.expectCartEmpty();
  });

  test('sorts products in descending alphabetical order (Z to A)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(InventoryPage.SORT_OPTIONS.NAME_ZA);

    const actualOrder = await inventoryPage.getProductNames();
    // Data-independent: assert the algorithm, not a hardcoded catalogue snapshot.
    const expectedOrder = [...actualOrder].sort((a, b) => b.localeCompare(a));
    expect(actualOrder, 'Products should be sorted from Z to A').toEqual(expectedOrder);
  });
});
