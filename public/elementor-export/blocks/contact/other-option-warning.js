/**
 * Dr. Arefin Appointment Form — "Other" option warning
 * Shows a red inline message above the Submit button when a user selects "Other"
 * in the Medical Concern dropdown.
 *
 * Works with both the static export form (#contact-concern) and Elementor forms
 * (auto-generated ids like form-field-field_xyz).
 *
 * Add this to the page footer (WPCode → JavaScript Snippet → Footer, or
 * Elementor → Custom Code → </body> End).
 */

(function () {
  'use strict';

  var WARNING_TEXT = "No developer should put anything here because it's only for patients. So, if any developer submits their profile through this, we will reject it. The only way to submit the profile through LinkedIn DMs.";
  var WARNING_CLASS = 'contact-other-warning';

  function isOtherValue(value) {
    return String(value || '').trim().toLowerCase() === 'other';
  }

  function hasOtherOption(select) {
    for (var i = 0; i < select.options.length; i++) {
      var opt = select.options[i];
      if (isOtherValue(opt.value) || isOtherValue(opt.textContent)) return true;
    }
    return false;
  }

  function labelTextFor(select) {
    var text = '';
    if (select.id) {
      var lbl = document.querySelector('label[for="' + CSS.escape(select.id) + '"]');
      if (lbl) text += ' ' + lbl.textContent;
    }
    var group = select.closest('.contact-field, .elementor-field-group, .elementor-field-type-select, .form-group, div');
    if (group) text += ' ' + group.textContent;
    text += ' ' + (select.getAttribute('name') || '') + ' ' + (select.getAttribute('aria-label') || '');
    return text.toLowerCase();
  }

  function findConcernSelect() {
    var selects = Array.prototype.slice.call(document.querySelectorAll('select'));
    var candidates = selects.filter(hasOtherOption);
    if (!candidates.length) return null;

    var preferred = candidates.filter(function (s) {
      var t = labelTextFor(s);
      return t.indexOf('medical concern') !== -1 || t.indexOf('concern') !== -1;
    });

    return preferred[0] || candidates[0];
  }

  function findSubmit(form) {
    return form.querySelector(
      'button[type="submit"], input[type="submit"], .contact-submit-btn, .elementor-button[type="submit"], button.elementor-button'
    );
  }

  function buildWarning() {
    var el = document.createElement('div');
    el.className = WARNING_CLASS;
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'polite');
    el.style.cssText =
      'color:#dc2626;font-size:14px;line-height:1.5;font-weight:600;margin:0 0 12px;display:none;width:100%;text-align:left;';
    el.textContent = WARNING_TEXT;
    return el;
  }

  function attach() {
    var select = findConcernSelect();
    if (!select || select.dataset.otherWarningBound === '1') return !!select;

    var form = select.closest('form') || select.closest('.elementor-widget-form') || document.body;
    var submit = findSubmit(form);

    var warningEl = form.querySelector('.' + WARNING_CLASS) || buildWarning();

    if (!warningEl.parentNode) {
      if (submit) {
        var wrapper =
          submit.closest('.contact-form-submit') ||
          submit.closest('.elementor-field-type-submit') ||
          submit.closest('.elementor-field-group') ||
          submit.parentElement;
        if (wrapper && wrapper.parentNode) {
          wrapper.parentNode.insertBefore(warningEl, wrapper);
        } else {
          submit.parentNode.insertBefore(warningEl, submit);
        }
      } else {
        form.appendChild(warningEl);
      }
    }

    function update() {
      var selected = select.options[select.selectedIndex];
      var show = isOtherValue(select.value) || (selected && isOtherValue(selected.textContent));
      warningEl.style.display = show ? 'block' : 'none';
    }

    select.addEventListener('change', update);
    select.addEventListener('input', update);
    select.dataset.otherWarningBound = '1';
    update();
    return true;
  }

  function init() {
    if (attach()) return;

    // Elementor / popups / lazy-loaded forms: keep watching for a while.
    var observer = new MutationObserver(function () {
      if (attach()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () {
      observer.disconnect();
    }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', function () {
    attach();
  });
})();
