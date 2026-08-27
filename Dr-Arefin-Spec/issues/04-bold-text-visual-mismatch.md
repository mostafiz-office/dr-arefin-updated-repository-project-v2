# Issue #04 — Bold (`<strong>`) Text Visual Mismatch in Body Paragraphs

## Status: RESOLVED

## Problem

`<strong>` tags inside body/paragraph text appeared visually different from the surrounding text — bolder weight and/or different color — creating an inconsistent reading experience. The user expects **all body text within a paragraph to look uniform**, with `<strong>` tags only serving as semantic emphasis (for SEO and screen readers) and as hover targets for the green keyword-hover effect.

## Root Causes

1. **`font-weight: 600`** on `.xyz strong` selectors instead of `font-weight: inherit` — made bold words thicker than surrounding text.
2. **Explicit color values** like `color: hsl(var(--foreground) / 0.9)` on strong tags — made them a different shade than the parent paragraph.
3. **Inline styles on `<strong>` tags** via `renderBold()` functions that injected `style="color:...;font-weight:600;"` — bypassed CSS cascade entirely.
4. **Tailwind utility classes** like `className="text-foreground/90"` directly on `<strong>` elements.

## Correct Pattern

```css
/* Body paragraph strong tags: inherit everything from parent */
.arefin .section-desc strong {
  color: inherit;
  font-weight: inherit;
  cursor: default;
  transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
              text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
.arefin .section-desc strong:hover {
  color: hsl(var(--primary));
  text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
}
```

```js
// renderBold must produce PLAIN <strong> tags — no inline styles
const renderBold = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
```

## Rules (NEVER violate)

1. **`<strong>` inside body/paragraph text** MUST use `color: inherit; font-weight: inherit;`.
2. **NEVER** put `font-weight: 600` (or any explicit weight) on paragraph-level `<strong>` selectors.
3. **NEVER** put an explicit `color` value on paragraph-level `<strong>` selectors (use `inherit`).
4. **NEVER** use inline styles on `<strong>` tags produced by `renderBold()` or similar helpers.
5. **NEVER** put Tailwind color utility classes (e.g., `text-foreground/90`) directly on `<strong>` elements inside paragraphs.
6. **Heading-level `<strong>`** also uses `color: inherit; font-weight: inherit;` for the same reason.
7. The ONLY visual differentiation allowed is the **hover state** (green color + sharp shadow).

## Affected Sections (Fixed)

- Value Proposition (already correct)
- Initiatives (fixed previously)
- Metrics — `.metric-intro strong`, `.metric-label strong`
- Services — `.services-c-intro strong`, `.services-c-desc strong`
- Videos — added `.video-intro strong`
- CTA Band — `.arefin-band-body strong`
- Patient Stories — `.stories-intro strong`, `.stories-desc strong`
- Final CTA — `.final-cta-body strong`
- All Call-to-Care variations (A, B, C) — removed inline styles from `renderBold()`
- All Transformations variations (A, B, C) — removed inline styles from `renderBold()`

## Post-Mortem

When creating new sections or cards with `<strong>` tags in body text, always copy the correct pattern above. Never assume browser default bold styling is acceptable.
