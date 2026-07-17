import { test, expect } from '@playwright/test';
import { CREDENTIALS } from './credentials';

/**
 * First tests: authentication. Flat style (no Page Object yet) — that refactor is
 * Module 3. The important habits start here: web-first assertions, and every
 * assertion matches the scenario in the test name.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(CREDENTIALS.standardUser);
    await page.locator('[data-test="password"]').fill(CREDENTIALS.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('shows an error for a locked-out user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(CREDENTIALS.lockedOutUser);
    await page.locator('[data-test="password"]').fill(CREDENTIALS.password);
    await page.locator('[data-test="login-button"]').click();

    // Locked-out user → the "locked out" message. Assertion matches the scenario.
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(CREDENTIALS.standardUser);
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    // Wrong password → the "do not match" message (NOT "locked out").
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
  });
});
