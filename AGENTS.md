# Agent rules
- Deploy to WordPress only through `scripts/wp-exact/` (real prerendered build served by the exact-pages snippet, see `spec/lovable-to-wordpress-kit/`); never hand-rebuild pages for WordPress. Why: block-by-block Elementor copies drift from the preview.
