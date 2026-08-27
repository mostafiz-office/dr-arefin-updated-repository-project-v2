# Mobile Version Audit & Enhancement Spec
**Viewport reference:** 390×844 (iPhone 12/13/14)
**Pages audited:** Home (`/`), About (`/about/`), Treatment hub (`/treatment/`), 4 Surgery pages (Liver / Gallbladder / Pancreatic / Biliary), Mentorship (`/mentorship/`), Articles list & single (`/articles/`, `/articles/:slug/`), Gallery (`/gallery/`), Contact / Book Appointment (`/contact/`).
**Date:** 2026-05-13

---

## Findings summary (root causes)

1. **Type ramp violations.** ~79 hardcoded `text-3xl/4xl/5xl/6xl` heading classes across pages. Project Core memory mandates `type-h*` / `text-fluid-*`. On 390px, `text-3xl` (30px) headings sit awkwardly; some H1s overflow at small breakpoints.
2. **Hero overlap & vertical rhythm.** Hero CTAs wrap into 2 rows on mobile and the dual button stack adds vertical bloat; the hero portrait sometimes pushes below the fold cutting CTAs from above-the-fold view.
3. **Footer density.** Specialty-pages pill cluster wraps awkwardly at 390px; 7 social icons in one row are tight; address/email rows lack tap padding.
4. **Header.** Logo lockup ("DR M AREFIN / HEPATOBILIARY PANACEA") sits ≈110px wide leaving narrow whitespace before the burger; mobile menu items lack 48px tap height in some variants.
5. **Sticky-stack & multi-column sections** designed for desktop collapse acceptably but lose visual hierarchy on mobile (cards become same-height stacks; sticky behaviour disabled correctly but section padding doubles up).
6. **Tap targets.** Several inline icon links (`h-8 w-8` Stethoscope/Users/Play in hero/CTA bands) are below the 44×44 WCAG min when wrapped only in an `<a>` with no padding.
7. **Reading width & line length.** Long paragraphs at 390px hit ~38 chars/line which is OK, but `<strong>`-heavy sentences create visually noisy lines; lede paragraphs need slightly tighter `max-w` on mobile.
8. **Articles single page.** TOC sidebar (sticky on desktop) currently renders inline above content on mobile with no collapse — adds significant scroll before the article body.
9. **Gallery.** Masonry/grid spacing too tight; lightbox close button small; horizontal swipe affordance missing.
10. **Contact / Book.** Form inputs use default heights; on iOS Safari focus zooms because `font-size < 16px` on inputs in some places. Map iframe has no `loading="lazy"` in some pages.
11. **Forms / inputs accessibility.** Missing visible focus rings on dark backgrounds; placeholder colour fails AA contrast in dark mode in a few spots.
12. **Mobile-only horizontal scroll risks.** A few `transform: translateX(-100%)` keyframes in marquee/transformations widgets leak ~1px horizontal scroll on some devices.

---

## Implementation plan (46 atomic tasks)

Each task is independently shippable. Status begins `todo`. Work top-to-bottom; one task `in_progress` at a time.

### A. Global mobile foundations (cross-page) — 8
1. Migrate hero H1s to `text-fluid-h1` / `type-h1`
2. Migrate section H2s to `text-fluid-h2` / `type-h2`
3. Migrate section H3/H4 to fluid ramp tokens
4. Replace fixed `py-20 md:py-28` with `py-14 md:py-20 lg:py-28`
5. Enforce 44×44 min tap targets (icon-only links/buttons)
6. Force `font-size: 16px` on form inputs (iOS no-zoom)
7. Add visible focus ring tokens for dark backgrounds
8. Audit & remove residual horizontal-scroll causes (`overflow-x: clip` audit)

### B. Header & nav — 4
9. Compress mobile logo lockup at <420px
10. Increase mobile menu row height to 48px
11. Add scroll-locked body when mobile menu open
12. Highlight active route in mobile menu

### C. Footer — 4
13. Reflow specialty-pages pill cluster at 390px
14. Wrap social icons into 2 rows of 4 with larger touch area
15. Make footer address/email rows full-width tappable
16. Add bottom safe-area padding (`pb-[env(safe-area-inset-bottom)]`)

### D. Home page — 6
17. Tighten hero stack: reduce sub-paragraph max-width on mobile
18. Stack hero CTAs full-width with 12px gap on mobile
19. Move dev `SectionToneValidator` strictly behind `?debug=tone` flag
20. Reduce stories/services card padding on mobile
21. Trim metrics row to 2-up grid on mobile (was 3-up)
22. Lazy-load below-fold YouTube embeds (only iframe on intersection)

### E. About page — 4
23. Stack pillars (3-col → 1-col) with reduced top padding
24. Mission/vision: ensure equal card padding on mobile
25. Credentials grid: 2-col on mobile (currently squeezed 3-col)
26. Hero portrait: cap height on mobile to keep CTA visible above fold

### F. Treatment hub + 4 surgery pages — 6
27. Treatment hub: reduce service card image height on mobile
28. Liver: collapse "Why choose" 4-up grid to 2-up on mobile
29. Gallbladder: tighten procedures accordion padding on mobile
30. Pancreatic: stack stats 2-up; reduce typo size in stat numbers
31. Biliary: ensure inline glossary `<strong>` doesn't break reading rhythm
32. All surgery pages: hero sub-paragraph clamp to 4 lines on mobile

### G. Mentorship — 3
33. "Who can join" 3-col → 1-col stack with dividers
34. Curriculum cards: reduce image aspect on mobile
35. Apply CTA band: full-width primary, secondary becomes link-style

### H. Articles list & single — 4
36. Articles list: switch to single column on mobile, larger thumbnails
37. Articles list: filter chips horizontally scrollable with snap
38. Single article: collapse TOC into accordion above content
39. Single article: increase paragraph spacing & list bullet indent

### I. Gallery — 3
40. Tighten masonry gaps to 8px on mobile
41. Lightbox: increase close-button to 48×48 with safe-area top inset
42. Add swipe affordance hint (subtle indicator on first view)

### J. Contact / Book appointment — 4
43. Form inputs: 48px min height, 16px font-size, full-width
44. Submit button: full-width, sticky-bottom on small viewports
45. Map iframe: `loading="lazy"` + reduced height on mobile
46. Branch contact cards: stack vertically with phone/email as tap rows

---

## Acceptance criteria (applies to every task)

- No horizontal scroll at 320, 360, 390, 414 widths.
- Tap targets ≥44×44 (WCAG 2.5.5).
- All headings use the fluid type ramp.
- No `!important`, no inline styles (project memory).
- No `translateY/X/scale` on hover (project memory).
- Light/dark contrast ≥4.5:1 normal, ≥3:1 large.
- Visual parity with React preview maintained for the WP export.

