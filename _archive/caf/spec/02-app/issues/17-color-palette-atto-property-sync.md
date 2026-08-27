# Issue #17 — Atto Property Color Palette Sync

**Status**: ✅ Resolved  
**Date**: 2026-03-16  
**Category**: Design System / Branding

## Problem

The project used `#4CAF50` (Material Green 500) as primary and `#388E3C` as hover/dark green. These needed to be updated to match the exact Atto Property brand palette.

## Solution

Updated entire color system globally to:

| Role | Old Value | New Value |
|------|-----------|-----------|
| **Primary (light green)** | `#4CAF50` / `rgba(76, 175, 80)` | `#54B435` / `rgba(84, 180, 53)` |
| **Hover (dark green)** | `#388E3C` | `#379237` |
| **Primary HSL** | `120 51% 39%` | `104 56% 46%` |
| **Hover HSL** | `101 53% 46%` | `120 45% 39%` |

### Files Updated

1. **`src/index.css`** — `--primary`, `--primary-hover`, `--ring` CSS variables
2. **`public/elementor-export/global.v1.2.3.css`** — `:root` vars + all hardcoded hex/rgba
3. **`public/elementor-export/blog.v1.2.1.css`** — `:root` vars + all hardcoded hex/rgba
4. **`public/elementor-export/single-post.css`** — `:root` vars + all hardcoded hex/rgba

### Notes

- `rgba(55, 146, 55, ...)` values = `#379237` (dark green) — kept as-is since they already match the new hover color
- `#66BB6A` and `#81C784` (lighter Material greens used in gradients) left unchanged as decorative accent shades
