import { test, expect } from '@playwright/test';
import { CREDENTIALS } from './credentials';

/**
 * Adding a product to the cart updates the cart badge.
 */
test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(CREDENTIALS.standardUser);
    await page.locator('[data-test="password"]').fill(CREDENTIALS.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('adds a product to the cart and updates the badge to 1', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
