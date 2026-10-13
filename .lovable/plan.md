# Staging copy, then a safe deploy

## Can I create the staging site?
No, not from here. An Application Password only lets me read and edit content (pages, posts, media and snippets). Making a staging copy means copying the database and files to a new address, which only your hosting company or a cloning plugin can do. Two easy ways:
- **Your hosting panel** (cPanel / Softaculous / hosting dashboard): find "Staging" or "Clone", pick a name like `staging.drarefin.com`, and click Create. This is usually one click.
- **WP Staging plugin** (free): install it in wp-admin, click "Create Staging Site", and wait a few minutes. It makes `drarefin.com/staging/`.

Once it's created, send me the staging address. Then set up the Code Snippets plugin and a new Application Password **on the staging site**.

### If Softaculous gets stuck at "Propagating the database (95%)"
This is common. It's the last step, where every link inside the database is rewritten to the new address. On a site with Elementor, WooCommerce and an SEO plugin, the database is large, and the hosting server can stop the job partway through without showing an error.
1. Wait 10–15 minutes, then reload. Open Softaculous > All Installations. If the staging copy is listed, open its address. It often finished even though the bar froze.
2. If it isn't listed, or it opens a broken page: delete that staging copy in Softaculous so it doesn't leave a half-made database behind.
3. Make the database smaller, then try again: in wp-admin, use WP-Optimize (or a similar tool) to clear old revisions, temporary data and WooCommerce "Action Scheduler" logs. Elementor > Tools also has a "Regenerate files" button.
4. Or ask your hosting support: "Softaculous staging stuck at 95% propagating database — please raise the PHP max_execution_time/memory limit or create the staging copy for us." Hosts usually do this for free.
5. Another option: the WP Staging plugin copies in small steps, so it doesn't time out.

## About the password
You pasted a second password in chat, so it is exposed too. I won't use either one. Please revoke both (wp-admin > Users > Profile > Application Passwords). After you approve this plan, I'll open a secure box where you enter `WP_URL`, `WP_USER` and `WP_APP_PASSWORD`. They are saved encrypted and never appear in chat or files.

## Steps after approval
1. Show the secure box for the staging address, username and new password.
2. Check access read-only: login works and the Code Snippets plugin is found.
3. Adjust the kit's scripts for this site: `arefin_` prefix, a route list taken from the audit, and the build changed for this kind of project.
4. Install the "Arefin exact pages" snippet on staging.
5. Deploy only the homepage and compare it with Lovable on desktop and phone, then send you screenshots for approval.
6. After approval: the other matched pages, then blog posts and categories. Shop and booking pages are never touched.
7. Main site only after you approve staging, following the same steps, homepage first.

## If you want to skip staging
It's possible but not recommended. I would deploy the homepage only to the main site. The old Elementor page stays saved, and switching the snippet off restores it right away. Tell me if you want this route instead.
