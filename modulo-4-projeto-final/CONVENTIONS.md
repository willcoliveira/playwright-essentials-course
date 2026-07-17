# Conventions — SauceDemo E2E

The ruleset for this framework. New tests are measured against it.

---

## MUST

1. **Import `test` and `expect` from `fixtures/test.ts`**, not `@playwright/test`
   (the one exception is `tests/auth/auth.setup.ts`, which runs before fixtures).
2. **Web-first assertions only** — `await expect(locator).toBeVisible()`, never
   `expect(await locator.isVisible()).toBe(true)`.
3. **Named timeout constants** from `lib/timeouts.ts` — never magic numbers.
4. **Wrap page-object methods in `test.step()`** for readable traces and reports.
5. **POM**: locators are `private readonly` and defined in the constructor; the test
   never touches a selector.
6. **Instantiate page objects via fixtures**, not direct `new` in specs.
7. **Static data lives in `data/`** — no inline credentials, product names or
   customer info in spec files.

## SHOULD

1. Prefer `getByRole()` / `getByLabel()` / `getByText()`; use `getByTestId()`
   (mapped to `data-test` via `testIdAttribute`) for stable hooks SauceDemo exposes.
2. Name assertion methods `expectXxx()` and action methods after the business intent
   (`login`, `addItemToCart`, `proceedToCheckout`).
3. Use `{ exact: true }` when text could match multiple elements.
4. Prefer positive assertions (`toBeHidden()`) over negated ones (`.not.toBeVisible()`).
5. Test names describe the user journey, not the implementation.
6. Keep flows data-independent where possible (e.g. sorting asserts the algorithm,
   not a hardcoded catalogue snapshot).

## WON'T

1. **No XPath.**
2. **No `page.waitForTimeout()`** — use web-first assertions or `waitFor()`.
3. **No `{ force: true }`** — if a user can't click it, the test shouldn't force it.
4. **No `networkidle`** for synchronization — wait for a user-visible element.
5. **No hardcoded credentials** in spec files (use `data/` or, for real secrets, env).
6. **No `test.only` / `test.skip`** in committed code (`forbidOnly` is on in CI).
7. **No custom retry loops** — use `toPass()` / `expect.poll()`.
8. **POM action methods return `Promise<void>`** — they don't return other page objects.

---

## Project structure

```
pages/                     # one Page Object per page
  components/               # shared, composed UI (header.component.ts)
fixtures/test.ts           # custom fixtures — the test entry point
data/                      # static test data (users, products, checkout)
lib/timeouts.ts            # named timeout constants
tests/
  auth/auth.setup.ts       # global login → storageState
  ui/*.spec.ts             # the suite
examples/                  # naive vs best-practice teaching demos (+ HOW-TO.md)
playwright.config.ts       # baseURL, testIdAttribute, projects, storageState
eslint.config.mjs          # eslint-plugin-playwright enforces several WON'T rules
```

### Naming

- Page objects: `{name}.page.ts` · Components: `{name}.component.ts`
- Specs: `{feature}.spec.ts` in `tests/ui/`
- Data: typed constants/`interface`s in `data/`

---

## Page Object anatomy

```ts
export class LoginPage {
  private readonly usernameInput: Locator;          // private — tests can't reach in
  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId('username'); // locators in the constructor
  }
  async login(user: UserCredentials): Promise<void> { // action = business intent
    await test.step(`Log in as "${user.username}"`, async () => { /* ... */ });
  }
  async expectLoginError(message: string | RegExp): Promise<void> { // expect* = assertion
    await test.step('Verify the login error message', async () => {
      await expect(this.errorMessage).toHaveText(message);
    });
  }
}
```

Shared UI (the header/cart/menu) is a **component** composed into pages:
`inventoryPage.header.expectCartCount(1)`.

---

## Authentication & projects

`auth.setup.ts` logs in once and saves `storageState`. The config splits work into:

- **public-** projects → `auth.spec.ts` (clean state: login, logout, errors)
- **logged-in-** projects → everything else, reusing the saved session

This skips the login UI on most tests and runs the suite across Chromium, Firefox and
WebKit.

---

## Scaling to more environments (when you outgrow one public URL)

SauceDemo is a single public site, so `baseURL` is hardcoded. In a real product you'd
drive it from the environment instead:

```ts
baseURL: process.env.BASE_URL ?? 'https://staging.example.com',
```

Load per-env values with `dotenv`, keep secrets in CI secrets (never in the repo), and
select the env with a flag (`ENV=staging npx playwright test`). The page objects and
tests don't change — only the config does. That separation is the point.

---

## What ESLint enforces for you

`eslint-plugin-playwright` (`flat/recommended`) catches several rules mechanically:
`no-wait-for-timeout`, `no-force-option`, `no-page-pause`, no `test.only`, no
nested/conditional tests. Run `npm run lint` before opening a PR.
