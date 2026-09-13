# Plan: Change the Homepage Heading Connector

## New heading
Replace the ampersand with the approved comma while preserving the current larger three-line layout:

```text
Gallbladder, Liver Surgeon
Advanced Laparoscopic
Care in Dhaka
```

## Changes
1. Update the React homepage heading from “Gallbladder & Liver Surgeon” to “Gallbladder, Liver Surgeon.”
2. Make the identical wording change in the WordPress/Elementor homepage export.
3. Preserve all three current line breaks, the restored larger heading size, specialty links, paragraph, buttons, portrait, and organ artwork.

## Verification
Check the complete heading at 1024px, 1138px, 1280px, and mobile widths. Confirm that:
- the comma displays with natural spacing;
- the heading remains exactly three lines;
- no text overlaps the portrait or organ artwork;
- the React preview and WordPress export match.

## Technical detail
Only the visible connector between the linked “Gallbladder” and “Liver Surgeon” phrases will change. Existing responsive sizing and containment rules will remain unchanged unless the comma introduces a measurable overlap during verification.
