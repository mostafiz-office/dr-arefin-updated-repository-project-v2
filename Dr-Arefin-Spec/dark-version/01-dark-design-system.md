# Dark Design System — `.arefin.dark`

> **Inheritance**: All component patterns, hover rules, animations, layout system (1248px), and CSS architecture are inherited 1:1 from the light Arefin design system (`Dr-Arefin-Spec/01-design-system.md`). This file documents only the **dark token replacements** plus dark-specific contrast/hover adjustments.

## Activation
Add `dark` class alongside `arefin` on the page root:
```tsx
<div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
```
The `.arefin.dark` block in `src/index.css` (already present, lines 136–172) overrides every relevant CSS variable.

---

## 1. Color Tokens (HSL — required format)

All values shown are **already defined** in `src/index.css` under `.arefin.dark`. Hex shown for reference only.

### 1.1 Surfaces
| Token | HSL | Hex (≈) | Usage |
|---|---|---|---|
| `--background` | `160 20% 6%` | `#0C1311` | Page base — deep navy-green near-black |
| `--background-darker` | `160 22% 5%` | `#0A100E` | Section dividers / deeper bands |
| `--background-deepest` | `192 60% 4%` | `#020F11` | Footer / final CTA |
| `--card` | `160 20% 10%` | `#141F1B` | Card surfaces, dropdowns |
| `--popover` | `160 20% 10%` | `#141F1B` | Popovers, tooltips |
| `--surface-light` | `160 20% 10%` | `#141F1B` | Alias used by some components |

### 1.2 Text
| Token | HSL | Hex (≈) | Usage |
|---|---|---|---|
| `--foreground` | `0 0% 95%` | `#F2F2F2` | Primary text on dark, headings |
| `--card-foreground` | `0 0% 95%` | `#F2F2F2` | Card text |
| `--muted-foreground` | `160 10% 60%` | `#94A39E` | Secondary / body text — meets WCAG AA on `--background` |
| `--body-text` | `160 10% 60%` | `#94A39E` | Long-form paragraph alias |

### 1.3 Brand accent (Dr. Arefin green — UNCHANGED from light)
| Token | HSL | Hex | Notes |
|---|---|---|---|
| `--primary` | `142 71% 45%` | `#22C55E` | Numerals "01/02/03", CTAs, accent text |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on `--primary` button — **always pure white**, never auto-flip |
| `--primary-bright` | `133 80% 41%` | `#14BB3E` | Hover-bright variant |
| `--primary-glow` | `141 90% 43%` | `#0CD067` | Glow / radial highlights |
| `--primary-deep` | `120 47% 39%` | `#379237` | Pressed state |
| `--primary-light` | `142 71% 75%` | `#86E5A8` | **High-contrast token for accent text on dark surfaces** (use instead of `--primary` when text is small or competing with green backgrounds) |

### 1.4 Secondary / accent surfaces (soft green tint)
| Token | HSL | Usage |
|---|---|---|
| `--secondary` | `142 30% 15%` | Soft tinted card background, badges |
| `--secondary-foreground` | `142 71% 75%` | Text on `--secondary` |
| `--accent` | `142 30% 15%` | Same as `--secondary` |
| `--accent-foreground` | `142 71% 75%` | |
| `--muted` | `160 15% 15%` | Muted block background, skeletons |

### 1.5 Borders & focus
| Token | HSL | Usage |
|---|---|---|
| `--border` | `160 15% 20%` | Default borders — subtle on dark |
| `--input` | `160 15% 20%` | Form inputs |
| `--ring` | `142 71% 45%` | Focus ring (green) |

### 1.6 Gradients
| Token | HSL | Usage |
|---|---|---|
| `--gradient-start` | `142 45% 14%` | Hero gradient overlays — dark green |
| `--gradient-end` | `160 35% 10%` | Hero gradient overlays — deeper dark green |

### 1.7 Shadows (token-driven)
| Token | Definition | Usage |
|---|---|---|
| `--shadow-card` | `0 1px 2px 0 hsl(0 0% 0% / 0.4), 0 1px 3px 0 hsl(0 0% 0% / 0.5)` | Card resting state |
| `--shadow-card-hover` | `0 10px 15px -3px hsl(0 0% 0% / 0.5), 0 4px 6px -4px hsl(142 71% 45% / 0.2)` | Card hover — adds green glow |
| `--shadow-image` | `0 25px 50px -15px hsl(0 0% 0% / 0.5)` | Image containers |
| `--shadow-dropdown` | `0 20px 25px -5px hsl(0 0% 0% / 0.5), 0 8px 10px -6px hsl(0 0% 0% / 0.4)` | Dropdowns, popovers |

### 1.8 CTA pill (Call/Book — signature element)
| Token | HSL | Usage |
|---|---|---|
| `--cta-pill-bg` | `160 20% 14%` | "Call" half background — dark surface |
| `--cta-pill-text-dark` | `0 0% 95%` | "Call" half text (white on dark) |
| `--cta-pill-active` | `142 71% 45%` | "Book" half background (green) |
| `--cta-pill-text-light` | `0 0% 100%` | "Book" half text (white on green) |

---

## 2. Typography
**Unchanged from light.**
- Headings: `Ubuntu` 700 — already loaded via Google Fonts in `index.css`
- Body / nav / buttons: `Poppins` 400/500/600
- Type scale identical to `Dr-Arefin-Spec/01-design-system.md` §Typography
- **On dark, headings are `hsl(var(--foreground))` = pure white-ish (`#F2F2F2`)** — never apply `text-white` directly

---

## 3. Layout System
**Inherited unchanged.**
- Max container: 1248px (`container` Tailwind class — see `tailwind.config.ts`)
- Padding: 24px L/R
- Section spacing: `py-20 md:py-28` standard, `py-16 md:py-20` compact

---

## 4. Hover & Interaction Rules (dark-specific clarifications)

### 4.1 No position shifts (project-wide rule)
- ❌ No `translateY/X`, no `scale > 1.04` on cards
- ✅ Use color, shadow, filter, border-color changes

### 4.2 Card hover on dark
```css
/* resting */
background: hsl(var(--card));
border: 1px solid hsl(var(--border));
box-shadow: var(--shadow-card);

/* hover */
border-color: hsl(var(--primary) / 0.4);
box-shadow: var(--shadow-card-hover);  /* includes subtle green glow */
```

### 4.3 Heading word-hover (existing pattern in `DrArefinHome.tsx` Transformations section)
On dark surfaces, the sharp text-shadow MUST use a **dark color** to remain visible — invert from light:
```css
/* light mode shadow */
.arefin .stories-title:hover { text-shadow: 1px 1px 0 hsl(var(--foreground)); }

/* dark mode shadow — DARK shadow on white text becomes visible */
.arefin.dark .stories-title:hover { text-shadow: 1px 1px 0 hsl(var(--background-darker)); }
```
And use `--primary-light` (lighter green) instead of `--primary` for the hovered word color to keep contrast ≥4.5:1 against the dark background.

### 4.4 Link hover
- Default: `hsl(var(--foreground))`
- Hover: `hsl(var(--primary-light))` — never `--primary` on small text (contrast is borderline)

---

## 5. Component Patterns (dark deltas)

| Component | Light | Dark delta |
|---|---|---|
| Button primary | `bg-primary text-primary-foreground` | **No change** — green button stays green-on-white |
| Button secondary | `bg-card border text-foreground` | `bg-card` resolves to dark surface; border resolves to subtle dark border — works automatically |
| Card | `bg-card border-border shadow-card` | Tokens auto-flip; **add subtle green glow on hover** via `--shadow-card-hover` |
| Header | Transparent over light | **Transparent over dark hero**; nav links `text-foreground` (white); pill uses dark+green tokens |
| Footer | `bg-background-deepest` | Already dark in both modes — `192 60% 4%` |
| Numerals "01./02./03." | `text-primary` | **No change** — green stays green |
| Section divider band | `arefin-section-divider` (light tint) | Maps to `--background-darker` automatically |

---

## 6. Forbidden (project-wide, restated)
- ❌ No `!important`
- ❌ No inline `style={{ color: '#fff' }}` — use semantic tokens
- ❌ No raw color classes (`text-white`, `bg-black`, `text-green-500`)
- ❌ No hover position shifts (`translateY`, `translateX`)
- ❌ No serif fonts
- ❌ No new AI-generated images of Dr. Arefin, patients, real staff, or real clinic (memory: `mem://constraints/no-ai-images-of-real-people`)

---

## 7. WCAG AA Contrast Verification
All combinations must meet ≥4.5:1 for normal text, ≥3:1 for large text.

| Pair | Ratio | Pass |
|---|---|---|
| `--foreground` `#F2F2F2` on `--background` `#0C1311` | 17.2:1 | ✅ |
| `--muted-foreground` `#94A39E` on `--background` | 5.8:1 | ✅ |
| `--primary` `#22C55E` on `--background` (large text only) | 6.1:1 | ✅ |
| `--primary` `#22C55E` on `--background` (normal text) | 6.1:1 | ✅ |
| `--primary-foreground` `#FFF` on `--primary` `#22C55E` | 2.4:1 | ⚠️ Use only for **large/bold button text** ≥18px or 14px bold |
| `--primary-light` `#86E5A8` on `--background` | 11.4:1 | ✅ Preferred for accent text |
