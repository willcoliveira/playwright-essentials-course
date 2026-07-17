# How to go from a naive test to a best-practice suite

This folder is a teaching artifact. It contains the **same purchase journey twice**:

| File | What it is |
|------|------------|
| [`01-naive/purchase.naive.spec.ts`](01-naive/purchase.naive.spec.ts) | Everything inline. It passes, but it doesn't scale. |
| [`02-best-practice/purchase.spec.ts`](02-best-practice/purchase.spec.ts) | The same flow, rebuilt on this framework. |

Run them:

```bash
# the naive one
npx playwright test --config examples/playwright.config.ts examples/01-naive

# the best-practice one
npm run test:examples
```

Both are green. The difference isn't whether they pass today — it's what happens when
you have **30 tests instead of 1**, and the UI changes next sprint.

---

## The transformations

Each row is one change between the two files, and the convention it applies.

### 1. Hardcoded URL → `baseURL`

```ts
// ❌ naive
await page.goto('https://www.saucedemo.com');
// ✅ best practice — baseURL lives in the config, tests use relative paths
await this.page.goto('/');
```
Change environments (staging, local, CI) in one place instead of in every test.

### 2. Raw selectors in the test → locators in the Page Object

```ts
// ❌ naive — the test knows the HTML
await page.locator('#user-name').fill('standard_user');
// ✅ best practice — the test knows the intent
await loginPage.login(USERS.standard);
```
When `#user-name` changes, you fix **one** constructor, not N tests.
> Skill: *Selector priority* — `getByTestId`/`getByRole` over CSS; **never XPath**.

### 3. Brittle CSS / id → semantic locators

```ts
// ❌ naive
page.locator('.shopping_cart_badge')
// ✅ best practice — SauceDemo exposes data-test, so we configure testIdAttribute
page.getByTestId('shopping-cart-badge')
```
`testIdAttribute: 'data-test'` is set once in the config; `getByTestId` then reads it.

### 4. Blind waits → web-first assertions

```ts
// ❌ naive — guesses how long the app takes
await page.waitForTimeout(2000);
// ✅ best practice — waits for the actual condition, then continues
await expect(this.completeHeader).toHaveText('Thank you for your order!');
```
> Skill: WON'T use `page.waitForTimeout()`. Web-first assertions auto-retry until
> the condition is true or the timeout expires — faster *and* less flaky.

### 5. One-shot assertions → auto-retrying assertions

```ts
// ❌ naive — reads once; fails if the DOM hasn't caught up
expect(await page.locator('.shopping_cart_badge').isVisible()).toBe(true);
// ✅ best practice
await expect(this.cartBadge).toBeVisible();
```
> Skill: MUST use `await expect(locator)…`, never `expect(await locator.isVisible())`.

### 6. Inline magic data → centralized data files

```ts
// ❌ naive
await page.locator('#first-name').fill('Ada');
// ✅ best practice
await checkoutPage.fillInformation(DEFAULT_CUSTOMER); // from data/checkout.ts
```
> Skill: *Data strategy* — assert exact values from static data; generate
> form-filling data from factories. Either way, not inline.

### 7. `new` + `beforeEach` boilerplate → custom fixtures

```ts
// ❌ naive / intermediate — every test wires up its own page objects
const loginPage = new LoginPage(page);
// ✅ best practice — fixtures inject them, already constructed
test('...', async ({ loginPage, inventoryPage }) => { /* ... */ });
```
> Skill: page objects instantiated through **fixtures or a factory**, not direct `new`.
> Tests import `test`/`expect` from `../fixtures/test`, not `@playwright/test`.

### 8. Invisible steps → `test.step()`

Every action and assertion method in the page objects is wrapped in `test.step()`,
so the HTML report and the trace read as a labelled narrative instead of a flat
list of clicks. You get this for free in the best-practice version.

### 9. Assertions scattered in the test → named `expect*()` methods

```ts
// ✅ best practice
await checkoutCompletePage.expectOrderComplete();
```
The intent (`expectOrderComplete`) is named once and reused. The test stops being a
wall of `expect(page.locator(...))` and becomes a journey.

---

## The scoreboard

| Concern | Naive | Best practice |
|--------|-------|---------------|
| UI selector changes | edit every test | edit one page object |
| New environment | find/replace URLs | change `baseURL` |
| Flakiness | blind waits, one-shot reads | web-first auto-retry |
| Readability | reads as HTML | reads as a user journey |
| Reuse across 30 tests | copy/paste | fixtures + page objects |
| Trace/report | flat clicks | labelled steps |

The naive test isn't *wrong* — it's the honest starting point. The framework in this
repo is what it grows into once you need it to scale. See [`../CONVENTIONS.md`](../CONVENTIONS.md)
for the full ruleset.
