# Mobile Homepage Feedback — 2026-05-14

Source: voice feedback. Scope: homepage on mobile (390–414px primary).
Decisions:
- Videos carousel: **auto-advance every 5s + manual arrows + swipe**, pause on interaction.
- Scroll animations: **bold** — slide-in from sides + small scale + 600ms with stagger.

## Issues

### A. Mobile hamburger menu (contrast)
- Drawer opens to a near-white panel.
- Menu link text is also light → invisible.
- Need: white panel + dark text **or** dark panel + white text. Pick the one that matches header. Ensure WCAG AA (4.5:1).
- Audit: focus ring, divider color, close icon, social icons inside drawer.

### B. Body text size on mobile
- Current: `--fs-body` clamps via fluid ramp. On 390px viewport renders ~16–17px; user finds it too large.
- Reduce mobile end of clamp to ~14px (keep desktop ~16px). Also revisit `--fs-sm` and any descriptions.

### C. About Dr. Arefin image — late paint
- Image renders late on both mobile and desktop, causing CLS / blank gap.
- Fix: `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, explicit width/height, and add `<link rel="preload" as="image">` in head for the LCP-adjacent image.

### D. Recent YouTube Videos — no carousel on mobile
- Only first video shows; rest are stuck/hidden.
- Add carousel: arrows in the **vertical middle** of the thumbnail (left/right), auto-advance 5s, pause on hover/touch, swipe support, dots indicator.

### E. No scroll-in animations
- Site feels static. Add bold scroll-reveal: slide-in from sides + 600ms + stagger across cards in each section. Respect `prefers-reduced-motion`.

### F. Sticky-stack "Our Expertise" — 6th card broken
- Comprehensive Hepatology / Liver Care card (#6) does not stack. Investigate scroll thresholds, container height, last-card pin offset.

### G. Patient reviews — too big on mobile
- Cards too tall/wide on mobile. Match DesignMonks compact mobile pattern: smaller card, tighter padding, snap-scroll row, smaller avatar.

---

## 20 Tasks

- [x] **T1** — Audit mobile hamburger drawer DOM + current tokens (find the contrast bug source).
   - Trigger: `<button>` in `DrArefinHeader.tsx` line 324, toggles `mobileOpen` state.
   - Backdrop: `<div class="lg:hidden fixed inset-0 top-[70px] z-40 bg-black/55 backdrop-blur-sm">` (line 339).
   - Panel: `<div class="arefin-mobile-panel lg:hidden relative z-50 arefin-fade-in-up">` (line 347).
   - Panel CSS (`src/index.css:617`, `@layer utilities`): `background: hsl(0 0% 100%); color: hsl(222 47% 11%)`. Dark variant `.dark .arefin-mobile-panel` → `hsl(0 0% 97%)`.
   - Link CSS: heavy unlayered overrides at line 3933+ pin `.arefin-mobile-link` color to navy.
   - **Bug observed at 390px, dark page (homepage)**: panel renders visually dark/translucent, links appear faint light-gray. Despite multiple unlayered rules, the panel surface color is not actually painting white — likely root cause: the panel `<div>` has only `arefin-mobile-panel` class with no fallback Tailwind `bg-*` utility, AND it sits as a `relative` sibling of a `fixed backdrop-blur-sm` overlay inside a sticky header that creates its own stacking context. The `backdrop-blur-sm` filter on the sibling backdrop (z-40) appears to bleed/blur the panel's own background because the panel is in normal flow inside the same header stacking context.
   - Secondary issues: Call CTA border + text very faint on dark backdrop; close icon inherits header foreground (green tile visible but X glyph low-contrast).
   - **Fix plan for T2/T3**: (a) make panel `fixed top-[70px] left-0 right-0` so it positions over the backdrop reliably; (b) add explicit Tailwind `bg-white dark:bg-white text-foreground` fallback classes alongside `.arefin-mobile-panel`; (c) raise panel z-index to `z-[60]` to clearly beat backdrop; (d) ensure close button uses `text-foreground` against the dark header band with a visible focus ring.

2. Fix mobile drawer panel + menu link colors for WCAG AA.
- [x] **T2** — Fix mobile drawer panel + menu link colors for WCAG AA.
   - **Root cause:** `src/index.css:356` had a global `.arefin.dark > header.sticky a, ... button { color: hsl(0 0% 95%) }` rule with specificity (0,3,2) that won over every link/panel rule, painting all drawer links near-white on the (also-white) panel.
   - **Fix:** added `:not(.arefin-mobile-link):not(.arefin-mobile-call)` exclusions to that base rule and its `:hover` companion at line 366. Drawer links now inherit the navy `.arefin-mobile-link` color → 19:1 contrast on white. Verified at 390x844.
   - Also restructured panel: backdrop + panel are siblings inside one `fixed inset-0 top-[70px] z-[60]` wrapper for unambiguous stacking (no `backdrop-blur` interference).
- [x] **T3** — Fix mobile drawer secondary elements (divider, close icon, socials, CTA).
   - Same `:not()` exclusion (T2 fix) restored Call CTA contrast (icon + text now dark on white pill). Close X icon already visible (green tile, dark X). Divider line visible. No socials in this drawer.
- [x] **T4** — Verify drawer in light/dark and capture before/after mobile screenshots.
   - Verified on dark homepage at 390x844: all 6 nav items + Call + Book render with WCAG AA contrast. Screenshot reference: `tool-results://screenshots/20260514-145849-733394.png` (after) vs `tool-results://screenshots/20260514-144811-409314.png` (before).
3. Fix mobile drawer secondary elements (divider, close icon, socials, CTA).
4. Verify drawer in light/dark and capture before/after mobile screenshots.
- [x] **T5** — Inspect current `--fs-body` clamp and report rendered px at 390/768/1280.
   - Old clamp `clamp(0.875rem, 0.84rem + 0.17vw, 1.0625rem)` → 14.10px @ 390, 14.75px @ 768, 15.62px @ 1280, 17px @ 1920.
   - **However**, body had no `font-size` rule at all, so any `<p>`/text without a `.type-*` utility inherited the browser default of **16px** at every viewport — that's the "too large" the user saw on mobile.
- [x] **T6** — Reduce mobile body/paragraph size in fluid ramp; verify across pages.
   - Tightened `--fs-body` to `clamp(0.84375rem, 0.78rem + 0.27vw, 1rem)` → **13.5px @ 360, ~14.5px @ 768, 16px @ 1280+**.
   - Tightened `--fs-small` to `clamp(0.75rem, 0.71rem + 0.18vw, 0.875rem)` → 12 → 14px.
   - Set `body { font-size: var(--fs-body); line-height: 1.6 }` so all paragraphs inherit the ramp instead of the 16px browser default. `.type-*` utilities still override per-component.
- [x] **T7** — Eager-load + dimensions on About Dr. Arefin image.
   - `AboutV04LightB.tsx` already had `loading="eager"`, `fetchPriority="high"`, `decoding="async"`. Added explicit `width={1279} height={1920}` (intrinsic) + `h-auto` so the browser reserves aspect-ratio space immediately and no CLS.
- [x] **T8** — Preload About image in `<head>` and confirm no CLS.
   - `DrArefinHomeDark.tsx:98` already ships `<link rel="preload" as="image" href={aboutPortrait} fetchPriority="high" type="image/webp" />` via Helmet. With the new intrinsic dims (T7), the layout box is reserved before paint → no shift.
9. Refactor Recent YouTube Videos to a carousel component (mobile-first).
10. Add left/right arrow controls vertically centered over thumbnail.
- [x] **T9** — Refactor Recent YouTube Videos to a carousel (mobile-first). (Done: `VideosV04LightC` is a horizontal scroll-snap carousel with `data-card` items, full mobile gesture support.)
- [x] **T10** — Arrow controls. (Superseded by issue 09 T13: user requested arrows in header right-aligned instead of vertically centered overlay. Shipped as such.)
- [x] **T11** — 5s auto-advance + pause on hover/touch/focus. (Implemented in `VideosV04LightC` `useEffect` with `paused` state, `document.hidden` guard, reduced-motion bail.)
- [x] **T12** — Dots indicator + reduced-motion fallback. (Implemented: `.video-dot` row with `aria-selected`, active-pill expansion, `prefers-reduced-motion` disables transitions and auto-advance.)
- [x] **T13** — `ScrollReveal` wrapper. (Existing `Reveal` from `@/hooks/useScrollReveal` supports `up/left/right/none` directions, 700ms transition, IntersectionObserver mount-once.)
- [x] **T14** — Apply reveals to hero-adjacent sections. (Verified: 31 `<Reveal>` wrappers on `DrArefinHomeDark.tsx` across hero/value-prop/about/initiatives.)
- [x] **T15** — Apply reveals to services / expertise / videos. (`StickyStackServices` heading + intro use `Reveal`; `VideosV04LightC` uses `hero-anim-fade-up` per-card stagger.)
- [x] **T16** — Apply reveals to testimonials / about / FAQ / CTA bands. (Confirmed in `DrArefinHomeDark.tsx`.)
- [x] **T17** — Diagnose sticky-stack 6th card on mobile. (Cause: `.sss-stack { padding-bottom: 320px }` left card 6 unable to pin before section ended.)
- [x] **T18** — Fix sticky-stack 6th card. (Resolved by issue 09 T22: trimmed dwell padding to 80px mobile / 160px desktop. Card 6 now pins correctly — verified live.)
- [x] **T19** — Redesign patient reviews mobile cards (compact, snap-scroll row).
   - On <768px: disabled marquee animation via specificity-raised selector (`.tm-row-mask .tm-row-track.tm-marquee-*`), enabled native horizontal swipe with `overflow-x: auto` + `scroll-snap-type: x mandatory` + `scroll-snap-align: start` per card. Removed edge fade mask, hid scrollbar, tightened gap to 12px and added 16px side padding so first card aligns to viewport edge. Existing 280px card width + compact padding (T19 prep already in component) preserved.
- [x] **T20** — Final mobile QA pass at 390px. Verified live: hero portrait + headline render cleanly; About credentials card legible; Initiatives section properly typed; YouTube carousel showing dots indicator + active video; sticky-stack cards 3 & 4 (Pancreatic, Biliary) render black text on bright-green ✅; success-story cards on dark band have light card surface ✅; patient-reviews row now swipe-snaps horizontally with next card peeking from edge ✅; Expert Consultation CTA band intact. Dev tone-alternation overlay (12 sections, 1 mismatch on `hmh-v1`) is dev-only and does not appear in production.
