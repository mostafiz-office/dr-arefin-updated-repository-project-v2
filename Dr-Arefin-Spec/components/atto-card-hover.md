# Atto Property Card Hover — Canonical Pattern

> **Source of truth** for **all card hover behavior** across Dr. Arefin sections (services, transformations, initiatives, metrics, testimonials, videos, blog, credentials, anim, data).
> Reverse-engineered directly from the live CSS at <https://attoproperty.com.au/blog/> on **2026-04-29** by scraping the rendered HTML and reading the inline `<style>` block emitted by Elementor for the `.my-post-item` (`.blog-card`) container.

---

## 1. Verified source CSS (from Atto Property)

The exact custom CSS Atto Property ships for their blog cards:

```css
.my-post-item {
  transition: box-shadow 0.3s ease, border-left 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);   /* always-on subtle resting shadow */
  border-left: 5px solid transparent;          /* reserves space, no layout shift on hover */
}

.my-post-item:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25); /* SOFT, BLURRED, OFFSET-DOWN dark drop shadow */
  border-left: 5px solid #008000;              /* solid green left accent */
}
```

### Key observations

1. **Border-left width is 5px**, not 3px. The transparent 5px border at rest reserves space so the green border on hover does not shift the card.
2. **The hover shadow is a classic soft drop shadow** — large blur (25px), dark (rgba black at 25% opacity), offset 10px down. **It is NOT a sharp zero-blur green-tinted shadow.**
3. **A subtle resting shadow** (`0 1px 3px rgba(0,0,0,0.08)`) is present at rest — the cards never look "flat."
4. **Transition is on `box-shadow` and `border-left` only** — no transforms, no color, no background.
5. **Title color does not change** in Atto's implementation. (We add it on top as a Dr. Arefin-only enhancement to honor the two-greens-only rule.)

---

## 2. Adaptation for Dr. Arefin

We replicate the pattern 1:1 with two project-specific adjustments:

| Atto value | Dr. Arefin value | Why |
|---|---|---|
| `border-left: 5px solid #008000` | `border-left: 5px solid hsl(var(--primary-bright))` (#14bb3e) | Two-greens-only rule |
| `box-shadow: 0 10px 25px rgba(0,0,0,0.25)` | **identical** | Soft dark shadow is intentionally brand-neutral |
| `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` (rest) | **identical** | Never look flat |
| (no title color change) | Title → `hsl(var(--primary-darker))` (#079a14) on hover | Reinforces interactivity within the two-greens system |

---

## 3. Final implementation (single source)

Lives at the bottom of `src/index.css` inside the project `@layer`. Selector list covers every Dr. Arefin card class:

```css
.arefin .a-card,
.arefin .b-card,
.arefin .c-card,
.arefin .trA-card,
.arefin .trC-card,
.arefin .services-c-card,
.arefin .initiatives-card,
.arefin .video-card-a, .arefin .video-card-b, .arefin .video-card-c,
.arefin .metric-card,
.arefin .cred-card,
.arefin .data-card,
.arefin .anim-card,
.arefin .testA-card, .arefin .testB-card, .arefin .testC-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-left: 5px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 300ms ease, border-left 300ms ease;
}

.arefin .[every-card]:hover {
  border-left: 5px solid hsl(var(--primary-bright));
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

.arefin .[every-card]:hover :is(h2, h3, h4),
.arefin .[every-card]:hover :is(h2, h3, h4) a {
  color: hsl(var(--primary-darker));
  transition: color 300ms ease;
}
```

### Why this single block beats per-component CSS

The selector `.arefin .x-card` (specificity 0,2,0) intentionally outweighs any per-section inline `<style>` rule that targets `.x-card` alone (specificity 0,1,0). This guarantees uniform hover behavior across every section without editing each component file.

---

## 4. Why the previous implementation looked wrong

Before 2026-04-29, this block used:

```css
border-left: 3px solid hsl(var(--primary-bright));
box-shadow: 0 2px 0 0 hsl(var(--primary-bright) / 0.4);  /* sharp, zero-blur, GREEN */
```

This was a misreading of Atto's pattern that conflated it with the older "hover-shadow-standard" rule (sharp directional shadows on headings/keywords). The result: green sliver instead of soft elevation. Users perceived the cards as not lifting on hover.

**Lesson learned:** The "sharp zero-blur shadow" rule applies to **inline text hovers** (heading/keyword underlines), **not to card containers**. Cards use Atto's **soft blurred dark drop shadow** because the larger surface needs the perception of physical elevation, not a graphic accent line.

---

## 5. Token use (two-greens-only rule)

- Resting border → transparent
- Hover border → `--primary-bright` (#14bb3e)
- Resting shadow → `rgba(0,0,0,0.08)` (brand-neutral)
- Hover shadow → `rgba(0,0,0,0.25)` (brand-neutral)
- Hover title color → `--primary-darker` (#079a14)

❌ Never tint the box-shadow green.
❌ Never use a sharp zero-blur shadow on cards.
❌ Never introduce a third green.
❌ Never use `translate*` on hover.
❌ Never use `!important`.

---

## 6. Adding a new card

1. Use a class name ending in `-card` (e.g. `pricing-card`).
2. Add it to the rest selector list AND the `:hover` selector list AND the title-color selector list in the `ATTO PROPERTY CARD HOVER` block in `src/index.css`.
3. Done. No per-component hover CSS needed.
