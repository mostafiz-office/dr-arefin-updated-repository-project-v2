# Agent rules
- Deploy to WordPress only through `scripts/wp-exact/` (snapshotted real build served by the "Arefin exact pages" snippet, see `spec/lovable-to-wordpress-kit/` and `Dr-Arefin-Spec/wordpress-export/08-staging-workflow.md`); never hand-rebuild pages for WordPress. Why: block-by-block Elementor copies drift from the preview.
- wp-exact scripts target the staging site only (`WP_STAGING_URL`); live changes happen only through a WP Staging Pro push by the user. Why: the live site serves patients and bookings.
- `BrowserRouter` basename comes from `VITE_ROUTER_BASENAME` (empty in preview/live, `/staging` for staging builds). Why: the same build must work under the staging subfolder.
- The Lovable Contact form posts to the snippet's `arefin/v1/contact` REST route (saves an `arefin_request` post + wp_mail). Why: forms must reach the owner on WordPress without a separate backend.
