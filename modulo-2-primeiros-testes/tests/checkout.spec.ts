import { test, expect } from '@playwright/test';
import { CREDENTIALS } from './credentials';

/**
 * End-to-end purchase: log in, add a product, check out, confirm the order.
 */
test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(CREDENTIALS.standardUser);
    await page.locator('[data-test="password"]').fill(CREDENTIALS.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('completes a purchase and shows the confirmation', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('1000-001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!',
    );
  });
});
