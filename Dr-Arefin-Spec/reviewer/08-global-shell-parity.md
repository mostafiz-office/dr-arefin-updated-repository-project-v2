# 08 — Global Shell Parity (highest-priority axis)

> Why this exists: previous audits passed pages with a black-on-dark logo, missing global components, and bespoke CTA bands. Those failures all share one root cause — the reviewer never compared the page side-by-side with the home page. This spec fixes that by making **shell parity the first thing to check, before any other axis**.

> Severity legend: 🔴 Blocker · 🟠 Major · 🟡 Minor
> Any 🔴 in this section is an automatic page-level Blocker — no average score can rescue it.

---

## Principle

Every page on the Dr. Arefin site is composed of:

```
┌─────────────────────────────────────────┐
│  [GLOBAL HEADER]   ← identical to /      │
├─────────────────────────────────────────┤
│  Page-specific hero                      │
│  Page-specific content sections          │
│  [GLOBAL CTA BAND] ← identical to /      │
├─────────────────────────────────────────┤
│  [GLOBAL FOOTER]   ← identical to /      │
└─────────────────────────────────────────┘
```

The three **global** regions are not optional, not "similar to", not "inspired by" — they are the **same React component instances** as the home page, rendered in the **same theme context**, with the **same props**.

---

## G. Global Shell Parity (audit table)

| # | Item | Severity |
|---|------|----------|
| G1 | Page renders the **same `DrArefinHeader` component** as the home page (`/`) | 🔴 |
| G2 | Header logo is the **correct variant for the background** (white/light logo on dark hero, dark logo on light hero); never a black logo on a dark background | 🔴 |
| G3 | Header is sticky, same height, same nav items, same order, same active-state styling as `/` | 🔴 |
| G4 | Mobile menu (hamburger) opens the **same panel** with the same items as `/` | 🟠 |
| G5 | Header "Book a consultation" CTA exists on every page (≥ tablet), uses the **same shared button component** as `/`, and is fully functional (not a dead `<a>`) | 🔴 |
| G6 | Phone number is `tel:`-linked in the mobile header, identical to `/` | 🟠 |
| G7 | Page renders the **same `DrArefinFooter` component** as `/` (same columns, links, socials, copyright) | 🔴 |
| G8 | Page ends with the **same Global CTA Band component** as `/` (except `/contact/`, which is itself the conversion endpoint). No bespoke CTA section is allowed. | 🔴 |
| G9 | Theme wrapper (e.g. `class="arefin dark"`) is applied at the **same DOM level** as `/`, so all design tokens resolve identically | 🔴 |
| G10 | Hero CTA pair ("Book a consultation" + "Call now") uses the **same shared HeroCTA component** as `/`; same sizes, same hover, same icons; both are functional (`tel:` and real route) | 🔴 |
| G11 | Page composes only from the **approved section component catalog** (HeroSection, IntroLede, ContentSection, FAQAccordion, GlobalCTABand). No invented, page-specific section variants. | 🟠 |
| G12 | Section order matches the page-type playbook in `06-cro.md` § Page-type templates | 🟠 |
| G13 | `<main id="main">` landmark wraps page-specific content; skip-to-content link targets it | 🟡 |
| G14 | Visual diff: a screenshot of the page's header, footer, and CTA band is **pixel-identical** to the same regions on `/` (allowing only background-color difference where intentional) | 🔴 |

---

## How to audit (do this BEFORE any other axis)

1. **Open `/` and the page under review side-by-side** at 1440px and 375px.
2. **Screenshot the header** of both. They must be visually identical except for the active nav item. Check the logo color against the background — if you can't read the logo, it's G2 fail.
3. **Click "Book a consultation"** in the header. It must navigate or open the same modal as on `/`. Dead link → G5 fail.
4. **Scroll to the bottom.** The CTA band immediately above the footer must be the same component as on `/` (same heading style, same button pair, same background). Bespoke CTA → G8 fail.
5. **Screenshot the footer.** Must match `/` exactly. Different columns, missing socials, different copyright → G7 fail.
6. **Inspect the DOM.** Confirm the page imports `DrArefinHeader`, `DrArefinFooter`, `GlobalCTABand` from the shared components folder. Anything inlined → G1/G7/G8 fail.
7. **Toggle mobile viewport.** Hamburger must open the same panel as `/`. Phone link must be `tel:`. → G4 / G6.
8. Only after **all G items pass**, proceed to axes A–F in `07-reviewer-checklist.md`.

---

## Failure → fix mapping (most common)

| Symptom | Root cause | Fix |
|---|---|---|
| Black logo on dark hero | Header rendered without the dark-context theme wrapper, or logo asset not switching variant | Wrap page in same theme class as `/`; pass `variant="onDark"` (or rely on CSS variable) so the SVG fill uses `currentColor` / `--logo-fg` |
| "Book a consultation" goes nowhere | Custom `<a>` instead of shared `<HeroCTA>` / `<HeaderCTA>` | Replace with shared component; verify `to="/contact/"` and `tel:+8801…` |
| CTA band looks different | Page rolled its own section instead of importing `<GlobalCTABand />` | Delete bespoke section; import shared component |
| Footer missing or different | Page forgot to render `<DrArefinFooter />`, or rendered an old copy | Render the same `<DrArefinFooter />` that `/` uses |
| Hero looks "off-brand" | Page invented a hero variant outside the catalog | Use one of the approved hero variants in `Dr-Arefin-Spec/pages/01-home.md` |

---

## Component catalog (the only allowed building blocks)

| Component | Used for |
|---|---|
| `DrArefinHeader` | Top of every page |
| `DrArefinFooter` | Bottom of every page |
| `GlobalCTABand` | Pre-footer conversion band on every page except `/contact/` |
| `HeroSection` (variants: home / interior / satellite) | Top-of-page hero |
| `HeroCTA` | The two-button CTA pair inside any hero |
| `IntroLede` | The lede paragraph immediately under the H1 |
| `ContentSection` | Standard `<h2>` + body content blocks |
| `FAQAccordion` | FAQ blocks (Atto card hover applied) |
| `BreadcrumbBar` | Breadcrumb above the H1 on interior/satellite pages |

If a page needs anything else, **stop and propose it as a new shared component** before building it locally.

---

## Reviewer output addition

Add this block at the top of every page review, before the existing scores:

```markdown
## Global Shell Parity (gates merge)
- G1 Header component identity: PASS / FAIL
- G2 Logo contrast on background: PASS / FAIL
- G5 Header CTA functional: PASS / FAIL
- G7 Footer component identity: PASS / FAIL
- G8 Global CTA band present and identical: PASS / FAIL
- G10 Hero CTA component identity + functional: PASS / FAIL
- G14 Visual diff vs `/` for header/footer/CTA band: PASS / FAIL

→ Any FAIL above = automatic page-level Blocker. Do not score axes A–F until all G items pass.
```
