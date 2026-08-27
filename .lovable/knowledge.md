# Project Knowledge

## Language

Always communicate in English for all conversations in this project.
when you do chat communicating with me unders this project always chat in english language.
project will be italian language but me i am english as developer working with you don't now itali
so alawyas chat with me english. if you do chat with me in italy next time i will say you stupid.

## Project Context

This is a CAF Patronato / financial services website for an Italian audience. The UI content is in Italian, but all AI conversations and development discussions should be in English.

## Project Memory Location

- **Knowledge file**: `.lovable/knowledge.md` (this file)
- **Plan file**: `.lovable/plan.md` (visual redesign plan)
- **Workflow tracking**: `.lovable/memory/workflow/01-plan.md` (completed + pending tasks)
- **Suggestions tracking**: `.lovable/memory/suggestions/01-suggestions.md` (all suggestions)
- **Completed archive**: `.lovable/memory/completed/` (archived completed items)
- **App specs**: `/spec/01-app/` — all application specifications
- **Issue write-ups**: `/spec/02-app/issues/` — documented fixes with RCA and prevention rules
- **Issue template**: `/spec/02-app/issues/_TEMPLATE.md`

## Mandatory Post-Fix Workflow

After completing ANY fix, you MUST:

1. Create/update spec under `/spec/01-app/` with corrected behavior and constraints
2. Create issue write-up at `/spec/02-app/issues/{NN}-{slug}.md` using the template
3. Update this knowledge file with a summary entry in the "Resolved Issues" table below
4. Never skip memory update — the fix is incomplete without it

## Key Technical Decisions

- React + Vite + Tailwind CSS + TypeScript stack
- Shadcn/ui component library with semantic design tokens
- Framer-free animations via `useScrollReveal` hook
- All colors use HSL via CSS variables in `index.css` and `tailwind.config.ts`
- SEO patterns follow attoproperty.com.au structure (see `/spec/01-app/seo-html-generation-rules.md`)
- **CSS/JS Version Tracking**: Every exported CSS and JS file MUST have a version header comment (e.g., `FD-CSS v1.0.0`, `FD-JS v1.0.0`). The version MUST be incremented on every change to that file. Format: `FD-CSS v{major}.{minor}.{patch}` for CSS, `FD-JS v{major}.{minor}.{patch}` for JS. **Additionally, the version number MUST be included in the filename** (e.g., `global.v1.2.2.css`, `blog.v1.0.0.css`) so file changes are immediately identifiable.
- **Sticky Stack Fix**: `position: sticky` MUST be on the **outermost direct child** of the scrolling container. When `<a>` link wrappers are added around sticky cards, the sticky MUST move to the `<a>` — otherwise the card is sticky within its tight `<a>` parent (zero scroll room). Additionally, `caff-interactivity.js` Section 7 (v1.2.0) walks the ENTIRE DOM tree including `body` and `html`, neutralizing overflow, transform, will-change, and contain.
- **JS Script Tag Wrapping**: `caff-interactivity.js` MUST be wrapped in `<script>...</script>` tags (matching how CSS files are wrapped in `<style>` tags) for direct WPCode copy-paste.
- Static HTML/CSS export available in `public/elementor-export/` (see `/spec/01-app/export-strategy.md`)
- **All export CSS files MUST be wrapped in `<style>...</style>` tags** for direct copy-paste into WPCode HTML snippets or Elementor widgets
- **Export CSS wrapper integrity**: `global.css` and every CSS export MUST contain exactly one `<style>` opener at the first line and exactly one `</style>` closer at EOF. Never insert `</style>` before appended CSS sections; otherwise WordPress prints the remaining CSS as visible page text.
- **Export CSS/HTML sync is critical**: HTML class names must EXACTLY match CSS selectors
- All export CSS must use high-specificity selectors with `!important` to beat Astra/Elementor cascade
- Export content must be wrapped in `<div class="caff_site">` for CSS isolation
- **`.container` MUST always have `box-sizing: border-box !important`** — see issue 01

## Resolved Issues

| # | Slug | Summary | Prevention Rule | File |
|---|------|---------|-----------------|------|
| 01 | container-alignment-mismatch | Middle sections 1280px vs header 1232px | `.container` must have `box-sizing: border-box !important` + all 6 properties with `!important` | `/spec/02-app/issues/01-container-alignment-mismatch.md` |
| 02 | single-post-styling-missing | Single blog posts rendered with raw Astra defaults | Every WP template type needs self-contained CSS with shared styles prepended | `/spec/02-app/issues/02-single-post-styling-missing.md` |
| 03 | header-dual-cta-contrast | Button text contrast below WCAG 2.1 AA threshold | All text on colored backgrounds must use explicit `color: #ffffff` with documented contrast ratios | `/spec/02-app/issues/03-header-dual-cta-contrast.md` |
| 06 | sticky-stack-overflow-broken | Sticky stack cards not stacking — wrong sticky target + ancestor overflow | `position: sticky` MUST be on outermost direct child of scroll container; JS ancestor neutralizer required | `/spec/02-app/issues/06-sticky-stack-overflow-broken.md` |
| 08 | blog-card-hover-glow-removal | Blog cards had excessive glowing box-shadow on hover | Blog card hover MUST use `box-shadow: none` — only lift + green left-border for feedback | `/spec/02-app/issues/08-blog-card-hover-glow-removal.md` |
| 09 | blog-hero-subtitle-missing | Blog hero had no subtitle — `.caff-page-hero*` styles missing from blog.css | Page hero styles MUST be synced to blog.css and single-post.css whenever global.css changes | `/spec/02-app/issues/09-blog-hero-subtitle-missing.md` |
| 10 | hero-float-card-animation | Floating card had no animation, hover, or link | No position-shifting hovers; use border glow, icon scale, text color only | `/spec/02-app/issues/10-hero-float-card-animation.md` |
| 11 | header-dual-cta-atto-style | Dual CTA restyled to Atto Property design | Hover uses `filter: brightness()` only — no translateY or scale | `/spec/02-app/issues/11-header-dual-cta-atto-style.md` |
| 12 | hero-image-hover-no-lift | Hero image used translateY on hover | Image hover must use right-side shadow only — no position shifts | `/spec/02-app/issues/12-hero-image-hover-no-lift.md` |
| 13 | hero-dual-state-buttons | Hero buttons had no hover content swap | Dual-state needs both HTML (two-span) and CSS; deploy both together | `/spec/02-app/issues/13-hero-dual-state-buttons.md` |
| 14 | trust-strip-inline-color-override | Elementor inline styles overrode CSS class colors | Remove inline BG in Elementor; JS override as fallback | `/spec/02-app/issues/14-trust-strip-inline-color-override.md` |
| 15 | sticky-stack-card-colors | Card backgrounds didn't match DesignMonks palette | Sync both React and WordPress when updating card colors | `/spec/02-app/issues/15-sticky-stack-card-colors.md` |
| 16 | export-css-wrapper-broken | Appended CSS rendered as visible text because `global.css` had a middle `</style>` | CSS exports must have exactly one `<style>` at BOF and one `</style>` at EOF; validate counts before zipping/deploying | `/spec/02-app/issues/16-export-css-wrapper-broken.md` |

## 🔴 WCAG 2.1 AA Accessibility Compliance

**All UI design MUST meet WCAG 2.1 AA contrast requirements:**

- **Normal text (<18px)**: Minimum 4.5:1 contrast ratio
- **Large text (≥18px or ≥14px bold)**: Minimum 3:1 contrast ratio
- **UI components & icons**: Minimum 3:1 contrast ratio
- **Always use explicit `color: #ffffff`** for text on dark/colored backgrounds
- **Never use opacity-based hovers** that reduce contrast — use `filter: brightness()` instead
- **Document contrast ratios** in CSS comments when creating colored variants
- **Verification**: Use WebAIM Contrast Checker or Chrome DevTools Accessibility panel

## 🔴 MANDATORY SEO Rules (Follow on EVERY Page)

**Source of truth**: `spec/01-app/seo-html-generation-rules.md`

### 1. Title Attributes on EVERYTHING

Every `<a>`, `<Link>`, `<strong>`, `<h1>`, `<h2>`, `<h3>`, `<section>`, container `<div>`, and `<img>` MUST have a keyword-rich `title` attribute with location keywords (Fondi, Latina).

### 2. H1/H2 Internal Linking

All primary headings MUST contain keywords wrapped in `<strong><Link title="...">keyword</Link></strong>`. Never use plain text in H1/H2.

### 3. SEO Class Names

All content containers MUST use: `seo-page-parent-block`, `seo-parent-block`, `seo-page-block`, `seo-container-para`, `paragraph-parent-block`, `inner-seo-header`.

### 4. Keyword Wrapping in Body Text

Every keyword mention in paragraphs MUST be wrapped: `<strong title="..."><Link to="/slug" title="...">Keyword</Link></strong>`. No naked keyword text.

### 5. Key Takeaways (Subpages)

Service subpages include ordered lists with H3 headings containing `<strong><Link>` keyword pairs with detailed titles.

### 6. Service Cards

Image, heading, AND description paragraph ALL wrapped in links with title attributes.

### 7. JSON-LD Schema

Homepage: `LocalBusiness`. Service pages: `Service`. Contact: `LocalBusiness` + `openingHours`.

### 8. Servizi Correlati

Every service page links to 3 other services at the bottom via `<strong><Link title="...">` pattern.

### 9. Image SEO

All images: `alt` + `title` with service+location keywords. Hero: `fetchPriority="high"`, `loading="eager"`.

### 10. Section Titles

Every `<section>` and major container `<div>` has a `title` attribute describing contents with location keywords.

## Spec Files Reference

| File | Purpose |
|------|---------|
| `spec/01-app/seo-html-generation-rules.md` | **PRIMARY** — Complete SEO HTML generation rules |
| `spec/01-app/seo-standards.md` | Summary of SEO standards |
| `spec/01-app/keyword-strategy.md` | Target keywords mapped to pages |
| `spec/01-app/site-architecture.md` | URL structure, nav, internal linking |
| `spec/01-app/export-strategy.md` | Static HTML/CSS export rules |
| `spec/01-app/design-system.md` | Colors, typography, container layout |
| `spec/02-app/issues/_TEMPLATE.md` | Issue write-up template |

## Reusable UI Patterns

### Animated Gradient Border Cards (DesignMonks-style)

**Purpose**: A dark-background section with 4 service cards, each featuring a rotating conic-gradient border animation that sweeps green light around the card edges.

**Files**:
- HTML: `public/elementor-export/blocks/homepage/05b-advantages.html`
- CSS: `global.css` → search for `ADVANTAGES SECTION`

**How it works**:
1. Each `.caff-adv-card` has `position: relative; border-radius: 12px; padding: 2px; overflow: hidden`
2. `.caff-adv-card-glow` is an oversized element (`200% × 400%`) centered with `top/left: 50%`, using a `conic-gradient` with green segments and transparent gaps
3. `@keyframes caff-adv-border-rotate` spins it 360° continuously (`4s linear infinite`)
4. `.caff-adv-card-inner` sits on top (`z-index: 1`) with the dark card background, creating the illusion of an animated border
5. Cards lift 4px on hover with `translateY(-4px)`

**Placement**: Between `05-process.html` and `06-testimonials.html` on the homepage

**To reuse on another project**:
1. Copy the HTML block and CSS section
2. Change card content (icons, titles, descriptions, links)
3. Adjust gradient colors by swapping `#4CAF50` / `#81C784` values
4. Animation speed: change `4s` in `caff-adv-border-rotate` duration

### Sticky Stack Cards (DesignMonks "Industry Wins" style)

**Pattern Name**: `sticky-stack-cards`

**Purpose**: A scroll-driven section where multiple full-width cards "stack" on top of each other as the user scrolls down. Each card has `position: sticky` with incrementally increasing `top` values, so the next card slides up and covers the previous one. Scrolling back up reveals cards in reverse. Creates a premium, immersive browsing experience.

**Files**:
- HTML: `public/elementor-export/blocks/homepage/05c-sticky-stack.html`
- CSS: `global.css` → search for `STICKY STACK CARDS SECTION`

**How it works**:
1. A `.caff-stack-container` wraps all cards (no fixed height needed — natural document flow)
2. Each card is wrapped in `<a class="caff-stack-card-link-wrap">` which has `position: sticky` with increasing `top` (130px, 150px, 170px, 190px) and increasing `z-index` (1–4) via `nth-child()` selectors
3. The inner `.caff-stack-card` has the visual styling (background color, border-radius, overflow hidden) but NO sticky positioning
4. Cards have unique pastel backgrounds (mint, coral, gold, lavender) and large border-radius (20px)
5. Two-column layout: left = category (italic serif), title, description, stats, CTA link; right = large icon in frosted circle
6. On mobile: single column, visual hidden, reduced top offsets
7. **CRITICAL**: `position: sticky` MUST be on the `<a>` wrapper (direct child of `.caff-stack-container`), NOT on the inner `.caff-stack-card` — otherwise the card is sticky within the tight `<a>` parent (zero scroll room)

**Card structure**:
- `.caff-stack-card-category` — italic serif label (e.g., "Dichiarazione", "Agevolazioni")
- `.caff-stack-card-title` — bold Ubuntu heading
- `.caff-stack-card-desc` — Poppins body text
- `.caff-stack-card-stats` — two stat blocks (label + big number)
- `.caff-stack-card-link` — green CTA with arrow icon
- `.caff-stack-card-visual` — right-side icon in frosted glass circle

**To reuse on another project**:
1. Copy HTML block and CSS section
2. Change card count, content, and colors
3. Adjust `top` offsets: increment by 20px per card (start at 80px for sticky header clearance)
4. Change background colors on `.caff-stack-card-{n}` classes
5. Works in Elementor HTML widgets with no JS dependencies

### Sticky Bottom CTA Bar (DesignMonks-style)

**Purpose**: A fixed bottom pill-shaped bar with twin action buttons and an animated green border glow, appearing on scroll.

**Files**:
- HTML: `public/elementor-export/blocks/global/sticky-cta-bar.html`
- CSS: `global.css` → search for `STICKY BOTTOM CTA BAR`

**How it works**:
1. `position: fixed; bottom: 1.25rem` with `z-index: 9999`
2. Hidden by default (`translateY(100px) + opacity: 0`), shown via `.is-visible` class
3. JavaScript toggles `.is-visible` when `scrollY > 400px`
4. **Rotating border glow**: `.caff-sticky-cta` has `padding: 2px; overflow: hidden; border-radius: 9999px`. Inside, `.caff-sticky-cta-glow` is an oversized element (`200% × 600%`) centered with `top/left: 50%`, using a `conic-gradient` with green segments and transparent gaps. `@keyframes caff-border-rotate` spins it 360° continuously (`3s linear infinite`), creating a sweeping border effect around the pill.
5. Twin buttons: dark navy left (Call/`tel:`) + vivid green right (Contact/WhatsApp), separated by white "Or" circle divider

**To reuse on another project**:
1. Copy the HTML block and CSS section
2. Change `tel:` and WhatsApp URLs
3. Adjust colors by swapping `--ast-global-color-0` and `#0f1b2d` values
4. Animation speed: change `3s` in `caff-border-sweep` animation duration

**WordPress deployment**: Paste HTML into a site-wide WPCode snippet (footer position) or Elementor HTML widget in the theme footer.

## Critical WPCode Deployment Rule

**ALWAYS use "HTML Snippet" type in WPCode** (never "CSS Snippet") when pasting CSS files that already contain `<style>` tags. WPCode's "CSS Snippet" type auto-wraps content in `<style>` tags, causing double `<style><style>...</style></style>` which silently breaks all CSS. Similarly, `@import url()` inside `<style>` tags can be unreliable — always use `<link>` tags for font imports placed before the `<style>` block.

### WPCode Setup Checklist
1. Create new snippet → choose **"HTML Snippet"** (not CSS Snippet)
2. Paste the full file content (includes `<link>` + `<style>` tags)
3. Set insertion: **Header** (so fonts load early)
4. Set condition: e.g., "Singular > Posts" for single-post.css, "Archive > Blog" for blog.css
5. Priority: 999 (load after theme styles)
6. Activate the snippet

## 🔴 WordPress Deployment Guide — After Every Change

**After EVERY code change, I will provide a step-by-step deployment checklist so you know exactly what to update on WordPress.**

### What to Update (Decision Tree)

| What Changed | Files to Update on WordPress |
|---|---|
| `global.css` modified | Re-paste `global.css` into the WPCode "Global CSS" HTML snippet |
| `header.html` modified | Re-paste `header.html` into the Elementor HTML widget for the header on every page (or the WPCode site-wide header snippet) |
| `caff-interactivity.js` modified | Re-paste JS into the WPCode "Global JS" HTML snippet |
| A page block (e.g., `02-service-content.html`) modified | Re-paste that block into the corresponding Elementor HTML widget on that specific page |
| New CSS classes added | Update `global.css` on WordPress (same as row 1) |

### Standard Deployment Steps

1. **Open WPCode** → find the relevant snippet (Global CSS, Header, JS, etc.)
2. **Replace the full content** — always do a full replace, never partial edits
3. **Save & Activate** the snippet
4. **Clear all caches** (WP cache plugin + browser cache + CDN if applicable)
5. **Verify on the live site** — check the changed section on desktop and mobile
6. Activate the snippet

## Issue Log

| # | Issue | Fix Version | File |
|---|---|---|---|
| 07 | Mobile menu accordion toggle missing padding, border-radius, borders | FD-CSS v1.2.3 | `spec/02-app/issues/07-mobile-menu-accordion-styling.md` |
| 10 | Hero float card animation + link + hover | FD-CSS v1.2.3 | `spec/02-app/issues/10-hero-float-card-animation.md` |
| 11 | Header dual CTA Atto Property style | FD-CSS v1.2.3 | `spec/02-app/issues/11-header-dual-cta-atto-style.md` |
| 12 | Hero image hover no lift | FD-CSS v1.2.3 | `spec/02-app/issues/12-hero-image-hover-no-lift.md` |
| 13 | Hero dual-state buttons | FD-CSS v1.2.3 | `spec/02-app/issues/13-hero-dual-state-buttons.md` |
| 14 | Trust strip inline color override | FD-JS v1.2.0 | `spec/02-app/issues/14-trust-strip-inline-color-override.md` |
| 15 | Sticky stack card colors updated | FD-CSS v1.2.3 | `spec/02-app/issues/15-sticky-stack-card-colors.md` |
| 16 | Export CSS wrapper broken; appended CSS printed on page | Export v1.3.2 | `spec/02-app/issues/16-export-css-wrapper-broken.md` |

## WordPress Media Library URL Rules

WordPress organizes uploads by year/month: `https://cafpatronatofondi.com/wp-content/uploads/YYYY/MM/filename.jpg`

**CRITICAL**: The month in the URL is determined by **when the image was uploaded**, NOT the current date. When referencing images:
- **Old images** (uploaded in previous months) keep their original month path (e.g., `/2026/03/` for March uploads)
- **New images** (uploaded in the current month) use the current month path (e.g., `/2026/04/` for April uploads)
- **Never change** an existing image's month path — it reflects the actual upload date in WordPress

### Current Asset Paths
| Asset | Upload Month | Full Path |
|-------|-------------|-----------|
| avatar-maria.jpg | 2026/03 | `https://cafpatronatofondi.com/wp-content/uploads/2026/03/avatar-maria.jpg` |
| avatar-anna.jpg | 2026/03 | `https://cafpatronatofondi.com/wp-content/uploads/2026/03/avatar-anna.jpg` |
| avatar-giuseppe.jpg | 2026/03 | `https://cafpatronatofondi.com/wp-content/uploads/2026/03/avatar-giuseppe.jpg` |
| stack-730.jpg | 2026/04 | `https://cafpatronatofondi.com/wp-content/uploads/2026/04/stack-730.jpg` |
| stack-isee.jpg | 2026/04 | `https://cafpatronatofondi.com/wp-content/uploads/2026/04/stack-isee.jpg` |
| stack-redditi.jpg | 2026/04 | `https://cafpatronatofondi.com/wp-content/uploads/2026/04/stack-redditi.jpg` |
| stack-patronato.jpg | 2026/04 | `https://cafpatronatofondi.com/wp-content/uploads/2026/04/stack-patronato.jpg` |
