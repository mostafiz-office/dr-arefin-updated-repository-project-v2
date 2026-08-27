# Icon Hover Transitions in the Header

---

## 1. Logo Icon

The logo consists of an SVG mark + text. They are wrapped in a `group` container.

### Default State
- SVG: `width: 36px, height: 36px`
- Rounded rect filled with `hsl(var(--primary))`
- Leaf path filled with `hsl(var(--primary-foreground))`

### Hover State (Group Hover)
When the user hovers anywhere on the logo link:

```css
.logo-svg {
  transition: transform 300ms ease;
}
.group:hover .logo-svg {
  transform: scale(1.1);
}
```

- **What changes**: Scale only (110%)
- **What stays**: Colors remain the same
- **Duration**: 300ms
- **Easing**: ease (default)

---

## 2. Social Media Icons (Footer)

These are square icon buttons (36×36) with border:

### Default
```css
height: 36px; width: 36px;
display: flex; align-items: center; justify-content: center;
border-radius: 8px;
border: 1px solid hsl(var(--border));
color: hsl(var(--muted-foreground));
```

### Hover — Four simultaneous transitions (300ms)
```css
border-color: hsl(var(--primary));
background: hsl(var(--primary) / 0.1);
color: hsl(var(--primary));
transform: scale(1.1);
```

| Property | From | To | Duration |
|----------|------|----|----------|
| border-color | `--border` | `--primary` | 300ms |
| background | transparent | `--primary/10` | 300ms |
| color | `--muted-foreground` | `--primary` | 300ms |
| transform | scale(1) | scale(1.1) | 300ms |

---

## 3. Hamburger Menu Icon

- No color transition on hover (only background via `hover:bg-secondary`)
- Icon swaps between `Menu` ↔ `X` based on state (no animation on swap — instant)

---

## 4. Chevron Icons in Nav Items

See `02-nav-item-behavior.md` — rotates 180° over 300ms.

---

## 5. General Icon Transition Rules

For any new icon added to the header:

1. Use `transition-all duration-300` as the base
2. Prefer `scale(1.1)` for emphasis — never larger than 1.15
3. Color shifts toward `--primary` on hover
4. Icons should be `lucide-react` or SVG with `currentColor` fills
5. Size: 14–22px depending on context

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
