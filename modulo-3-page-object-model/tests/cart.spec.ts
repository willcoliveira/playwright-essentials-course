import { test } from '../fixtures/test';
import { USERS } from '../data/users';
import { PRODUCTS } from '../data/products';

/**
 * Cart scenarios. Without a saved session (that arrives in Module 4), each test
 * logs in through the UI first.
 */
test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard);
    await inventoryPage.expectLoaded();
  });

  test('adds a product and shows it in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.expectCartCount(1);

    await inventoryPage.header.openCart();

    await cartPage.expectOnCartPage();
    await cartPage.expectProductInCart(PRODUCTS.backpack);
  });
});
