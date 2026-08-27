# CTA Button Spec — Header Dual CTA (Atto Property 1:1 Replica)

> **Source of truth:** https://attoproperty.com.au/  
> Captured: 2026-04-29  
> Scope: ONLY the header "Call · Or · Contact" dual-pill CTA in the top-right of the site header.  
> Goal: Any AI/dev can build a pixel-identical replica from this file alone — no guessing.

---

## 1. Anatomy

```
┌─────────────────────────────────────────────────┐
│   [   Call   ] ◯Or  [   Contact   ]            │
│   navy dark    white circle   Atto green       │
└─────────────────────────────────────────────────┘
```

Three elements rendered side by side as ONE unified pill:

| # | Element                         | Class (Atto / Elementor) | Class (this project)        |
|---|---------------------------------|--------------------------|-----------------------------|
| 1 | Left button (primary action)    | `ekit-double-btn-one`    | `arefin-dual-cta-call`      |
| 2 | Center floating "Or" badge      | `ekit_button_middle_text`| `arefin-dual-cta-or`        |
| 3 | Right button (secondary action) | `ekit-double-btn-two`    | `arefin-dual-cta-contact`   |

Wrapper container: `arefin-dual-cta` (analog of `ekit_double_button` + `ekit-wid-con` wrapper).

---

## 2. HTML structure (canonical)

```html
<div class="arefin-dual-cta">
  <a class="arefin-dual-cta-call" href="tel:+49...">Call</a>
  <span class="arefin-dual-cta-or" aria-hidden="true">Or</span>
  <a class="arefin-dual-cta-contact" href="/contact">Contact</a>
</div>
```

Rules:
- Wrapper is `position: relative` so the "Or" badge can be absolutely centered.
- Left/right buttons sit flush against each other (no gap).
- "Or" is decorative (`aria-hidden="true"`); both `<a>` elements have full visible labels.

---

## 3. Pixel spec (light variant — exact Atto values)

### 3.1 Wrapper `.arefin-dual-cta`

| Property        | Value                                |
|-----------------|--------------------------------------|
| display         | `inline-flex`                        |
| align-items     | `center`                             |
| position        | `relative`                           |
| width           | `auto` (content-driven)              |

### 3.2 Left button `.arefin-dual-cta-call` (Atto: `ekit-double-btn-one`)

| Property         | Value                                        |
|------------------|----------------------------------------------|
| background-color | `#001837` (dark navy)                        |
| color            | `#FFFFFF`                                    |
| font-family      | `"Poppins", sans-serif`                      |
| font-size        | `15px` (resolved global primary)             |
| font-weight      | `500`                                        |
| line-height      | `20px`                                       |
| letter-spacing   | `0` (default)                                |
| text-align       | `center`                                     |
| text-transform   | `none`                                       |
| padding          | `12px 25px 12px 25px`                        |
| margin           | `0`                                          |
| border           | `0`                                          |
| border-radius    | `10px 0 0 10px` (left side only)             |
| cursor           | `pointer`                                    |
| text-shadow      | `none` at rest; `rgb(40, 61, 5) 1px 0.7px 0px` on `:hover` only |
| transition       | `background-color 0.4s ease, color 0.4s ease`|
| display          | `inline-block`                               |

### 3.3 Right button `.arefin-dual-cta-contact` (Atto: `ekit-double-btn-two`)

| Property         | Value                                        |
|------------------|----------------------------------------------|
| background-color | `#54B435` (Atto primary green)               |
| color            | `#FFFFFF`                                    |
| font-family      | `"Poppins", sans-serif`                      |
| font-size        | `15px`                                       |
| font-weight      | `500`                                        |
| line-height      | `20px`                                       |
| padding          | `12px 25px 12px 25px`                        |
| margin           | `0`                                          |
| border           | `0`                                          |
| border-radius    | `0 10px 10px 0` (right side only)            |
| cursor           | `pointer`                                    |
| text-shadow      | `none` at rest; `rgb(40, 61, 5) 1px 0.7px 0px` on `:hover` only |
| transition       | `background-color 0.4s ease, color 0.4s ease`|
| display          | `inline-block`                               |

### 3.4 Center "Or" badge `.arefin-dual-cta-or` (Atto: `ekit_button_middle_text`)

| Property         | Value                                        |
|------------------|----------------------------------------------|
| width            | `20px`                                       |
| height           | `20px`                                       |
| border-radius    | `50px` (full circle)                         |
| background       | `#FAFAF8` (off-white)                        |
| color            | `#444444`                                    |
| font-family      | `"Poppins", sans-serif`                      |
| font-size        | `12px`                                       |
| font-weight      | `500`                                        |
| line-height      | `20px` (collapsed to height for vertical center) |
| display          | `inline-flex`                                |
| align-items      | `center`                                     |
| justify-content  | `center`                                     |
| position         | `absolute`                                   |
| left             | `50%`                                        |
| top              | `50%`                                        |
| transform        | `translate(-50%, -50%)`                      |
| z-index          | `5`                                          |
| box-shadow       | `0 0 0 6px rgba(255, 255, 255, 0.2)`         |
| pointer-events   | `none`                                       |

The 6px white halo (`box-shadow` ring) is what gives the badge its "floating coin" look — **mandatory**.

### 3.5 Hover states (light)

| Element         | Property         | Hover value                     | Note                              |
|-----------------|------------------|---------------------------------|-----------------------------------|
| Left (Call)     | background-color | `#379237` (dark green)          | Navy → green on hover             |
| Left (Call)     | color            | `#FFFFFF`                       | Stays white                       |
| Right (Contact) | background-color | `#379237` (dark green)          | Light green → dark green          |
| Right (Contact) | color            | `#FFFFFF`                       | Stays white                       |
| Or badge        | (no change)      | —                               | Static                            |

**Forbidden on hover** (project-wide rule):
- ❌ `transform: translateX/Y/scale` — no position shifts
- ❌ `opacity` changes — no fade
- ❌ `filter: brightness/blur` — use color only
- ❌ `box-shadow` lift effects on the buttons (the Or-badge ring is the only shadow allowed)

Only `background-color` (and `color` if needed) animates on `:hover`.

### 3.6 Text shadow — HOVER ONLY (Dr. Arefin rule)

A sharp dark-green micro shadow appears as a hover cue, then disappears at rest. This differs from Atto Property (which keeps the shadow always-on); Dr. Arefin uses it strictly as an interaction signal.

```
/* default */ text-shadow: none;
/* :hover  */ text-shadow: rgb(40, 61, 5) 1px 0.7px 0px;
```

Rules:
- Apply to BOTH `.arefin-dual-cta-call` and `.arefin-dual-cta-book` / `.arefin-dual-cta-contact` (left + right pill).
- **Default state has NO text-shadow.** Only `:hover` (and `:focus-visible` for keyboard parity) carries it.
- Color is the dark-green `rgb(40, 61, 5)` regardless of pill background or theme (light/dark).
- Zero blur (third value is `0px`). Sharp 1px / 0.7px directional offset, not a glow.
- Add `text-shadow` to the `transition` list so the appearance is animated, not popped: `transition: background-color 0.4s ease, color 0.4s ease, text-shadow 0.4s ease;`
- Override any global `a:hover { text-shadow: ... }` rule for these three classes by re-declaring the dark-green value on `:hover`.

The Or badge does NOT receive this shadow — it stays clean.

---

## 4. Pixel spec (dark variant — for `.arefin.dark` pages)

The dark homepage flips the relationship: the Atto-style "navy + green" pair fights the dark page background. The dark variant uses **white-pill primary + green secondary** for maximum contrast on a near-black surface.

### 4.1 Left button `.arefin.dark .arefin-dual-cta-call`

| Property         | Default value                | Hover value                       |
|------------------|------------------------------|-----------------------------------|
| background-color | `#FFFFFF`                    | `#54B435` (Atto green)            |
| color            | `hsl(0 0% 4%)` (near-black)  | `#FFFFFF`                         |
| border-color     | `#FFFFFF`                    | `#54B435`                         |

All other properties (size, padding, radius, font) are **identical** to the light variant. Only colors change.

### 4.2 Right button `.arefin.dark .arefin-dual-cta-book` / `.arefin-dual-cta-contact`

| Property         | Default value           | Hover value                  |
|------------------|-------------------------|------------------------------|
| background-color | `#54B435` (Atto green)  | `#379237` (Atto dark green)  |
| color            | `#FFFFFF`               | `#FFFFFF` (stays white)      |
| svg stroke       | `#FFFFFF`               | `#FFFFFF` (stays white)      |

**Atto-parity rule (Dr. Arefin update, 2026-04-29):** On hover the green pill darkens but the **text and icon remain white** — never flip to black. Mirrors Atto Property's right-button behavior. The previously-used `#7ED957 + black text` flip looked odd on the dark header and is forbidden.

### 4.3 Or badge — dark variant

| Property         | Value                                |
|------------------|--------------------------------------|
| background       | `#0A0A0A` (page bg)                  |
| color            | `#FFFFFF`                            |
| box-shadow       | `0 0 0 6px rgba(255, 255, 255, 0.15)`|

The halo flips from white-on-light to white-on-dark; the badge body matches the page surface so it reads as a "punched-through" coin.

### 4.4 Cascade-layer requirement (CRITICAL)

Per `mem://tech/css/cascade-layers-vs-specificity`, dark overrides MUST live in the **same `@layer`** (or a later layer) as the base rules. Place both base and dark rules in `@layer components` together — never split base into `components` and overrides into `utilities` only, otherwise utilities-layer color tokens silently win regardless of selector specificity.

---

## 5. Reference CSS (drop-in, light + dark)

```css
@layer components {
  /* ── Wrapper ─────────────────────────────── */
  .arefin-dual-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  /* ── Left button (Call) ──────────────────── */
  .arefin-dual-cta-call {
    display: inline-block;
    padding: 12px 25px;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    text-decoration: none;
    background-color: #001837;
    color: #ffffff;
    border: 0;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    /* No text-shadow at rest — applied only on :hover */
    transition: background-color 0.4s ease, color 0.4s ease, text-shadow 0.4s ease;
  }
  .arefin-dual-cta-call:hover {
    background-color: #379237;
    color: #ffffff;
    text-shadow: rgb(40, 61, 5) 1px 0.7px 0px; /* hover-only cue */
  }

  /* ── Right button (Contact) ──────────────── */
  .arefin-dual-cta-contact {
    display: inline-block;
    padding: 12px 25px;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    text-decoration: none;
    background-color: #54b435;
    color: #ffffff;
    border: 0;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    /* No text-shadow at rest — applied only on :hover */
    transition: background-color 0.4s ease, color 0.4s ease, text-shadow 0.4s ease;
  }
  .arefin-dual-cta-contact:hover {
    background-color: #379237;
    color: #ffffff;
    text-shadow: rgb(40, 61, 5) 1px 0.7px 0px; /* hover-only cue */
  }

  /* ── Floating "Or" badge ─────────────────── */
  .arefin-dual-cta-or {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background: #fafaf8;
    color: #444444;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);
    pointer-events: none;
  }

  /* ── DARK variant (same layer — required) ── */
  .arefin.dark .arefin-dual-cta-call {
    background-color: #ffffff;
    color: hsl(0 0% 4%);
  }
  .arefin.dark .arefin-dual-cta-call:hover {
    background-color: #54b435;
    color: #ffffff;
  }
  .arefin.dark .arefin-dual-cta-contact {
    background-color: #54b435;
    color: #ffffff;
  }
  .arefin.dark .arefin-dual-cta-contact:hover {
    background-color: #7ed957;
    color: hsl(0 0% 4%);
  }
  .arefin.dark .arefin-dual-cta-or {
    background: #0a0a0a;
    color: #ffffff;
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.15);
  }
}
```

---

## 6. Color tokens summary (for the design system)

| Token name                | Hex       | Usage                                         |
|---------------------------|-----------|-----------------------------------------------|
| `--cta-navy`              | `#001837` | Light-mode left-button bg                     |
| `--cta-green-primary`     | `#54B435` | Right-button bg / dark-mode hover             |
| `--cta-green-hover`       | `#379237` | Light-mode hover for both buttons             |
| `--cta-green-light`       | `#7ED957` | Dark-mode contact hover (legibility token)    |
| `--cta-or-bg`             | `#FAFAF8` | Or-badge body (light)                         |
| `--cta-or-text`           | `#444444` | Or-badge text (light)                         |
| `--cta-or-halo`           | `rgba(255,255,255,0.2)` | Or-badge 6px ring                |
| `--cta-text-on-light`     | `hsl(0 0% 4%)` | Dark-mode call-button text               |

---

## 7. Sizing reference (computed pixel box at viewport ≥ 1024px)

| Element       | Width (approx) | Height |
|---------------|----------------|--------|
| Call button   | ~100px         | 44px   |
| Contact button| ~120px         | 44px   |
| Or badge      | 20×20 + 6px halo = 32×32 visual | — |
| Whole pill    | ~220–240px     | 44px   |

Height is driven by `padding (12+12) + line-height (20) = 44px`. **Do not** set explicit height — let padding compute it.

---

## 8. Acceptance checklist

- [ ] Left button background is `#001837` (light) / `#FFFFFF` (dark)
- [ ] Right button background is `#54B435` (light) / `#54B435` (dark)
- [ ] Both buttons have `padding: 12px 25px`
- [ ] Left has `border-radius: 10px 0 0 10px`, right has `0 10px 10px 0` (no gap between them)
- [ ] Or badge is exactly `20×20px`, fully circular, with `0 0 0 6px rgba(255,255,255,0.2)` halo
- [ ] Or badge is absolutely centered over the seam (`translate(-50%,-50%)`)
- [ ] Hover changes ONLY `background-color` (and `color` where noted) — no transform, no scale, no filter
- [ ] Light hover both buttons → `#379237`
- [ ] Dark hover: Call → `#54B435` (white text), Book/Contact → `#379237` (white text — never black)
- [ ] Font is Poppins 15px / weight 500 / line-height 20px
- [ ] Default state has NO text-shadow on Call or Book/Contact
- [ ] On `:hover` ONLY, both Call and Book/Contact gain `text-shadow: rgb(40, 61, 5) 1px 0.7px 0px`
- [ ] `text-shadow` is included in the `transition` list so the appearance fades in over 0.4s
- [ ] Or badge has NO text-shadow (rest or hover)
- [ ] All rules live inside the same `@layer` (no layer drift between base + dark)
- [ ] Or badge has `pointer-events: none` so clicks fall through to the button beneath

---

## 9. Known pitfalls (do not repeat)

1. **Layer drift** — putting dark overrides in `@layer utilities` while base is in `@layer components` causes utilities to silently win. Keep them together.
2. **Header link opacity** — global header link styles (`opacity: 0.7` etc.) leak onto `.arefin-dual-cta-call` and wash out the white. Reset with `opacity: 1; -webkit-text-fill-color: currentColor` on both anchors inside this component.
3. **Filter inheritance** — parent `filter:` (e.g. drop-shadow on the header) re-rasterizes children and dulls the white pill. Set `filter: none` on the buttons.
4. **Translate hover** — Atto's source CSS does NOT use translate; do not invent one.
5. **Or badge with `pointer-events: auto`** — blocks clicks on the seam between the two buttons. Always `pointer-events: none`.
