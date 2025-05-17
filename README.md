# 🎭 Playwright Visual Regression and Accessibility Testing Project

## 🚀 Project Overview

Welcome to my Playwright-based automated testing framework! This project is built with scalability, maintainability, and test clarity in mind. I’ve implemented the **Screenplay Pattern** to organize interactions and assertions in a clean, actor-centric manner. It supports **visual regression** and **accessibility testing** across multiple browsers and devices.

---

## ✨ Key Features

### 1️⃣ Screenplay Pattern Implementation

This framework is structured using a custom **Screenplay Pattern**, which separates responsibilities and encourages reusability:

* **🎓 Abilities**: Define what actors can do

  * `BrowserAbility.ts`: Manages browser sessions
  * `BaseAbility.ts`: Abstract class for shared functionality

* **🧑‍🎤 Actors**: Represent test users

  * `Actor.ts`: Each actor can be equipped with different abilities

* **🎬 Tasks**: High-level user actions

  * `ClickElement.ts`: Handles clicks
  * `HoverElement.ts`: Handles hover interactions
  * `NavigateTo.ts`: Handles navigation
  * `ScrollToElement.ts`: Ensures lazy content loads

* **🔍 Questions**: Assertions and queries

  * `ElementVisibility.ts`: Checks if elements are visible
  * `PageTitle.ts`: Gets the page title
  * `Url.ts`: Retrieves the current URL

### 2️⃣ Comprehensive Browser & Device Testing

Via `playwright.config.ts`, this setup supports:

* **💻 Desktop Browsers**

  * Chromium
  * Firefox
  * WebKit (Safari)
  * Microsoft Edge
  * Google Chrome

* **📱 Mobile Browsers**

  * Mobile Chrome (Pixel 5)
  * Mobile Safari (iPhone 12)
  * Mobile Firefox

### 3️⃣ Visual Regression & Accessibility

* 📸 **Visual Regression**

  * Snapshot comparison with configurable threshold (0.1% tolerance)
  * `toHaveScreenshot({ fullPage: true })` enabled
  * Screenshots saved on failures

* ♿ **Accessibility Testing**

  * Uses `axe-playwright` for automated a11y scans
  * Integrates directly in test flow

* 🎥 **Diagnostics**

  * Video recording on first retry
  * Traces collected to debug flaky tests

### 4️⃣ Solid Test Configuration

* ⏱ 60s timeout per test
* 🧪 Parallel test execution
* 🔁 2 retries in CI environments
* 📊 HTML report generation
* 🔍 Trace & screenshot capture on failure

### 5️⃣ NPM Scripts

```json
"scripts": {
  "test:e2e": "npx playwright test tests/",
  "test:e2e:all": "npx playwright test",
  "test:e2e:ci": "CI=1 npx playwright test --project=ci --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL",
  "test:e2e:dev": "npx playwright test tests-examples/ --project=chromium --headed --retries=0 --reporter=line",
  "test:e2e:smoke": "npx playwright test tests-examples/ --grep @smoke",
  "test:visual:accessibility": "npx playwright test visual-accessibility.spec.ts"
}
```

Use these scripts to streamline test execution in various environments.

### 6️⃣ Core Dependencies

* `@playwright/test` – for browser automation
* `axe-playwright` – for accessibility testing
* `@applitools/eyes-playwright` – for visual snapshots
* `typescript` – for a typed, scalable codebase

---

## 🗂 Project Structure

```
├── abilities/
├── actors/
├── questions/
├── tasks/
├── visual-accessibility.spec.ts-snapshots/
├── playwright-page.spec.ts
├── visual-accessibility.spec.ts
├── playwright-report/
├── package.json
├── playwright.config.ts
└── README.md
```

Modular, maintainable, and scalable. Easy to extend for more features.

---

## 🧪 Testing Approach

* ✅ Actor-based design with the Screenplay Pattern
* ✅ Snapshot-based visual regression testing
* ✅ Automated accessibility checks with `axe-core`
* ✅ Cross-browser & device coverage
* ✅ CI/CD ready with retries and reporting

This setup reflects a professional-grade test architecture with strong emphasis on clarity, reusability, and real-world web quality metrics (visual + accessibility). Perfect for robust frontend validation.

---

Below i added screenshots if you want to check how it will look on built-in pw report, also there is `index.html` you can open inside `playwright-report` folder.

---

## Viewport issue on first run example
![Viewport issue on first run example](https://github.com/user-attachments/assets/47eae257-7607-4391-8f7b-3a5faa449077)

## Passing visual reg run example
![Passing run example](https://github.com/user-attachments/assets/757e41eb-abc4-430f-9ed5-458386161747)

## Accessibility Issue Result
![Accessibility Issue Result](https://github.com/user-attachments/assets/34426a59-a08e-438c-9666-8577d803dc2f)

---

💬 **Let me know if you'd like to explore how this pattern can fit into your project too!**
