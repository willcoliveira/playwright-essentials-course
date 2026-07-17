import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

/**
 * Flat ESLint config. The Playwright plugin enforces a chunk of the project
 * conventions automatically — no waitForTimeout, no force:true, no leftover
 * page.pause(), no test.only in committed code, etc.
 *
 * Note: examples/01-naive is intentionally NOT linted — it's the anti-pattern
 * showcase (blind waits, one-shot assertions) that the plugin would (correctly)
 * reject. That's the point of it.
 */
export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'playwright-report',
      'test-results',
      'playwright/.auth',
      'examples/01-naive',
    ],
  },
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts', 'examples/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Off by design: our assertions live in page-object expect*() methods
      // (loginPage.expectLoaded(), header.expectCartCount()), so the rule can't see
      // them in the spec body and reports false positives.
      'playwright/expect-expect': 'off',
    },
  },
);
