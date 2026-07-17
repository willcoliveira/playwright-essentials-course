import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { USERS } from '../../data/users';
import { STORAGE_STATE } from '../../playwright.config';

/**
 * Global authentication. Runs once (the "setup" project), logs in as the standard
 * user, and saves the session to STORAGE_STATE. Every "logged-in" project reuses
 * that file, so business-flow tests skip the login UI entirely.
 *
 * Note: this is the one place that legitimately uses `new` instead of fixtures —
 * setup files run before the custom-fixture test object is in play.
 */
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(USERS.standard);
  await inventoryPage.expectLoaded(); // ensure the session is real before saving

  await page.context().storageState({ path: STORAGE_STATE });
});
