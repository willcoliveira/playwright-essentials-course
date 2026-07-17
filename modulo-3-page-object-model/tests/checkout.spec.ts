import { test } from '../fixtures/test';
import { USERS } from '../data/users';
import { PRODUCTS } from '../data/products';
import { DEFAULT_CUSTOMER } from '../data/checkout';

/**
 * End-to-end purchase, refactored from Module 2 to the Page Object Model:
 * inventory → cart → checkout → confirmation. The body reads as the user journey.
 */
test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard);
    await inventoryPage.expectLoaded();
  });

  test('completes a purchase from inventory to confirmation', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.expectCartCount(1);
    await inventoryPage.header.openCart();

    await cartPage.expectOnCartPage();
    await cartPage.expectProductInCart(PRODUCTS.backpack);
    await cartPage.proceedToCheckout();

    await checkoutPage.expectOnInformationPage();
    await checkoutPage.fillInformation(DEFAULT_CUSTOMER);

    await checkoutOverviewPage.expectSummaryContainsProduct(PRODUCTS.backpack);
    await checkoutOverviewPage.finishOrder();

    await checkoutCompletePage.expectOrderComplete();
  });
});
