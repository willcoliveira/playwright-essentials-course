import { test } from '../../fixtures/test';
import { USERS } from '../../data/users';
import { PRODUCTS } from '../../data/products';
import { DEFAULT_CUSTOMER } from '../../data/checkout';

/**
 * ✅ BEST-PRACTICE VERSION — the same journey, every rule applied.
 *
 * - Page objects injected by custom fixtures (no `new`, no boilerplate)
 * - Locators live in the POM; the test never touches a selector
 * - Web-first, named `expect*` assertions (auto-retry, no blind waits)
 * - Every step shows up in the trace via test.step (inside the page objects)
 * - Test data comes from data/ — no magic strings
 *
 * It reads as the user journey. That is the whole point.
 *
 * Run it:  npm run test:examples
 */
test('buy a backpack end to end', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await loginPage.goto();
  await loginPage.login(USERS.standard);
  await inventoryPage.expectLoaded();

  await inventoryPage.addItemToCart(PRODUCTS.backpack);
  await inventoryPage.header.expectCartCount(1);
  await inventoryPage.header.openCart();

  await cartPage.expectOnCartPage();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation(DEFAULT_CUSTOMER);
  await checkoutOverviewPage.expectSummaryContainsProduct(PRODUCTS.backpack);
  await checkoutOverviewPage.finishOrder();

  await checkoutCompletePage.expectOrderComplete();
});
