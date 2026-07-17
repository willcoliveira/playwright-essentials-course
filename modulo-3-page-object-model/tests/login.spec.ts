import { test } from '../fixtures/test';
import { LoginPage } from '../pages/login.page';
import { USERS, INVALID_LOGIN } from '../data/users';

/**
 * Authentication scenarios, refactored from Module 2 to the Page Object Model.
 * The spec reads as intent; every selector lives in LoginPage.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('logs in successfully with valid credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard);

    await inventoryPage.expectLoaded();
    await inventoryPage.header.expectCartEmpty();
  });

  test('shows an error for a locked-out user', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut);

    await loginPage.expectLoginError(LoginPage.ERROR_MESSAGES.LOCKED_OUT);
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(INVALID_LOGIN);

    await loginPage.expectLoginError(LoginPage.ERROR_MESSAGES.NO_MATCH);
  });
});
