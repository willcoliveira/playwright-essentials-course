import { defineConfig, devices } from '@playwright/test';

/**
 * Standalone config for the teaching examples, so the naive vs best-practice
 * demos run in isolation from the real suite (no storageState, no projects).
 *
 *   npm run test:examples
 *   npx playwright test --config examples/playwright.config.ts
 */
export default defineConfig({
  testDir: '.',
  reporter: 'list',
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
