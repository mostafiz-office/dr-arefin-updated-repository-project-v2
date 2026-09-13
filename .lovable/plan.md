# Plan: Fix the Homepage Hero Title Overlap

## Confirmed issue
The new heading is divided into three forced, non-wrapping lines. At narrower desktop widths, the fixed 52px title is wider than its left column, so “Surgeon” and “Care” extend into the portrait and organ illustrations. The layout fits at 1280px, but it is not safe across the full desktop range beginning at 1024px.

## Fix
1. Keep the approved wording and exact three-line structure:

```text
Gallbladder & Liver Surgeon
Advanced Laparoscopic Care
in Dhaka
```

2. Add an intermediate desktop treatment for approximately 1024–1279px:
   - give the text slightly more horizontal room;
   - reduce the gap between text and portrait;
   - scale the heading down only within this constrained range.
3. Restore the current larger title and 60/40 composition on wide desktops where it already fits.
4. Keep each intended line together without allowing text to enter the portrait area.
5. Apply the same responsive rules to the React preview and WordPress/Elementor export.

## Verification
Check the complete hero at 1024px, the current 1138px view, 1280px, and mobile widths. Confirm that:
- all three title lines remain fully readable;
- there is visible separation between the title and right-side artwork;
- the portrait and floating organs remain correctly framed;
- buttons and supporting text do not shift or overlap;
- both versions match visually.

## Technical detail
Use breakpoint-specific grid proportions, gap, and heading size rather than shrinking the title globally. Add `min-width: 0` to the text column as a containment safeguard. No wording, SEO links, artwork, or other sections will change.
