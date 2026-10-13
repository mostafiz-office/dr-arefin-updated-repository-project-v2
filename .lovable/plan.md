# Fix: menu "Book" button doesn't open the Contact page on staging

## What is known
- In the Lovable preview, the green **Book** button in the menu opens the Contact page correctly (tested on computer).
- On staging it fails for you. The cause is not confirmed yet.
- Menu stays as it is: only the **Book** button, no new "Contact" item.

## Steps
1. **Reproduce on staging.** Open the staging homepage in a test browser using the exact files uploaded to staging. Click **Book** on computer and phone, and record where it goes.
2. **Check the staging Contact address directly.** Confirm `drarefin.com/staging/contact/` serves the new page, not the old Elementor page, an old cached copy or a redirect. Check the SpeedyCache cache and any Yoast redirect for `/contact/`.
3. **Fix the actual cause** on staging only. For example: a wrong link address, an old cached copy, a redirect, or the click not opening the page. Then re-upload through the normal staging scripts.
4. **Verify:** click **Book** from Home, About, Treatment, Articles, a blog post and Research, on computer and phone. Each must open the Contact page with the "Book an Appointment" form.
5. **Record it** in a new issue note and in the go-live checklist.

## What you will need to do
Log in to staging, clear the SpeedyCache cache if asked, then click **Book** once to confirm.

## Technical notes
- Book is a router `Link to="/contact/"` under basename `/staging`. Check both the client-side navigation and the full-page load of `/staging/contact/`, including the `X-Arefin-Exact` header and any 301 or 302 redirects.
- Snippet 5 must still be active after redeploy (Code Snippets REST can leave it inactive).
