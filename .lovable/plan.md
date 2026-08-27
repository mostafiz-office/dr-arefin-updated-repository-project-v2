# Plan: Add the "Other" warning script to Dr. Arefin's contact page

## Goal
Place the existing `public/elementor-export/blocks/contact/other-option-warning.js` script on the live Dr. Arefin WordPress site so that selecting "Other" in the Medical Concern dropdown shows the red warning above the Submit button.

## Where the script needs to go
The script must run only on pages that contain the appointment form with the "Medical Concern" dropdown. For now, that is the **Contact / Appointment page** (`/contact/`).

## Step-by-step deployment (beginner-friendly)

### Option A — WPCode plugin (recommended, no theme edits)

1. **Log in to your WordPress admin dashboard.**
   - Go to `yourdomain.com/wp-admin/`.

2. **Open WPCode.**
   - In the left sidebar, click **Code Snippets → Add Snippet**.

3. **Create a new snippet.**
   - Click **Add Your Custom Code (New Snippet)**.
   - Choose **JavaScript Snippet**.

4. **Paste the code.**
   - Copy the entire contents of `other-option-warning.js`.
   - Paste it into the WPCode code box.

5. **Set where it runs.**
   - Location / Insertion: choose **Footer** (or "Site Wide Footer").
   - This makes the script load at the bottom of the page, after the form exists.

6. **Make it run only on the Contact page.**
   - Look for **Conditional Logic** (or "Smart Conditional Logic").
   - Add a condition: **Page URL contains `/contact/`** (or select the Contact page by name).
   - This avoids running the script on pages without the form.

7. **Save and activate.**
   - Toggle the snippet to **Active**.
   - Click **Save Snippet**.

8. **Test it.**
   - Visit `/contact/` in an incognito/private browser window.
   - Select **Other** in the Medical Concern dropdown.
   - You should see the red warning appear above the Submit button.
   - Select any other option — the warning should disappear.

### Option B — Elementor Custom Code (if you use Elementor Pro)

1. In WordPress admin, go to **Elementor → Custom Code**.
2. Click **Add New**.
3. Name it: `Other Option Warning`.
4. Paste the contents of `other-option-warning.js` into the code area.
5. Set **Location** to `</body> - End`.
6. Set **Include** condition to the Contact page only.
7. Click **Publish**.

## Important notes

- Do **not** edit the contact form HTML itself — the script works automatically once it is loaded on the page.
- Do **not** place the script in the `<head>`; it must load after the form, so **Footer** or `</body>` is correct.
- If you later add the appointment form to other pages (for example, the homepage), repeat the same steps but add those page URLs to the conditional logic.

## What the script does (in plain language)

- It looks for the dropdown with `id="contact-concern"`.
- When someone picks **Other**, it shows a red message right above the Submit button.
- If they pick any other option, the message hides again.
- The form can still be submitted — the warning is just a notice.

## No code changes to the React project
This plan only covers deploying the already-created JavaScript file to the live WordPress site. No source files in this repository need to change.
