# Section-by-Section Dark Adaptations

For each section: **what reuses unchanged**, and **what (if anything) needs a dark-only CSS override**.

> Rule: any override goes in `src/index.css` scoped under `.arefin.dark .selector { … }`. Never inside the component file as inline styles.

---

## Section 1 — Hero (`HeroV04LightA`)
- **Reuses**: full component
- **Dark behavior**: `bg-background` resolves to deep navy `#0C1311`. Hero gradient uses `--gradient-start` / `--gradient-end` (dark green) for atmospheric overlay
- **Portrait**: Existing PNG (transparent background) sits over dark — needs no modification
- **CTA "Book an Appointment"**: stays green pill, white text — token-driven, no change
- **Override needed**: ❌ none

---

## Section 2 — Value Proposition (`ValuePropV04LightA`)
- **Reuses**: full component
- **Dark behavior**: numerals stay green (`--primary`); section uses `--background-darker` band
- **Override needed**: ❌ none — the live drarefin.com look (white headings, gray body, green numerals on dark band) is exactly what flipped tokens produce

---

## Section 3 — About (`AboutV04LightB`)
- **Reuses**: full component
- **Dark behavior**: white text on dark, image with `--shadow-image` (deeper black shadow on dark)
- **Override needed**: ❌ none

---

## Section 4 — Initiatives (`InitiativesV04LightA`)
- **Reuses**: full component (cards already use `bg-card border-border` semantic tokens)
- **Dark behavior**: cards become dark surfaces with subtle borders; hover adds green-tinted shadow
- **Override needed**: ❌ none — verify hover green glow is visible during QA

---

## Section 5 — Metrics (`MetricsV04LightC`)
- **Reuses**: full component
- **Dark behavior**: counters and chart use semantic tokens
- **Override needed**: ⚠️ **Verify chart axes/grid** during QA — if any chart library defaults to a hardcoded color, add dark override in `src/index.css`

---

## Section 6 — Videos (`VideosV04LightC`)
- **Reuses**: full component (already specced for both light/dark per `spec/04-section-variations/07-videos-04/03-videos-04-colors-themes.md`)
- **Dark behavior**: card backgrounds darken, modal backdrop stays at `rgba(0,0,0,0.8)` (intentional literal)
- **Override needed**: ❌ none

---

## Section 7 — Services (`ServicesV04LightC`)
- **Reuses**: full component
- **Dark behavior**: gradient glass cards adapt via tokens
- **Override needed**: ⚠️ **Verify glass-effect translucency** — if cards use `bg-white/10`, that's fine on dark (frosted look). If they use light-tint backdrops, may need a dark-mode equivalent. Check during QA.

---

## Section 8 — CTA Band #1 ("Transform Lives, One Surgery at a Time")
- **Reuses**: inline section in `DrArefinHomeDark.tsx` (copy-paste from light page)
- **Dark behavior**: `arefin-feature-band` class, radial green gradient over `--background-deepest`
- **Override needed**: ❌ none — this band is already dark-styled in light mode

---

## Section 9 — Inspiring Transformations
- **Reuses**: inline section + inline `<style>` block from light page
- **Dark behavior**: section uses `--background-darker`; cards use `--card` (dark)
- **Override needed**: ✅ **YES — inline style block needs dark variants for text-shadow**.
  - In light mode: `text-shadow: 1px 1px 0 hsl(var(--foreground))` produces a dark shadow on hovered green text
  - In dark mode: same rule produces a *light* shadow on hovered green text — invisible
  - **Fix**: extend the inline `<style>` block in `DrArefinHomeDark.tsx` with `.arefin.dark .stories-title:hover` etc., setting `text-shadow: 1px 1px 0 hsl(var(--background-darker))` and using `color: hsl(var(--primary-light))` for hovered word color
  - Same fix applies to `.stories-heading strong:hover`, `.stories-intro strong:hover`, `.stories-desc strong:hover`

---

## Section 10 — Final CTA ("Ready for Expert Consultation?")
- **Reuses**: inline section
- **Dark behavior**: dark background with green radial; primary button + outlined phone button both use semantic tokens
- **Override needed**: ⚠️ **Verify the outlined "phone" button border becomes visible on dark** (`border-border` should resolve to `#293431`, low contrast against `#0C1311`). If too subtle, bump to `border-border` override or use `border-primary/30`. Check during QA.

---

## Section 11 — Footer (`DrArefinFooter`)
- **Reuses**: full component (already dark in both modes)
- **Dark behavior**: identical
- **Override needed**: ❌ none. Recent fix (hover icon `text-white`) already covered.

---

## Header (`DrArefinHeader`)
- **Reuses**: full component, **transparent variant**
- **Dark behavior**: transparent over hero; nav links use `text-foreground` (white); CTA pill uses dark+green tokens
- **Override needed**: ⚠️ **Verify the header's existing logic for sticky/scrolled state** — when user scrolls past hero, header should pick up a `--background` (dark) backdrop with subtle blur, not a light one. Check the component's scrolled class and confirm it uses semantic tokens.

---

## Summary of overrides required for v1
1. **Section 9 (Transformations)**: extend inline `<style>` block with `.arefin.dark` variants for the hover text-shadow (5 selectors)
2. **Section 10 (Final CTA)**: possibly bump button border contrast (verify in QA before adding)
3. **Sections 5, 7, 11 (Header)**: verify in QA only — no override expected

All other sections work via token flipping alone.
