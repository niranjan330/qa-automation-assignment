# BUG-001: Incorrect Product Images

**Environment:** Chrome  
**Application:** SauceDemo  
**Test account:** `problem_user`  
**Page:** `/inventory.html`  
**Severity:** Medium

## Steps to Reproduce
1. Open https://www.saucedemo.com.
2. Log in with username `problem_user` and password `secret_sauce`.
3. Inspect the product images on the Products page.

## Expected Result
Each product should display its corresponding product image.

## Actual Result
Multiple different products display the same dog image, which does not match their product names or descriptions.

## Impact
Users cannot reliably identify products by their images, potentially leading to incorrect purchasing decisions.

## Evidence
See `bug-reports/evidence/BUG-001.png`.

## Status
Observed; reproducibility should be confirmed with a fresh login.