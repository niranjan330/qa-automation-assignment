
# Junior QA Automation Engineer Assignment

## Project Overview

This project contains UI automation, API automation, legacy test improvements, and exploratory testing for the SauceDemo application and Restful Booker API.

**Framework:** Playwright  
**Language:** TypeScript  
**Tools:** Node.js, npm, Git, VS Code

## Applications Under Test

- UI: https://www.saucedemo.com
- API: https://restful-booker.herokuapp.com

## Project Structure

```text
qa-automation-assignment/
├── bug-reports/
│   ├── BUG-001-incorrect-product-images.md
│   ├── BUG-002-product-sorting-not-working.md
│   └── evidence/
│       ├── BUG-001.png
│       └── BUG-002.png
├── fixtures/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── api/
│   │   └── booking.spec.ts
│   ├── legacy/
│   │   ├── legacy.original.ts
│   │   └── legacy.spec.ts
│   └── ui/
│       ├── login.spec.ts
│       ├── inventory.spec.ts
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── problem-user.spec.ts
├── utils/
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js
- npm
- Git

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd qa-automation-assignment
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run UI tests:

```bash
npx playwright test tests/ui --project=chromium
```

Run API tests:

```bash
npx playwright test tests/api --project=chromium
```

Run legacy stability tests:

```bash
npx playwright test tests/legacy --project=chromium --repeat-each=10 --workers=4
```

Run the known problem-user sorting test:

```bash
npx playwright test tests/ui/problem-user.spec.ts --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## UI Automation

UI automation uses the Page Object Model (POM).

Implemented scenarios include:

- Successful login.
- Unsuccessful login for a locked-out user.
- Product sorting verification.
- Add and remove products from the cart.
- Cart badge and cart contents validation.
- Cart persistence after page reload.
- Checkout information validation.
- Subtotal, tax, and total calculation validation.
- Successful order completion.

## API Automation

API tests cover:

- Retrieve booking IDs.
- Create a booking.
- Retrieve a booking by ID.
- Update a booking using PUT.
- Partially update a booking using PATCH.
- Delete a booking.
- Verify deleted bookings return 404.
- Invalid booking ID.
- Missing required fields.
- Invalid authentication.

The CRUD lifecycle test creates its own booking and deletes it after verification.

## Legacy Test Improvements

The original legacy tests are preserved in:

`tests/legacy/legacy.original.ts`

Corrected tests are maintained in:

`tests/legacy/legacy.spec.ts`

Improvements include:

- Awaiting asynchronous Playwright actions.
- Removing shared mutable state.
- Replacing brittle XPath locators.
- Using meaningful web-first assertions.
- Verifying exact cart item counts.
- Comparing actual product prices to the expected sorted order.

### Stability Test Result

Command:

```bash
npx playwright test tests/legacy --project=chromium --repeat-each=10 --workers=4
```

Result:

- Total executions: 40
- Passed: 40
- Failed: 0
- Workers: 4

### Flakiness Prevention Practices

1. Use Playwright auto-waiting and web-first assertions instead of fixed timeouts.
2. Keep tests independent by avoiding shared mutable state and using isolated test data.

## Exploratory Testing Findings

Testing was performed using `problem_user` and `performance_glitch_user`.

### BUG-001: Incorrect Product Images

**User:** `problem_user`

Multiple products display the same dog image instead of their corresponding product images.

**Severity:** Medium

Evidence: `bug-reports/evidence/BUG-001.png`

### BUG-002: Product Sorting Does Not Work

**User:** `problem_user`

Selecting Price (low to high) does not update the selected sorting option or correctly sort the product prices.

**Severity:** Medium

Evidence: `bug-reports/evidence/BUG-002.png`

Automated verification is implemented in:

`tests/ui/problem-user.spec.ts`

The known defect is marked as an expected failure using Playwright's `test.fail()`.

### Performance Glitch User

The following checks were performed:

- Login completed in approximately 1–2 seconds.
- Products page loaded successfully.
- Adding a product to the cart worked successfully.

No defect was observed in these checks.

## AI Assistance

AI assistance was used to support test implementation, debugging, test design, and documentation. All generated code and test results were reviewed and executed locally.

## Known Limitations

- Exploratory testing was limited to the scenarios documented above.
- The known product sorting defect is expected to fail until the application is fixed.
- Browser execution and test results may vary depending on the test environment and application availability.

