# Correct the homepage title

## Proposed title
**Gallbladder & Liver Surgeon in Dhaka | Dr. Arefin**

## Changes
- Remove “Expert” and correct “Arifin” to “Arefin” in the homepage browser/search title.
- Match the homepage social-sharing titles to the same wording.
- Leave the visible homepage heading, descriptions, design, and other pages unchanged.
- Update the homepage spec and issue notes.
- Deploy the corrected homepage to WordPress staging only through the existing exact-copy scripts; do not change the main site.

## Verification
- Check the actual browser title and social title tags in the Lovable preview.
- Check the stored and served staging homepage title. Report explicitly if staging login prevents a browser check.

## Technical detail
Update the root HTML metadata and the React homepage metadata together, then use the existing staging-only deployment workflow.