# Store Test Automation with Playwright

Automated test suite for the Store application at https://playground-drab-six.vercel.app/.

This suite verifies core store features: **Inventory**, **Catalog**, **Cart**, **Payment**, and **Orders**.

---

## Project Overview

- **Target Application**: Store app (Inventory, Catalog, Cart, Payment, Orders) hosted at `playground‑drab‑six.vercel.app/store`.  
- **Test Approach**:  
  - Use POM: each page/feature is represented by a dedicated “page object” encapsulating locators and interaction methods.  
  - Use data‑driven tests: allowing reuse across multiple data sets.  
- **Goals**:  
  - Validate that the main core store workflows work end-to-end.  
  - Ensure robustness, maintainability, and scalability of test code.  
  

---

## Repository Structure

```text

├── README.md                 # This file
├── playwright.config.js      # Playwright test configuration
├── package.json              # Node dependencies and scripts
├── .github
│   └── workflows             # GitHub Actions workflow (playwright.yml)
├── tests
│   ├── data                  # Test data files for data-driven tests
│   │   └── store.data.js
│   ├── pages                 # Page Object Model classes
│   │   ├── cart.page.js
│   │   ├── catalog.page.js
│   │   ├── inventory.page.js
│   │   ├── orders.page.js
│   │   ├── payments.page.js
│   │   └── store.page.js
│   ├── cart.spec.js           # Test specs
│   ├── catalog.spec.js
│   ├── inventory.spec.js
│   └── store.spec.js
├── node_modules              # Dependencies
├── playwright-report         # Playwright generated reports
└── test-results              # Raw test results (screenshots, traces, videos)
```

---


## Playwright Configuration Highlights


```js
export default defineConfig({
  testDir: './tests/',
  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: 'https://playground-drab-six.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

---


#  Example Test Scenarios

### ✓ Inventory

* Add product
* Increase product stock quantity
* Decrease product stock quantity (min: 0)

### ✓ Catalog

* Add item to cart
* Prevent adding OOS items

### ✓ Cart

* Display Cart items
* Calculate Cart totals

### ✓ Payments

* Payment summary
* Payment total value
* Complete purchase

### ✓ Orders

* Display past orders
* Order details

---

# Running Tests

### Run all tests

```bash
npx playwright test
```

### Run individual spec

```bash
npx playwright test tests/store.spec.js

```

### UI Mode 

```bash
npx playwright test --ui
```

### Open last HTML report

```bash
npx playwright show-report
```

---
