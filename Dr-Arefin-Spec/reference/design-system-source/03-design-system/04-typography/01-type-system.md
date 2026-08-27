# Typography System

---

## 1. Font Stack

```css
font-family: 'Inter', sans-serif;
```

- **Primary font**: Inter (loaded from Google Fonts: weights 400, 500, 600, 700, 800)
- **Fallback**: system sans-serif

---

## 2. Size Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Descriptions, footnotes, badges |
| `text-sm` | 14px | 20px | Nav items, body text, card descriptions, input text |
| `text-base` | 16px | 24px | Subtitle text (mobile) |
| `text-lg` | 18px | 28px | Subtitle text (desktop) |
| `text-xl` | 20px | 28px | Brand name in logo |
| `text-3xl` | 30px | 36px | Section headings (mobile) |
| `text-4xl` | 36px | 40px | Hero title (mobile), section headings (desktop) |
| `text-5xl` | 48px | 1 | Hero title (sm) |
| `text-6xl` | 60px | 1 | Hero title (md) |
| `text-7xl` | 72px | 1 | Hero title (lg) |

---

## 3. Weight Scale

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Nav items, dropdown labels, form labels |
| Semibold | 600 | Button text, section subheadings, footer headings |
| Bold | 700 | Card titles, section headings |
| Extrabold | 800 | Hero title, logo text |

---

## 4. Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| `tracking-tight` | -0.025em | Hero title only |
| (default) | 0 | Everything else |

---

## 5. Text Color Rules

| Context | Color Token |
|---------|-------------|
| Default body text | `text-foreground` |
| Subdued / description | `text-muted-foreground` |
| Brand emphasis | `text-primary` |
| On primary background | `text-primary-foreground` |
| Nav items (default) | `text-foreground/80` |
| Placeholder text | `text-muted-foreground/60` |

---

## 6. Heading Pattern

Section headings follow a two-tone pattern:

```html
<h2 class="text-3xl font-bold text-foreground md:text-4xl">
  Key Greenhouse <span class="text-primary">Gases</span>
</h2>
```

- Main text: `text-foreground`
- Keyword: `text-primary`
- This creates visual emphasis while keeping the brand color prominent

---

## 7. Button Text

| Button Type | Size | Weight |
|-------------|------|--------|
| Primary (Join Us) | `text-sm` | `font-semibold` (600) |
| Ghost (Sign In) | `text-sm` | `font-medium` (500) |
| Submit (Newsletter) | Inherits | Inherits from Button component |

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
