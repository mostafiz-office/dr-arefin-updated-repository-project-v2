# Theme Variables — Single Source of Truth

> **Rule**: Every component in the system MUST reference these variables. No component may use a hardcoded color value (hex, rgb, named color). To re-skin the entire design system, change values in this file only.

---

## 1. Variable Architecture

All colors are defined in **HSL** format (hue saturation% lightness%) without the `hsl()` wrapper, so they can be composed with alpha channels: `hsl(var(--primary) / 0.5)`.

Variables live in the CSS `:root` selector. Dark mode overrides live in `.dark`.

---

## 2. Light Theme Variables (Default)

```css
:root {
  /* ───── Brand ───── */
  --primary:                142 71% 45%;      /* Main brand green */
  --primary-foreground:     0 0% 100%;        /* Text on primary backgrounds */

  /* ───── Secondary ───── */
  --secondary:              142 60% 93%;      /* Light tinted surface */
  --secondary-foreground:   142 71% 30%;      /* Text on secondary surfaces */

  /* ───── Surfaces ───── */
  --background:             140 20% 97%;      /* Page background */
  --foreground:             160 20% 10%;      /* Default body text */
  --card:                   0 0% 100%;        /* Card / elevated surface */
  --card-foreground:        160 20% 10%;      /* Text on cards */
  --popover:                0 0% 100%;        /* Popover / dropdown surface */
  --popover-foreground:     160 20% 10%;      /* Text in popovers */

  /* ───── Muted ───── */
  --muted:                  150 14% 96%;      /* Subtle background for inputs, chips */
  --muted-foreground:       160 9% 46%;       /* Subdued text, descriptions */

  /* ───── Accent ───── */
  --accent:                 142 60% 93%;      /* Accent highlights (same as secondary in base theme) */
  --accent-foreground:      142 71% 30%;

  /* ───── Destructive ───── */
  --destructive:            0 84% 60%;        /* Error / danger */
  --destructive-foreground: 0 0% 100%;

  /* ───── Borders & Inputs ───── */
  --border:                 150 13% 91%;      /* Default border color */
  --input:                  150 13% 91%;      /* Input field border */
  --ring:                   142 71% 45%;      /* Focus ring color (matches primary) */

  /* ───── Radius ───── */
  --radius:                 0.75rem;          /* Base border radius */

  /* ───── Gradients ───── */
  --gradient-start:         142 40% 92%;      /* Hero gradient start */
  --gradient-end:           160 30% 90%;      /* Hero gradient end */

  /* ───── Sidebar (if applicable) ───── */
  --sidebar-background:     0 0% 98%;
  --sidebar-foreground:     240 5.3% 26.1%;
  --sidebar-primary:        240 5.9% 10%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent:         240 4.8% 95.9%;
  --sidebar-accent-foreground: 240 5.9% 10%;
  --sidebar-border:         150 13% 91%;
  --sidebar-ring:           142 71% 45%;

  /* ───── Typography ───── */
  font-family: 'Inter', sans-serif;
}
```

---

## 3. Dark Theme Variables

```css
.dark {
  --background:             160 20% 6%;
  --foreground:             0 0% 95%;
  --card:                   160 20% 10%;
  --card-foreground:        0 0% 95%;
  --popover:                160 20% 10%;
  --popover-foreground:     0 0% 95%;
  --primary:                142 71% 45%;      /* Brand stays the same */
  --primary-foreground:     0 0% 100%;
  --secondary:              142 30% 15%;
  --secondary-foreground:   142 71% 75%;
  --muted:                  160 15% 15%;
  --muted-foreground:       160 10% 60%;
  --accent:                 142 30% 15%;
  --accent-foreground:      142 71% 75%;
  --destructive:            0 62% 30%;
  --destructive-foreground: 0 0% 95%;
  --border:                 160 15% 20%;
  --input:                  160 15% 20%;
  --ring:                   142 71% 45%;
  --sidebar-background:     160 5.9% 10%;
  --sidebar-foreground:     160 4.8% 95.9%;
  --sidebar-primary:        142 76.3% 48%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent:         160 3.7% 15.9%;
  --sidebar-accent-foreground: 160 4.8% 95.9%;
  --sidebar-border:         160 3.7% 15.9%;
  --sidebar-ring:           142 71% 45%;
}
```

---

## 4. How to Re-skin

To create a completely different brand (e.g., "Ocean Blue"):

1. Change `--primary` to your brand hue, e.g., `210 80% 50%`.
2. Adjust `--secondary`, `--accent`, `--gradient-start`, `--gradient-end` to harmonize.
3. Leave structural variables (`--background`, `--foreground`, `--border`, `--radius`) alone unless the new brand demands it.
4. Dark theme: shift lightness values accordingly.

**Every component in every spec file will automatically adopt the new palette** because they reference these variables exclusively.

---

## 5. Variable Categories Quick Reference

| Category | Variables | Purpose |
|----------|-----------|---------|
| **Brand** | `--primary`, `--primary-foreground` | Main brand identity |
| **Secondary** | `--secondary`, `--secondary-foreground` | Hover backgrounds, chips, badges |
| **Surface** | `--background`, `--card`, `--popover` | Page & component backgrounds |
| **Text** | `--foreground`, `--card-foreground`, `--muted-foreground` | Typography colors |
| **Border** | `--border`, `--input` | Edges & form elements |
| **Focus** | `--ring` | Keyboard focus indicators |
| **Destructive** | `--destructive`, `--destructive-foreground` | Error states |
| **Gradient** | `--gradient-start`, `--gradient-end` | Hero & decorative gradients |
| **Shape** | `--radius` | Corner rounding base value |

---

## 6. Tailwind Config Mapping

These variables are consumed in `tailwind.config.ts` so Tailwind utility classes like `bg-primary`, `text-muted-foreground`, `border-border` resolve to the CSS variables:

```ts
colors: {
  primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
  muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
  destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
  background:  "hsl(var(--background))",
  foreground:  "hsl(var(--foreground))",
  border:      "hsl(var(--border))",
  input:       "hsl(var(--input))",
  ring:        "hsl(var(--ring))",
  card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
  popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
}
```

> **Rule for any AI**: Never write `text-white`, `bg-black`, `text-green-500`, etc. Always use semantic classes like `text-primary-foreground`, `bg-card`, `text-muted-foreground`.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
- Sections still to write: color usage rules, dark mode guide, menu interactions, hero section, typography, buttons (including Join Us slide), search/filters, cards/sections, footer, motion system, spacing, borders, new page rules, WordPress migration, accessibility.
Do you understand? Say "next" to continue.
```
