/* Other Option Warning - Dr. Arefin Appointment Form */
/* Shows a red inline notice above the Submit button when "Other" is selected. */
/* Submission is never blocked - the notice is informational only. */
(function () {
  'use strict';

  var WARNING_ID = 'other-option-warning-message';
  var MESSAGE =
    '\u26A0\uFE0F No developer should put anything here because it\'s only for patients. ' +
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
      'max-width:100%;' +
      'flex:0 0 100%;' +
      'flex-basis:100%;' +
      'grid-column:1 / -1;' +
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

  /* Find the outermost Elementor wrapper of the submit button so the
     warning spans the full form row instead of a half-width column. */
  function findInsertAnchor(submitWrap, form) {
    var node = submitWrap;
    var anchor = submitWrap;
    while (node && node !== form) {
      if (
        node.classList &&
        (node.classList.contains('elementor-field-group') ||
          node.classList.contains('elementor-column') ||
          node.classList.contains('elementor-col') ||
          /(^|\s)elementor-col-/.test(node.className))
      ) {
        anchor = node;
      }
      node = node.parentNode;
    }
    return anchor;
  }

  function showWarning(selectEl) {
    if (getWarningEl()) return;
    var form = selectEl.closest('form');
    if (!form) return;
    var submitWrap = form.querySelector('.elementor-field-type-submit');
    var warning = createWarningEl();
    if (submitWrap) {
      var anchor = findInsertAnchor(submitWrap, form);
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(warning, anchor);
        return;
      }
    }
    form.appendChild(warning);
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
      if (select.value === 'Other') showWarning(select);
    }
    return true;
  }

  function boot() {
    if (init()) return;
    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      if (init() || attempts > 40) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
