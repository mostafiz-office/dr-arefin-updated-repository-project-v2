# Known Pitfalls from CAF Patronato Fondi Build

> Pre-emptive issue list — these were resolved in CAF and **must not be re-introduced** in Dr-Arefin.

| # | Pitfall | Prevention rule |
|---|---------|-----------------|
| 01 | Container alignment mismatch (mid-sections wider than header/footer) | Apply `box-sizing: border-box` and protect `.container` padding. Reset Astra/Elementor wrappers to `width: 100%` (only relevant if doing WP export — N/A for React-only build). |
| 02 | Single-post styling missing | Sync shared CSS across blog/single-post templates. (N/A unless WP export added.) |
| 03 | Header dual CTA contrast | Pill background must match `--cta-pill-bg` token; never `bg-white` raw. |
| 04 | Footer padding missing | Footer must use same section spacing tokens as the rest of the page. |
| 05 | Mobile footer menu centering | Use `text-center` + `mx-auto` on stacked column at `<lg`. |
| 06 | Sticky stack overflow broken | Parent must NOT have `overflow: hidden`; sticky needs ancestor neutralization. |
| 07 | Mobile menu accordion styling | Use Radix Accordion with custom triggers; do not nest nav inside `<details>`. |
| 08 | Blog card hover glow removal | Use **sharp zero-blur shadow** (`0 2px 0 0 hsl(var(--primary) / 0.4)`) — never blurred glow. |
| 09 | Blog hero subtitle missing | Always render `<p class="hero-subtitle">` even if optional. |
| 10 | Hero float card animation | If using floating cards, no positional `translateY`; use `filter: drop-shadow` only. |
| 11 | Header dual CTA Atto-style | Match the exact white/green split with center "Or" label. |
| 12 | Hero image hover no lift | Image hover may scale up to 1.03x; never translate. |
| 13 | Hero dual-state buttons | Buttons in dark hero use light-green text-shadow on hover for contrast. |
| 14 | Trust strip inline color override | Never use inline `style` for colors — always semantic tokens. |
| 15 | Sticky stack card colors | Each sticky card uses `--background-dark` or `--background-darker` alternation. |
| 16 | CTA band dual-state buttons | Match header CTA pill behavior in CTA band sections. |
| 17 | Color palette sync | Token names must be reused across all components — no per-component hex. |

## New rules specific to Dr-Arefin (added pre-emptively)

| # | Rule | Why |
|---|------|-----|
| D-01 | Logo wordmark must include both lines: "DR. M AREFIN" + "HEPATOBILIARY PANACEA" | Brand identity |
| D-02 | Always link "Dr. Murshidul Arefin" name to `/about/` for SEO internal-link density | Match source site behavior |
| D-03 | Phone tel: link must use full international format `+8801311487592` (no spaces) | Mobile dialer compatibility |
| D-04 | All "Book Appointment" CTAs go to `/contact/` (not `/book-consultation` — that 404s on source) | Source site has broken slug |
| D-05 | Articles index page (`/technical-article/`) must NOT show the Atto Property cleaning placeholder content found on source | Source page is a stale template — replace with real blog index |