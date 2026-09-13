# Plan: Rebalance the Homepage Heading Into Three Lines

## New line structure
Keep the approved wording, but move the line break to create three more balanced rows:

```text
Gallbladder & Liver Surgeon
Advanced Laparoscopic
Care in Dhaka
```

## Changes
1. Update the React homepage heading to use the new three-line arrangement.
2. Restore the larger desktop heading size at 1024–1279px instead of using the current reduced size.
3. Keep the existing wide-desktop heading size unchanged.
4. Apply the identical line arrangement and sizing to the WordPress/Elementor export.
5. Preserve the existing links: “Advanced Laparoscopic” remains linked to laparoscopic care, while “Care in Dhaka” completes the visible phrase on the third line.

## Verification
Check the complete heading at 1024px, 1138px, 1280px, and mobile widths. Confirm that:
- the three intended lines remain intact;
- the heading uses the larger desktop size without entering the portrait or organ artwork;
- “Care in Dhaka” reads naturally and stays visually balanced;
- the paragraph, buttons, portrait, and artwork do not move or overlap;
- the React preview and WordPress export match.

## Technical detail
Remove the special 1024–1279px font-size reduction after the shorter second and third lines are in place. Retain the responsive grid containment already added. If the full larger size still does not fit at exactly 1024px, preserve the requested visual size as closely as possible by adjusting text-column space and gap—not by reducing the heading.
