# Staging vs main site: findings so far and the fix plan

## Checked so far (read-only, both sites)
| Area | Main site | Staging | Status |
|---|---|---|---|
| Pages | 21 | 21, same addresses | OK |
| Blog posts | 93 | 93 | OK |
| Categories | 28 | 28 | OK |
| Plugins | same list | same + Code Snippets | OK |
| New Lovable design on staging | — | Home, About, Treatment + 4 surgery pages, Mentorship, Gallery, Contact, Articles | OK |
| Booking, shop, cart, checkout, account | WooCommerce | not touched, still WooCommerce | OK so far (flow not tested yet) |

## Problem found: the Contact page form does not send
- On the main site the appointment form is an Elementor form, sent by email.
- On staging the new Lovable Contact form only shows a "Thank you" pop-up. **The request goes nowhere.**
- If we push now, every appointment request from the Contact page is lost. **Not ready to push until fixed.**
- The red "Other" warning (no developer profiles, use LinkedIn) is also missing from the new form.

## Fix plan (staging only)
1. **Make the form really send.** Add a small receiver to the existing "Arefin exact pages" snippet. It emails the request to the same inbox the Elementor form uses today, through the site's existing email plugin (GoSMTP). Includes spam protection (hidden trap field + rate limit) and checks every field.
2. **Show a real result.** "Sending…", then a success message, or an error with the phone number to call.
3. **Add the "Other" warning** inside the new form, same red text, full width, works on phone.
4. **Booking page check.** Make sure every "Book appointment" button goes to the real booking page, then test the booking flow on staging up to checkout (no payment).
5. **Rest of the checklist.** For every page, main vs staging: page title and Google description, one main heading, canonical, broken links/images, menu (incl. Research) and footer links, blog list / single posts / categories, speed score on phone and computer.
6. **Re-upload to staging, send one real test request**, and confirm it arrives in the inbox (you confirm receipt).
7. **Write the checklist** to `Dr-Arefin-Spec/wordpress-export/09-go-live-checklist.md` with OK / Missing / Broken per item and a clear "Ready to push: Yes/No".

## Question for you
Which email address should receive appointment requests? I'll read it from the current Elementor form settings; please confirm it's correct.

## Technical notes
- `ContactDark.tsx` `handleSubmit` currently calls `alert()` only. Change it to `POST` to `?rest_route=/arefin/v1/contact` (same origin, works under `/staging` and live).
- Snippet registers the REST route with `wp_mail()`, `sanitize_*`, honeypot, transient-based rate limit; recipient read from the Elementor form's email setting.
- Live site not touched; changes reach live only via your WP Staging push.
