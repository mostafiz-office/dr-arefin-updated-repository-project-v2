# TreatmentProcessSticky — Breakpoint Regression Checklist

Use this checklist whenever editing `src/components/arefin/TreatmentProcessSticky.tsx`
or its CSS in `src/index.css` (`.tp-*` rules). Validates that the sticky stack,
rail progress, and scroll handoff stay aligned across widths.

Sticky rail activates at **`min-width: 900px`**. Below that, layout is a
normal vertical flow with no sticky behavior and no rail.

## Test widths

Test all three on each change:

| Width   | Mode       | Expected behavior                                                |
|---------|------------|------------------------------------------------------------------|
| 1280px  | Desktop    | Rail + sticky stack active. Reference for design parity.         |
| 1021px  | Desktop    | Rail + sticky stack active (current QA viewport).                |
| 960px   | Desktop    | Rail + sticky stack active (just above breakpoint).              |
| 900px   | Desktop    | Rail + sticky stack just-activated. No layout collapse.          |
| 899px   | Mobile     | Cards stack vertically, no sticky, no rail column.               |
| 414px   | Mobile     | Cards full-width, readable, no horizontal scroll.                |

## Per-width checks (desktop widths only)

### Scroll DOWN

- [ ] Each Step card pins at `top: 120px` and is fully covered by the next.
- [ ] Rail icon column stays sticky next to whichever card is currently pinned.
- [ ] Active rail icon switches in sync with the visible card (Step N icon = card N).
- [ ] Rail fill bar grows from 0 → 100% across the four cards.
- [ ] Rail fill reaches **exactly 100%** at the moment Step 4 finishes pinning.
- [ ] After Step 4 pins, the next page section starts moving up immediately —
      **no extra empty scroll** with Step 4 stuck on screen.

### Scroll UP

- [ ] Page scrolls back smoothly; no jump or jitter at the section's bottom edge.
- [ ] Rail fill drops from 100% in sync with Step 4 unpinning (no lag, no
      "rail still full while cards already moving").
- [ ] Cards uncover in reverse order: 4 → 3 → 2 → 1.
- [ ] At the section's top edge, rail fill is back to 0% with Step 1 visible.

### Resize while inside the section

- [ ] Resizing the window (e.g. dragging from 1280 → 960 → 1280) does not break
      sticky alignment. Rail height and progress denominator must recompute via
      the `ResizeObserver` on `.tp-stack` and `.tp-card-outer`.
- [ ] Crossing the 900px breakpoint in either direction switches modes cleanly
      (no orphaned sticky styles, no broken rail column).

## Mobile checks (< 900px)

- [ ] No `.tp-rail-col` rendered.
- [ ] `.tp-stack` has no inline `height` (natural flow).
- [ ] Cards are full-width with vertical spacing; no overlap.
- [ ] No horizontal scroll on body.

## Math invariants (for code reviewers)

The fix relies on three measured values kept in sync via `ResizeObserver`:

```
stackTravel  = lastCard.offsetTop - firstCard.offsetTop    // distance for stacking
cardHeight   = firstCard.getBoundingClientRect().height    // rail track length
stackHeight  = stackTravel + cardHeight                    // .tp-stack inline height
```

Progress formula:

```
progress = clamp(0, 1, (STICKY_TOP - stack.top) / stackTravel)
```

These two must always match, otherwise the rail and stack desync:

- Progress hits 1 when `stack.top === STICKY_TOP - stackTravel`
- At that scroll Y, `stack.bottom === STICKY_TOP + cardHeight`, so the last card
  is pinned AND the stack ends — any further scroll unpins immediately.

If you change `STICKY_TOP`, the height formula does not need to change (it
cancels out), but verify this checklist anyway.

## When to update this doc

- Changing the breakpoint (currently 900px) → update the table above.
- Adding/removing a step → no doc change needed; logic is N-agnostic.
- Changing `STICKY_TOP`, the progress formula, or the stack-height formula →
  re-derive the math invariants section.
