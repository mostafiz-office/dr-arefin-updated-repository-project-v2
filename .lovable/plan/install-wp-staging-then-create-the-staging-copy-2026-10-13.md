# Install WP Staging, then create the staging copy

## Can I do it all myself?
- **Install and turn on the WP Staging plugin**: yes, I can do this with the admin access.
- **Click "Create Staging Site"**: no. That button only works for someone logged into wp-admin in a browser. An Application Password can't press it. It's one click for you, and the copy is made at `drarefin.com/staging/` (or a name you choose).
- **Push staging back to the main site**: the free plugin can't do this; that is the paid WP Staging Pro. We don't need it. When staging is approved, I run the same deploy on the main site, homepage first, and the old pages stay saved so we can undo it.

## Password safety
Both passwords pasted in chat are exposed. Please revoke them, create a new one, and enter it in the secure box I'll show. It's saved encrypted and never appears in chat or files.

## Steps after approval
1. Secure box: `WP_URL` (https://drarefin.com), `WP_USER` (admin), `WP_APP_PASSWORD` (new).
2. Read-only check: login works and the plugin list loads.
3. Install and activate `wp-staging`. Nothing else on the main site changes.
4. You: wp-admin > WP Staging > Create Staging Site > name it `staging` > Start Cloning (about 5–15 minutes).
5. You create an Application Password on the staging site's own admin. I save it in a second secure box (`WP_STAGING_URL`, `WP_STAGING_APP_PASSWORD`).
6. Deploy to staging: homepage first, compared with Lovable on desktop and phone, then the rest once you approve.
7. Main site only after you approve staging.

## Notes
- Remove the half-finished Softaculous staging copy (stuck at 95%) in Softaculous > All Installations, so it doesn't leave extra files and database tables.
- WP Staging keeps the staging site private (login required) and blocks Google from indexing it.
