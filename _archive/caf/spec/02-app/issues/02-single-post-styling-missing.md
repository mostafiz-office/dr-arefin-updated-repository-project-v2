# Issue 02: Single Blog Post Styling Missing on WordPress

## Issue Summary

1. **What happened**: Single blog posts on WordPress (e.g., `/documenti-per-dichiarazione-730-fondi-cosa-serve/`) rendered with raw Astra defaults — no brand typography, unstyled title flush to left edge, full-bleed featured image with no constraints, and missing custom header/footer.
2. **Where it happened** (feature/module + file paths): WordPress single post template. File: `public/elementor-export/single-post.css` (newly created).
3. **Symptoms and impact**: Title at 0px left padding, no Ubuntu font on headings, no container centering for content, featured image edge-to-edge without border-radius, body text unstyled with wrong font, missing sticky CTA bar.
4. **How it was discovered**: User reported via screenshot that single blog posts looked broken compared to brand design.

## Root Cause Analysis

1. **Direct cause**: `global.css` was excluded from single post pages via WPCode conditional loading (only loaded on specific Elementor pages). `blog.css` only targets `body.blog` (archive). No CSS existed for `body.single-post`.
2. **Contributing factors**: WordPress conditional CSS loading requires separate snippets per template type.
3. **Triggering conditions**: Navigating to any single blog post URL.
4. **Why the existing spec did not prevent it**: The export strategy only documented archive blog styling, not single post styling.

## Fix Description

1. **What was changed in the spec**: Added single-post.css to the export file organization and documented deployment condition.
2. **New rules or constraints added**: Every WordPress template type (archive, single post, page) that excludes `global.css` must have its own self-contained CSS file with shared styles prepended. All CSS files must use `<link>` for font imports (outside `<style>` tags) and be deployed via WPCode **"HTML Snippet"** type (never "CSS Snippet") to avoid double `<style>` wrapping.
3. **Why the fix resolves the root cause**: `single-post.css` includes all shared foundation styles (variables, typography, header, footer, sticky CTA) plus post-specific overrides targeting Astra's native `body.single-post.ast-separate-container` selectors.
4. **Config changes or defaults affected**: WPCode snippet must be created as **HTML Snippet** type, with condition set to "Singular > Posts", insertion point "Header", priority 999.
5. **Logging or diagnostics required**: None.

## Prevention and Non-Regression

1. **Prevention rule**: When creating conditional CSS for any WordPress template, always prepend shared styles (variables, fonts, header, footer, CTA, sticky bar) before template-specific overrides. Never assume `global.css` is loaded.
2. **Acceptance criteria / test scenarios**: 
   - Single post title uses Ubuntu 2.5rem, centered within 780px max-width, text-align center
   - Featured image has 12px border-radius and 16:9 aspect ratio within 780px
   - Body content centered at 720px with Poppins 1.05rem
   - Entry-header area has centered layout with 48px top padding and 24px horizontal padding
   - Meta row (author, date) is centered with justify-content: center
   - Related posts section: 2-column grid within 900px, cards have 12px radius, hover lift effect, image zoom
   - Related posts mobile: single column grid
   - Footer has proper top spacing (48px padding-bottom on .site-content)
   - Comments area has 40px top padding with border-top separator, no overlap with related posts
   - Custom header and footer render correctly
   - Sticky CTA bar appears on scroll
   - Mobile: title scales to 1.75rem, content to 1rem
3. **Guardrails or linting policies**: Check all WPCode snippets cover all template types. Use "HTML Snippet" type, never "CSS Snippet".
4. **Spec references**: `/spec/01-app/export-strategy.md`, `.lovable/plan.md`

## Open Issues (from screenshot review 2026-04-02)

The following design problems remain on the single post template:

### P1 — Related Posts cards use Astra defaults ✅ CSS FIX READY
- **Status**: CSS updated in `single-post.css` v1.1.0 — transparent background, brand border-left hover, styled category pills, Poppins meta text

### P2 — Post navigation unstyled ✅ CSS FIX READY
- **Status**: CSS updated — constrained to 780px, Poppins font, top border separator, responsive stacking on mobile

### P3 — Comments section uses Astra defaults ✅ CSS FIX READY
- **Status**: CSS updated — 8px border-radius inputs, green focus ring, Poppins font, branded submit button, comment list styling

### P4 — "UNCATEGORIZED" category pills ⚠️ MANUAL WP ACTION
- **Action needed**: Assign proper categories to all blog posts in WordPress admin (e.g., "730", "ISEE", "Patronato", "Bonus", "Permessi")

### P5 — Missing sticky sidebar ✅ CODE READY
- **Status**: CSS sidebar styles added to `single-post.css` v1.1.0. PHP snippet created at `blocks/single-post/caff-single-post-sidebar.php` for WPCode deployment. Static HTML reference at `blocks/single-post/sidebar.html`.
- **Deployment**: Add PHP snippet to WPCode → PHP Snippet → Run Everywhere → Priority 10

## Done Checklist

- [x] Spec updated under `/spec/01-app/` (plan.md updated)
- [x] Issue write-up created under `/spec/02-app/issues/`
- [x] Memory updated with summary and prevention rule
- [x] Acceptance criteria updated or added
- [x] Iterations recorded if applicable (N/A — single iteration)
