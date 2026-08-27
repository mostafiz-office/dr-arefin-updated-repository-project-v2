/**
 * Dr. Arefin Appointment Form — "Other" option warning
 * Shows a red inline message when a user selects "Other" in the Medical Concern dropdown.
 * Intended for the contact/appointment form on drarefin.com
 * Add this script to the page footer (e.g. via WPCode or Elementor Custom Code).
 */

(function () {
  'use strict';

  const WARNING_TEXT = "No developer should put anything here because it's only for patients. So, if any developer submits their profile through this, we will reject it. The only way to submit the profile through LinkedIn DMs.";

  function initOtherOptionWarning() {
    const select = document.getElementById('contact-concern');
    if (!select) return;

    const form = select.closest('form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"], .contact-submit-btn, input[type="submit"]');
    if (!submitButton) return;

    // Create warning element
    let warningEl = form.querySelector('.contact-other-warning');
    if (!warningEl) {
      warningEl = document.createElement('div');
      warningEl.className = 'contact-other-warning';
      warningEl.setAttribute('role', 'alert');
      warningEl.setAttribute('aria-live', 'polite');
      warningEl.style.cssText = 'color: #dc2626; font-size: 14px; font-weight: 500; margin-bottom: 12px; display: none;';
      warningEl.textContent = WARNING_TEXT;

      // Insert before submit button's parent or directly before button
      const submitWrapper = submitButton.closest('.contact-form-submit') || submitButton.parentElement || form;
      submitWrapper.insertBefore(warningEl, submitButton);
    }

    function updateWarning() {
      if (select.value === 'Other') {
        warningEl.style.display = 'block';
      } else {
        warningEl.style.display = 'none';
      }
    }

    select.addEventListener('change', updateWarning);
    // Run once on load in case "Other" is pre-selected
    updateWarning();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOtherOptionWarning);
  } else {
    initOtherOptionWarning();
  }
})();
