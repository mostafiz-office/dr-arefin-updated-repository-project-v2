# 13 — Homepage title correction (2026-10-13)

**Reported:** Homepage title contained “Expert” and misspelled the doctor's name as “Arifin”.

**Approved replacement:** Gallbladder & Liver Surgeon in Dhaka | Dr. Arefin

**Fix:** Match title, og:title and twitter:title in the static root HTML and React homepage. Leave descriptions, visible heading, design, and other pages unchanged. Use the existing exact-copy workflow for staging only.

**Verification:** Preview browser title and every og:title/twitter:title tag match the approved text. Exact-copy homepage snapshot reported one h1 and zero browser errors. Deployed staging page 12; stored HTML hash matched the upload, and its title plus social title tags were read back and verified. Serving snippet 5 is active. Direct staging access returns the WP Staging login page, so the logged-in staging browser title remains unverified. No main-site changes were made.