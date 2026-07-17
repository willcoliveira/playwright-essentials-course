import { test } from '../../fixtures/test';
import { PRODUCTS } from '../../data/products';
import { DEFAULT_CUSTOMER } from '../../data/checkout';

/**
 * End-to-end purchase: inventory → cart → checkout → confirmation.
 * The test body reads as the user journey; every detail lives in the page objects.
 * Runs in the "logged-in" projects.
 */
test.describe('Purchase', () => {
  test('completes a purchase from inventory to confirmation', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.goto();

    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.header.expectCartCount(1);
    await inventoryPage.header.openCart();

    await cartPage.expectOnCartPage();
    await cartPage.expectProductInCart(PRODUCTS.backpack);
    await cartPage.proceedToCheckout();

    await checkoutPage.expectOnInformationPage();
    await checkoutPage.fillInformation(DEFAULT_CUSTOMER);

    await checkoutOverviewPage.expectSummaryContainsProduct(PRODUCTS.backpack);
    await checkoutOverviewPage.expectTotalsVisible();
    await checkoutOverviewPage.finishOrder();

    await checkoutCompletePage.expectOrderComplete();
  });
});
