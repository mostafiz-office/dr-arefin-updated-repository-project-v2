# Issue 05 — Mobile Footer Menu Not Centered

## Summary
On mobile (≤767px), the footer's four columns (Brand, Services, Quick Links, Contacts) remained left-aligned when the grid collapsed to a single column, creating visual imbalance.

## Root Cause
The existing mobile media query in `global.css` centered hero content, buttons, social icons, and the legal row, but did not include the footer column internals: headings (`.caff-footer-heading`), link lists (`.caff-footer-links`), contact items (`.caff-footer-contacts`), and brand elements (`.caff-footer-brand`, `.caff-footer-brand-link`, `.caff-footer-desc`).

## Fix (FD-CSS v1.2.0)
Added centering rules inside the `@media (max-width: 767px)` block for all footer column elements using high-specificity selectors (`body .caff-site`, `body .elementor-widget-html`).

## Prevention Rule
When adding new footer sections or columns, always include their mobile centering rules in the existing `@media (max-width: 767px)` block in `global.css`.
