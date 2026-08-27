# Heading & Lede Link Hover Shadow Spec — Atto Property 1:1 Replica

> **Source of truth:** https://attoproperty.com.au/  
> Captured: 2026-04-29 (DevTools → Computed → `text-shadow` on hovered H1/lede links)  
> Scope: Interactive `<a>` fragments **inside** the hero `<h1>` and the hero lede paragraph (e.g. "Steam Cleaning", "Bond Cleaning", inline keyword links).  
> Goal: Pixel-identical Atto hover behaviour — sharp zero-blur dark-green tint that "thickens" the word on hover, with **zero positional shift**.  
> Pairs with: `cta-button.md` and `hero-h1-text-shadow.md` (both use the same shadow formula).

---

## 1. The exact value

```css
text-shadow: 1px 0.7px 0 <dark-green>;
```

| Component | Value                          |
|-----------|--------------------------------|
| offset-x  | `1px`                          |
| offset-y  | `0.7px`                        |
| blur      | `0` (sharp — NEVER blurred)    |
| color     | dark-green ink (see §3 tokens) |

This is the **same** `1px 0.7px 0` offset as the always-on H1 shadow (`hero-h1-text-shadow.md`) and the dual-CTA pill shadow (`cta-button.md`). Three surfaces, one shadow geometry. The only thing that varies is the **color token** per theme.

## 2. HTML structure (canonical)

```html
<h1 class="hero-h1 font-arefin-heading">
  Bond Cleaning, Carpet Cleaning, and
  <a href="#steam" class="hero-h1-link is-accent">Steam Cleaning</a>
</h1>

<p class="hero-lede">
  We specialise in
  <a href="#bond" class="hero-p-link">Bond Cleaning</a>,
  <a href="#carpet" class="hero-p-link">Carpet Cleaning</a>, and more.
</p>
```

Two link classes only:
- `.hero-h1-link` — interactive fragment **inside `<h1>`**. Optional modifier `.is-accent` for words that are green at rest (e.g. "Steam Cleaning").
- `.hero-p-link` — interactive fragment **inside `<p class="hero-lede">`**. Inherits weight from surrounding text (no bolding).

Both must be wrapped in `.hero-04-light-band` for the styles to apply.

## 3. Color tokens per theme

| Theme | Selector chain                                         | Hover color (text)         | Hover shadow color           |
|-------|--------------------------------------------------------|----------------------------|------------------------------|
| Light | `.arefin:not(.dark) .hero-04-light-band .hero-*-link` | `hsl(var(--hero-light-primary))` | `hsl(var(--hero-light-deep))` |
| Dark  | `.arefin.dark .hero-04-light-band .hero-*-link`        | `hsl(var(--primary-light))`      | `hsl(160 22% 5%)` (near-black green) |

**Static (default) state:**
- `.hero-h1-link` (no modifier) → inherits the H1's color.
- `.hero-h1-link.is-accent` → `hsl(var(--hero-light-primary))` (light) / `hsl(var(--primary))` (dark) at rest, **no shadow** of its own (the parent H1's always-on shadow is what shows through).
- `.hero-p-link` → inherits paragraph color + weight.

## 4. Behaviour rules

1. **Hover and focus-visible are identical.** Every `:hover` rule below MUST also list `:focus-visible` for keyboard parity.
2. **Only `color` and `text-shadow` animate.** No `transform`, no `letter-spacing`, no `font-weight`, no `background`, no underline toggle. The transition list is exactly:
   ```css
   transition:
     color 280ms cubic-bezier(0.22, 1, 0.36, 1),
     text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
   ```
3. **Sharp shadow only.** Third value is `0` (no blur). Never use `2px`, `0.5px`, or any blur radius.
4. **No underline.** `text-decoration: none` on rest, hover, and focus.
5. **No background gradient.** `background-image: none` to neutralize global link styles that paint a gradient underline.
6. **Outline reset on hover only.** `outline: none` is permitted in `:hover`/`:focus-visible` because the shadow + color shift provide a clear visual cue. Do NOT remove the outline globally.
7. **Dark-mode hue stability.** In dark mode every interactive hover (h1 link, p link, accent fragment, plain `a`) MUST resolve to the **same** color token (`--primary-light`) and the **same** shadow color. This prevents the "flashing" effect when the cursor crosses sections.

## 5. Reference CSS (drop-in)

```css
@layer components {
  /* ── Base (shared transition + reset) ─────── */
  .hero-04-light-band .hero-h1-link,
  .hero-04-light-band .hero-p-link {
    color: inherit;
    text-decoration: none;
    background-image: none;
    transition:
      color 280ms cubic-bezier(0.22, 1, 0.36, 1),
      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── H1 link hover (plain) ────────────────── */
  .hero-04-light-band .hero-h1-link:hover,
  .hero-04-light-band .hero-h1-link:focus-visible {
    color: hsl(var(--hero-light-primary));
    text-shadow: 1px 0.7px 0 hsl(var(--hero-light-deep));
    outline: none;
  }

  /* ── H1 link with .is-accent (already green at rest) ── */
  .hero-04-light-band .hero-h1-link.is-accent {
    color: hsl(var(--hero-light-primary));
  }
  .hero-04-light-band .hero-h1-link.is-accent:hover,
  .hero-04-light-band .hero-h1-link.is-accent:focus-visible {
    color: hsl(var(--hero-light-primary));
    text-shadow: 1px 0.7px 0 hsl(var(--hero-light-deep));
  }

  /* ── Lede paragraph link hover ────────────── */
  .hero-04-light-band .hero-p-link {
    color: inherit;
    font-weight: inherit; /* never bold */
  }
  .hero-04-light-band .hero-p-link:hover,
  .hero-04-light-band .hero-p-link:focus-visible {
    color: hsl(var(--hero-light-primary));
    text-shadow: 1px 0.7px 0 hsl(var(--hero-light-deep));
    outline: none;
  }

  /* ── DARK variant — unified hover hue + shadow (same @layer!) ── */
  .arefin.dark .hero-04-light-band .hero-h1-link:hover,
  .arefin.dark .hero-04-light-band .hero-h1-link:focus-visible,
  .arefin.dark .hero-04-light-band .hero-h1-link.is-accent,
  .arefin.dark .hero-04-light-band .hero-h1-link.is-accent:hover,
  .arefin.dark .hero-04-light-band .hero-h1-link.is-accent:focus-visible,
  .arefin.dark .hero-04-light-band .hero-p-link:hover,
  .arefin.dark .hero-04-light-band .hero-p-link:focus-visible {
    color: hsl(var(--primary-light));
    text-shadow: 1px 0.7px 0 hsl(160 22% 5%);
  }
  .arefin.dark .hero-04-light-band .hero-h1-link.is-accent {
    color: hsl(var(--primary));
    text-shadow: none; /* parent H1 shadow shows through at rest */
  }
}
```

## 6. Cascade-layer requirement (CRITICAL)

Per `mem://tech/css/cascade-layers-vs-specificity` — **all** rules above (base + light + dark) MUST live in the **same `@layer components`** block. If dark overrides drift into `@layer utilities` (or no layer at all), the utilities-layer color tokens silently win over the dark hover color regardless of selector specificity, and the hover hue will appear inconsistent across sections.

## 7. Forbidden on hover (project-wide)

- ❌ `transform: translateX/Y/scale` — no nudges, no scale-up
- ❌ `opacity` change
- ❌ `filter: brightness/blur/drop-shadow`
- ❌ `text-decoration: underline` toggle
- ❌ `font-weight` change (would re-flow the line)
- ❌ `letter-spacing` change
- ❌ Multi-shadow stacks (e.g. `0 1px 0 …, 0 0 4px …`) — Atto uses a **single** sharp shadow

## 8. Acceptance checklist

- [ ] `.hero-h1-link` and `.hero-p-link` use only `color` + `text-shadow` in their `transition` list
- [ ] Hover shadow value is exactly `1px 0.7px 0` with **zero blur**
- [ ] `:hover` and `:focus-visible` rules are paired everywhere
- [ ] Light theme hover color = `hsl(var(--hero-light-primary))`, shadow = `hsl(var(--hero-light-deep))`
- [ ] Dark theme hover color = `hsl(var(--primary-light))`, shadow = `hsl(160 22% 5%)` — **identical** for h1 link, p link, and accent fragment
- [ ] `.hero-h1-link.is-accent` at rest in dark mode has `text-shadow: none` (parent H1 shadow shows)
- [ ] No `transform`, `opacity`, `filter`, `font-weight`, or `letter-spacing` change on hover
- [ ] No underline appears on hover
- [ ] All rules live inside one `@layer components` block (no layer drift between base + dark)
- [ ] `outline: none` only inside `:hover`/`:focus-visible` (never globally)

## 9. Token reference

| Token (CSS var)            | Light value (resolved) | Dark value (resolved) | Used for                       |
|----------------------------|------------------------|-----------------------|--------------------------------|
| `--hero-light-primary`     | sage green             | —                     | Light hover text color         |
| `--hero-light-deep`        | dark green             | —                     | Light hover shadow color       |
| `--primary-light`          | —                      | bright sage           | Dark hover text color (unified)|
| literal `hsl(160 22% 5%)`  | —                      | near-black green ink  | Dark hover shadow color        |

The shadow color is intentionally the **darker** sibling of the text color in both themes — this is what produces the "ink-pressed" look, not a glow.

## 10. Known pitfalls (do not repeat)

1. **Layer drift on dark overrides** — placing the dark hover hue in `@layer utilities` (or unlayered) while base lives in `@layer components` makes the dark rule silently lose to lower-specificity utility colors. Keep them together.
2. **Multiple hover hues across sections** — using `--primary` in one place and `--primary-light` in another causes a visible "flash" as the cursor moves. The dark theme MUST use a single token (`--primary-light`) for every interactive hover.
3. **Blurred shadow** — adding any blur (e.g. `1px 0.7px 2px …`) softens the effect into a glow and breaks Atto parity. Always `0` blur.
4. **Underline on hover** — global `a:hover { text-decoration: underline }` rules must be neutralized inside `.hero-04-light-band` for these classes.
5. **Bolding `.hero-p-link` on hover** — re-flows the entire paragraph and shifts surrounding words. The lede must stay `font-weight: inherit` at all times.
6. **Removing the parent H1 shadow** when a child `.hero-h1-link.is-accent` is hovered — never disable the parent shadow; both layer cleanly because they share the same offset.
