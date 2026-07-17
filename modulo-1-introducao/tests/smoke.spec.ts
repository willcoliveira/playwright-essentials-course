import { test, expect } from '@playwright/test';

/**
 * The very first tests: prove the setup works end to end.
 * One checks the login page renders; the other performs a real login.
 */
test.describe('Smoke', () => {
  test('the login page loads', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('a valid user can log in', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
