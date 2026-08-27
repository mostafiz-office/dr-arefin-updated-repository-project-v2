# Interactive Card Pattern (Gas Card)

---

## 1. Card Structure

```
┌──────────────────────────────────┐
│  [Icon Box]         [Badge]      │   ← top row
│                                  │
│  Title (lg, bold)                │
│  Description (sm, muted)         │
└──────────────────────────────────┘
```

---

## 2. Default State

```css
position: relative;
border-radius: 16px;       /* rounded-2xl */
border: 1px solid hsl(var(--border));
background: hsl(var(--card));
padding: 24px;             /* p-6 */
box-shadow: 0 1px 2px rgba(0,0,0,0.05);  /* shadow-sm */
```

---

## 3. Hover State — Compound Transition (★ Key Pattern)

On hover, **four things happen simultaneously** over 300ms:

```css
.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);  /* shadow-lg */
  transform: translateY(-8px);                     /* -translate-y-2 */
  border-color: hsl(var(--primary) / 0.4);         /* border-primary/40 */
}
```

Additionally, a **gradient overlay** fades in:

```css
.card::before {  /* or a child div */
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(to bottom right, var(--color-from), var(--color-to));
  opacity: 0;
  transition: opacity 300ms ease;
}
.card:hover::before {
  opacity: 1;
}
```

| Property | From | To | Duration |
|----------|------|----|----------|
| box-shadow | sm | lg | 300ms |
| translateY | 0 | -8px | 300ms |
| border-color | `--border` | `--primary/40` | 300ms |
| gradient overlay | opacity 0 | opacity 1 | 300ms |

---

## 4. Icon Box

```css
width: 48px; height: 48px;
display: flex; align-items: center; justify-content: center;
border-radius: 12px;            /* rounded-xl */
background: hsl(var(--primary) / 0.1);
color: hsl(var(--primary));
```

### Icon Hover (Group Hover)
```css
transition: transform 300ms ease;
/* On card hover: */
transform: scale(1.1) rotate(6deg);
```

---

## 5. Badge (Percentage)

```css
border-radius: 9999px;
background: hsl(var(--primary) / 0.1);
padding: 4px 12px;
font-size: 14px;
font-weight: 600;
color: hsl(var(--primary));
```

---

## 6. Staggered Entry Animation

Cards animate in with staggered delays:

```css
animation: fade-in-up 0.7s ease-out both;
animation-delay: calc(index * 0.1s);  /* 0s, 0.1s, 0.2s, ... */
```

---

## 7. Grid Layout

```css
display: grid;
gap: 24px;               /* gap-6 */
grid-template-columns: 1fr;              /* mobile */
/* sm: */ grid-template-columns: repeat(2, 1fr);
/* lg: */ grid-template-columns: repeat(3, 1fr);
```

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
