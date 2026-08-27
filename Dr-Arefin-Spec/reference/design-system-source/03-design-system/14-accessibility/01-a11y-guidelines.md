# Accessibility Guidelines

---

## 1. Color Contrast

All theme variable combinations must meet WCAG AA:

| Pair | Required Ratio |
|------|---------------|
| `--foreground` on `--background` | ≥ 4.5:1 |
| `--primary-foreground` on `--primary` | ≥ 4.5:1 |
| `--muted-foreground` on `--background` | ≥ 4.5:1 |
| `--muted-foreground` on `--card` | ≥ 4.5:1 |

When swapping theme variables, always re-verify contrast.

---

## 2. Focus Indicators

All interactive elements must show a visible focus ring:

```css
focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary
```

Never remove focus indicators for aesthetic reasons.

---

## 3. Reduced Motion

Wrap all keyframe animations:

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

## 4. Semantic HTML

- Use `<nav>` for navigation
- Use `<main>` for primary content
- Use `<footer>` for footer
- Use `<section>` with headings for content blocks
- Use `<button>` for interactive elements (not `<div onclick>`)
- Use `<a>` for links with `href`

---

## 5. ARIA Labels

- Icon-only buttons must have `aria-label`
- Social media buttons: `aria-label="Facebook"` etc.
- Hamburger menu button: `aria-label="Toggle menu"`
- Decorative elements (orbs, gradients): no ARIA needed

---

## 6. Keyboard Navigation

- All interactive elements must be reachable via Tab
- Dropdowns should be navigable with arrow keys (enhancement)
- Escape should close open dropdowns and mobile menu
- Enter/Space should activate buttons

```
REMAINING TASKS:
This completes the full design system specification.
All sections have been written. No remaining tasks.
Do you understand? Say "next" to continue.
```
