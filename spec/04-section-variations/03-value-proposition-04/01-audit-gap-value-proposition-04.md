# 01 — Audit & Gap Analysis: Value Proposition (Project 04)

**Section:** Value Proposition · **Project sequence (YY):** 04
**Position:** Renders directly after the Hero on `/hero-variations` (and on the homepage once promoted).

---

## 1. Source brief

Three-column horizontal grid communicating Dr. Murshidul Arefin's three core pillars:

| # | Title | Description |
|---|-------|-------------|
| 01 | Surgical Excellence | Over 7 years of hands-on experience in hepatobiliary, liver, and gallbladder surgery, Dr. Murshidul Arefin combines precision, innovation, and compassionate care to achieve the best surgical outcomes. |
| 02 | Advanced Treatment | Providing comprehensive care for liver, pancreas, and biliary tract diseases through both laparoscopic and open surgical techniques, ensuring safe recovery and long-term health for every patient. |
| 03 | Compassionate Care | Dr. Arefin believes in a patient-first philosophy — offering personalized guidance, transparent communication, and respectful treatment throughout every stage of diagnosis, surgery, and recovery. |

---

## 2. Gaps identified vs. brief

| # | Gap | Resolution in spec |
|---|-----|--------------------|
| G1 | Brief does not specify color/typography. | Inherit Hero LIGHT tokens — sage `#22C55E`, deep `#141414`, white bg, Ubuntu headings, Poppins body. |
| G2 | Brief does not specify animation. | Standardize on 0.3s CSS3 entry (`cubic-bezier(0.16, 1, 0.3, 1)`) with stagger 0/100/200ms across the 3 columns. |
| G3 | Brief does not specify spacing rhythm. | Reuse Hero LIGHT container max-width (1248px) and section padding `py-20 md:py-24`. |
| G4 | No accessibility guidance. | Step numbers wrapped as `aria-hidden` decorative; semantic `<article>` per column with `<h3>` title; min contrast 4.5:1 (deep on white = 19.4:1, sage on white = 4.55:1). |
| G5 | No responsive rule. | Stack to 1 column < `md` (768px), 3 columns ≥ `md`. |
| G6 | No interaction state defined. | Hover lifts card (no positional shift on Variation B/C — uses shadow + border + sage tint; Variation A uses subtle 4px translate-up since it has no border). |

---

## 3. Constraints (carried over from Hero LIGHT)

- All animations clamped to 0.01ms under `prefers-reduced-motion: reduce`.
- No `!important`. Tokens scoped under `.arefin` namespace.
- HSL-only color tokens in `src/index.css`.
- Reuses `--hero-light-*` token family — no new CSS variables introduced.

---

## 4. Acceptance for the section

1. Three variations (A/B/C) render below their corresponding Hero variation on `/hero-variations`.
2. All entrance animations finish in **0.3s**.
3. Step numbers visually dominate but never break heading hierarchy (the `<h3>` title is the semantic anchor).
4. Stacks to 1 column on mobile with preserved rhythm.
5. AA contrast verified for every text/background pair.
