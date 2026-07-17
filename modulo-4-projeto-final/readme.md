# Module 4 — Final Project (production-ready SauceDemo E2E)

The production-ready end state of the project. This is the same POM suite from
Module 3, consolidated into a **shippable deliverable**: cross-browser projects,
global auth via `storageState`, expanded coverage, Docker, CI, and a linter/type
gate.

New to the codebase? Read `examples/HOW-TO.md` (naive vs. best-practice, side by
side) and then `CONVENTIONS.md` (the MUST / SHOULD / WON'T ruleset).

## Tech stack

- **Playwright Test + TypeScript**, strict `tsconfig`.
- **Page Object Model** with a composed `HeaderComponent`.
- **Custom fixtures** (`fixtures/test.ts`) inject page objects — no `new`, no `beforeEach` wiring.
- **Global auth** via `storageState` (`tests/auth/auth.setup.ts`) — business flows skip the login UI.
- **Cross-browser projects** — Chromium / Firefox / WebKit, split into `public-*` (no session) and `logged-in-*` (reuse the saved session).
- **ESLint** (`eslint-plugin-playwright`) + `tsc --noEmit` as quality gates.
- **Docker** and **GitHub Actions CI**, version-pinned so browsers never drift.

## Getting started

```bash
npm ci                              # or: npm install (first time)
npx playwright install --with-deps  # install browsers
cp .env.example .env                # optional — only to override BASE_URL
npm test
```

Node version is pinned in `.nvmrc` (`nvm use`). `@playwright/test` is pinned to an
**exact** version (`1.58.2`) so the lockfile, the Docker base image, and CI can
never resolve to different browser builds.

## Running tests

| Command | What it does |
|---|---|
| `npm test` / `make test` | Full suite, all browsers |
| `npm run test:headed` | Visible browser |
| `npm run test:ui` | Interactive UI mode |
| `make test-chromium` | Chromium only (public + logged-in projects) |
| `make test-firefox` / `make test-webkit` | The other engines |
| `npm run test:report` | Open the last HTML report |
| `npm run test:examples` | Run the naive-vs-best-practice teaching demo |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `make docker-build && make docker-test` | Build and run the suite in a container |

Run `make help` for the full target list.

## Test coverage

| Spec | Scenarios | Runs in |
|---|---|---|
| `tests/ui/auth.spec.ts` | valid login, locked-out, invalid credentials, logout | `public-*` (real login each time) |
| `tests/ui/inventory.spec.ts` | add-to-cart badge, remove-all, sort Z→A (data-independent) | `logged-in-*` |
| `tests/ui/cart.spec.ts` | quantity is 1, remove product | `logged-in-*` |
| `tests/ui/checkout.spec.ts` | one-error-at-a-time field validation | `logged-in-*` |
| `tests/ui/purchase.spec.ts` | full E2E: inventory → cart → checkout → confirmation | `logged-in-*` |

## Consolidação do Projeto Final

Everything the final project was asked to deliver, and where it lives:

1. **POM consolidated from Module 3** — `pages/` (login, inventory, cart, checkout,
   checkout-overview, checkout-complete) + `pages/components/header.component.ts`,
   composed into `InventoryPage`. Locators are `private readonly`; tests never touch a selector.
2. **Custom fixtures** — `fixtures/test.ts` injects every page object. Specs import
   `test`/`expect` from there, never from `@playwright/test` (except `auth.setup.ts`).
3. **Global authentication** — `tests/auth/auth.setup.ts` logs in once and saves
   `playwright/.auth/user.json`; the `logged-in-*` projects reuse it via `storageState`.
4. **Expanded coverage** — beyond the Module 3 happy paths: **logout**, **sort**,
   **remove-all-from-cart**, and a full **end-to-end purchase**.
5. **Data-independent assertions** — the sort test asserts the *algorithm*
   (`localeCompare`), not a hardcoded catalogue snapshot, so a product rename never breaks it.
6. **Cross-browser** — Chromium, Firefox, WebKit as Playwright `projects`, split
   public vs. logged-in so the login UI is exercised for real exactly once per engine.
7. **Docker** — `Dockerfile` on `mcr.microsoft.com/playwright:v1.58.2-jammy`, tag
   matched to the installed Playwright version (no browser/client mismatch).
8. **CI** — `.github/workflows/playwright.yml`: clean Linux run on every push/PR,
   Node pinned from `.nvmrc`, npm cache, concurrency cancellation, HTML report uploaded as an artifact.
9. **Quality gates** — ESLint (`eslint-plugin-playwright`) + strict `tsc --noEmit`.
10. **Environment config** — `BASE_URL` is read from the environment (`.env.example`),
    falling back to the public SauceDemo, so the same suite can target staging.
11. **Teaching artifact** — `examples/` keeps the naive vs. best-practice pair and
    `HOW-TO.md` so the "why" of every convention is documented next to the code.

## Architecture notes

- **Auth split** — `public-*` projects carry no session (they test login itself);
  `logged-in-*` projects depend on `setup` and load the saved session.
- **Entry points** — only `LoginPage` and `InventoryPage` expose `goto()`. Every
  other page is reached through the real UI, the way a user would.
- **Centralized metadata** — URL patterns and page titles live as `static readonly`
  fields on the page objects, not scattered as inline strings.
- **Named timeouts** — `lib/timeouts.ts` provides semantic constants; no magic numbers.

---

Author: William Oliveira
