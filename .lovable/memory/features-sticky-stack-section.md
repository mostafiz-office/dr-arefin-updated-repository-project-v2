---
name: Sticky-Stack Section Pattern
description: Reusable sticky-stack section spec — class system, per-step color ramp, scroll constants, flip-video tile, accessibility & content contracts. Source of truth for any new "scroll-pinned cards over media" section.
type: feature
---

# Sticky-Stack Section

Canonical reusable section pattern based on `StickyStackServices` (Section 8 / *Our Expertise*). Lets any team add a matching scroll-pinned section (mentorship curriculum, patient journey, etc.) without re-deriving the math or palette.

**Spec doc:** `Dr-Arefin-Spec/components/sticky-stack-section.md`

**Hard contracts** (full detail in the spec):
- Class prefix is fixed: `.sss-*` (Sticky Stack Section). Never fork into a parallel prefix.
- `data-step` is 1-indexed and drives the per-card palette. Ramp goes light → brand-green peak → dark ink. Steps 3 & 4 carry the `#14bb3e` peak with **black text** (AA-clear, never white-on-green).
- `--sss-top = 90 + (index * 20)` px. `z-index = index`. One `.sss-sticky-wrapper` per card.
- Section background is always `--arefin-light-mint`.
- Greens locked to `--primary-bright` and `--primary-darker`. No new greens, even per-step.
- All `<strong>` inside `.sss-card-desc` / `.sss-intro` obey `color: inherit; font-weight: inherit`.
- No `translate*/scale` on hover — color + text-shadow only.
- Media tile is either a static `<img class="sss-card-img">` OR the `.sss-flip` flip-to-video card. Never mix within one section.
- Sticky positioning requires ancestor `overflow` neutralization — re-use `initStickyStackFix()` in `arefin-interactivity.js`, never write a second copy.
- Content rule: reading eyebrow + H2 + each card H3 in order must tell a coherent story.

**Reuse pattern:** copy the markup verbatim, override only content + an `#section-id` scope for any per-section `--c-*` palette tweaks. Don't duplicate the base `.sss-*` CSS.
