# Visual Regression Tests

Automated screenshot diffing across every page × breakpoint defined in
`Dr-Arefin-Spec/reviewer/09-responsive-qa.md`. Catches:

- Clipped tooltips / dropdowns
- Horizontal overflow (asserted explicitly per breakpoint)
- Layout reflow regressions (cards, hero stacks, sticky elements)
- Typography scale drift

## Matrix

12 pages × 6 breakpoints = **72 snapshots per run**.

- Pages: see `pages.ts` (`PAGES`)
- Breakpoints: 375 / 414 / 768 / 1024 / 1280 / 1440 (`BREAKPOINTS`)

## One-time setup

```bash
npm i -D @playwright/test
npx playwright install --with-deps chromium
```

## Commands

```bash
# 1. Generate baseline snapshots (first run, or after intentional UI change)
npm run test:visual:update

# 2. Run regression check (fails if anything drifts > 2% pixels)
npm run test:visual

# 3. Run against a deployed preview instead of local dev
PW_BASE_URL=https://id-preview--dd85ce3a-3ea5-4e18-8f29-dd23a76fb449.lovable.app \
  npm run test:visual

# 4. Open the diff report after a failure
npx playwright show-report
```

Baselines are committed to `tests/visual/__snapshots__/`. Treat any diff as a
review-required change: either fix the regression or run `:update` and commit
the new baseline.

## Adding a page

Append to `PAGES` in `pages.ts`. Run `npm run test:visual:update` to seed.

## CI

The config sets `forbidOnly` and `retries: 1` when `CI=true`. Add a workflow
step that runs `npm run test:visual` and uploads `playwright-report/` as an
artifact on failure.
