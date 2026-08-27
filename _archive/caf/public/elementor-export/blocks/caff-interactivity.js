<script>
/**
 * CAF Patronato Fondi — Combined Interactivity Script
 * FD-JS v1.2.0 — Interactivity Script
 * ====================================================
 * Add via WPCode or Elementor Custom Code (Footer).
 * Handles: Lucide icons, mobile menu, sticky header (auto-detect),
 *          desktop dropdowns, mobile accordions, FAQ accordion,
 *          smooth scrolling, sticky-stack overflow/transform/contain fix.
 */

document.addEventListener('DOMContentLoaded', function () {

  console.log('[CAFF] Interactivity script v1.2.0 loaded');

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log('[CAFF] Lucide icons initialized');
  }

  // 2. Animated Hamburger + Mobile Menu
  var hamburger = document.querySelector('.header-hamburger');
  var navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
    });
  }

  // 3. (Sticky header is now handled by caff-sticky-header-snippet.html)

  // 4. Desktop Dropdown Menus
  var dropdownWraps = document.querySelectorAll('.nav-dropdown-wrap');
  dropdownWraps.forEach(function (wrap) {
    var btn = wrap.querySelector('.nav-pill');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = wrap.classList.contains('is-open');
        dropdownWraps.forEach(function (w) { w.classList.remove('is-open'); });
        if (!wasOpen) wrap.classList.add('is-open');
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown-wrap')) {
      dropdownWraps.forEach(function (w) { w.classList.remove('is-open'); });
    }
  });

  // 5. Mobile Accordion Menus
  var mobileAccordions = document.querySelectorAll('.nav-mobile-accordion');
  mobileAccordions.forEach(function (acc) {
    var toggle = acc.querySelector('.nav-mobile-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        acc.classList.toggle('is-open');
      });
    }
  });

  // 6. FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.removeAttribute('onclick');
    var question = item.querySelector('.faq-item-question');
    if (question) {
      question.addEventListener('click', function (e) {
        e.preventDefault();
        faqItems.forEach(function (other) {
          if (other !== item) other.classList.remove('is-open');
        });
        item.classList.toggle('is-open');
      });
    }
  });

  // 7. Sticky Stack — Neutralize ALL sticky-breaking properties on ancestors
  // position:sticky breaks when ANY ancestor has:
  //   - overflow other than 'visible'
  //   - transform other than 'none'
  //   - will-change: transform
  //   - contain: layout | content | strict | paint
  var stackSection = document.querySelector('.caff-stack-section');
  if (stackSection) {
    var fixCount = 0;
    // Walk from parent all the way UP including body and html
    var el = stackSection.parentElement;
    while (el) {
      var cs = window.getComputedStyle(el);
      var tag = el.tagName + (el.className ? '.' + String(el.className).split(' ').slice(0, 2).join('.') : '');
      var fixed = [];

      // Fix 1: overflow (any axis)
      if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        el.style.overflow = 'visible';
        el.style.overflowX = 'visible';
        el.style.overflowY = 'visible';
        fixed.push('overflow:' + cs.overflow);
      }

      // Fix 2: transform
      if (cs.transform && cs.transform !== 'none') {
        el.style.transform = 'none';
        fixed.push('transform:' + cs.transform);
      }

      // Fix 3: will-change (if it includes transform or contain)
      if (cs.willChange && cs.willChange !== 'auto' && (cs.willChange.indexOf('transform') > -1 || cs.willChange.indexOf('contain') > -1)) {
        el.style.willChange = 'auto';
        fixed.push('will-change:' + cs.willChange);
      }

      // Fix 4: contain property
      var containVal = cs.contain || cs.getPropertyValue('contain');
      if (containVal && containVal !== 'none' && containVal !== 'style') {
        el.style.contain = 'none';
        fixed.push('contain:' + containVal);
      }

      if (fixed.length > 0) {
        fixCount++;
        console.log('[CAFF] Sticky fix on <' + tag + '>: ' + fixed.join(', '));
      }

      el = el.parentElement;
    }
    console.log('[CAFF] Sticky stack: ' + fixCount + ' ancestors neutralized');
  } else {
    console.log('[CAFF] Sticky stack section not found on this page');
  }

  // 8. Re-init Lucide after Elementor loads
  if (typeof lucide !== 'undefined') {
    setTimeout(function () { lucide.createIcons(); }, 500);
  }

  // Strip inline background-color from DesignMonks color-strip containers
  var stripMap = {
    'caff-strip-teal':   '#3DD9C0',
    'caff-strip-cyan':   '#2BC4D6',
    'caff-strip-indigo': '#7B8AE6',
    'caff-strip-gold':   '#E6C44A'
  };
  Object.keys(stripMap).forEach(function (cls) {
    document.querySelectorAll('.' + cls).forEach(function (el) {
      el.style.backgroundColor = stripMap[cls];
    });
  });

  console.log('[CAFF] All modules initialized');

});
</script>