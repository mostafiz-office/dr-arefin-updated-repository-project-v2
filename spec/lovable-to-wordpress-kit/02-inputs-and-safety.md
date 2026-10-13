# 02 — Inputs and Safety

## Placeholders
- `{{WP_URL}}` — e.g. `https://example.com` (must be HTTPS; Application Passwords need HTTPS and WordPress 5.6+)
- `{{WP_USER}}` — admin login name
- `{{WP_APP_PASSWORD}}` — e.g. `abcd efgh ijkl mnop qrst uvwx` (spaces allowed)
- `{{PREFIX}}` — used in `{{PREFIX}}_raw_html`, `{{PREFIX}}_redirect`, snippet name "{{PREFIX}} exact pages"

## Credential rules
- Pass the password only as an environment variable (`WP_APP_PASSWORD`) or a secret store. Never write it in code, specs, memory, logs or commits.
- Auth header: `Authorization: Basic base64("{{WP_USER}}:{{WP_APP_PASSWORD}}")`.
- After deployment, ask the owner to revoke and create a new Application Password if it was ever exposed in chat or files.

## Required capabilities
`GET {{WP_URL}}/wp-json/wp/v2/users/me?context=edit` must show the user can: `install_plugins`, `activate_plugins`, `edit_pages`, `publish_pages`, `upload_files`. Administrator has all of them.

## Approval gates
Deploy the homepage first and get the owner's approval before rolling out more pages (see 11).
