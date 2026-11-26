# BUG-002: Product Sorting Does Not Work

**Environment:** Chrome  
**Application:** SauceDemo  
**Test account:** `problem_user`  
**Page:** `/inventory.html`  
**Severity:** Medium

## Steps to Reproduce
1. Open https://www.saucedemo.com.
2. Log in with username `problem_user` and password `secret_sauce`.
3. Open the product sorting dropdown.
4. Select `Price (low to high)`.
5. Observe the selected dropdown value and product order.
6. Repeat the selection.

## Expected Result
The dropdown should display `Price (low to high)`, and products should be sorted by ascending price.

## Actual Result
The dropdown continues to display `Name (A to Z)` after selecting `Price (low to high)`. The requested sorting does not take effect.

## Impact
Users cannot reliably sort products by price.

## Evidence
See `bug-reports/evidence/BUG-002.png`.

## Status
Reproduced manually with `problem_user`.

## Automated Test
Automated using Playwright:
tests/ui/problem-user.spec.ts

Result: Expected failure (recognized by Playwright using test.fail()).

Observed prices:
29.99, 9.99, 15.99, 49.99, 7.99, 15.99

Expected ascending prices:
7.99, 9.99, 15.99, 15.99, 29.99, 49.99