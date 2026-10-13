# 10 — Step 7: Verify (never claim without running)

Use Playwright (headless Chromium) against both the preview and the live WordPress site.

## Per route, desktop 1280 and phone 390
- HTTP 200 and response header `X-{{PREFIX}}-Exact: 1`.
- Final URL equals the requested URL (no jump to `/wp-content/uploads/...`).
- No console errors from our bundles (note third-party ones separately, e.g. YouTube).
- No horizontal overflow (`scrollWidth <= innerWidth`).
- Exactly one `<h1>`; `<title>` and meta description equal the preview's.

## Raw source check (curl, no JS)
- Contains `<title>`, `meta name="description"`, `og:title`, the `<h1>` text and body copy.
- Contains no theme stylesheet (`wp-content/themes/`) and no SEO-plugin markup.
- Is multi-line (readable).

## Visual parity
For key pages at 1280/768/390: compare page height and H1 font size with the preview, and screenshot both side by side. Differences = bug, not "close enough".

## Navigation
Click every main menu link, confirm the URL and content, then hard-refresh each and confirm it still renders (deep links work).

## Record
Save screenshots and a pass/fail table in the project's issue/QA folder.

## Single-script check
View Source: exactly one `<script type="module" src=".../aw-app_*.js">`, positioned right before `</body>`, and zero `modulepreload` links. Network log: only that one `.js` from uploads, no 404s after clicking a menu link.
