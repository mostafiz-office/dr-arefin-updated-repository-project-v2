# Dark Mode & Branded Variants

---

## 1. Dark Mode Activation

Dark mode is toggled by adding the `dark` class to the `<html>` element. All variables defined in `.dark { }` override `:root` values.

**Rule**: Components do NOT use conditional dark-mode classes like `dark:bg-gray-800`. They use semantic tokens (`bg-card`, `text-foreground`) which automatically resolve to the correct dark values.

---

## 2. Dark Mode Derivation Rules

When creating dark variants of theme variables:

| Token Type | Light → Dark Strategy |
|-----------|----------------------|
| `--background` | Invert lightness: 97% → 6% |
| `--foreground` | Invert lightness: 10% → 95% |
| `--card` | Slightly brighter than background: 6% → 10% |
| `--primary` | **Keep the same hue and saturation**. Adjust lightness only if contrast fails |
| `--secondary` | Same hue, low saturation, low lightness (15%) |
| `--muted` | Same hue family, lightness ~15% |
| `--muted-foreground` | Same hue, lightness ~60% |
| `--border` | Same hue, lightness ~20% |
| `--destructive` | Same hue (0°), reduced lightness for dark bg compatibility |

---

## 3. Creating a Branded Variant

To create a new brand theme (e.g., "Ocean Blue"):

1. Copy the `:root` block from `01-theme-variables.md`.
2. Change the hue in `--primary` (e.g., 142 → 210).
3. Derive `--secondary`, `--accent`, `--gradient-start`, `--gradient-end` from the new hue.
4. Keep structural tokens (`--background`, `--foreground`, `--border`, `--radius`) unless the brand requires different neutrals.
5. Create a matching `.dark` override.

**The rest of the design system applies unchanged.**

---

## 4. Contrast Requirements

- **Normal text** on any background must meet WCAG AA (4.5:1 ratio).
- **Large text** (18px+ or 14px bold) must meet 3:1.
- `--primary` on `--primary-foreground` must meet 4.5:1.
- `--muted-foreground` on `--background` must meet 4.5:1.

When adjusting theme variables, always verify contrast ratios.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
