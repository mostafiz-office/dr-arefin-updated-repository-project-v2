# Design System

> Moved from `/spec/design-system.md` — all app specs now live under `/spec/01-app/`

## Container Layout Standard

- **Max-width**: 1248px with `box-sizing: border-box`
- **Padding**: 24px (1.5rem) left/right
- **Visible content width**: 1200px (1248 − 48)
- **All wrappers above `.container`** must be forced to `width: 100% !important` with zero padding/margin
- **`!important` is mandatory** on `.container` properties when deployed inside WordPress/Elementor/Astra, because theme CSS uses `!important` internally

### Known Pitfalls and Prevention

| Pitfall | Rule | Issue Reference |
|---------|------|-----------------|
| Middle sections wider than header/footer | Always apply `box-sizing: border-box !important` and protect `.container` padding with `!important` | `/spec/02-app/issues/01-container-alignment-mismatch.md` |
| Astra/Elementor wrappers impose their own max-width | Nuclear reset all wrappers between `body` and `.caff_block` to `100% !important` | Same issue |

## Colors

All colors use HSL via CSS variables in `index.css` and `tailwind.config.ts`. Never use raw hex/rgb in components.

### Brand Green Palette (Atto Property)

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--primary` | `104 56% 46%` | `#54B435` | Buttons, links, accents |
| `--primary-hover` | `120 45% 39%` | `#379237` | Hover states, dark emphasis |
| `--primary-light` | `104 60% 75%` | — | Light tints |
| `rgba(84, 180, 53, x)` | — | `#54B435` | Transparent overlays (primary) |
| `rgba(55, 146, 55, x)` | — | `#379237` | Transparent overlays (dark) |

**Reference**: `/spec/02-app/issues/17-color-palette-atto-property-sync.md`

## Typography

System follows semantic tokens. See `index.css` `:root` block.

## Component Patterns

- Shadcn/ui with semantic design tokens
- Framer-free animations via `useScrollReveal` hook
