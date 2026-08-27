# Spacing & Layout Rhythm

---

## 1. Container

```css
max-width: 1400px;     /* screens.2xl */
margin-inline: auto;
padding-inline: 2rem;  /* 32px */
```

---

## 2. Section Spacing

| Property | Value | Usage |
|----------|-------|-------|
| Section vertical padding | `py-16` (64px) | Content sections (cards, team, etc.) |
| Hero top padding | `pt-16` → `md:pt-24` | Hero section |
| Hero bottom padding | `pb-8` → `md:pb-12` | Hero section |
| Footer padding | `py-14` (56px) | Footer main area |
| Footer bottom bar | `py-5` (20px) | Copyright bar |

---

## 3. Component Internal Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| Card | `p-6` (24px) | — |
| Search container | `p-5 md:p-6` | `gap-3` between input + button |
| Filter chips row | — | `gap-2` (8px), `mt-4` from input |
| Dropdown container | `p-2` (8px) | — |
| Dropdown item | `px-3 py-2.5` | — |
| Nav items | `gap-1` (4px) between items | — |
| Auth buttons | `gap-3` (12px) | — |
| Footer grid | `gap-10` (40px) | — |

---

## 4. Section Header to Content

Standard gap between section header and its content grid: `mb-10` (40px).

---

## 5. Responsive Grid Columns

| Breakpoint | Cards Grid | Footer Grid |
|-----------|-----------|-------------|
| Default | 1 column | 1 column |
| `sm` (640px) | 2 columns | 2 columns |
| `lg` (1024px) | 3 columns | 4 columns |

---

## 6. Max-Width Constraints

| Element | Max Width | Purpose |
|---------|-----------|---------|
| Container | 1400px | Page-level content bound |
| Search module | `max-w-3xl` (768px) | Centered search box |
| Section content | `max-w-6xl` (1152px) | Cards grid area |
| Subtitle text | `max-w-xl` (576px) | Hero subtitle |
| Section subheading | `max-w-2xl` (672px) | Section descriptions |

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
