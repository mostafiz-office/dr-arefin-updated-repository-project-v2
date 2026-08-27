# Color Usage Rules

> Every component must follow these rules. No exceptions.

---

## 1. Absolute Rule

**Never use hardcoded color values in any component.** This includes:
- ❌ `text-white`, `bg-black`, `text-green-500`, `border-gray-200`
- ❌ `color: #22c55e`, `background: rgb(34, 197, 94)`
- ✅ `text-primary-foreground`, `bg-card`, `border-border`, `text-muted-foreground`
- ✅ `hsl(var(--primary))`, `hsl(var(--primary) / 0.1)`

---

## 2. Color Application Map

| UI Element | Background | Text | Border | Hover BG | Hover Text | Hover Border |
|------------|-----------|------|--------|----------|------------|--------------|
| **Page** | `bg-background` | `text-foreground` | — | — | — | — |
| **Card** | `bg-card` | `text-card-foreground` | `border-border` | — | — | `border-primary/40` |
| **Nav link** | transparent | `text-foreground/80` | — | `bg-secondary` | `text-primary` | — |
| **Primary button** | `bg-primary` | `text-primary-foreground` | — | (see button spec) | — | — |
| **Ghost button** | transparent | `text-foreground` | — | `bg-secondary` | `text-primary` | — |
| **Input field** | `bg-muted/50` | `text-foreground` | `border-border` | — | — | `border-primary` (focus) |
| **Filter chip** | `bg-card` | `text-foreground` | `border-border` | — | — | `border-primary` |
| **Badge / tag** | `bg-primary/10` | `text-primary` | — | — | — | — |
| **Muted text** | — | `text-muted-foreground` | — | — | — | — |
| **Footer** | `bg-card/60` | `text-foreground` | `border-border` (top) | — | — | — |
| **Social icon btn** | transparent | `text-muted-foreground` | `border-border` | `bg-primary/10` | `text-primary` | `border-primary` |

---

## 3. Alpha / Opacity Patterns

Use CSS variable composition for alpha:

```css
/* 10% primary for subtle backgrounds */
background: hsl(var(--primary) / 0.1);

/* 40% primary for hover borders */
border-color: hsl(var(--primary) / 0.4);

/* 5% primary for decorative blurred orbs */
background: hsl(var(--primary) / 0.05);

/* 80% foreground for slightly muted nav text */
color: hsl(var(--foreground) / 0.8);

/* 60% card for frosted glass footer */
background: hsl(var(--card) / 0.6);
```

In Tailwind:
```
bg-primary/10  border-primary/40  text-foreground/80  bg-card/60
```

---

## 4. Gradient Usage

Gradients use the dedicated gradient variables:

```css
background: linear-gradient(
  180deg,
  hsl(var(--gradient-start)) 0%,
  hsl(var(--gradient-end)) 60%,
  hsl(var(--background)) 100%
);
```

- Used in: Hero section background
- Direction: top-to-bottom (180deg)
- Always fade into `--background` at the bottom for seamless blending

---

## 5. Focus & Ring

All interactive elements must show a visible focus ring on keyboard navigation:

```css
focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
```

The ring color is `--ring` (same as `--primary` by default).

---

## 6. State Color Rules

| State | Visual Change |
|-------|---------------|
| **Default** | Base semantic token |
| **Hover** | Shift toward `--primary` for text/border; shift to `--secondary` for background |
| **Active** | `scale(0.95–0.97)` + same hover colors |
| **Focus** | Ring + border shift to `--primary` |
| **Disabled** | `opacity: 0.5`, `pointer-events: none` |

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
