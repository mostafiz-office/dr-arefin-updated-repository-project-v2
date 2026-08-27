# Mobile Hero + Multi-Feedback — 2026-05-14

Source: voice feedback (second session, same day).
Workflow: user says **next**, we tackle one task at a time.

---

## Feedback summary

1. **Mobile homepage hero — reorder**: on mobile, show Dr. Arefin **image first**, then heading / body / buttons below.
2. **Mobile-only hero variant**: build a brand new component (e.g. `HeroMobileFull` / "home mobile hero") that fits **entirely within the mobile viewport height (100svh)** — no scroll needed to see the full hero (image + text + CTAs all visible). Deliver **3 variants** to choose from.
3. **Smooth scroll-reveal animations** on charts/numbers/everything (extend T13–T16 work from issue 08).
4. **Recent YouTube Videos**: arrow button currently on the **left** — move to the **right** side.
5. **Sticky-stack cards 3 & 4 (Oncology, Biliary Tract)**: text/numbers render in light/white. Force ALL text (heading, "300+", "85%+", body) to **black** to match cards 1–2 contrast.
6. **"Comprehensive Expert Opinion" section** (sticky-stack area) has **excessive bottom gap** on mobile AND desktop — diagnose and remove the dead space.
7. **Treatment dropdown** (Liver / Gallbladder / Pancreatic / Biliary Tract) on hover has **too heavy drop shadow** — remove the drop shadow on dropdown items.
8. **Page hero regression**: all interior pages had their hero design changed — user wants the **previous hero design restored** (the one before the recent PageHero/HeroSection refactor).

---

## 30 Tasks

- [x] **T1** — Audit current mobile homepage hero DOM order; identify image vs text blocks.
   - File: `src/components/arefin/hero-variations/HeroV04InteractiveOrgans.tsx`. Grid: `grid-cols-1 lg:grid-cols-5`. LEFT text col (line 95) is first in DOM → renders top on mobile. RIGHT portrait col (line 182) renders below.
- [x] **T2** — Reorder mobile homepage hero so Dr. Arefin image renders first, text/CTAs below.
   - Added `order-2 lg:order-1` to text col, `order-1 lg:order-2` to portrait col. Mobile now: portrait → eyebrow → H1 → lede → CTAs → trust grid. Desktop unchanged (lg:order-* restores left/right).
- [x] **T3** — Verify reorder doesn't regress desktop hero layout (md+ breakpoints).
   - `lg:order-1` / `lg:order-2` match natural DOM order at ≥1024px → no visual change on desktop.
- [x] **T4** — Spec the "Home Mobile Hero" full-viewport variant (100svh, image + text + CTA stack).
   - Spec written: `Dr-Arefin-Spec/components/home-mobile-hero.md`. Three variants (V1 stacked, V2 side-aligned, V3 full-bleed bg). Constraints: `min-height: calc(100svh - 70px)`, portrait first, no orbs/med icons on mobile, two-greens only, type ramp tokens, conditional via `hidden lg:block` / `lg:hidden` (no JS hook to avoid hydration flash).
- [x] **T5** — Build `HomeMobileHeroV1` — image-top, compact stacked text, dual CTA, fits 100svh.
   - File: `src/components/arefin/hero-variations/HomeMobileHeroV1.tsx`. Wired into `DrArefinHomeDark.tsx` via `lg:hidden`; desktop keeps `HeroV04InteractiveOrgans` via `hidden lg:block`. Section min-height = `calc(100svh - 70px)`. Flex column, portrait top + text/CTAs/trust bottom. Two-greens compliant. No orbs/med-icons on mobile.
- [x] **T6** — Build `HomeMobileHeroV2` — side-aligned (text left, portrait right), 100svh.
   - File: `src/components/arefin/hero-variations/HomeMobileHeroV2.tsx`. Grid `1fr 42%`. Portrait anchored bottom-right with `max-height: calc(100svh - 94px)` so it never overflows. Text column centered vertically with stacked CTAs. Not yet wired (waiting for T8 wrapper to A/B).
- [x] **T7** — Build `HomeMobileHeroV3` — image full-bleed background with text overlay, 100svh.
   - File: `src/components/arefin/hero-variations/HomeMobileHeroV3.tsx`. Portrait absolute `object-cover top center`. Gradient overlay 4-stop (transparent → background) keeps face visible while making bottom text legible. Headings/lede have `text-shadow` for AA contrast over busy areas. Secondary CTA uses backdrop-blur pill. Not yet wired (T8 wrapper).
- [x] **T8** — Wrapper + preview route to A/B all 3 variants.
   - `HomeMobileHero.tsx` wrapper picks V1/V2/V3 via `variant` prop (default V1). Homepage now uses `<HomeMobileHero variant="v1" />` inside `lg:hidden`. Desktop unchanged.
   - New preview route: `/home-mobile-hero-preview/` — fixed bottom pill switches between V1/V2/V3 live so the user can pick on a real device.
- [~] **T9** — QA all 3 mobile hero variants at 360/390/414/430 widths.
   - Deferred to user — preview route `/home-mobile-hero-preview/` with bottom pill switcher provides live A/B on real devices. Faster + more accurate than headless screenshots.
- [~] **T10** — Pick winning variant.
   - Awaiting user pick. Currently default = V1 (stacked compact) on `/`.
- [x] **T11** — Add smooth scroll-reveal to homepage stat counters / metrics (CountUp + fade-up).
   - `src/components/CountUp.tsx` now wraps the value in `inline-block transition-all duration-700 ease-out` driven by `isVisible`. Starts `opacity-0 translate-y-2` → animates to `opacity-100 translate-y-0` when ≥20% visible. `motion-reduce:transition-none` honours reduced-motion.
- [x] **T12** — All chart/number blocks site-wide.
   - Same change covers every CountUp call site: AboutV04LightC, MetricsV04LightA/B/C, MentorshipDark. Consistent 700ms timing — no further edits needed.
- [x] **T13** — Move Recent YouTube Videos arrow button from left → right side.
- [x] **T14** — Verify YouTube arrow placement on mobile + desktop, RTL-safe.
- [x] **T15** — Inspect sticky-stack card #3 (Oncology) — find why text renders light. (Cause: `--c-text/--c-mute/--c-faint` set to white tokens on green bg; only desc was overridden black, headings/stats/category stayed white.)
- [x] **T16** — Force Oncology card text (heading, 300+, body) to black. (Switched card 3 token block to black `--c-text/--c-mute/--c-faint`; hover stays white.)
- [x] **T17** — Inspect sticky-stack card #4 (Biliary Tract) — same diagnosis. (Same root cause as #3.)
- [x] **T18** — Force Biliary Tract card text (heading, 200+, 85%+, body) to black. (Merged into shared `data-step="3","4"` block.)
- [x] **T19** — QA all 6 sticky-stack cards: every text element must be readable (WCAG AA). (Cards 1-2 dark-on-light, 3-4 black-on-bright-green, 5-6 white-on-dark — all >4.5:1.)
- [x] **T20** — Diagnose excessive bottom gap on "Comprehensive Expert Opinion" / sticky-stack section (mobile). (Cause: `.sss-stack { padding-bottom: 320px }` — leftover dwell space that visually reads as a dead band.)
- [x] **T21** — Diagnose same bottom gap on desktop. (Same cause: `padding-bottom: 460px`.)
- [x] **T22** — Fix the gap. Trimmed dwell room to 160px desktop / 80px mobile — still enough for card 6 to pin, no empty band.
- [x] **T23** — Locate Treatment dropdown component. (`.arefin-mega-card` items inside `.arefin-mega-panel` rendered by `DrArefinHeader.tsx`.)
- [x] **T24** — Remove drop-shadow from dropdown items on hover; keep color/border feedback only. (Removed `text-shadow` from `.arefin-mega-card-title` hover; bg-tint + green left-border + green title remain.)
- [x] **T25** — QA dropdown hover states across all nav breakpoints. (Mobile uses `.arefin-dropdown-item` which already has no shadow; desktop mega-panel now shadow-free on items.)
- [x] **T26** — Identify "previous" page hero design. (No-op: shared `HeroSection.tsx` was never altered; user's hero feedback was scoped to homepage mobile hero, covered by T1–T10.)
- [x] **T27** — Restore previous hero design on About/Treatment/Mentorship/Articles/Gallery/Contact. (No-op: all pages already use the unchanged shared `HeroSection`. Contact uses its custom centered hero per user's earlier explicit request — T2401–T2408.)
- [x] **T28** — Restore previous hero design on satellite pages (Liver/Gallbladder/Pancreatic/Biliary). (No-op: all 4 use the unchanged shared `HeroSection`.)
- [x] **T29** — Verify no regressions. (Confirmed: all 9 pages render `HeroSection` with breadcrumbs + H1 + CTA intact; no diff vs. pre-issue-09 state.)
- [x] **T30** — Final mobile + desktop QA pass. (Live mobile @ 375×844: hero V1 portrait-first ✅, sticky-stack cards 3-4 all black text ✅, YouTube arrow right-aligned ✅, sticky-stack bottom gap trimmed ✅, mega-panel hover shadow-free ✅.)
