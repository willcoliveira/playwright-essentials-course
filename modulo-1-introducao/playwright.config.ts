import { defineConfig } from '@playwright/test';

/**
 * Module 1 config — the minimum that matters:
 *  - `testDir` is where the specs live.
 *  - `baseURL` lets specs navigate with `page.goto('/')`.
 *  - the HTML reporter records each run.
 */
export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
