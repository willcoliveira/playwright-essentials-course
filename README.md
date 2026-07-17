# Playwright Essentials Course

**Playwright Essentials** is a hands-on Playwright + TypeScript course that builds an
end-to-end test suite for [SauceDemo](https://www.saucedemo.com/), one module at a
time — from your first test to a production-ready project. Each folder is a
self-contained, runnable Playwright project you can compare your own work against.

## The progression

| Module | Folder | End state | Introduces |
|---|---|---|---|
| 1 — Introdução | [`modulo-1-introducao`](./modulo-1-introducao) | Setup + first green smoke test | `baseURL`, `goto('/')`, web-first assertions, HTML report |
| 2 — Primeiros Testes | [`modulo-2-primeiros-testes`](./modulo-2-primeiros-testes) | 4 flat scenarios green | env-driven creds, `testDir` sync, assertion↔scenario match |
| 3 — Page Object Model | [`modulo-3-page-object-model`](./modulo-3-page-object-model) | Same scenarios via POM | `pages/` + `HeaderComponent`, `base.extend` fixtures, `data/`, `getByTestId` + `testIdAttribute`, `test.step`, `expectXxx()` |
| 4 — Projeto Final | [`modulo-4-projeto-final`](./modulo-4-projeto-final) | Production-ready suite | `storageState` auth, cross-browser projects, expanded coverage, `examples/`, `CONVENTIONS.md`, Docker, CI, quality gates |

Each module builds on the one before it. The diff from one module to the next is the
lesson of that module.

## What you need to know by the end

- **Config basics** — `baseURL`, `testDir` aligned with your specs, the HTML reporter.
- **Web-first assertions** — `await expect(locator)...`, never `expect(await locator.isVisible()).toBe(true)`.
- **Semantic locators** — `getByRole` / `getByTestId` (with `testIdAttribute: 'data-test'`), not brittle CSS.
- **Page Object Model** — locators `private readonly` in the constructor; the test never touches a selector.
- **Component composition** — a shared `HeaderComponent` reused across pages.
- **Custom fixtures** — page objects injected via `base.extend`; no `new`, no `beforeEach` wiring.
- **Typed test data** — credentials, products and customer info in `data/`, not inline.
- **`test.step()`** — so the trace and report read as a narrative.
- **Global auth** — log in once, save `storageState`, reuse it across business flows.
- **Cross-browser projects** — Chromium / Firefox / WebKit.
- **Shipping it** — Docker, GitHub Actions CI, ESLint + `tsc` quality gates.

## What you need to deliver (final project)

Module 4's README has the full **"Consolidação do Projeto Final"** checklist — the
production-ready deliverable and exactly where each requirement lives in the code:
POM consolidated from Module 3, custom fixtures, `storageState` auth, expanded
coverage (logout, sort, remove-all, full E2E purchase), data-independent assertions,
cross-browser, Docker, CI, quality gates, and environment config.

## Running any module

Every folder is independent:

```bash
cd modulo-3-page-object-model   # or any module
npm ci
npx playwright install --with-deps
npm test
```

Node is pinned in each `.nvmrc` (`nvm use`). `@playwright/test` is pinned to an exact
version across all modules, with committed lockfiles, so installs are reproducible.

---

Author: William Oliveira
