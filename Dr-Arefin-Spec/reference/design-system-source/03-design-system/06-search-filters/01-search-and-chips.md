# Search Module & Filter Chips

> The hover color changes on the search menu dropdown buttons (filter chips) are **preferred** and should be captured precisely.

---

## 1. Search Bar Container

```css
max-width: 768px;        /* max-w-3xl */
margin-inline: auto;
background: hsl(var(--card));
border-radius: 16px;     /* rounded-2xl */
box-shadow: 0 20px 25px -5px hsl(var(--foreground) / 0.05);  /* shadow-xl with semantic color */
padding: 20px 24px;      /* p-5 md:p-6 */
animation: scale-in 0.5s ease-out both;
animation-delay: 0.3s;
```

---

## 2. Search Input

```css
width: 100%;
padding: 12px 16px 12px 44px;  /* pl-11 for icon space */
border-radius: 12px;            /* rounded-xl */
background: hsl(var(--muted) / 0.5);
border: 1px solid hsl(var(--border));
font-size: 14px;
color: hsl(var(--foreground));
```

### Placeholder
```css
color: hsl(var(--muted-foreground) / 0.6);
```

### Focus
```css
outline: none;
ring: 2px solid hsl(var(--primary) / 0.3);
border-color: hsl(var(--primary));
transition: all 200ms ease;
```

### Search Icon (Inside Input)
- Position: absolute, left 16px, vertically centered
- Size: 18px
- Color: `text-muted-foreground`

---

## 3. Search Button

- Standard primary button with icon: `rounded-xl px-6`
- See `05-buttons/01-button-system.md`

---

## 4. Filter Chips ★ (Preferred Pattern)

```css
.filter-chip {
  display: flex;
  align-items: center;
  gap: 6px;               /* gap-1.5 */
  padding: 8px 16px;      /* px-4 py-2 */
  font-size: 14px;
  font-weight: 500;
  border-radius: 9999px;  /* rounded-full — pill shape */
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  transition: all 200ms ease;
}
```

### Hover State (★ THIS IS THE PREFERRED BEHAVIOR)

```css
.filter-chip:hover {
  border-color: hsl(var(--primary));
  background: hsl(var(--secondary));
}
```

### Active State
```css
.filter-chip:active {
  transform: scale(0.97);
}
```

### Chip Content

```
[🏭] [Label] [▾]
 ↑      ↑     ↑
emoji  text  dropdown indicator (optional, text-xs, muted)
```

- Emoji: `text-xs`
- Label: inherits chip font
- Dropdown indicator: `▾` character, `text-xs text-muted-foreground`

---

## 5. Hover Behavior Summary

| Property | Default | Hover | Duration |
|----------|---------|-------|----------|
| Border color | `--border` | `--primary` | 200ms |
| Background | `--card` | `--secondary` | 200ms |
| Transform | scale(1) | scale(1) | — |
| Text color | no change | no change | — |

> **Key distinction**: Filter chips change border + background on hover but do NOT change text color or scale. This is a subtler interaction than nav items and should be preserved.

---

## 6. Reproducibility Rules

1. Filter chips always use `rounded-full` (pill shape)
2. Hover transitions are 200ms (faster than nav items at 300ms)
3. Border shifts to `--primary`, background shifts to `--secondary`
4. No text color change on hover
5. Active press uses `scale(0.97)` — smaller reduction than buttons

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
