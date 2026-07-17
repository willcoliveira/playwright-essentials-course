# SauceDemo E2E — task runner.
# Every browser target below maps to a project that actually exists in
# playwright.config.ts. (The classic gotcha: `--project=chromium` fails with
# "Project(s) not found" when the config has no matching project name.)

.DEFAULT_GOAL := help
DOCKER_IMAGE := saucedemo-projeto-final

.PHONY: install test test-headed test-ui test-chromium test-firefox test-webkit \
        report typecheck lint docker-build docker-test docker-clean clean help

install: ## Install dependencies and browsers
	npm ci
	npx playwright install --with-deps

test: ## Run the full suite (all projects, all browsers)
	npx playwright test

test-headed: ## Run with a visible browser
	npx playwright test --headed

test-ui: ## Open the Playwright UI mode
	npx playwright test --ui

test-chromium: ## Run only the Chromium projects (public + logged-in)
	npx playwright test --project=public-chromium-desktop --project=logged-in-chromium-desktop

test-firefox: ## Run only the Firefox projects (public + logged-in)
	npx playwright test --project=public-firefox-desktop --project=logged-in-firefox-desktop

test-webkit: ## Run only the WebKit projects (public + logged-in)
	npx playwright test --project=public-webkit-desktop --project=logged-in-webkit-desktop

report: ## Open the last HTML report
	npx playwright show-report

typecheck: ## Type-check without emitting
	npm run typecheck

lint: ## Lint the project
	npm run lint

docker-build: ## Build the test image
	docker build -t $(DOCKER_IMAGE) .

docker-test: ## Run the suite inside the container
	docker run --rm $(DOCKER_IMAGE)

docker-clean: ## Remove the test image
	docker rmi $(DOCKER_IMAGE) || true

clean: ## Remove generated artifacts
	rm -rf playwright-report test-results blob-report playwright/.auth

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
