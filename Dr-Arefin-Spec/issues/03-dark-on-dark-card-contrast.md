# Issue 03 — Dark-on-Dark (and Light-on-Light) Card Contrast

## Symptom
On the dark homepage (`/`), card surfaces in **Our Initiatives**, **Our Programs / Dedicated Expertise**, **What We Treat (Services)**, **Recent Videos**, **Inspiring Transformations**, etc. visually merged into the section background. Users could not see where the card began and the section ended — the elevation was effectively zero.

## Root cause
Dark-mode token values made the **section surfaces brighter than the cards** in some places, and only marginally darker in others:

| Section | Section surface (old) | Card surface (old) | Δ |
|---|---|---|---|
| Initiatives | `--surface-cream` 11% | `--card` 10% | **−1%** (inverted) |
| Stories | `--surface-cream` 11% | `--card` 10% | **−1%** (inverted) |
| Videos | `--surface-stone` 13% | `--card` 10% | **−3%** (inverted) |
| Services | gradient ~12% avg | `--card / 0.85` ~9% | **−3%** (inverted) |

A card must always be on a surface that is **tonally different** (at least ~8% lightness Δ) from what's behind it. Same-tone = invisible card = broken hierarchy.

## Fix (canonical, src/index.css, `.arefin.dark`)
Lower section surfaces to a 5–9% lightness band, raise `--card` to 17%, and make the relationship a hard rule:

```css
.arefin.dark {
  /* Section surfaces — LOW band */
  --background:        160 20% 6%;
  --background-darker: 160 22% 5%;
  --surface-cream:     160 22% 8%;
  --surface-sage:      150 18% 7%;
  --surface-stone:     160 16% 9%;
  --surface-tint-1:    142 24% 8%;
  --surface-tint-2:    160 22% 7%;

  /* Elevated card surface — sits ~8–11% above ANY section surface */
  --card:              160 16% 17%;

  /* Border slightly more visible since cards are now lighter */
  --border:            160 12% 26%;
}
```

Plus a hover boost (~3% lighter) for tactile feedback, scoped to all card classes, that is applied alongside the canonical Atto card hover (5px green left border + soft shadow).

## Hard rule (now in Core memory)
> **Dark bg → cards MUST be ~10% lighter (elevated). Light bg → cards MUST be white/darker. NEVER same-tone.** In `.arefin.dark`, NEVER let any `--surface-*` exceed `--card` lightness. Doing so inverts the elevation and the card disappears.

## Inspiration
DesignMonks dark UI — visibly elevated card surface above a deep dark page background, thin border, soft shadow on hover.

## Where enforced
- Token contract: `src/index.css` `.arefin.dark` block.
- Memory: `mem://style/surface-elevation-rule` + Core rule in `mem://index.md`.
- Spec: this file + cross-reference in `Dr-Arefin-Spec/dark-version/01-dark-design-system.md`.
