import { test } from '../../fixtures/test';
import { LoginPage } from '../../pages/login.page';
import { USERS, INVALID_LOGIN } from '../../data/users';

/**
 * Authentication: the security boundary of the app.
 * Runs in the "public" projects (no saved session) so each test logs in for real.
 */
test.describe('Authentication', () => {
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

  test('logs out and returns to the login page', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard);
    await inventoryPage.expectLoaded();

    await inventoryPage.header.logout();

    await loginPage.expectLoaded();
  });
});
