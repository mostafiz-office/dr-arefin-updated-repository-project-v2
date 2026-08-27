---
id: "05"
title: About page — repeated design mistakes
status: resolved
date: 2026-05-04
---

## Problem

Multiple design issues on the About Dark page that were caught by the user:

### 1. Hero overlay too light
The OT background image hero had an overlay opacity of only 60–75%, making text hard to read against the bright surgical lights.

**Fix:** Increased overlay to 78–85% with 97% at the bottom edge for seamless section transition.

### 2. Missing heading hover drop shadow
The "About Dr. Murshidul Arefin" H2 had no visible hover effect (text-shadow + color change to primary-light). The CSS rule existed but was too subtle or not triggering.

**Fix:** Added explicit `color` transition to `hsl(var(--primary-light))` on hover alongside the text-shadow.

### 3. Sections looked identical — no visual differentiation
The About Intro section and Vision/Mission section had the same dark background (`--background` / `--background-dark`) and same card styling, making them visually indistinguishable.

**Fix:** Redesigned Vision/Mission as a full-width image band with a green-tinted dark overlay (`hsl(155 40% 6% / 0.88)`), using the background image of Dr. Arefin with staff. Cards now use glassmorphism (`backdrop-filter: blur(12px)`) with semi-transparent emerald backgrounds.

### 4. Same portrait image used repeatedly
Only `dr-arefin-liver-doctor-real.jpeg` was used across multiple sections.

**Fix:** Used `dr-arefin-popular-medical-staff-real.jpg` for the Vision/Mission section background — a completely different image showing Dr. Arefin with medical staff.

## Rules to prevent recurrence

1. **Every adjacent section MUST have a visually distinct background** — different color, overlay, or surface treatment. Never use the same `--background` value for consecutive sections.
2. **Never reuse the same portrait image on the same page.** Check `src/assets/*real*` for available images before assigning.
3. **Hero overlays must be ≥75% opacity minimum** to ensure WCAG AA contrast for white text over photography.
4. **All headings must have the standard hover effect** — color transition to `hsl(var(--primary-light))` + directional text-shadow `1px 0.7px 0 rgb(var(--hover-shadow-ink))`.
