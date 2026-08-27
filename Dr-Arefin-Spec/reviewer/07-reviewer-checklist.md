# 07 — Reviewer Checklist (the audit tool)

> How to use: open a page, walk every item top-to-bottom, mark `✅ pass` / `❌ fail` / `n/a`. For each fail, output: **Issue → Severity → Spec Reference → Suggested Fix**. Score each axis 0–10 at the end.

> Severity legend: 🔴 Blocker · 🟠 Major · 🟡 Minor

> **Gate before scoring**: complete **Section G — Global Shell Parity** (`08-global-shell-parity.md`) FIRST. Any G failure is an automatic page-level Blocker; do not proceed to axes A–F until G is clean. This is non-negotiable: it's how we catch black-on-dark logos, missing footers, and bespoke CTA bands before anything else.

---

## A. Brand & Design (→ `01-brand-design.md`)

| # | Item | Severity |
|---|------|----------|
| A1 | Only the two greens are used (`#14bb3e`, `#079a14`); no other green hues | 🔴 |
| A2 | All colors come from semantic tokens; no raw hex / Tailwind palette colors in JSX | 🔴 |
| A3 | Surface elevation respected: dark section → light card, light section → dark card; never same-tone | 🔴 |
| A4 | Body `<strong>` inherits color and weight; no explicit weight/color on body strong | 🔴 |
| A5 | Headings use Ubuntu; body uses Poppins; no other families | 🟠 |
| A6 | Heading scale follows the documented sizes | 🟡 |
| A7 | Section padding uses `py-20 md:py-28` (or compact `py-16 md:py-20`); equal top/bottom | 🟡 |
| A8 | Container is centered, max-width 1248px | 🟡 |
| A9 | Card hover uses Atto pattern (3px green left border + sharp 0-blur shadow + dark-green title); no movement | 🔴 |
| A10 | Hover shadow is sharp 0-blur using `--hover-shadow-ink`; never blurry drop-shadow | 🟠 |
| A11 | No translate / scale on any hover anywhere | 🔴 |
| A12 | Icons in critical UI are inline SVG, not external icon JS | 🟡 |
| A13 | Brand identifiers (`Dr. M. Arefin`) use `whitespace-nowrap` | 🟡 |
| A14 | Animations are entry-only; respects `prefers-reduced-motion` | 🟠 |
| A15 | No AI-generated images of Dr. Arefin / patients / real clinic / credentials | 🔴 |

---

## B. UI / UX & Accessibility (→ `02-ui-ux.md`)

| # | Item | Severity |
|---|------|----------|
| B1 | Visible focus ring on every interactive element | 🔴 |
| B2 | Tap targets ≥ 44×44px on mobile | 🟠 |
| B3 | Sticky header on every page; logo links to `/` | 🟡 |
| B4 | All internal links use relative paths with trailing slash | 🟠 |
| B5 | No horizontal scroll at 375 / 768 / 1024 / 1440 px | 🔴 |
| B6 | `overflow-x: hidden` on `html` and `body` | 🔴 |
| B7 | Single `<h1>` per page; heading levels never skip | 🔴 |
| B8 | All `<img>` have `alt` (decorative `alt=""`) | 🔴 |
| B9 | All form inputs have associated `<label>` | 🔴 |
| B10 | WCAG 2.1 AA contrast met (4.5:1 normal, 3:1 large) — light AND dark mode | 🔴 |
| B11 | Color is never the sole signal (errors include icon + text) | 🟠 |
| B12 | Page is fully keyboard-navigable (Tab + Enter) | 🔴 |
| B13 | Skip-to-content link present | 🟡 |
| B14 | Above-the-fold images have explicit dimensions (no CLS) | 🟠 |
| B15 | Fonts use `font-display: swap` and primary weights are preloaded | 🟡 |
| B16 | No console errors, no 404s in network tab | 🟠 |

---

## C. Coding Standards (→ `03-coding-standards.md`)

| # | Item | Severity |
|---|------|----------|
| C1 | No `!important` anywhere | 🔴 |
| C2 | No inline `style=` (or each is justified in code) | 🟠 |
| C3 | No raw color classes (`text-white`, `bg-black`, `text-green-500`) | 🔴 |
| C4 | Custom classes are kebab-case | 🟡 |
| C5 | Dark-mode overrides live in same `@layer` as the rule they override | 🟠 |
| C6 | Single canonical CSS for shared patterns (no per-component duplication of card hover, hover shadow, etc.) | 🟠 |
| C7 | TypeScript: no unjustified `any`; build passes | 🟠 |

---

## D. SEO (→ `04-seo.md`)

| # | Item | Severity |
|---|------|----------|
| D1 | `<title>` < 60 chars, primary keyword in first 50 | 🔴 |
| D2 | `<meta description>` < 160 chars, includes primary + CTA verb | 🔴 |
| D3 | Canonical URL present and correct | 🔴 |
| D4 | OG + Twitter card tags present (with image 1200×630) | 🟠 |
| D5 | Single `<h1>` containing primary keyword | 🔴 |
| D6 | URL is lowercase, hyphenated, descriptive, with trailing slash | 🟠 |
| D7 | All informative images have descriptive (non-stuffed) alt text | 🟠 |
| D8 | Internal linking is INLINE only — no "Related Topics" cards grid | 🔴 |
| D9 | Inline links use `<SeoLink>` with unique `title` attr per link | 🟠 |
| D10 | Anchor text varies — no duplicate anchors on the same page | 🟠 |
| D11 | Long page has ≥ 40 internal links; 3–6 are `<strong>`-wrapped | 🟡 |
| D12 | Appropriate JSON-LD (`MedicalBusiness`, `Physician`, `MedicalProcedure`, `Article`) present and valid | 🟠 |
| D13 | Sentence length, paragraph length, transition words within Yoast targets | 🟡 |
| D14 | One primary keyword per page; no stuffing (density 0.5–2.5%) | 🟠 |
| D15 | Sitemap and robots allow this URL; no mixed content | 🟠 |

---

## E. Copywriting (→ `05-copywriting.md`)

| # | Item | Severity |
|---|------|----------|
| E1 | Voice is clinical-authoritative + warm + patient-first | 🟠 |
| E2 | Reading level Grade 7–9; jargon explained | 🟠 |
| E3 | No lorem, no stock testimonial names, no AI text artifacts | 🔴 |
| E4 | No fearmongering, miracle claims, or competitor disparagement | 🔴 |
| E5 | CTAs are verb-led and specific (no "Submit" / "Click here") | 🟠 |
| E6 | `<strong>` used for genuine emphasis only | 🟡 |
| E7 | No Italian content (legacy CAF) leaking into Dr. Arefin pages | 🔴 |

---

## F. CRO (→ `06-cro.md`)

| # | Item | Severity |
|---|------|----------|
| F1 | First viewport (mobile) shows: who, what, where, primary CTA, one trust signal | 🟠 |
| F2 | Exactly one primary CTA per section | 🟠 |
| F3 | Persistent "Book consultation" in header on ≥ tablet | 🟡 |
| F4 | Final CTA band at bottom of every long page | 🟡 |
| F5 | ≥ 3 trust signals on landing pages (real, not stock) | 🟠 |
| F6 | Phone number is `tel:` linked in header on mobile | 🟠 |
| F7 | Forms ask only what's needed; correct mobile keyboards; autocomplete attrs | 🟡 |
| F8 | No autoplay-with-sound; no pop-up before any reading | 🔴 |
| F9 | No multiple competing primary CTAs in a single section | 🟠 |
| F10 | Page-type playbook respected (home / treatment / satellite / about / contact) | 🟠 |

---

## Scoring rubric

For each axis, score 0–10 based on # of items passed weighted by severity (Blocker = 3×, Major = 2×, Minor = 1×).

| Axis | Source items |
|------|--------------|
| Design (0–10) | Section A |
| UX (0–10) | Section B |
| SEO (0–10) | Section D |
| Copy (0–10) | Section E |
| CRO (0–10) | Section F |

Coding standards (Section C) gates merge but is reported as pass/fail rather than scored.

**Publish threshold**: average ≥ 8.0, AND zero open Blockers.

---

## Output template (paste into review)

```markdown
# Page Review — <URL or component>

**Date**: YYYY-MM-DD
**Reviewer**: <name / AI>

## Scores
- Design: X/10
- UX: X/10
- SEO: X/10
- Copy: X/10
- CRO: X/10
- **Average**: X/10
- Coding standards: PASS / FAIL

## Blockers (🔴) — must fix before publish
1. [A3] Same-tone cards on dark section — switch card bg to `hsl(0 0% 97%)`. → `01` §1.3
2. ...

## Major (🟠)
1. ...

## Minor (🟡)
1. ...

## Notes
- Anything that doesn't fit a checklist item but matters.
```
