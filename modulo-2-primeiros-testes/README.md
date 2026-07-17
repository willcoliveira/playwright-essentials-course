# Module 2 — First Tests

Your first real SauceDemo tests. **Flat style, no Page Object Model yet** — that
refactor is Module 3. The goal here is correct, green, readable specs and the good
habits that carry through the rest of the program.

## What this session expects

- Specs in `tests/` (and `testDir: './tests'` in the config — keep them in sync).
- Four scenarios, each asserting what its name says:
  - valid login → lands on the inventory page;
  - locked-out user → the **"locked out"** error;
  - invalid credentials → the **"do not match"** error;
  - add to cart → the badge shows `1`;
  - complete purchase → **"Thank you for your order!"**
- **Web-first assertions** — `await expect(locator).toHaveText(...)`, never
  `expect(await locator.isVisible()).toBe(true)`.
- **`baseURL` set once** in the config; navigate with `page.goto('/')`.
- **Credentials from the environment** with public-demo fallbacks (`tests/credentials.ts`),
  so nothing secret is hardcoded and the suite still runs without a `.env`.

## How to run

```bash
npm install
npx playwright install --with-deps
cp .env.example .env   # optional — the specs fall back to public creds anyway
npm test
npm run test:ui        # interactive
```

## Common pitfalls to avoid

- **`testDir` ↔ folder mismatch.** If `testDir` says `./tests` but your specs live
  in `src/tests`, Playwright collects **0 tests**. Keep them aligned.
- **Assertion that doesn't match the scenario.** The classic: an "invalid login"
  test that logs in with a valid user and asserts "locked out". Read your own assertion.
- **Scaffold leftovers.** Delete the `example.spec.ts` / playwright.dev demo files
  that ship with `npm init playwright`.
- **Repeating the full URL** in every spec instead of using `baseURL` + `goto('/')`.
- **Committing `.env`.** Keep it gitignored; commit only `.env.example`.
- **Shipping without `npm install` / a green run.** Always run the suite before you deliver.

> Next step (Module 3): refactor these exact scenarios to the Page Object Model.

---

Author: William Oliveira
