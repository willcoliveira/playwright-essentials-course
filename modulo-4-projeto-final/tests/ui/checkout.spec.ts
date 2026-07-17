import { test } from '../../fixtures/test';
import { PRODUCTS } from '../../data/products';
import { DEFAULT_CUSTOMER } from '../../data/checkout';

/**
 * Checkout — Step One field validation (negative paths).
 * SauceDemo surfaces one "required" error at a time, so we fill the form field by
 * field and assert the next error appears. Runs in the "logged-in" projects.
 */
test.describe('Checkout information validation', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.openCart();
    await cartPage.proceedToCheckout();
  });

  test('requires every field before continuing', async ({ checkoutPage }) => {
    await checkoutPage.expectOnInformationPage();

    await checkoutPage.continue();
    await checkoutPage.expectFieldError('First Name');

    await checkoutPage.fillFirstName(DEFAULT_CUSTOMER.firstName);
    await checkoutPage.continue();
    await checkoutPage.expectFieldError('Last Name');

    await checkoutPage.fillLastName(DEFAULT_CUSTOMER.lastName);
    await checkoutPage.continue();
    await checkoutPage.expectFieldError('Postal Code');
  });
});
