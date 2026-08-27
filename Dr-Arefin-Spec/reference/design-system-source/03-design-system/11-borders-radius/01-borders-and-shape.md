# Borders & Shape System

---

## 1. Border Radius Scale

All radii derive from the `--radius` variable (default: `0.75rem` = 12px).

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | `calc(var(--radius) - 4px)` = 8px | Small elements |
| `rounded-md` | `calc(var(--radius) - 2px)` = 10px | Medium elements |
| `rounded-lg` | `var(--radius)` = 12px | Nav items, dropdown items, social icons, inputs |
| `rounded-xl` | 12px | Search input, icon boxes, utility buttons |
| `rounded-2xl` | 16px | Cards, search container |
| `rounded-full` | 9999px | Buttons (CTA), filter chips, badges |

---

## 2. Border Thickness

**All borders are 1px.** No element uses thicker borders. Emphasis is achieved through color, not thickness.

---

## 3. Border Color States

| State | Color | Notes |
|-------|-------|-------|
| Default | `hsl(var(--border))` | Neutral, subtle |
| Header bottom | `hsl(var(--border) / 0.5)` | Even more subtle for the sticky header |
| Hover (cards) | `hsl(var(--primary) / 0.4)` | Semi-transparent primary |
| Hover (chips, social icons) | `hsl(var(--primary))` | Full primary |
| Focus (inputs) | `hsl(var(--primary))` | Full primary + ring |
| Section dividers | `hsl(var(--border))` | Footer top, mobile menu dividers |

---

## 4. Shadow Scale

| Level | CSS | Usage |
|-------|-----|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards default |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Cards hover, floating button |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Dropdowns, search container |

---

## 5. Shape Philosophy

- **Rounded but not circular**: Most elements use `rounded-lg` to `rounded-2xl`
- **Pills for actions**: CTA buttons and filter chips are `rounded-full`
- **Consistency**: Elements at the same hierarchy level share the same radius

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
