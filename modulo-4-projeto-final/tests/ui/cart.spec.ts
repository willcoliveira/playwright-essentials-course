import { test } from '../../fixtures/test';
import { PRODUCTS } from '../../data/products';

/**
 * Cart: contents and quantity. Runs in the "logged-in" projects.
 */
test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('shows quantity 1 for a single added product', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.openCart();

    await cartPage.expectOnCartPage();
    await cartPage.expectProductQuantity(PRODUCTS.backpack, 1);
  });

  test('removes a product from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.openCart();
    await cartPage.expectProductInCart(PRODUCTS.backpack);

    await cartPage.removeProduct(PRODUCTS.backpack);

    await cartPage.expectProductNotInCart(PRODUCTS.backpack);
    await inventoryPage.header.expectCartEmpty();
  });
});
