# 01 — Brand & Design System

> Reviewer angle: every visual decision on the page must trace back to a token or rule below. If you see a hardcoded color, a translated hover, or a same-tone card, flag it.

---

## 1. Colors (HSL tokens, defined in `src/index.css`)

### 1.1 The two greens — non-negotiable
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary-bright` | `#14bb3e` | All resting brand green (buttons, links, accents, icons) |
| `--primary-darker` | `#079a14` | Hover state for the above. Nothing else. |

All other green-named tokens (`--primary`, `--primary-hover`, `--primary-light`, `--brand-soft`, etc.) MUST resolve to one of the two above. Do not introduce new green hues. Do not use `text-green-500` or any raw Tailwind palette.

### 1.2 Semantic token contract
Use semantic tokens, never raw colors:
- Surfaces: `--background`, `--foreground`, `--card`, `--card-foreground`, `--surface`, `--bg-dark`, `--bg-footer`, `--cta-bg`
- Text: `--foreground`, `--body-text`, `--muted-text`, `--muted-foreground`
- Brand: `--primary`, `--primary-foreground`, `--primary-hover`
- Lines: `--border`, `--input`, `--ring`
- Hover ink: `--hover-shadow-ink` (light=olive, dark=black) — used by ALL heading/keyword hover shadows

### 1.3 Surface elevation (Card ↔ Section contrast)
- **Dark section** (`--bg-dark`) → cards MUST be light (`hsl(0 0% 97%)`) with dark text.
- **Light section** (`--background`) → cards MUST be dark/brand-tinted with light text.
- **Forbidden**: same-tone cards on same-tone bg, neutral gray cards in dark mode.
- Applies to ALL card patterns (services, testimonials, features, blog, sticky-stack, etc.).

### 1.4 Contrast — WCAG 2.1 AA
- Normal text ≥ 4.5:1
- Large text (≥ 18.66px bold or ≥ 24px regular) ≥ 3:1
- Interactive UI components & graphics ≥ 3:1
- Verify both light and dark modes.

---

## 2. Typography

### 2.1 Font system
| Role | Family |
|------|--------|
| Headings | **Ubuntu** (`font-heading` / `font-arefin-heading`) |
| Body / nav / links | **Poppins** (`font-sans` / `font-arefin`) |

Never serif. Never decorative system fonts.

### 2.2 Heading scale (default)
- H1 hero: `text-4xl md:text-5xl lg:text-6xl font-bold`
- H2 section: `text-2xl md:text-3xl lg:text-4xl font-bold text-foreground`
- H3 subsection / card title: `text-xl md:text-2xl font-semibold`
- Section label (eyebrow): `text-xs uppercase tracking-widest text-primary font-semibold`

### 2.3 Body
- Body: `text-body-text leading-relaxed` (Poppins)
- Lede paragraphs: slightly larger, same color
- Line length target: 60–80ch per line on desktop

### 2.4 The `<strong>` rule (body text)
`<strong>` inside paragraphs MUST inherit:
```css
p strong, .body-text strong { color: inherit; font-weight: inherit; }
```
- Never apply `font-weight: 600`, explicit colors, inline styles, or Tailwind classes on body `<strong>`.
- Hover (when wrapped in a link): green color + hover shadow only.

### 2.5 Brand identifiers
Fixed multi-word brand strings (e.g., `FONDI 730`, `Dr. M. Arefin`) must use `whitespace-nowrap` so they never break across lines.

---

## 3. Spacing & Layout

- **Container max-width**: 1248px (`2xl` breakpoint), centered, padded `1rem → 1.5rem → 2rem`.
- **Section padding (standard)**: `py-20 md:py-28`. Compact: `py-16 md:py-20`.
- **Equal top/bottom**: never asymmetric vertical padding inside a section.
- **Grid gaps**: `gap-6` cards, `gap-8` major blocks, `gap-12` between hero columns.
- **Card padding**: `p-6` default, `p-8` for feature cards.

---

## 4. Border-radius & Shadows

- Radius scale (Tailwind): `rounded-md` inputs, `rounded-lg` buttons/cards, `rounded-2xl` feature/large cards.
- Resting shadow: subtle (`shadow-sm`) or none.
- **Hover shadow standard**: sharp, **0-blur**, directional (e.g., `4px 4px 0 0 hsl(var(--hover-shadow-ink))`). Never blurry drop-shadow on hover.

---

## 5. Components

### 5.1 Buttons (see `src/components/ui/button.tsx`)
- Variants: `default | outline | ghost | link | hero | hero-outline`
- Sizes: `sm | default | lg | icon`
- Hover: background/border/text color shift only. **No translate, no scale.**
- Primary CTA per section: max ONE.
- Secondary CTA: `outline` or `ghost`.

### 5.2 Cards (Atto card hover pattern — canonical)
On hover:
1. 3px solid green left border (`--primary-bright`)
2. Sharp 0-blur directional shadow using `--hover-shadow-ink`
3. Title color shifts to dark green (`--primary-darker`)
4. **No movement, no scale**

Single source CSS lives in `src/index.css` — never re-implement per component.

### 5.3 Icons
- Inline SVG for any critical UI icon. No external icon JS libraries for those.
- `lucide-react` is OK for non-critical decorative icons.
- Stroke width consistent across a section.

---

## 6. Animation

- Entry animations only: `fade-in-up` (0.6s) on first paint / scroll reveal.
- Stagger: use `delay-*` utilities, not JS timers.
- Aurora/orb backgrounds OK for hero only (`aurora-1/2/3` keyframes).
- **Forbidden**: hover position shifts, scale-on-hover, parallax that competes with reading, autoplay videos with sound.
- Respect `prefers-reduced-motion`: disable non-essential motion.

---

## 7. Imagery rules

- Real people / clinic / credentials → real photos only. Never AI.
- AI OK for abstract backgrounds, textures, illustrative concepts (not depicting real entities).
- All images need descriptive `alt` (see `04-seo.md` §4).
- Lazy-load below-the-fold images (`loading="lazy"`).
- Format priority: AVIF → WebP → JPG. SVG for icons/logos.
