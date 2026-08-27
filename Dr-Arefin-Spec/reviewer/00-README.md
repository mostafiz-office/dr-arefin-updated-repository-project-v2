# Dr. Arefin — Reviewer Spec (Single Source of Truth)

> **Purpose**: One spec to rule them all. Any AI or human reviewer can load this folder and audit any page (React preview or WP export) against it. Pass/fail, severity, and fix references are defined in `07-reviewer-checklist.md`.

> **Scope**: Brand, Design System, UI/UX, Coding Standards, SEO, Copywriting, CRO, and the Reviewer Checklist itself.

---

## How to use this spec

**As a reviewer (AI or human):**
1. Open the page (URL or component file) you want to audit.
2. Load `07-reviewer-checklist.md` — that is the audit tool.
3. For each failed item, look up the matching rule in the relevant section file.
4. Output a report: `Issue → Severity → Spec Reference → Suggested Fix`.
5. Score the page across 5 axes (Design / UX / SEO / Copy / CRO) — rubric in `07`.

**As a builder (AI or human):**
1. Before adding/changing any page, skim `01`–`06` for the relevant rules.
2. Run the page through `07` before declaring done.

---

## Files in this folder

| # | File | Covers |
|---|------|--------|
| 00 | `00-README.md` | This index + how to use the spec |
| 01 | `01-brand-design.md` | Colors, typography, spacing, components, animation, hover/shadow |
| 02 | `02-ui-ux.md` | Interaction rules, accessibility (WCAG 2.1 AA), mobile stability, navigation |
| 03 | `03-coding-standards.md` | Tailwind tokens only, CSS architecture, React patterns, no `!important`/inline styles |
| 04 | `04-seo.md` | Meta, headings, internal linking (Atto-style inline), alt text, schema, URLs |
| 05 | `05-copywriting.md` | Tone, voice, heading patterns, body copy, forbidden patterns |
| 06 | `06-cro.md` | Above-the-fold rules, CTA hierarchy, trust signals, page-type playbooks |
| 07 | `07-reviewer-checklist.md` | The actual audit checklist with severity + scoring rubric |
| 08 | `08-global-shell-parity.md` | **Highest-priority axis** — header/footer/CTA-band must be identical to home page; gates all other scoring |

---

## Project context (1-paragraph TL;DR)

Dr. M. Arefin is a fellowship-trained Hepatobiliary & Liver Transplant surgeon in Dhaka, Bangladesh. The site is a React + Vite + Tailwind app (with a separate Elementor/WordPress export pipeline) targeting patients searching for liver, gallbladder, pancreatic, biliary, and spleen care. Voice is **clinically authoritative + warm + patient-first**. Visual language is **corporate-minimal (Atto Property)** with **selective DesignMonks vibrancy**. Brand color is a single decisive green; typography is **Ubuntu (headings) + Poppins (body)**. SEO strategy is high-density inline internal linking (Atto pattern) — never standalone "related links" sections.

---

## Hard constraints (apply everywhere — never violate)

These also live in `mem://index.md` Core. Repeated here so this folder is self-contained.

- **Two greens only**: `--primary-bright` (#14bb3e) at rest, `--primary-darker` (#079a14) on hover. No other greens.
- **Surface elevation**: Dark section → light card. Light section → dark/brand-tinted card. Never same-tone. Never neutral gray cards in dark mode.
- **`<strong>` in body text**: `color: inherit; font-weight: inherit;`. No explicit weight/color, no inline styles, no Tailwind classes on paragraph `<strong>`.
- **Hover behavior**: Color/border/shadow/text-shadow only. Never `translateY/X`, never `scale`.
- **Hover shadow**: Sharp, 0-blur, directional. Uses `--hover-shadow-ink` token (light=olive, dark=black).
- **CSS**: No `!important`. No inline styles. Tailwind utilities + CSS variables only. Kebab-case custom classes.
- **Cascade layers > specificity**: Dark-mode overrides must live in the same `@layer` as the rule they override.
- **Routing**: Internal links use relative paths with trailing slashes (e.g., `/treatment/liver-surgery/`).
- **Mobile**: `overflow-x: hidden` on `html` and `body` globally.
- **Accessibility**: WCAG 2.1 AA contrast (4.5:1 normal, 3:1 large text). Always.
- **Imagery — real people**: NEVER AI-generate Dr. Arefin, patients, real staff, real clinic, logos, or credentials. Real uploads only. AI is OK only for abstract backgrounds/textures/illustrations.
- **Internal linking**: Inline within prose, Atto-style. Never add a separate "related topics" cards grid.
- **Brand identifiers**: Treat fixed brand strings as unbreakable (`whitespace-nowrap`).

---

## Severity legend (used in `07`)

- **🔴 Blocker** — Violates a hard constraint above. Must fix before merge/publish.
- **🟠 Major** — Hurts brand, conversion, or SEO meaningfully. Fix this sprint.
- **🟡 Minor** — Polish, consistency, or nice-to-have. Backlog.

---

## Scoring rubric (used in `07`)

Each axis 0–10. Total = average.

| Axis | What it measures |
|------|------------------|
| Design | Tokens, typography, spacing, hierarchy, hover/shadow correctness |
| UX | Interaction, navigation, mobile, accessibility, friction |
| SEO | Meta, headings, internal linking density/variety, alt text, schema |
| Copy | Tone, clarity, scanability, readability, no forbidden patterns |
| CRO | Above-the-fold clarity, CTA hierarchy, trust signals, form friction |

Pages should land **≥ 8.0 average** before publishing.
