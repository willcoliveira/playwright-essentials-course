import { defineConfig } from '@playwright/test';
import 'dotenv/config';

/**
 * Module 2 config.
 *  - `testDir` points at the folder where the specs actually live (`./tests`).
 *    Keep these in sync — a mismatch means "0 tests collected".
 *  - `baseURL` is set once, so specs navigate with `page.goto('/')` and never
 *    repeat the URL.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
