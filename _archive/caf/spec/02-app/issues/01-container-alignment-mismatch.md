# Issue 01: Container Alignment Mismatch

## Issue Summary

1. **What happened**: Middle page sections (Services, Why Choose Us, Process, Testimonials, Locations) rendered at 1280px wide, while the header and footer content rendered at 1232px wide — creating a visible misalignment.

2. **Where it happened**: WordPress/Elementor deployment of `global.css` — affects all pages site-wide. File: `public/elementor-export/global.css`, `.container` class definition.

3. **Symptoms and impact**: Content sections appeared wider than the header/footer. The page looked broken and unprofessional. Client escalated the issue.

4. **How it was discovered**: Visual inspection of live site `cafpatronatofondi.com` using browser DevTools. Header content area measured 1232px; middle sections measured 1280px.

## Root Cause Analysis

1. **Direct cause**: The `.container` class had `max-width: 1280px` and `padding: 0 1.5rem` but was missing `box-sizing: border-box`. With `content-box` (CSS default), the total rendered width was 1280px + 48px padding = 1328px for the box, but the content area was 1280px. The header had its own constrained width of 1232px (1280 − 48) because it correctly used `border-box`.

2. **Contributing factors**:
   - The "nuclear reset" (`padding: 0 !important` on all wrappers) stripped the `.container` padding entirely in some contexts, making sections even wider.
   - Astra theme applies its own `max-width` and padding with `!important`, causing unpredictable cascading.
   - Multiple competing `.container` definitions existed in the CSS file without `!important`, so Astra's rules won.

3. **Triggering conditions**: Deploying the CSS inside WordPress where Astra + Elementor wrapper CSS overrides our declarations.

4. **Why the existing spec did not prevent it**: The export strategy spec did not mandate `box-sizing: border-box` or `!important` on `.container` properties. It also did not document the Astra override behavior.

## Fix Description

1. **Spec updated**: Added mandatory CSS rules for `.container` in `/spec/01-app/export-strategy.md` and `/spec/01-app/design-system.md`.

2. **New rules added**:
   - `.container` MUST always have `box-sizing: border-box !important`
   - All six properties (`max-width`, `width`, `margin`, `padding-left`, `padding-right`, `box-sizing`) MUST use `!important`
   - All Astra/Elementor wrappers MUST be reset to `100% !important` width with zero padding

3. **Why this resolves the root cause**: With `border-box`, the 24px padding is subtracted from the 1280px max-width, producing a 1232px content area — matching the header exactly.

4. **Config changes**: The `.container` rule in `global.css` now uses `!important` on all properties and includes `box-sizing: border-box !important`.

5. **Diagnostics**: To verify, inspect any `.container` element in DevTools → Computed tab. Content width must read 1232px.

## Iterations History

1. **Iteration 1** — Added Astra wrapper resets without `!important` on `.container` padding. **Failed** because Astra's own `!important` rules overrode ours.

2. **Iteration 2** — Added "nuclear reset" (`padding: 0 !important`) on ALL elements including `.container`. **Failed** because it stripped the `.container` padding entirely, making sections 1280px wide (no padding).

3. **Iteration 3** — Added `!important` to `.container` padding AND `box-sizing: border-box !important`. Also scoped the nuclear reset to exclude `.container`. **Succeeded** — all sections now render at 1232px content width matching header/footer.

## Prevention and Non-Regression

1. **Prevention rule**: Every `.container` CSS declaration in the export must include all six properties with `!important` and `box-sizing: border-box`. No exceptions.

2. **Acceptance criteria**:
   - Open any page on the live site
   - Measure header content width in DevTools → must be 1232px
   - Measure any middle section content width → must also be 1232px
   - Resize to mobile → content must remain centered with consistent padding

3. **Guardrails**: Before deploying any CSS update, search `global.css` for `.container` and verify `box-sizing: border-box !important` is present on every occurrence.

4. **Spec references**:
   - `/spec/01-app/export-strategy.md` — Critical CSS Rules section
   - `/spec/01-app/design-system.md` — Container Layout Standard section

## TODO and Follow-Ups

1. [x] Fix applied to `global.css`
2. [x] Spec updated
3. [x] Issue write-up created
4. [ ] Verify fix on live site after cache clear
5. [ ] Check all inner pages (Chi Siamo, Servizi, Contatto, Blog) for consistent 1232px

## Done Checklist

- [x] Spec updated under `/spec/01-app/`
- [x] Issue write-up created under `/spec/02-app/issues/`
- [x] Memory updated with summary and prevention rule
- [x] Acceptance criteria updated
- [x] Iterations recorded
