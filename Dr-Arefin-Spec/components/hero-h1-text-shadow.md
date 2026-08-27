# Hero H1 Hover Text-Shadow Spec — Dr. Arefin

> **Source of truth:** Dr. Arefin design rule (derived from Atto Property's shadow geometry, but applied **only on hover** — Atto uses it always-on; we don't).  
> Captured: 2026-04-29  
> Scope: The hero `<h1>` headline on the homepage (and any reused hero band).  
> Goal: A subtle "ink-pressed" weight cue that appears **only when the heading is hovered**, then fades cleanly back to nothing.

---

## 1. The exact value

```css
/* default */ text-shadow: none;
/* :hover  */ text-shadow: rgb(40, 61, 5) 1px 0.7px 0px;
```

| Component | Value                          |
|-----------|--------------------------------|
| offset-x  | `1px` (right)                  |
| offset-y  | `0.7px` (down)                 |
| blur      | `0px` (sharp — NEVER blurred)  |
| color     | `rgb(40, 61, 5)` (dark green)  |

Same shadow geometry as the dual-CTA pills (`cta-button.md`) — only the trigger differs.

## 2. Where to apply

Selector: `.hero-04-light-band .hero-h1`

The shadow lives on the `<h1>` itself, not on its children. When the user hovers the H1 (including any inner `.hero-h1-link.is-accent`), the shadow appears across the whole headline.

## 3. Rules

- **Default state has NO text-shadow.** This is the project rule — text-shadow only signals interaction.
- **On `:hover` only**, the shadow fades in. `:focus-visible` should mirror `:hover` for keyboard parity.
- **Animated, not popped.** Add `text-shadow` to the `transition` list so the appearance is smooth (~0.4s ease).
- **Sharp, not blurred.** Third value is exactly `0px`. Never use blur.
- **Color is fixed.** `rgb(40, 61, 5)` regardless of theme (light/dark hero).
- **No transform.** Hover never changes `transform`, `letter-spacing`, `font-weight`, or any property that would cause perceived shift. Only `text-shadow` (and optional `color` on inner links) animates.
- The Or badge / svg children are NOT included.

## 4. Reference CSS

```css
.hero-04-light-band .hero-h1 {
  font-weight: 800;
  letter-spacing: -0.018em;
  line-height: 1.18;
  color: hsl(var(--hero-light-deep));
  /* No text-shadow at rest */
  transition: text-shadow 0.4s ease;
}
.hero-04-light-band .hero-h1:hover,
.hero-04-light-band .hero-h1:focus-within {
  text-shadow: rgb(40, 61, 5) 1px 0.7px 0px;
}
```

`:focus-within` is used (instead of `:focus-visible`) so the shadow appears when any inner link receives keyboard focus.

## 5. Acceptance checklist

- [ ] `.hero-04-light-band .hero-h1` has NO `text-shadow` at rest
- [ ] On `:hover` (and `:focus-within`) the shadow `rgb(40, 61, 5) 1px 0.7px 0px` is applied
- [ ] `text-shadow` is in the `transition` list so it fades in over ~0.4s
- [ ] Zero blur (third value is `0px`)
- [ ] No `transform`, `letter-spacing`, or `font-weight` change on hover
- [ ] Value renders identically across light + dark themes (color stays `rgb(40, 61, 5)`)

## 6. Token reference

| Token name (informal) | Value                           | Used by                                 |
|-----------------------|---------------------------------|-----------------------------------------|
| `--arefin-hover-ink`  | `rgb(40, 61, 5) 1px 0.7px 0px`  | Hero H1 (hover), dual-CTA pills (hover) |

Inline the value at each site to avoid layer-drift surprises.

## 7. Difference from Atto Property

Atto applies this same shadow **always-on**. Dr. Arefin's rule is stricter: text-shadow signals interaction, never decoration. If a future surface needs a "weighted" headline at rest, change the `font-weight` or `color` — do not introduce an always-on shadow.
