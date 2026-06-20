# Playwright QA Lab

[![CI — Playwright Tests](https://github.com/RaphaCastilho/qa-test-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/RaphaCastilho/qa-test-lab/actions/workflows/ci.yml)
[![Portfolio](https://img.shields.io/badge/Portfolio-Rapha.QA-0a0a0a?logo=google-chrome&logoColor=white)](https://raphacastilho.github.io/Portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-raphael--castilho-0A66C2?logo=linkedin)](https://linkedin.com/in/raphael-castilho)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)

Projeto do portfólio de **Raphael Castilho** — Quality Engineer especializado em automação Playwright.

> Dashboard de qualidade que **eu mesmo construí e testei**. Cada página, card e interação tem testes Playwright automatizados validando comportamento, layout, acessibilidade e cenários de falha. 57 testes, 2 navegadores, CI/CD integrado.

→ **Live demo**: [raphacastilho.github.io/qa-test-lab](https://raphacastilho.github.io/qa-test-lab)
→ **Test Guide**: [tests.html](https://raphacastilho.github.io/qa-test-lab/tests.html)

---

## O que este projeto demonstra

| Capacidade | O que os testes validam |
|---|---|
| **Smoke** | Rotas carregam, navbar funciona, 404 tratado |
| **Content** | Cards de métrica, tabelas, listas renderizadas |
| **Interação** | Busca, filtros, estado vazio, navegação |
| **Responsivo** | 5 viewports (375px–1920px), sem overflow |
| **API Mocking** | Mock de sucesso, erro 500, delay, falha de rede |
| **Acessibilidade** | lang, alt text, aria-labels, hierarquia de headings |
| **Cross-browser** | Chromium + mobile Chrome (Pixel 5) |

---

## Quick start

```bash
git clone https://github.com/RaphaCastilho/qa-test-lab.git
cd qa-test-lab
npm install
npx playwright install --with-deps
npx http-server . -p 3000 -c-1
npx playwright test
npx playwright test --ui
npx playwright show-report
```

## Project structure

```
qa-test-lab/
├── index.html              # Dashboard — metrics + recent runs
├── scenarios.html          # Test scenarios catalog with filters
├── history.html            # Execution history table
├── endpoints.html          # API endpoint health monitor
├── tests.html              # Test guide & documentation
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

1. Tests run in parallel across **Chromium** and **mobile Chrome**
2. HTML test reports are uploaded as build artifacts
3. On success, the site is deployed to **GitHub Pages**

---

Built with [Playwright](https://playwright.dev) · Theme: obsidian + silver<br>
[Rapha.QA Portfolio](https://raphacastilho.github.io/Portfolio) · [LinkedIn](https://linkedin.com/in/raphael-castilho)
