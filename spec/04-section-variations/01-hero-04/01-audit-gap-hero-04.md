# 01 — Audit & Gaps: Hero (Project 04)

**Section:** Hero
**Project sequence (YY):** 04 (Dr. Arefin)
**Date:** 2026-04-21

## Source under audit

- `src/pages/DrArefinHome.tsx` — Section 1 "HERO" block (lines ~188–257)
- Spec source: `Dr-Arefin-Spec/reference/design-system-source/03-design-system/03-hero-section/01-hero-pattern.md`

## Current hero — what's there

- Centered single-column layout: eyebrow → H1 (two-tone) → subtitle → CTA row.
- Light gradient background (`--gradient-start` → `--gradient-end` → `--background`) with two blurred green orbs.
- Animation: `arefin-fade-in-up` on title/subtitle/CTA with 0/0.2s/0.3s stagger.
- CTAs: `SlideButton` + `CallBookPill`.

## Gaps identified

| # | Gap | Impact | Fix in variations |
|---|-----|--------|-------------------|
| G1 | No doctor portrait in the hero — credibility signal missing on first paint | Trust drops, visitors must scroll to see the surgeon | All 3 variations include the portrait above the fold |
| G2 | No credential / authority badges (FCPS, MS, hospital, years) visible immediately | Patients can't gauge expertise without scrolling | Variation A trust strip, Variation B floating credential cards |
| G3 | Single visual treatment — no test-and-learn surface for conversion optimization | Can't measure which presentation drives bookings | This folder ships 3 alternates on `/hero-variations/04/` for side-by-side review |
| G4 | Background is light & airy — doesn't match the authoritative dark surgical aesthetic of the source screenshot | Misaligned with brand tone observed in production reference | All 3 variations use deep-green/near-black surfaces with controlled green light placement |
| G5 | No micro-interaction on the CTA pill beyond the existing slide button | Lower interactivity perceived value | Variation B animates the Call/Book pill on hover; Variation C adds a pulsing live-availability dot |
| G6 | Hero is full-width but visually flat — no depth layering | Reads as a banner, not a "stage" | All variations layer: base color → ambient gradient → portrait → floating accents |

## Constraints carried in from project memory

- ✅ No AI-generated images of Dr. Arefin or real people — reuse `src/assets/arefin-hero-portrait-real.png`.
- ✅ All colors via HSL semantic tokens — no raw hex in components.
- ✅ Headings = Ubuntu 700, body = Poppins 400/500/600.
- ✅ All hover states are non-positional (no `translateY/X` on hover).
- ✅ All entry animations use 0.3s timing with CSS3 only (no JS animation libs).
- ✅ Respect `prefers-reduced-motion`.

## Out of scope for this iteration

- Booking form / Lovable Cloud backend (explicitly deferred — hero focus only).
- Replacing the live homepage `/` hero — variations live on `/hero-variations/04/` for review.
- Mobile menu / pill-toggle redesign beyond what each variation needs.
