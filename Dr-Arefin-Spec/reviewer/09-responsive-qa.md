# 09 — Responsive QA Spec

> Single source of truth for verifying every page renders correctly at every supported breakpoint. Run this checklist after any layout, hero, typography, or section-structure change. No page ships without a green pass at all five breakpoints.

---

## 1. Breakpoint Matrix

| Token  | Width   | Device class         | Tailwind prefix | Notes |
|--------|---------|----------------------|-----------------|-------|
| XS     | 375px   | iPhone SE / small    | (base)          | Hardest constraint — verify first |
| SM     | 414px   | Large phone          | `sm:` (640+)    | Same rules as XS |
| MD     | 768px   | Tablet portrait      | `md:`           | Mobile menu still active (hamburger) |
| LG     | 1024px  | Tablet landscape / small laptop | `lg:` | Desktop nav appears (`lg` is the toggle) |
| XL     | 1280px  | Standard desktop     | `xl:`           | Container reaches `max-w 1248px` |
| 2XL    | 1440px  | Large desktop        | `2xl:`          | Side gutters grow; no layout change |

**Container**: `max-width: 1248px`, `padding-inline: 1.5rem` (24px), `box-sizing: border-box`.

---

## 2. Global Rules (apply to every page, every breakpoint)

- [ ] No horizontal scroll. `html, body { overflow-x: hidden }` enforced.
- [ ] No element extends past viewport right edge (check with DevTools "show scrollbars" + ruler).
- [ ] Tap targets ≥ 44×44px below LG.
- [ ] Body font-size ≥ 14px (16px ideal) below LG.
- [ ] Sticky header stays sticky, never overlapped, never duplicated.
- [ ] Hamburger replaces desktop nav at `< 1024px`.
- [ ] All hover-only interactions have a tap-equivalent below LG (hovers may be skipped on touch).
- [ ] No text clipped, truncated mid-word, or overlapping siblings.
- [ ] Images load with `width`/`height` to prevent CLS; use `object-fit: cover`.
- [ ] Focus ring visible for keyboard nav at all breakpoints.
- [ ] `prefers-reduced-motion` respected (no parallax, no auto-scroll).

---

## 3. Typography Scale (expected sizes per breakpoint)

| Element              | XS / SM (mobile) | MD (tablet) | LG+ (desktop) |
|----------------------|------------------|-------------|---------------|
| Hero H1              | 32–36px / 1.15   | 44–48px     | 56–72px       |
| Section H2           | 26–28px / 1.2    | 32–36px     | 40–48px       |
| Sub-section H3       | 20–22px          | 22–24px     | 24–28px       |
| Body / paragraph     | 15–16px / 1.6    | 16px        | 16–17px       |
| Small / caption      | 13–14px          | 13–14px     | 14px          |
| Section eyebrow      | 12px uppercase   | 12px        | 12–13px       |
| Button label         | 14–15px          | 15px        | 15–16px       |
| Nav link             | 16px (mobile sheet) | —        | 14–15px       |

Hero H1 must never wrap onto more than **3 lines** at XS or **2 lines** at LG.

---

## 4. CTA Rules

- [ ] Primary + secondary CTAs stack **vertically full-width** below MD; sit **side-by-side** at MD+.
- [ ] Buttons keep ≥ 44px height on mobile.
- [ ] CTA pill (Call/Book toggle) keeps both halves visible at XS — never wraps the "Or" separator.
- [ ] Sticky bottom CTA (where present) never covers content; padding-bottom added to page.
- [ ] All "Book Appointment" CTAs route to `/contact/`.
- [ ] All internal links use trailing slash (`/treatment/liver-surgery/`).

---

## 5. Section/Layout Rules

| Pattern                      | XS / SM         | MD              | LG+            |
|------------------------------|-----------------|-----------------|----------------|
| Service / feature grid       | 1 col           | 2 col           | 3–4 col        |
| Blog grid                    | 1 col           | 2 col           | 3 col          |
| Footer columns               | 1 col centered  | 2 col           | 4 col          |
| Sticky stack cards           | Stacks normally, sticky disabled or single-card | Sticky enabled | Full sticky stack with 2-col inner |
| Testimonial / quote          | 1 col           | 1–2 col         | 2–3 col        |
| Hero image                   | Below text or hidden | Side or below | Side-by-side |
| Section vertical padding     | `py-12` (48px)  | `py-16` (64px)  | `py-20–28`     |

---

## 6. Page-by-Page Checklist

For each page, verify XS / MD / LG / XL.

### 6.1 Home (`/`) — `DrArefinHomeDark.tsx`
- [ ] Hero H1 fits without breaking "FONDI"-style brand identifiers (`whitespace-nowrap` words stay intact)
- [ ] Hero portrait stage scales; orbs remain inside frame at XS
- [ ] **Orb tooltips do not clip** at viewport edges (top-left orb opens downward; right-side orbs open leftward)
- [ ] Stats CountUp readable at XS (single column or 2x2 grid)
- [ ] Service cards reflow 1 → 2 → 3 cols
- [ ] CTA band buttons stack at XS

### 6.2 About (`/about/`) — `AboutDark.tsx`
- [ ] Doctor portrait + bio reflow to single column at XS
- [ ] Credentials list never overflows card width
- [ ] Timeline / milestones stack vertically below MD

### 6.3 Treatment hub (`/treatment/`) — `TreatmentDark.tsx`
- [ ] 4 treatment cards: 1 / 2 / 4 col reflow
- [ ] Card titles do not wrap awkwardly (e.g. "Hepato‑Pancreato‑Biliary" stays readable)

### 6.4 Sub-treatment pages — `LiverSurgeryDark.tsx`, `GallbladderSurgeryDark.tsx`, `PancreaticSurgeryDark.tsx`, `BiliarySurgeryDark.tsx`
- [ ] Hero H1 fits in 2 lines at LG, ≤ 3 lines at XS
- [ ] **TreatmentProcessSticky**: at XS, sticky may degrade to plain stacked cards (no horizontal scroll)
- [ ] Procedure list bullets do not overflow
- [ ] FAQ accordion full-width at XS, contained at LG
- [ ] Light-green section bg (`hsl(135 45% 95%)`) renders correctly across breakpoints

### 6.5 Mentorship (`/mentorship/`) — `MentorshipDark.tsx`
- [ ] `TreatmentProcessSticky variant="mentorship"` 4-phase stack works identically to treatment pages
- [ ] Curriculum cards reflow 1 → 2 → 3 col
- [ ] Application CTA stacks at XS

### 6.6 Articles index (`/articles/` or `/technical-article/`) — `ArticlesDark.tsx`
- [ ] Blog grid 1 / 2 / 3 col
- [ ] Card image aspect ratio preserved; titles never clipped
- [ ] Pagination centered, tap-friendly

### 6.7 Article single — `ArticleSingleDark.tsx`
- [ ] Article body `max-w-prose` (~65ch) at LG
- [ ] Sidebar (if present) stacks below article at MD−
- [ ] Code blocks / pull-quotes never overflow

### 6.8 Gallery (`/gallery/`) — `GalleryDark.tsx`
- [ ] Image grid 1 / 2 / 3 col
- [ ] Lightbox/modal full-screen at XS, centered at LG
- [ ] No image overflow on rotate

### 6.9 Contact (`/contact/`) — `ContactDark.tsx`
- [ ] Contact info cards stack 1 col at XS
- [ ] Form inputs full-width at XS, max-w-md centered at LG
- [ ] Map embed responsive (no fixed pixel width)
- [ ] Phone tel: link uses `+8801311487592`

### 6.10 Satellite pages — `SatellitePage.tsx`
- [ ] All shared shell sections (HeroSection, FAQAccordion, GlobalCTABand, HeroCTA) pass their own checks
- [ ] Page-specific keyword H1 not clipped

---

## 7. Interaction Checks

- [ ] Mobile menu opens/closes; backdrop scroll locked while open
- [ ] All accordions toggle with tap, not just hover
- [ ] Sticky stack cards do not break when ancestor has `overflow-x: hidden` (parent neutralization required)
- [ ] Hover-only states (orb tooltips, atto card hover) have visible tap fallback or are non-essential
- [ ] No hover position shift (no `translateY/X`, no `scale`) — color/border/shadow only

---

## 8. Overflow Audit Procedure

Run on each page at XS (375px):

1. Open DevTools → Console.
2. Paste:
   ```js
   [...document.querySelectorAll('*')].filter(el => el.scrollWidth > document.documentElement.clientWidth).forEach(el => console.warn('OVERFLOW:', el));
   ```
3. Expected output: empty. Any warning = bug.
4. Repeat for any page where a layout change shipped.

---

## 9. Sign-off Template

Copy into PR description:

```
Responsive QA — <PageName>
- [ ] XS 375  ✅ / ❌  notes:
- [ ] MD 768  ✅ / ❌  notes:
- [ ] LG 1024 ✅ / ❌  notes:
- [ ] XL 1280 ✅ / ❌  notes:
Overflow audit (§8): clean / issues:
```

---

## 10. Known Responsive Pitfalls (carry-over from CAF + Dr-Arefin)

| # | Pitfall | Prevention |
|---|---------|-----------|
| R-01 | Container wider than header/footer | Use `box-sizing: border-box` + protected `.container` padding |
| R-02 | Sticky stack breaks under `overflow: hidden` ancestor | Neutralize ancestor overflow at section root |
| R-03 | Orb tooltips clipped at viewport edge | Top-left orbs open downward; right-edge orbs open leftward; cap `max-width: min(280px, calc(100vw - 32px))` |
| R-04 | Hero H1 pushes content below fold on XS | Cap H1 size + line count; allow image crop |
| R-05 | CTA pill "Or" wraps to new line at XS | Force `whitespace-nowrap` on each pill segment |
| R-06 | Mobile footer columns left-aligned when stacked | `text-center` + `mx-auto` at `<lg` |
| R-07 | Bold strong tags get explicit weight, breaking inheritance | Enforce strong-tag rule (color/weight inherit) |
| R-08 | Light-green section bg leaks horizontal scroll on dark pages | Section root must respect parent `overflow-x: hidden` |
