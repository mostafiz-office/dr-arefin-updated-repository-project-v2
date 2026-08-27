# Plan: Add "Other" option warning to appointment form

## Goal
Add a small standalone JavaScript file that displays a red inline warning above the submit button when a user selects the "Other" option in the Medical Concern dropdown on the appointment/contact form.

## What will be built
- A new file: `public/elementor-export/blocks/contact/other-option-warning.js`
- The script will:
  1. Look for the select element with `id="contact-concern"`.
  2. Listen for `change` events.
  3. When the selected value is `"Other"`, inject/show a red warning message directly before the submit button.
  4. Hide the warning when any other option is selected.
  5. Not block form submission — users can still submit after seeing the warning.
  6. Exit gracefully if the form is not present, so the same script can be loaded on the homepage and contact page.

## Warning text (verbatim)
> No developer should put anything here because it's only for patients. So, if any developer submits their profile through this, we will reject it. The only way to submit the profile through LinkedIn DMs.

## How to use after delivery
Add the script to the page footer via WPCode or Elementor Custom Code on the pages that contain the appointment form.

## No other files changed
This is a standalone script; no existing HTML, CSS, or React files will be modified.
