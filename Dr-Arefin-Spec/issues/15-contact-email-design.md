# 15 — Contact emails lost the main site's design

**Problem:** staging Contact form sent a plain-text team email and no patient email; the live Elementor form sends two styled HTML emails.
**Fix (staging, snippet 5 via `scripts/wp-exact/snippet.mjs`):** team + patient emails copied from the live Elementor `email_content` / `email_content_2`, same subjects and sender names; all answers escaped; empty message shows "—".
**Changes vs live:** patient reply-to `info@drarefin.com` (live had typo `info@drarefin.com.au`); "Medical News" link → `/articles/` (live `/news`).
**Test:** TEST 3 sent 2026-10-13 → API reported mailed=true. Owner must confirm both emails look right in arefin-leads@googlegroups.com and info@drarefin.com.
