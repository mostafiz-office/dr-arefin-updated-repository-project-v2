/**
 * "Other" Option Warning — Dr. Arefin Appointment Form
 * -----------------------------------------------------
 * Shows a red inline warning directly above the Submit button
 * when the visitor selects "Other" in the "Select Your Medical
 * Concern" dropdown. The form can still be submitted — the
 * warning is informational only.
 *
 * INSTALL (WordPress):
 *   WPCode plugin → Add Snippet → JavaScript → paste this file's
 *   contents between <script> and </script> → Location: Footer,
 *   run on Contact page only → Save & Activate.
 */
(function () {
  'use strict';

  var WARNING_ID = 'other-option-warning-message';
  var MESSAGE =
    '⚠️ No developer should put anything here because it\'s only for patients. ' +
    'If any developer submits their profile through this form, we will reject it. ' +
    'The only way to submit a profile is through LinkedIn DMs.';

  function findSelect() {
    return (
      document.getElementById('form-field-services_selected') ||
      document.querySelector('select[name="form_fields[services_selected]"]')
    );
  }

  function getWarningEl() {
    return document.getElementById(WARNING_ID);
  }

  function createWarningEl() {
    var el = document.createElement('div');
    el.id = WARNING_ID;
    el.setAttribute('role', 'alert');
    el.textContent = MESSAGE;
    el.style.cssText =
      'display:block;' +
      'width:100%;' +
      'box-sizing:border-box;' +
      'margin:0 0 15px 0;' +
      'padding:12px 15px;' +
      'background-color:#fdecec;' +
      'border:1px solid #e02020;' +
      'border-left:4px solid #e02020;' +
      'border-radius:4px;' +
      'color:#c81e1e;' +
      'font-size:14px;' +
      'font-weight:600;' +
      'line-height:1.5;';
    return el;
  }

  function showWarning(selectEl) {
    if (getWarningEl()) return; // already shown — no duplicates
    var form = selectEl.closest('form');
    if (!form) return;
    var submitWrap = form.querySelector('.elementor-field-type-submit');
    var warning = createWarningEl();
    if (submitWrap && submitWrap.parentNode) {
      submitWrap.parentNode.insertBefore(warning, submitWrap);
    } else {
      // Fallback: append at the end of the form
      form.appendChild(warning);
    }
  }

  function hideWarning() {
    var el = getWarningEl();
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function onSelectChange(e) {
    var select = e.target;
    if (select.value === 'Other') {
      showWarning(select);
    } else {
      hideWarning();
    }
  }

  function init() {
    var select = findSelect();
    if (!select) return false;
    if (!select.dataset.otherWarningBound) {
      select.addEventListener('change', onSelectChange);
      select.dataset.otherWarningBound = '1';
      // Handle a pre-selected "Other" (e.g. after a validation error)
      if (select.value === 'Other') showWarning(select);
    }
    return true;
  }

  function boot() {
    if (init()) return;
    // Form may render late (page builder / caching) — retry briefly.
    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      if (init() || attempts > 40) clearInterval(timer); // ~10s max
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
