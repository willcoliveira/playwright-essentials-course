import { defineConfig } from '@playwright/test';

/**
 * Module 3 config. Two changes matter versus Module 2:
 *  - `testIdAttribute: 'data-test'` makes `getByTestId('username')` resolve
 *    SauceDemo's `data-test="username"` — semantic locators instead of raw CSS.
 *  - `baseURL` is set once here, so page objects navigate with `page.goto('/')`
 *    and the URL is never repeated in a spec.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
