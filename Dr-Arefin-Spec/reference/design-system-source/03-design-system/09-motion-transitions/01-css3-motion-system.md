# CSS3 Motion & Transition System

> **Rule**: All motion in this design system MUST use CSS3 `transition` and `@keyframes`. No JavaScript-driven animation for visual states. This ensures GPU acceleration, predictability, and easy reproduction.

---

## 1. Transition Defaults

Every interactive element should include:

```css
transition: all [duration] [easing];
```

### Standard Durations

| Duration | Usage |
|----------|-------|
| 150ms | Close delays, micro-interactions |
| 200ms | Filter chips, dropdown items, link color changes |
| 300ms | Nav items, buttons, cards, icons — **the primary duration** |
| 350ms | Slide text animations (buttons) |
| 500ms | Entry animations (fade-in, scale-in) |
| 700ms | Hero-level entry animations (fade-in-up) |
| 2000ms | Ambient loops (pulse-glow) |
| 3000ms | Decorative loops (float) |

---

## 2. Easing Functions

| Easing | CSS Value | Usage |
|--------|-----------|-------|
| **Standard** | `ease` | Most transitions (color, bg, border) |
| **Entrance** | `ease-out` | Elements appearing (fade-in, scale-in) |
| **Exit** | `ease-in` | Elements disappearing |
| **Slide** | `cubic-bezier(0.4, 0, 0.2, 1)` | Slide text in buttons |
| **Infinite loops** | `ease-in-out` | Float, pulse-glow |

---

## 3. Keyframe Animations

### fade-in-up (Primary Entry)
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Usage: 0.7s ease-out both */
```

### fade-in
```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
/* Usage: 0.5s ease-out both */
```

### scale-in (Dropdown / Card Entry)
```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
/* Usage: 0.5s ease-out both */
```

### float (Decorative)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
/* Usage: 3s ease-in-out infinite */
```

### pulse-glow (Attention)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4); }
  50%      { box-shadow: 0 0 20px 4px hsl(var(--primary) / 0.15); }
}
/* Usage: 2s ease-in-out infinite */
```

---

## 4. Stagger Delays

For sequential element entry (cards, list items):

```css
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
```

Or computed: `animation-delay: calc(index * 0.1s);`

---

## 5. Hover Transform Patterns

| Pattern | CSS | Used By |
|---------|-----|---------|
| Scale up | `transform: scale(1.05)` | Buttons, social icons |
| Scale up + rotate | `transform: scale(1.1) rotate(6deg)` | Card icons |
| Lift | `transform: translateY(-8px)` | Cards |
| Scale down (active) | `transform: scale(0.95)` | Buttons on press |
| Slight press | `transform: scale(0.97)` | Filter chips on press |
| Slide text | `transform: translateY(-100%)` | CTA button text |

---

## 6. Border & Underline Transitions

| Element | Property | From → To | Duration |
|---------|----------|-----------|----------|
| Nav item underline | width | 0 → 75% | 300ms |
| Card border | border-color | `--border` → `--primary/40` | 300ms |
| Filter chip border | border-color | `--border` → `--primary` | 200ms |
| Social icon border | border-color | `--border` → `--primary` | 300ms |
| Input focus border | border-color | `--border` → `--primary` | 200ms |

---

## 7. Opacity Transitions

| Element | From → To | Duration |
|---------|-----------|----------|
| Card gradient overlay | 0 → 1 | 300ms |
| Chevron default opacity | 0.5 (static) | — |

---

## 8. Animation Restraint Rules

1. **Max 2 simultaneous animations** on any element (e.g., pulse-glow + fade-in on Climate AI button)
2. **No bounce or elastic easing** — the design language is calm and professional
3. **No animation longer than 3s** except infinite ambient loops
4. **Respect `prefers-reduced-motion`**: wrap keyframe animations in a media query:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. State Transition Diagram (General)

```
  ┌──────────┐                    ┌──────────┐
  │ Default  │───── hover ───────►│ Hovered  │
  │          │◄──── leave ────────│          │
  └────┬─────┘                    └────┬─────┘
       │                               │
       │ click/press                   │ click/press
       ▼                               ▼
  ┌──────────┐                    ┌──────────┐
  │ Active   │                    │ Active   │
  │ (scale↓) │                    │ (scale↓) │
  └──────────┘                    └──────────┘

  Tab focus at any point → add ring-2 ring-primary/30
```

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
