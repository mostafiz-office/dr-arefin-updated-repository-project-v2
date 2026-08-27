# Navigation Item Behavior

> This is a **priority reference section**. Menu interactions must be reproduced precisely.

---

## 1. Default State

```css
/* Nav item button */
position: relative;
display: flex;
align-items: center;
gap: 4px;              /* gap-1 */
padding: 8px 12px;     /* px-3 py-2 */
font-size: 14px;       /* text-sm */
font-weight: 500;      /* font-medium */
color: hsl(var(--foreground) / 0.8);
border-radius: var(--radius);  /* rounded-lg */
```

### Underline Pseudo-Element (Default)

Every nav item has an `::after` pseudo-element that serves as a hover underline:

```css
&::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;                              /* hidden by default */
  height: 2px;                           /* 0.5 = 2px */
  background: hsl(var(--primary));
  border-radius: 9999px;                 /* fully rounded */
  transition: all 300ms ease;
}
```

---

## 2. Hover State

On hover, **three things happen simultaneously** over 300ms:

1. **Text color** transitions to `--primary`
2. **Background** transitions to `--secondary`
3. **Underline** width grows from 0 to 75%

```css
&:hover {
  color: hsl(var(--primary));
  background: hsl(var(--secondary));
}

&:hover::after {
  width: 75%;                            /* 3/4 of button width */
}
```

### Timing

| Property | Duration | Easing |
|----------|----------|--------|
| color | 300ms | ease (default) |
| background-color | 300ms | ease (default) |
| ::after width | 300ms | ease |

> **Critical**: The underline expands from center (anchored at `left: 50%` with `translateX(-50%)`), creating a symmetrical grow effect.

---

## 3. Dropdown Indicator (Chevron)

Menu items with dropdowns show a chevron icon:

```
[Label] [▾]
```

- Icon: `ChevronDown` (14px)
- Default opacity: 50%
- **On dropdown open**: rotates 180° over 300ms

```css
.chevron {
  opacity: 0.5;
  transition: transform 300ms ease;
}

/* When dropdown is open */
.chevron.open {
  transform: rotate(180deg);
}
```

---

## 4. Non-Dropdown Items

Items without dropdowns trigger a toast/action on click. They follow the same hover behavior (color + background + underline) but have no chevron.

---

## 5. Interaction Flow Diagram

```
┌─────────────┐     mouse enter      ┌──────────────────┐
│   Default    │ ──────────────────►  │     Hovered       │
│              │                      │                   │
│ text: 80%    │     300ms ease       │ text: primary     │
│ bg: none     │                      │ bg: secondary     │
│ underline: 0 │                      │ underline: 75%    │
└─────────────┘  ◄──────────────────  └──────────────────┘
                     mouse leave
                     300ms ease
```

---

## 6. Reproducibility Rules for AI

1. Always use `::after` for the underline — never a separate `<div>` or `<span>`.
2. Underline color MUST be `--primary`.
3. Underline grows from center, not from left or right.
4. All three transitions (color, bg, underline) must happen simultaneously.
5. Duration is always 300ms for nav items.
6. The nav item must have `position: relative` for the `::after` to position correctly.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
