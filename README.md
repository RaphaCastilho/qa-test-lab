# QA Test Lab 🧪

[![CI — Playwright Tests](https://github.com/RaphaCastilho/qa-test-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/RaphaCastilho/qa-test-lab/actions/workflows/ci.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A **quality engineering dashboard** built as a static site and comprehensively tested with **Playwright**. This project serves as a showcase of Playwright testing capabilities — smoke tests, content validation, interactions, responsive design, visual regression, API mocking, and accessibility checks.

→ **Live demo**: [raphacastilho.github.io/qa-test-lab](https://raphacastilho.github.io/qa-test-lab)
→ **Test Guide** (learn how each test works): [tests.html](https://raphacastilho.github.io/qa-test-lab/tests.html)

---

## What this project demonstrates

| Capability | Implementation |
|---|---|
| **Smoke tests** | Route availability, nav links, 404 handling |
| **Content validation** | Metric cards, tables, scenario cards, endpoint list |
| **Interaction tests** | Search, status/suite filters, combined filters, empty state |
| **Responsive design** | 5 viewports (375px–1920px), overflow checks |
| **Visual regression** | Full-page screenshots per route *(local/CI with snapshots)* |
| **API mocking** | Route fulfillment, error simulation, delay, abort |
| **Accessibility** | aria-labels, lang attribute, heading hierarchy, keyboard nav |
| **Cross-browser** | Chromium, mobile Chrome (Pixel 5) |

---

## Quick start

```bash
# Clone
git clone https://github.com/RaphaCastilho/qa-test-lab.git
cd qa-test-lab

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Start the dev server (in one terminal)
npx http-server . -p 3000 -c-1

# Run all tests (in another terminal)
npx playwright test

# Run with UI mode
npx playwright test --ui

# View the HTML report
npx playwright show-report
```

## Project structure

```
qa-test-lab/
├── index.html              # Dashboard — metrics + recent runs
├── scenarios.html          # Test scenarios catalog with filters
├── history.html            # Execution history table
├── endpoints.html          # API endpoint health monitor
├── tests.html              # Interactive test guide & documentation
├── css/
│   └── style.css           # Obsidian + silver theme
├── js/
│   ├── data.js             # Mock test data store
│   └── nav.js              # Shared navbar/footer injection
├── tests/
│   ├── smoke.spec.js       # Smoke tests
│   ├── content.spec.js     # Content validation
│   ├── interaction.spec.js # Search, filter, navigation
│   ├── responsive.spec.js  # Viewport + overflow
│   ├── api-mocking.spec.js # Mock API responses
│   └── accessibility.spec.js # a11y checks
├── playwright.config.js    # Playwright configuration
└── .github/workflows/
    └── ci.yml              # CI — test matrix + GH Pages deploy
```

## CI/CD pipeline

On every push to `main`:

1.  Tests run in parallel across **Chromium** and **mobile Chrome**
2. HTML test reports are uploaded as build artifacts
3. On success, the site is deployed to **GitHub Pages**

---

Built with [Playwright](https://playwright.dev) · Theme: obsidian + silver
