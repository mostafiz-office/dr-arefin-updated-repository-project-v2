# Paragraph Link Hover Shadow

> Inline link hover effect for body paragraphs (`<p>`) — site-wide.
> Reference: Atto Property Service homepage body copy ("Tarneit, Melton, and the Melbourne CBD (Bond Cleaning)" link inside the hero lede paragraph).

---

## 1. Purpose

Provide a subtle, **non-positional** hover affordance for inline `<a>` elements embedded inside body paragraphs. The link must:

- Be visually distinct from surrounding body text in its **resting** state (color only, no decoration, no shadow).
- Gain a sharp, directional **text-shadow** on hover that adds visual weight without shifting layout.
- Never change position, size, font-weight, or letter-spacing on hover (no perceived "jump").

This spec is **scoped to body paragraphs only**. Heading links use `heading-link-hover-shadow.md`. CTA buttons use `cta-button.md`.

---

## 2. Scope

Applies to every `<a>` that is a **direct or nested child of a `<p>` element** inside content blocks:

- Hero lede paragraphs
- Service description paragraphs
- About/bio paragraphs
- Blog post body paragraphs
- Footer paragraph copy
- Any `<p>` inside `.prose`, `.content-block`, `.seo-container-para`, etc.

Does **NOT** apply to:

- `<a>` inside `<h1>`–`<h6>` → use `heading-link-hover-shadow.md`
- `<a>` styled as buttons (`.btn`, `.cta-*`, `.arefin-dual-cta-*`) → use `cta-button.md`
- Navigation links (`<nav> a`)
- Breadcrumbs, pagination, tag chips

---

## 3. HTML Structure

Use the semantic class `paragraph-link` on every qualifying anchor.

```html
<p>
  Ready for a genuine transformation in your space? Our passionate local experts
  are celebrated for bringing premier results to
  <a class="paragraph-link" href="/service-areas/" title="Service coverage for Tarneit, Melton, and the Melbourne CBD">
    Tarneit, Melton, and the Melbourne CBD (Bond Cleaning)
  </a>.
</p>
```

Rules:

- Class **must** be `paragraph-link` (kebab-case, no variants).
- Internal `href` values must be relative paths with trailing slashes (`/blog/`, `/service-areas/`).
- `title` attribute is optional but recommended for SEO (do **not** use it as a tooltip-only crutch).
- The anchor text must remain inline — never wrap in `<strong>`, `<span>`, or block-level elements.

---

## 4. Visual Specification

### 4.1 Resting state

| Property            | Value                                              |
| ------------------- | -------------------------------------------------- |
| `color`             | `var(--brand-green)` — `rgb(55, 146, 55)`          |
| `font-family`       | inherits from `<p>` (Poppins)                      |
| `font-size`         | inherits (typically `16px`)                        |
| `font-weight`       | inherits (typically `400`) — **do not bold**       |
| `line-height`       | inherits (typically `1.75` / `28.8px`)             |
| `text-decoration`   | `none`                                             |
| `text-shadow`       | `none`                                             |
| `cursor`            | `pointer`                                          |
| `transition`        | `color 0.3s ease-in-out`                           |

### 4.2 Hover state

| Property        | Value                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| `color`         | `var(--brand-green)` (unchanged — color stability is intentional)              |
| `text-shadow`   | `1px 0.7px 0 rgb(40, 61, 5)` — sharp, zero-blur, directional, dark olive tint |
| `text-decoration` | `none` (no underline ever)                                                   |
| `font-weight`   | unchanged (no bolding)                                                         |
| `transform`     | unchanged (no `translate`, `scale`, `skew`)                                    |

### 4.3 Focus-visible state (keyboard)

Mirror the hover shadow **and** add a 2px outline offset for accessibility:

```css
.paragraph-link:focus-visible {
  outline: 2px solid var(--brand-green);
  outline-offset: 2px;
  text-shadow: 1px 0.7px 0 rgb(40, 61, 5);
}
```

### 4.4 Visited state

Inherit resting color — **do not** apply a different `:visited` color.

---

## 5. CSS Implementation

Place inside `@layer components` in `src/index.css` (cascade layer rule — required to coexist with utility overrides).

```css
@layer components {
  .paragraph-link {
    color: var(--brand-green);
    text-decoration: none;
    text-shadow: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .paragraph-link:hover {
    text-shadow: 1px 0.7px 0 rgb(40, 61, 5);
  }

  .paragraph-link:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
    text-shadow: 1px 0.7px 0 rgb(40, 61, 5);
  }
}
```

### Dark backgrounds

If a paragraph sits on a dark section (`.bg-dark`, `.section-dark`, etc.), swap the link color to the lighter brand green token. **The override must live in the same `@layer components`** to win the cascade (per project rule).

```css
@layer components {
  .section-dark .paragraph-link,
  .bg-dark .paragraph-link {
    color: var(--brand-green-light); /* e.g. #7BC47F — see dark-bg-hover-states memory */
  }

  .section-dark .paragraph-link:hover,
  .bg-dark .paragraph-link:hover {
    text-shadow: 1px 0.7px 0 rgba(0, 0, 0, 0.55);
  }
}
```

---

## 6. Hard Constraints

- ❌ No `!important`.
- ❌ No inline `style="..."`.
- ❌ No `transform`, `translate`, `scale`, `margin`, `padding`, `font-weight`, or `letter-spacing` change on hover.
- ❌ No `text-decoration: underline` ever (resting or hover).
- ❌ No `text-shadow` in the resting state — shadow appears **only** on `:hover` and `:focus-visible`.
- ❌ No blur on the shadow — third value must be `0`.
- ❌ Do not apply this class to non-`<p>` containers.
- ✅ Use kebab-case class name `paragraph-link`.
- ✅ Use CSS variables for all colors.
- ✅ Place rules inside `@layer components`.
- ✅ Internal `href` uses trailing-slash relative paths.

---

## 7. Acceptance Checklist

A build passes only if **all** of these are true:

- [ ] Inline `<a class="paragraph-link">` inside any `<p>` renders in `rgb(55, 146, 55)` with no underline and no shadow at rest.
- [ ] On hover, a crisp `1px 0.7px 0 rgb(40, 61, 5)` shadow appears — no blur, no color change, no underline, no movement.
- [ ] On keyboard focus, the same shadow plus a 2px outline at 2px offset appears.
- [ ] No layout shift, no visible position change between rest and hover (verified by toggling hover in DevTools).
- [ ] Works identically on light and dark section backgrounds (with the dark-section color override in place).
- [ ] Class name is exactly `paragraph-link` (no variants, no BEM modifiers).
- [ ] Rule is inside `@layer components` in `src/index.css`.
- [ ] No `!important`, no inline styles, no `transform` on hover.
- [ ] WCAG 2.1 AA contrast ≥ 4.5:1 against the paragraph background in both rest and hover states.

---

## 8. Related Specs

- `heading-link-hover-shadow.md` — same visual language for H1/lede inline links.
- `cta-button.md` — hover-only shadow rules for CTA buttons.
- `mem://style/visual-legibility/hover-shadow-standard` — global sharp zero-blur shadow standard.
- `mem://style/visual-legibility/dark-bg-hover-states` — light-green token for dark-section legibility.
