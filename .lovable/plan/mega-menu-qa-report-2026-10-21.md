# QA REPORT — Dr. Arefin Mega Menu (build c3836a1)

Date: 2026-10-21. Test list: `mega-menu-qa-test-list-2026-10-21.md` (40 cases, groups A–K).
Evidence: Atto live CSS/markup (their combined stylesheet + inline style blocks), our source + CSS,
WCAG contrast computed with the standard luminance formula, route crawl, content-overlap sampling.
Not covered here: pixel screenshots (impossible from this VM — the owner's Lovable preview check covers it).

**Score: 31 PASS · 5 PARTIAL · 4 FAIL** (of 40; group A is reference findings, not scored)

---

## A. How Atto actually built theirs (live evidence)

- **Technology:** Zakra WordPress theme + hand-coded custom menu (classes `ds-services-mega-menu`, `has-ds-mega-menu`) — not an off-the-shelf plugin. Desktop and mobile are two separate DOM blocks.
- **Desktop (≥1201px):** pure CSS `:hover` → `display:block`. **No open animation, no dwell, no close delay, no keyboard opening.** Panel = full-viewport-width bar; inner card max-width 1200px, radius 22px, border #e1e9f2, deep soft shadow. Grid: **296px rail + 1fr**. Rail bg pale blue-grey #f3f7fb. Rail and detail columns have `max-height:100%` + scroll.
- **Rail item:** padding 11px 12px, radius 12px, icon tile 40×40 radius 10. Hover = white bg + soft shadow + a "›" arrow fades/slides in. Active service: icon tile fills blue **#1d3fd6** (their `--second-prmary`), icon turns white.
- **Detail:** padding 24px 26px; title 21px/600 colour #001837. Locations label 11.5px uppercase, colour #6b7a90 (contrast 4.36:1 — below AA for that size). Locations grid 3 columns (their CSS collapses it 3→2→1 at narrower widths). Location item: dot bullet (opacity .55), **hover = pale green bg #e0f0d4 + dot scales up**.
- **Buttons:** filled = blue #1d3fd6, white text (contrast **7.68:1 PASS**); **hover turns GREEN #3f9326** (3.88:1). Call (outline) hover also goes green (#54b435 border / #3f9326 text). Atto's brand quietly mixes blue primary + green hover accents; the trust-line tick is green #22c55e.
- **Mobile (≤1200px):** the mega is replaced by an accordion inside the nav item: service rows, **44×44px** location toggles, nested location lists, panel `max-height:70vh` with scroll. Same pattern we implemented (ours switches at 1024px instead of 1200px).
- **Verdict vs ours:** we match or beat Atto on animation (they have none), switching dwell/grace (none), mobile pattern, tap targets. They beat us on filled-button contrast and on panel height safety (scrolling columns). Their location hover (bg pill) is a stronger affordance than our colour-only hover.

## B–K. Our menu — results

### B. Default state — PASS ×4
Header composition untouched (diff only adds the Treatment panel + data); panel is unmounted when closed, so it can't block hero clicks; nav resting colours unchanged.

### C. Hover/open — PASS ×5
250ms reveal with the project's existing keyframes; fixed-centred panel `min(1120px, 100vw−32px)` verified geometrically at 1024/1280/1440/1920 (can never clip); 150ms close grace on both item and panel; chevron 300ms rotate; leaving the header closes it.

### D. Rail — PASS ×6
8 services in plan order, names/count derived from data (crawl-verified); hover = 12% tint + 3px left border + name→bright, 300ms, zero movement; selected state persists with its pane.

### E. Detail pane — PASS ×6 · PARTIAL ×1 · FAIL ×1
- Default service Gallbladder ✓; dwell/focus switching ✓; description clamped ✓; Call button href/display ✓ (contrast 14.71:1).
- **E3 PARTIAL:** height is locked at ≥1280px (rail drives 592px), but at **1024px** the panel grows ~60px when "Liver Transplant Coordination" is selected — its area labels wrap to 3 lines in the ~195px columns.
- **E5 FAIL (contrast):** see G5.

### F. Links & data — PASS ×3 · PARTIAL ×1
- 129/129 menu hrefs resolve; hub mapping verified incl. Bile Duct → `/treatment/biliary-tract-surgery/`; sitemap 447 entries with all 120 area URLs.
- **F2 PARTIAL:** generated area-page body = **178 words**; same-service pages share **69.9%** of unique words (different-service/same-area: 53.7%). The matrix authoring rule asks for >500 unique words per page — fine for preview, **must be enriched before the WordPress/SEO phase**.

### G. Contrast (WCAG AA = 4.5:1 normal text) — PASS ×5 · PARTIAL ×1 · FAIL ×1
| Pair | Ratio | Result |
|---|---|---|
| Panel title / panel bg | 16.08 | PASS |
| Description / panel bg | 8.42 | PASS |
| Rail count + labels / panel bg | 7.73 | PASS |
| Area links / panel bg | 12.19 | PASS |
| Area links hover (green) / panel bg | 7.15 | PASS |
| Call button text / panel bg | 14.71 | PASS |
| Green on dark navy (dark pages nav) | 5.68 | PASS |
| **Filled button: white on #14bb3e (default)** | **2.56** | **FAIL** |
| Filled button: white on #079a14 (hover) | 3.72 | large-text only |
| Nav hover/active green on WHITE header | 2.56 | FAIL — pre-existing brand pattern (old menu too); dark pages pass |

Fix maths for the button: dark ink text (#0A1F10) on the bright green = **6.75:1 PASS**.

### H. Spacing & alignment — PASS ×3 · PARTIAL ×1
Rail 302px / Atto 296–300px class; icon tile 40px, gaps and paddings per spec; radius 16 + warm border consistent. H4 partial = the transplant-label wrapping behind E3.

### I. Responsive — PASS ×5 · FAIL ×1
- ≥1440 / 1280 / 1024 geometry ✓ (area columns 195px at 1024).
- **I4 FAIL:** panel height ≈592px with **no max-height or scroll** — on short viewports (effective height < ~670px, e.g. small laptops with browser chrome) the panel bottom is cut off. Atto's columns scroll; ours must too.
- Tablet (768–1023) = drawer + nested accordion ✓; phones 390/360 ✓ (44px targets, long names wrap); touch-laptop first-tap ✓.

### J. Keyboard & a11y — PASS ×3 · PARTIAL ×2
Esc closes ✓; focus switches the pane ✓; focus rings ✓; aria attributes ✓; reduced-motion ✓.
- **J1/J2 PARTIAL:** keyboard focus does **not open** the panel (mouse-only open, same as Atto). A keyboard user pressing Enter still reaches `/treatment/` — graceful, but the panel itself is mouse/touch-only today.

### K. Regression — PASS ×4
Build + TS clean; exports unchanged; small-dropdown code path untouched; mobile scroll-lock/route-close intact; bundle delta reported (+~30KB raw, page data).

---

## IMPROVEMENT PLAN (nothing here is implemented yet — approval first)

- **P1 (High) Filled-button contrast:** switch [Treatment page →] to dark ink text on bright green (6.75:1); hover = brightness(0.94) instead of the darker bg (keeps AA in all states). One CSS rule change. (Alternative if you dislike dark text: accept 2.56:1 as a brand exception — not recommended.)
- **P2 (High) Keyboard opening:** open the panel when the Treatment link receives keyboard focus; close when focus leaves the whole item. ~10 lines in the header.
- **P3 (High) Short-viewport safety:** panel `max-height: calc(100dvh − 90px)`; rail and detail get `overflow-y:auto` — mirrors Atto's scrolling columns.
- **P4 (Medium) Height growth at 1024px:** `line-clamp: 2` on area links (full label already in the title attribute and the page H1).
- **P5 (Medium) Route-aware preselection:** when the panel opens on a treatment page, preselect that service instead of always Gallbladder.
- **P6 (Medium — before WordPress, not for preview):** enrich generated area pages (two more area-specific sections in the generator) to meet the >500 unique-word rule.
- **P7 (Low, brand decision):** nav hover/active green on the white header (2.56:1, pre-existing). Options: use the darker green for light-header hover states only, or leave brand-wide.
- **P8 (Low) Location hover affordance:** add Atto-style pale pill on area-link hover (bright green at 10% bg) on top of the colour change.

Recommended: approve P1–P5 + P8 now (one small push, re-preview), keep P6 for the WordPress phase, decide P7 separately.


---

## ADDENDUM — fixes implemented (owner approved P1–P5 + P8, 2026-10-21)

- **P1** Button: dark ink text `hsl(140 48% 8%)` on bright green = **6.79:1**; hover brightness(0.94) = **6.02:1**; active brightness(0.88). All states AA.
- **P2** Keyboard: `onFocus` on the nav item opens the panel; `onBlur` closes it when focus leaves the whole item (same 150ms grace).
- **P3** Panel `max-height: calc(100dvh − 90px)`; rail and detail scroll independently (`overflow-y:auto`, detail min-height also capped via `min()`).
- **P4** Area links capped at 2 lines (`max-height` + overflow hidden); full label remains in the title attribute and target H1.
- **P5** Panel preselects the service matching the current route (hub or service-in-area page) on open; Gallbladder remains the fallback default.
- **P8** Area-link hover/focus gains a pale pill: bright green at 10% background (negative margins preserve grid rhythm).
- P6 (page enrichment) deferred to the WordPress phase and P7 (nav green on white) left as a separate brand decision, per the plan.
- Re-verified after fixes: production build passes; TypeScript clean on touched files.
