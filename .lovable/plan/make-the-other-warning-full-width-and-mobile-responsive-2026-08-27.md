# Make the "Other" warning full-width and mobile responsive

## Current state
- The warning script works: selecting **Other** shows the red message.
- Problem: the warning is inserted inside the submit field's column wrapper, which is only ~50% wide — so the box only fills the left half of the form (see user's screenshot).

## What to build
Update `public/elementor-export/blocks/contact/other-option-warning.js`:

1. **Full-width insertion**: insert the warning as a sibling *before the submit button's outer Elementor column/field-group wrapper* (not inside it), so it spans the whole form row like the message textarea and reCAPTCHA box above it.
2. **Full-width styling**: keep `width:100%` + `box-sizing:border-box` on the warning and also neutralize any inherited column width constraints (e.g. set `flex-basis:100%` / `max-width:100%` and, if the parent is an Elementor column, override its width).
3. **Mobile responsive**: since the box becomes 100% of the form width, it naturally stacks full-width on phones; ensure padding/font-size stay readable at small widths (no fixed widths anywhere).
4. **Verify with Playwright** on the live `drarefin.com/contact/`: select "Other", screenshot at desktop (1280px) and mobile (390px) widths to confirm the warning spans the full form width on both.

## User steps after the fix (unchanged)
1. Open the HFCM snippet #13 "Contact page Developer fix".
2. Replace its contents with `<script>` + the new file contents + `</script>`.
3. Update → purge SpeedyCache → hard-refresh `/contact/` → select **Other**.

## Technical details
- Target select: `#form-field-services_selected` (unchanged).
- Insertion point: `submitWrap.closest('.elementor-field-group, .elementor-column, [class*="elementor-col"]')` fallback chain — insert before that outer wrapper; if none found, fall back to inserting before the submit wrapper as today.
- The warning element keeps id `other-option-warning-message`, role `alert`, and the exact message text; submission remains unblocked.
