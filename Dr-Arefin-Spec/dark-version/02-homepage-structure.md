# Dark Homepage — Section Structure

Mirrors `/dr-arefin` (`src/pages/DrArefinHome.tsx`) section-for-section. **No new sections, no reordering.** Only the root class changes from `arefin` → `arefin dark`, which flips every consumed CSS variable.

## Section order (top → bottom)

| # | Section | Component | Surface token resolves to |
|---|---|---|---|
| 0 | Header | `<DrArefinHeader />` (transparent variant) | Transparent over hero |
| 1 | Hero | `<HeroV04LightA />` | `--background` (dark navy) |
| 2 | Value Proposition (01/02/03 numerals) | `<ValuePropV04LightA />` | `--background-darker` (band darker than hero) |
| 3 | About | `<AboutV04LightB />` | `--background` |
| 4 | Initiatives | `<InitiativesV04LightA />` | `--background-darker` |
| 5 | Metrics | `<MetricsV04LightC />` | `--background` |
| 6 | Recent Videos | `<VideosV04LightC />` | `--background-darker` |
| 7 | Services | `<ServicesV04LightC />` | `--background` |
| 8 | CTA Band #1 ("Transform Lives") | inline `<section className="arefin-feature-band">` | Radial green gradient on dark |
| 9 | Inspiring Transformations | inline `<section>` with cards | `--background-darker` |
| 10 | Final CTA ("Ready for Expert Consultation?") | inline `<section>` | `--background` with subtle green radial |
| 11 | Footer | `<DrArefinFooter />` | `--background-deepest` (already dark in both modes) |

## Visual rhythm
The page alternates `--background` and `--background-darker` to create visible section boundaries on dark — same pattern as drarefin.com live site:

```
[Hero          ] background        ← deep navy
[Value Prop    ] background-darker ← darker band (matches live site's "01/02/03" strip)
[About         ] background
[Initiatives   ] background-darker
[Metrics       ] background
[Videos        ] background-darker
[Services      ] background
[CTA Band #1   ] gradient on dark
[Transformations] background-darker
[Final CTA     ] background
[Footer        ] background-deepest
```

## What stays identical to the light homepage
- All copy, all images, all CTAs, all internal links
- All scroll-reveal animations (`<Reveal>` wrapper)
- JSON-LD `Physician` structured data block
- All SEO meta (set in the page-level `<head>` if/when added)

## What's different on dark (visual deltas only)
1. Background tokens flip → dark navy
2. Text tokens flip → light gray / white
3. Card surfaces become dark with subtle borders
4. Hover shadows pick up a faint green glow (via `--shadow-card-hover`)
5. Heading word-hover text-shadow inverts from light shadow → dark shadow
6. Header is transparent over the dark hero (no light pill background needed — pill uses `--cta-pill-bg` dark token)
