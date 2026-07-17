import { test, expect } from '@playwright/test';

/**
 * ❌ NAIVE VERSION — it passes, but it breaks almost every best practice.
 *
 * This is roughly what a first Playwright test looks like before any structure:
 * everything inline, raw selectors, blind waits, one-shot assertions, hardcoded
 * data. It works on a good day and rots on a bad one.
 *
 * Compare it side-by-side with examples/02-best-practice/purchase.spec.ts and read
 * examples/HOW-TO.md to see what each problem is and how the framework fixes it.
 *
 * Run it:  npx playwright test --config examples/playwright.config.ts examples/01-naive
 */
test('buy a backpack', async ({ page }) => {
  // ❌ Hardcoded full URL instead of a configured baseURL.
  await page.goto('https://www.saucedemo.com');

  // ❌ Brittle id/CSS selectors + ❌ hardcoded credentials inline.
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ❌ Blind wait — slows the suite and still races on a slow day.
  await page.waitForTimeout(2000);

  // ❌ Locator tied to the exact id of one product.
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  // ❌ One-shot assertion: reads the state once, no auto-retry.
  expect(await page.locator('.shopping_cart_badge').isVisible()).toBe(true);

  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  // ❌ Repeated raw selectors + magic data, no reuse across tests.
  await page.locator('#first-name').fill('Ada');
  await page.locator('#last-name').fill('Lovelace');
  await page.locator('#postal-code').fill('1000');
  await page.locator('#continue').click();

  await page.locator('#finish').click();

  // ❌ Another blind wait + ❌ another one-shot assertion.
  await page.waitForTimeout(1000);
  expect(await page.locator('.complete-header').textContent()).toContain('Thank you');
});
