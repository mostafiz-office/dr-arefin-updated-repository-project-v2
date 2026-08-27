# Dropdown Behavior

---

## 1. Trigger Mechanism

- **Desktop**: Hover-based (mouseenter / mouseleave on the parent `<li>`)
- **Mobile**: Click/tap to toggle
- **Close delay**: 150ms timeout on mouse leave (allows moving cursor from item to dropdown)

---

## 2. Positioning

```css
position: absolute;
top: 100%;          /* directly below the nav item */
left: 50%;
transform: translateX(-50%);  /* centered under the trigger */
padding-top: 8px;   /* pt-2 — gap between trigger and dropdown */
z-index: 50;
```

---

## 3. Container Style

```css
width: 256px;       /* w-64 */
border-radius: 12px; /* rounded-xl */
border: 1px solid hsl(var(--border));
background: hsl(var(--card));
box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),
            0 8px 10px -6px rgba(0,0,0,0.1);  /* shadow-xl */
padding: 8px;       /* p-2 */
```

---

## 4. Entry Animation

```css
animation: scale-in 0.5s ease-out both;
transform-origin: top;  /* origin-top — scales from the top edge */
```

```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
```

- Duration: 500ms
- Easing: ease-out
- Origin: top center (grows downward)

---

## 5. Dropdown Item Structure

Each item is a button with two lines:

```
┌────────────────────────────┐
│  Label (sm, font-medium)   │
│  Description (xs, muted)   │
└────────────────────────────┘
```

```css
.dropdown-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;  /* rounded-lg */
  padding: 10px 12px;  /* px-3 py-2.5 */
  text-align: left;
  transition: background-color 200ms ease;
}
```

### Hover

```css
.dropdown-item:hover {
  background: hsl(var(--secondary));
}
```

- Transition: 200ms (faster than nav items — feels snappy inside dropdown)
- Only background changes; text stays the same colors

---

## 6. Text Styling

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Label | 14px (`text-sm`) | 500 (`font-medium`) | `text-foreground` |
| Description | 12px (`text-xs`) | 400 | `text-muted-foreground` |

---

## 7. Interaction Flow

```
Mouse enters nav item
  → 0ms: clear any pending close timeout
  → 0ms: set dropdown open
  → dropdown animates in (scale-in, 500ms)

Mouse leaves nav item + dropdown area
  → 0ms: start 150ms close timeout
  → if mouse re-enters within 150ms: cancel timeout
  → if timeout fires: close dropdown instantly
```

---

## 8. Reproducibility Rules

1. Dropdown MUST center under its trigger using `left: 50%` + `translateX(-50%)`.
2. The 150ms close delay is mandatory to prevent accidental closes.
3. Entry animation is `scale-in` from top — never slide or fade alone.
4. Dropdown items use `--secondary` for hover background — same as nav items.
5. No exit animation (dropdown disappears instantly on close for responsiveness).

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
