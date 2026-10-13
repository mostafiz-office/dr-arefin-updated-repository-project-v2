# Bring back the main site's nice Contact emails

## What I found
- Both test emails reached arefin-leads@googlegroups.com, so sending works. Only the design is wrong.
- I read the main site's Elementor form settings (read-only). It sends **two** HTML emails:
  1. **To the team** — subject `New Lead: {Concern} Inquiry from {Name} (Dr Arefin)`, sender "Dr Arefin Appointment", reply goes to the patient. Blue box with the bell heading, "PATIENT DETAILS FOR REVIEW" table (Name, Concern, Email, Phone, Message), a "Follow-up Action" line and the footer note.
  2. **To the patient** — subject `Consultation Request Received! Next Steps for Your {Concern} Appointment with Dr. Arefin`, sender "Dr Arefin Appointment Booking". "Hello {Name}", "What Happens Next?" blue panel, Serial line 01311487592, WhatsApp 01723134282, arefin-info@drarefin.com, links to News / Treatments / Contact, team signature.
- The new staging form sends only a plain-text email to the team and nothing to the patient.

## What I will change (staging only)
1. Team email: use the main site's HTML and subject exactly as they are, filled with the form answers. Sender name "Dr Arefin Appointment"; replies go to the patient.
2. Patient email: add it back, again copying the main site's design and wording exactly (this answers the earlier open question: yes, send it).
3. Make every answer safe before it goes into the email, so nobody can inject links or code. An empty message shows "—".
4. Send 1 test request marked TEST. You check that both emails look the same as the old ones (team inbox + the test address).
5. Update the go-live checklist and add an issue note.

## Please confirm
- The old patient email sets "reply-to" as **info@drarefin.com.au**. That looks like a typo. Should I use **info@drarefin.com** instead? (I'll use info@drarefin.com unless you say otherwise.)
- The footer links to /news, which may not exist on the new site. Should I keep it, or change it to /articles?

## Technical details
- Edit `scripts/wp-exact/snippet.mjs` contact handler: build both HTML bodies with `esc_html`/`esc_attr` (phone kept for `tel:`), send with `wp_mail` and `Content-Type: text/html; charset=UTF-8`. The second send goes to the validated patient email. Keep the honeypot, the rate limit and saving the `arefin_request` post.
- Redeploy snippet 5 to staging through `scripts/wp-exact/`. Live gets it only when you push from WP Staging.
- Specs: `09-go-live-checklist.md`, new `issues/15-contact-email-design.md`.
