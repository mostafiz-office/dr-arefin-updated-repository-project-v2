# 02 — Hero LIGHT (Project 04) · 3 Variations

**Section:** Hero (Light) · **Project sequence (YY):** 04 · **Route:** `/hero-variations/04-light/`

All 3 variations share the new light header (`DrArefinHeaderLight`), the Pure White + Sage palette (see `03-hero-04-light-colors-themes.md`), Ubuntu 700 headings, Poppins body, and CSS3 0.3s entry animations.

---

## Shared header — `DrArefinHeaderLight.tsx`

- Sticky white header, 1px sage hairline at bottom.
- **Logo** (`src/assets/arefin-logo.png`) on the left, `h-11` (44px), links to `/`.
- Centered pill nav: Home · About · Treatment · Mentorship · Articles · Gallery · Contact.
- Right: phone link + sage-filled "Book Appointment" pill.
- Mobile: hamburger → slide-down sheet. No positional hover shifts.

---

## Variation A — "Authority Split Right"

**Layout:** 2-col grid (60/40 desktop, stacked mobile). Text left, portrait right.

| Slot | Content |
|------|---------|
| Eyebrow | `Hepatobiliary · Liver · Pancreas · Upper-GI` |
| H1 | "Top Hepatobiliary, Pancreatic & **Liver Surgeon** in Dhaka" — **Liver Surgeon** in sage |
| Subtitle | Patient-friendly intro naming Dr. Murshidul Arefin + Popular Medical College Hospital, Dhanmondi |
| CTAs | Sage pill "Book an Appointment →" + outline pill "Call Now" |
| Trust strip (below CTA) | 4 inline items separated by sage hairlines: FCPS · 20+ Years · 1500+ Surgeries · Popular Medical College |
| Portrait | Right column, sage rounded square (24px), soft drop shadow |

**Background:** White base + one large soft sage radial blob top-right + one small bottom-left.

**Animation:** `hero-anim-fade-up` text @ 0/100/200/300ms · portrait `hero-anim-portrait` @ 150ms · `hero-anim-halo` 4s pulse on portrait wrapper.

---

## Variation B — "Centered with Floating Credential Cards"

**Layout:** Single-column centered. Eyebrow → H1 → subtitle → CTA → centered portrait with 3 floating credential cards.

| Slot | Content |
|------|---------|
| Eyebrow | Same as A |
| H1 | Same wording, centered, "Dhaka" highlighted in sage |
| Subtitle | Same |
| CTAs | Same |
| Portrait | Centered, max-width 480px, sage rounded card |
| Floating cards (desktop absolute, mobile inline pills) | C1 ⭐ FCPS · MS Hepatobiliary (top-left) · C2 🏆 20+ Years · 1500+ Surgeries (mid-right) · C3 🏥 Popular Medical College Hospital (bottom-left) |

**Background:** White base + 2 stacked soft sage radials + low-opacity sage dotted-grid (`.hero-04-light-dots`).

**Animation:** Text staggered fade-up 0/100/200/300 · portrait fade-scale @ 150ms · cards fade-in @ 450/550/650ms then enter `hero-anim-float` / `hero-anim-float-slow` loops (vertical only, ±6px).

---

## Variation C — "Asymmetric Bento with Portrait Left"

**Layout:** 2-col grid (50/50 desktop, stacked mobile). Portrait left + vertical sage accent bar, text + bento right.

| Slot | Content |
|------|---------|
| Portrait | Left column, max-width 460px, sage rounded square, **4px sage vertical bar** to its right (full height) |
| Eyebrow | Same as A |
| H1 | 3 lines, each line `hero-anim-fade-up` staggered: "Top Hepatobiliary," / "**Pancreatic & Liver**" (sage) / "Surgeon in Dhaka" |
| Subtitle | Compact 1-paragraph |
| CTAs | Same |
| Mini bento (2-up) | Card 1: 📍 *Available today · Popular Medical College, Dhanmondi* + sage **pulse dot** · Card 2: 📞 *+880 1311-487592 · Direct line* |

**Background:** White base + a soft diagonal sage light ray (`hero-anim-ray`) drifting 8s.

**Animation:** Text staggered fade-up · portrait fade-scale @ 150ms · `hero-anim-bar` (height 0→full) on the vertical bar @ 450ms · `hero-anim-pulse-dot` 1.5s loop.

---

## Preview page — `HeroVariations04Light.tsx`

- Mounts the new `DrArefinHeaderLight` once at top.
- Below: 3 sections in order (A → B → C), each prefixed by a `<h2>` divider chip stating the variation name + summary, so the user can scroll and compare.
- All 3 sections share the same `hero-04-light-band` class so the light tokens stay scoped.
- Wrapped in `<div className="arefin">` to inherit project font scope.

## Files created

```
src/assets/arefin-portrait-light.png        (uploaded portrait)
src/assets/arefin-logo.png                  (uploaded logo)
src/components/arefin/DrArefinHeaderLight.tsx
src/components/arefin/hero-variations/HeroV04LightA.tsx
src/components/arefin/hero-variations/HeroV04LightB.tsx
src/components/arefin/hero-variations/HeroV04LightC.tsx
src/pages/HeroVariations04Light.tsx
```
