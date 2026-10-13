# Live site safety: audit first, deploy on staging, then main site

## Answers to your questions
- **Is main-site access possible?** Technically yes. But I won't change the main site first. If something goes wrong there, patients see it right away, and Google can drop rankings.
- **Security issue:** the Application Password was pasted into chat, so treat it as exposed. In wp-admin go to Users > Profile > Application Passwords, revoke it and create a new one. Give me the new one through the secure box I'll show you, never in chat. I have not used the pasted password.
- **Am I confident?** Yes for the method, but only after it passes on staging first. The live site has more than our Lovable project covers: a shop (products and product categories), location ("geo") pages, author pages, an SEO plugin and blog categories. If we replaced everything blindly, those would break.

## What the live site has (public check, no login)
Its SEO sitemap lists: posts, pages (about 21), products, blog categories, product categories, authors and location pages.

## Steps
1. **Read-only audit of the live site** (no changes, no password needed): list every page, post, category, product and location address. For each one, mark:
   - Exists in Lovable: will be replaced with the exact copy
   - Blog, single post or category: shown in the Lovable design using WordPress posts
   - Shop and products, or anything Lovable doesn't have: left untouched on WordPress
   - Page titles, descriptions and links to keep the same, so Google rankings are kept
   Saved as a report in the spec folder for you to review.
2. **You approve the list.**
3. **Staging**: you clone the site to a staging address, install Code Snippets and give me a new Application Password (secure box). Then I deploy the homepage, then all pages, then the blog, comparing each with Lovable on desktop and phone.
4. **Main site, page by page**: homepage first, you approve, then the rest. Each page keeps its Elementor version saved, so turning off one snippet brings the old site back right away.
5. **Final report**: what changed, what was left alone, how to undo it, and a reminder to change the password.

## Technical details
- Audit sources: `/page-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml`, `/product*-sitemap.xml`, `/geo-sitemap.xml`, and the public `wp-json/wp/v2` lists. Output goes to `Dr-Arefin-Spec/wordpress-export/07-live-site-audit.md` (route, WP id, title, meta, status, Lovable match).
- `routes.json` only includes routes with a Lovable match. Unmatched routes, WooCommerce routes and the account and checkout pages are never touched.
- Elementor page content stays as it is. The snippet only serves pages that have `arefin_raw_html`, so removing that field (or turning off the snippet) puts the old page back.
