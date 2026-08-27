# 01 — Audit & Gaps: Hero LIGHT (Project 04)

**Section:** Hero (Light treatment)
**Project sequence (YY):** 04 (Dr. Arefin)
**Date:** 2026-04-21
**Sibling spec:** `spec/04-section-variations/01-hero-04/` (dark band variations)

## Source under audit

- Existing dark hero variations: `src/components/arefin/hero-variations/HeroV04A|B|C.tsx`
- Reference aesthetic (composition + color placement only, NOT illustration content): `https://preview--sweet-digs-finder.lovable.app/`
- Newly uploaded assets: `src/assets/arefin-portrait-light.png`, `src/assets/arefin-logo.png`

## Why a light treatment is needed

| # | Gap | Impact | Fix in light variations |
|---|-----|--------|------------------------|
| L1 | Existing 04 hero only ships a dark band — no light A/B option for stakeholders preferring a clinical, hospital-friendly tone | Cannot test conversion of dark vs. light authority styling | Three new light variations on a dedicated route |
| L2 | Header still uses old text logo (`dr-arefin-logo-black.png`) — new official `Dr_arefin_logo.png` (with hepatobiliary mark) not yet integrated | Brand consistency gap | New `DrArefinHeaderLight.tsx` with the uploaded logo |
| L3 | Portrait used in dark hero is the legacy `arefin-hero-portrait-real.png`; the freshly uploaded white-background portrait is better suited to light surfaces | Wasted asset, white background of new portrait disappears beautifully on a white hero | All 3 light variations use `arefin-portrait-light.png` |
| L4 | Reference site uses pill nav, soft pastel blob backgrounds, rounded card composition — patterns not yet explored in our project | Misses a proven friendly-trust pattern | Adopted in new light header + Variation B floating cards |
| L5 | No bento-style accent area in any current Dr. Arefin hero | Lower information density above the fold | Variation C ships a 2-card mini bento |

## Constraints carried in

- ✅ No AI-generated images — only the uploaded portrait & logo are used.
- ✅ All colors via HSL semantic tokens (new `--hero-light-*` token set defined in `src/index.css`).
- ✅ Headings = Ubuntu 700, body = Poppins 400/500/600.
- ✅ Hover states are non-positional.
- ✅ Entry animations = 0.3s CSS3, base + stagger via existing `.hero-anim-*` / `.hero-d-*` utilities.
- ✅ Respect `prefers-reduced-motion`.

## Out of scope

- Replacing the homepage `/` hero — light variations preview at `/hero-variations/04-light/` only.
- Backend / booking form (explicitly deferred).
- Replacing dark variations — they remain available at `/hero-variations/04/`.
