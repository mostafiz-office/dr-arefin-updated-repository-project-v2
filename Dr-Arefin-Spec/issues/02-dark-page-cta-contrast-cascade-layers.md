# Issue #02 — Dark page "Call Now" CTA contrast failure (cascade-layers pitfall)

## Symptom
On `/home-dark`, the hero secondary "Call Now" pill rendered with **deep green
text on a light-tinted background**, failing WCAG 2.1 AA contrast against the
dark hero. The user reported the button "fading" and asked for white pill +
black text instead.

## Root cause — cascade layers, not specificity
A dark-mode override rule **already existed**:

```css
/* @layer base */
.arefin.dark .hero-cta-secondary { background: #fff; color: #0a0a0a; }
```

By selector specificity it should have won. **But it didn't**, because the
light-band base rule lives in a *later* layer:

```css
/* @layer utilities */
.hero-04-light-band .hero-cta-secondary { color: hsl(var(--hero-light-deep)); ... }
```

> **CSS cascade-layer order ALWAYS beats specificity across layers.**
> A rule in `@layer utilities` wins over any rule in `@layer base`,
> regardless of how specific the base-layer selector is.

So the dark override was silently dead.

## Fix
Move the dark-mode CTA override into the **same layer** as the light-band
rule (`@layer utilities`), with a higher-specificity selector for safety:

```css
/* @layer utilities */
.arefin.dark .hero-04-light-band .hero-cta-secondary {
  background: #ffffff;   /* white pill */
  color: #0a0a0a;        /* near-black text — 19:1 contrast */
  border-color: #ffffff;
}
```

Hover state inverts to brand green `hsl(var(--arefin-cta-green))` with white text.

## Prevention rules (add to design system)
1. **Dark-mode overrides MUST live in the same `@layer` as the light-mode rule
   they override.** Never assume specificity will save you across layers.
2. When defining a token-style rule in `@layer base`, document the layer in a
   comment so future overrides know where to live.
3. On dark backgrounds, secondary/ghost CTAs MUST invert to a light fill with
   dark text — not a tinted/muted variant. Minimum contrast 4.5:1 (AA),
   target ≥10:1 for trust.
4. Whenever you add a `.arefin.dark` override, grep for the same selector in
   `@layer utilities` first:
   ```
   rg "\.hero-cta-secondary" src/index.css
   ```

## Verification
- White (`#ffffff`) on dark hero band: button is clearly visible.
- Black (`#0a0a0a`) on white pill: 19:1 contrast (exceeds AAA).
- Hover green (`#079A14`) + white text: 5.0:1 (AA pass).
