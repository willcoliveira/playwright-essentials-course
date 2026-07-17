# Module 1 — Introduction

The starting point: install Playwright, understand the project layout, and get a
**first green test** running against [SauceDemo](https://www.saucedemo.com/).

## What this session expects

- A working Playwright + TypeScript setup (`package.json`, `playwright.config.ts`, `tsconfig.json`).
- `baseURL` configured once, so tests navigate with `page.goto('/')`.
- One spec in `tests/` with two smoke checks:
  - the login page renders (title + login button visible);
  - a valid user can log in and reach the inventory page.
- A green run and an HTML report.

## How to run

```bash
npm install                          # install dependencies
npx playwright install --with-deps   # download browsers
npm test                             # run the smoke tests
npm run test:report                  # open the HTML report
npm run test:ui                      # explore tests interactively
```

## What to notice

- Tests use **web-first assertions** (`await expect(...)`) — Playwright auto-waits
  and retries, so no manual `sleep`/`waitForTimeout`.
- `[data-test="..."]` attributes are SauceDemo's stable hooks. Module 3 turns these
  into `getByTestId(...)`; for now, raw selectors are fine.

> Next step (Module 2): expand into a small suite of real scenarios (login variants,
> add-to-cart, checkout).

---

Author: William Oliveira
