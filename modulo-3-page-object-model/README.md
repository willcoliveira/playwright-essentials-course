# Module 3 — Page Object Model

The Module 2 SauceDemo tests, refactored to the **Page Object Model**. Same
scenarios, same green result — but the selectors, actions and assertions now live
in reusable page objects instead of inside the spec files.

## What this session expects

- **Page objects** in `pages/` — `LoginPage`, `InventoryPage`, `CartPage`,
  `CheckoutPage` (+ overview/complete for the purchase flow). Locators are
  `private readonly` and defined in the constructor; **the test never touches a selector.**
- A **`HeaderComponent`** (`pages/components/`) composed into `InventoryPage`, so
  cart assertions read as `inventoryPage.header.expectCartCount(1)`.
- **Custom fixtures** (`fixtures/test.ts`) — page objects are injected via
  `base.extend`; specs import `test`/`expect` from there and never call `new`.
- **`data/`** — credentials and product/customer data as typed modules
  (`data/users.ts` replaces Module 2's `.env` for these non-secret values).
- **`getByTestId` + `testIdAttribute: 'data-test'`** — semantic locators instead of
  raw `[data-test="..."]` CSS.
- **`test.step()`** inside every method — the HTML report and trace read as a narrative.
- **`expectXxx()` methods** — web-first assertions (`await expect(...)`), never
  `expect(await locator.isVisible()).toBe(true)`.
- Folders: `pages/`, `tests/`, `fixtures/`, `data/`.

## How to run

```bash
npm install
npx playwright install --with-deps
npm test          # headless
npm run test:ui   # interactive
npm run typecheck # tsc --noEmit
```

## Coverage

| Spec | Scenarios |
|---|---|
| `tests/login.spec.ts` | valid login, locked-out, invalid credentials |
| `tests/cart.spec.ts` | add to cart → badge shows 1 → product in cart |
| `tests/checkout.spec.ts` | full purchase → "Thank you for your order!" |

## Common pitfalls to avoid

- **`expectCartCount` that never asserts.** `await this.cartBadge.isVisible()`
  returns a boolean you then discard — the test passes no matter what. Use a
  web-first assertion: `await expect(this.cartBadge).toHaveText(String(count))`.
- **Setting `testIdAttribute` but never using `getByTestId`.** If you keep raw
  `[data-test=...]` selectors, the config change buys you nothing.
- **Composing the header into only some pages.** Model it once, compose it
  everywhere it appears.
- **Assertions hidden inside action methods.** Keep actions (`login`, `addItemToCart`)
  and assertions (`expect*`) as separate, named methods.
- **Inconsistent file naming.** Pick one convention — `{name}.page.ts` — and hold it.
- **Vacuous assertions** (`toBeDefined()`, order checks with no length guard). Assert
  the actual value or text.

> Next step (Module 4): a saved session (`storageState`) so business flows skip the
> login UI, cross-browser projects, expanded coverage, Docker and CI.

---

Author: William Oliveira
