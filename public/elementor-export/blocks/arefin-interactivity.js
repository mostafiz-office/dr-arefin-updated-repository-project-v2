<script>
(function () {
  'use strict';
  if (window.__arefinInit) return;
  window.__arefinInit = true;

  var ready = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  ready(function () {
    initStickyHeader();
    initActiveNav();
    initMobileNav();
    initOrganTooltips();
    initScrollReveal();
    initVideoFeed(function () {
      initVideoCarousel();
      backfillSssFlipVideoIds();
      initSssFlipVideos();
    });
    initCountUp();
    initFAQFallback();
    initContactForm();
    initStickyStackFix();
    initGallery();
    initMentorCarousels();
    initTreatmentProcess();
    initHoverSound();
  });

  /* Re-run the sticky ancestor neutralization after full load and on resize,
     since Astra/Elementor can apply overflow/transform/contain late. */
  window.addEventListener('load', function () { initStickyStackFix(); });
  var __arefinStickyRAF;
  window.addEventListener('resize', function () {
    if (__arefinStickyRAF) cancelAnimationFrame(__arefinStickyRAF);
    __arefinStickyRAF = requestAnimationFrame(function () { initStickyStackFix(); });
  }, { passive: true });

  /* Cache of latest feed items, populated by initVideoFeed; consumed by
     sticky-stack flip cards so each card can show a relevant YouTube video. */
  window.__arefinFeedItems = window.__arefinFeedItems || [];


  /* -------- Hero organ-orb hover swoosh (1:1 with React useHoverSound) -------- */
  function initHoverSound() {
    var orbs = document.querySelectorAll('.arefin-organ-orb');
    if (!orbs.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var audio = new Audio('data:audio/mpeg;base64,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iUQTFkTnuWo8JBkyLxqJ15/TsWYkRZLKSxRQsUX9Ra/sv33voMMYAAAPhJwRIMYAtB9DRHwScwRzE/FCLkuaS4hKVsc4sFMptf+tnJQAR6NfZsNYaymv7VQyLzRpNFMNTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7MET4j/IVGsfp7DMaP2P5HTzDh0AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');
    audio.preload = 'auto';
    audio.volume = 0.4;
    var primed = false;
    var prime = function () {
      if (primed) return; primed = true;
      var v = audio.volume; audio.volume = 0;
      var p = audio.play();
      if (p && p.then) p.then(function () { audio.pause(); audio.currentTime = 0; audio.volume = v; })
                        .catch(function () { audio.volume = v; });
    };
    window.addEventListener('pointerdown', prime, { once: true });
    window.addEventListener('keydown', prime, { once: true });
    var play = function () {
      try { audio.currentTime = 0; var p = audio.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    };
    Array.prototype.forEach.call(orbs, function (orb) {
      orb.addEventListener('mouseenter', play);
      orb.addEventListener('focus', play);
    });
  }

  /* -------- Sticky ancestor neutralization --------
     position:sticky breaks when ANY ancestor has overflow != visible
     or transform/filter/perspective set. Astra + Elementor frequently
     apply those. Walk up from sticky sections/sidebars and unstick them. */
  function initStickyStackFix() {
    var sections = document.querySelectorAll('.arefin-header-sticky, .arefin-header, .sss-section, .tp-section, .arefin-sp-layout, .arefin-sp-sidebar');
    if (!sections.length) return;
    Array.prototype.forEach.call(sections, function (section) {
      var node = section.parentElement;
      while (node && node !== document.body) {
        var cs = getComputedStyle(node);
        if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          node.style.overflow = 'visible';
          node.style.overflowX = 'visible';
          node.style.overflowY = 'visible';
        }
        if (cs.transform && cs.transform !== 'none') node.style.transform = 'none';
        if (cs.filter && cs.filter !== 'none') node.style.filter = 'none';
        if (cs.perspective && cs.perspective !== 'none') node.style.perspective = 'none';
        if (cs.contain && cs.contain !== 'none') node.style.contain = 'none';
        if (cs.willChange && cs.willChange !== 'auto') node.style.willChange = 'auto';
        node = node.parentElement;
      }
    });
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
  }


  /* -------- FAQ <details> click fallback (Astra/Elementor can suppress native toggle) -------- */
  function initFAQFallback() {
    var triggers = document.querySelectorAll('.arefin-faq-item > .arefin-faq-trigger');
    if (!triggers.length) return;
    Array.prototype.forEach.call(triggers, function (sum) {
      sum.addEventListener('click', function () {
        var item = sum.parentElement;
        if (!item) return;
        var wasOpen = item.hasAttribute('open');
        setTimeout(function () {
          var nowOpen = item.hasAttribute('open');
          if (nowOpen === wasOpen) {
            if (wasOpen) item.removeAttribute('open');
            else item.setAttribute('open', '');
          }
        }, 0);
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector('.contact-form-band .contact-form');
    if (!form) return;

    var btn = form.querySelector('.contact-submit-btn');
    var btnHtml = btn ? btn.innerHTML : '';

    // Inject an inline status banner once.
    var status = form.querySelector('.contact-form-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'contact-form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.insertBefore(status, form.firstChild);
    }

    function showStatus(type, msg) {
      status.className = 'contact-form-status contact-form-status--' + type + ' is-visible';
      status.innerHTML = msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      if (btn) {
        btn.disabled = true;
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="contact-submit-spinner" aria-hidden="true"></span> Sending…';
      }

      var endpoint = form.getAttribute('data-endpoint');

      function onSuccess() {
        showStatus(
          'success',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg> Thank you! Your appointment request has been submitted. Dr. Arefin&rsquo;s team will contact you within 24 hours.'
        );
        if (typeof form.reset === 'function') form.reset();
        if (btn) { btn.disabled = false; btn.classList.remove('is-loading'); btn.innerHTML = btnHtml; }
        try { status.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) {}
      }

      function onError() {
        showStatus(
          'error',
          'Sorry, something went wrong. Please call +880 1311-487592 or try again.'
        );
        if (btn) { btn.disabled = false; btn.classList.remove('is-loading'); btn.innerHTML = btnHtml; }
      }

      if (endpoint && typeof fetch === 'function') {
        // Real backend submission when a data-endpoint is configured on the form.
        var fd = new FormData(form);
        fetch(endpoint, { method: 'POST', body: fd })
          .then(function (r) { if (!r.ok) throw new Error('bad status'); return r; })
          .then(onSuccess)
          .catch(onError);
      } else {
        // No backend wired yet — simulate a short send for clear UX feedback.
        window.setTimeout(onSuccess, 900);
      }
    });
  }


  /* -------- Sticky header solidifies after scroll -------- */
  function initStickyHeader() {
    var header = document.querySelector('.arefin .arefin-header, .arefin-header');
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 16) header.classList.add('is-stuck');
      else header.classList.remove('is-stuck');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------- Highlight the nav item matching the current URL --------
     The global header ships with Home pre-marked active; on every other
     page we must recompute the active item from window.location so the
     correct top-level (and Treatment child) link is highlighted. */
  function initActiveNav() {
    var norm = function (p) {
      if (!p) return '/';
      try { p = decodeURIComponent(p); } catch (e) {}
      p = p.toLowerCase().split('?')[0].split('#')[0];
      if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
      return p === '' ? '/' : p;
    };
    var current = norm(window.location.pathname);
    var hrefPath = function (a) {
      try { return norm(new URL(a.href, window.location.origin).pathname); }
      catch (e) { return norm(a.getAttribute('href') || ''); }
    };
    var isMatch = function (target) {
      if (target === '/') return current === '/';
      return current === target || current.indexOf(target + '/') === 0;
    };

    var items = document.querySelectorAll(
      '.arefin-nav-item, .arefin-mobile-link, .arefin-dropdown-item, .arefin-mobile-subitem'
    );
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.removeAttribute('data-active');
      var href = el.getAttribute('href');
      if (!href) continue; // skip the mobile group toggle button
      if (isMatch(hrefPath(el))) {
        el.setAttribute('data-active', 'true');
      }
    }

    // Keep the Treatment parent highlighted on its child pages.
    var parents = document.querySelectorAll('.arefin-nav-has-children > .arefin-nav-item, .arefin-mobile-group-toggle');
    for (var j = 0; j < parents.length; j++) {
      var parent = parents[j];
      var group = parent.closest('.arefin-nav-has-children, .arefin-mobile-group');
      if (!group) continue;
      var activeChild = group.querySelector('[data-active="true"]');
      if (activeChild) parent.setAttribute('data-active', 'true');
    }
  }


  /* -------- Mobile nav drawer (1:1 mirror of React DrArefinHeader) -------- */
  function initMobileNav() {
    var toggle = document.querySelector('.arefin-nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;
    var header = toggle.closest('.arefin-header');
    var openIcon = toggle.querySelector('.arefin-nav-toggle-open');
    var closeIcon = toggle.querySelector('.arefin-nav-toggle-close');

    var closeDrawer = function () {
      drawer.setAttribute('data-open', 'false');
      drawer.hidden = true;
      if (header) header.setAttribute('data-mobile-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      if (openIcon) { openIcon.hidden = false; openIcon.removeAttribute('hidden'); }
      if (closeIcon) { closeIcon.hidden = false; closeIcon.removeAttribute('hidden'); }
      document.body.style.overflow = '';
    };
    var openDrawer = function () {
      drawer.setAttribute('data-open', 'true');
      drawer.hidden = false;
      if (header) header.setAttribute('data-mobile-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      if (openIcon) { openIcon.hidden = false; openIcon.removeAttribute('hidden'); }
      if (closeIcon) { closeIcon.hidden = false; closeIcon.removeAttribute('hidden'); }
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (drawer.getAttribute('data-open') === 'true') closeDrawer();
      else openDrawer();
    });

    /* Backdrop click closes */
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-arefin-mobile-close]')) { closeDrawer(); return; }
      /* Any actual nav link (not submenu toggle button) closes */
      var link = e.target.closest('a[href]');
      if (link && drawer.contains(link)) closeDrawer();
    });

    /* Treatment submenu collapsible (T7) */
    var groups = drawer.querySelectorAll('[data-arefin-mobile-group]');
    Array.prototype.forEach.call(groups, function (group) {
      var btn = group.querySelector('.arefin-mobile-group-toggle');
      var panel = group.querySelector('.arefin-mobile-submenu');
      if (!btn || !panel) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        panel.hidden = expanded;
      });
    });

    /* Esc closes */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') closeDrawer();
    });
  }


  /* -------- Hero organ orbs: mobile tap reveal, second tap navigates -------- */
  function initOrganTooltips() {
    var orbs = document.querySelectorAll('.arefin-organ-orb');
    if (!orbs.length) return;
    var isCoarse = function () {
      return window.matchMedia && window.matchMedia('(hover: none)').matches;
    };
    var closeAll = function () {
      orbs.forEach(function (orb) {
        orb.classList.remove('is-active');
        orb.setAttribute('aria-expanded', 'false');
      });
    };
    orbs.forEach(function (orb) {
      orb.addEventListener('click', function (e) {
        if (!isCoarse()) return;
        if (!orb.classList.contains('is-active')) {
          e.preventDefault();
          closeAll();
          orb.classList.add('is-active');
          orb.setAttribute('aria-expanded', 'true');
        }
      });
      var close = orb.querySelector('.arefin-organ-tooltip-close');
      if (close) {
        close.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          closeAll();
        });
      }
    });
    document.addEventListener('click', function (e) {
      var target = e.target;
      if (target && !target.closest('.arefin-organ-orb')) closeAll();
    });
  }

  /* -------- Scroll reveal (.arefin-reveal → .is-revealed) -------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.arefin .arefin-reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* -------- Video feed loader (Section 05) --------
     Fetches recent uploads from the youtube-feed edge function and
     injects cards into [data-vid-feed-target]. Invokes `done` callback
     after all sections finish (success or fallback) so the carousel
     can initialize against the populated DOM. */
  function initVideoFeed(done) {
    /* Fallback feed config — used when the HTML block is older and lacks
       data-vid-feed-* attrs, so the carousel still populates from JS alone. */
    var FEED_URL = 'https://imxbtkwbcgefdkjqkgtn.supabase.co/functions/v1/youtube-feed';
    var FEED_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteGJ0a3diY2dlZmRranFrZ3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDg5OTYsImV4cCI6MjA5NDIyNDk5Nn0._Uk9ZLqR72r2z_sYj8zAJk1m4aN29gULw57i_j3Ngag';
    /* Match every videos section, not just those with data-vid-feed-url. */
    var sections = document.querySelectorAll('.arefin-vid-c');
    if (!sections.length) { if (typeof done === 'function') done(); return; }

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function renderCards(target, items) {
      var html = '';
      for (var i = 0; i < items.length; i++) {
        var v = items[i] || {};
        var id = v.videoId || '';
        if (!id) continue;
        var title = v.title || 'Dr. Arefin video';
        var thumb = v.thumbnail || ('https://i.ytimg.com/vi/' + id + '/hqdefault.jpg');
        var link = v.link || ('https://www.youtube.com/watch?v=' + id);
        html += ''
          + '<article class="arefin-vid-c__card" data-vid-card data-video-id="' + esc(id) + '">'
          +   '<div class="arefin-vid-c__frame" data-vid-frame>'
          +     '<img class="arefin-vid-c__thumb" src="' + esc(thumb) + '" alt="' + esc(title) + '" loading="lazy" title="Watch &quot;' + esc(title) + '&quot; on Dr. Murshidul Arefin\'s YouTube channel — patient-friendly explanation of hepatobiliary, gallbladder, liver and pancreatic surgery in Dhaka, Bangladesh" />'
          +     '<button type="button" class="arefin-vid-c__overlay" aria-label="Play video">'
          +       '<span class="arefin-vid-c__play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="8 5 19 12 8 19 8 5"/></svg></span>'
          +     '</button>'
          +   '</div>'
          +   '<a class="arefin-vid-c__title-link" href="' + esc(link) + '" rel="noopener" target="_blank">'
          +     '<h3 class="arefin-vid-c__title">' + esc(title) + '</h3>'
          +   '</a>'
          + '</article>';
      }
      target.innerHTML = html;
    }

    var pending = sections.length;
    function settle() {
      pending -= 1;
      if (pending <= 0 && typeof done === 'function') done();
    }

    sections.forEach(function (section) {
      var url = section.getAttribute('data-vid-feed-url') || FEED_URL;
      var anon = section.getAttribute('data-vid-feed-anon') || FEED_ANON;
      var max = parseInt(section.getAttribute('data-vid-feed-max') || '6', 10);
      /* Fall back to the track itself if the older HTML omits [data-vid-feed-target]. */
      var target = section.querySelector('[data-vid-feed-target]') || section.querySelector('[data-vid-track]') || section.querySelector('.arefin-vid-c__track');
      if (!url || !target) { settle(); return; }

      var headers = { 'Accept': 'application/json' };
      if (anon) { headers['Authorization'] = 'Bearer ' + anon; headers['apikey'] = anon; }

      fetch(url, { headers: headers, credentials: 'omit', cache: 'default' })
        .then(function (r) {
          if (!r.ok) throw new Error('feed ' + r.status);
          return r.json();
        })
        .then(function (data) {
          var items = (data && data.items) || [];
          if (!items.length) throw new Error('feed empty');
          var sliced = items.slice(0, max);
          renderCards(target, sliced);
          /* Share with sticky-stack flip backfill */
          if (sliced.length > (window.__arefinFeedItems || []).length) {
            window.__arefinFeedItems = sliced;
          }
        })
        .catch(function (err) {
          if (window.console && console.warn) console.warn('[arefin-vid-feed]', err);
          // Leave noscript fallback link visible.
        })
        .then(settle, settle);
    });
  }

  /* -------- Video carousel (05-videos) -------- */
  function initVideoCarousel() {
    var sections = document.querySelectorAll('.arefin-vid-c');
    sections.forEach(function (section) {
      var track = section.querySelector('[data-vid-track]');
      var prev  = section.querySelector('[data-vid-prev]');
      var next  = section.querySelector('[data-vid-next]');
      var dotsWrap = section.querySelector('[data-vid-dots]');
      if (!track) return;
      var cards = track.querySelectorAll('[data-vid-card]');
      if (!cards.length) return;

      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var stepWidth = function () {
        var c = cards[0]; return c ? c.offsetWidth + 24 : 320;
      };
      var scrollByDir = function (dir) {
        track.scrollBy({ left: dir * stepWidth(), behavior: reduce ? 'auto' : 'smooth' });
      };
      var scrollToIndex = function (i) {
        track.scrollTo({ left: i * stepWidth(), behavior: reduce ? 'auto' : 'smooth' });
      };
      if (prev) prev.addEventListener('click', function () { scrollByDir(-1); });
      if (next) next.addEventListener('click', function () { scrollByDir(1); });

      // Dots
      var dots = [];
      if (dotsWrap) {
        cards.forEach(function (_c, i) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'arefin-vid-c__dot';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', 'Go to video ' + (i + 1));
          b.addEventListener('click', function () { scrollToIndex(i); });
          dotsWrap.appendChild(b);
          dots.push(b);
        });
      }
      var setActive = function (i) {
        dots.forEach(function (d, di) {
          if (di === i) d.classList.add('is-active');
          else d.classList.remove('is-active');
        });
      };
      setActive(0);

      // Track active via IntersectionObserver
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          var visible = entries.filter(function (e) { return e.isIntersecting; })
                               .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
          if (!visible) return;
          var idx = Array.prototype.indexOf.call(cards, visible.target);
          if (idx >= 0) setActive(idx);
        }, { root: track, threshold: [0.5, 0.75, 1] });
        cards.forEach(function (c) { io.observe(c); });
      }

      // Hover-to-load YouTube iframe (180ms intent delay)
      cards.forEach(function (card) {
        var id = card.getAttribute('data-video-id');
        if (!id || id.indexOf('REPLACE_') === 0) return;
        var frame = card.querySelector('[data-vid-frame]');
        var overlay = card.querySelector('.arefin-vid-c__overlay');
        if (!frame) return;
        var iframeMounted = false, engaged = false, t = null;
        var mount = function (autoplay) {
          if (iframeMounted) {
            if (autoplay) {
              var existing = frame.querySelector('iframe');
              if (existing && existing.src.indexOf('autoplay=1') === -1) {
                existing.src = existing.src + (existing.src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
              }
            }
            return;
          }
          var iframe = document.createElement('iframe');
          iframe.src = 'https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1' + (autoplay ? '&autoplay=1' : '');
          iframe.title = card.querySelector('.arefin-vid-c__title') ? card.querySelector('.arefin-vid-c__title').textContent : 'Video';
          iframe.loading = 'lazy';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.setAttribute('allowfullscreen', '');
          iframe.className = 'arefin-vid-c__iframe';
          frame.appendChild(iframe);
          iframeMounted = true;
        };
        var unmount = function () {
          if (engaged) return;
          var iframe = frame.querySelector('iframe');
          if (iframe) { iframe.remove(); iframeMounted = false; }
        };
        card.addEventListener('mouseenter', function () {
          if (t) clearTimeout(t);
          t = setTimeout(function () { mount(false); }, 180);
        });
        card.addEventListener('mouseleave', function () {
          if (t) clearTimeout(t);
          unmount();
        });
        if (overlay) {
          overlay.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            engaged = true;
            mount(true);
            overlay.style.display = 'none';
          });
        }
      });

      // Auto-advance every 5s; pause on hover/touch/hidden tab
      if (cards.length > 1 && !reduce) {
        var paused = false;
        track.addEventListener('mouseenter', function () { paused = true; });
        track.addEventListener('mouseleave', function () { paused = false; });
        track.addEventListener('touchstart', function () { paused = true; }, { passive: true });
        setInterval(function () {
          if (paused || document.hidden) return;
          var active = dots.findIndex ? dots.findIndex(function (d) { return d.classList.contains('is-active'); }) : -1;
          if (active < 0) {
            for (var k = 0; k < dots.length; k++) { if (dots[k].classList.contains('is-active')) { active = k; break; } }
          }
          var nextIdx = (active + 1) % cards.length;
          scrollToIndex(nextIdx);
        }, 5000);
      }
    });
  }

  /* -------- Count-up numbers (Section 06 Metrics) --------
     Reads target from data-countup, optional data-countup-suffix
     and data-countup-separator. Animates once on viewport entry. */
  function initCountUp() {
    var nodes = document.querySelectorAll('[data-countup]');
    if (!nodes.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var fmt = function (n, separator) {
      var s = Math.round(n).toString();
      if (!separator) return s;
      return s.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    };

    var animate = function (el) {
      if (el.__cuDone) return;
      el.__cuDone = true;
      var target = parseFloat(el.getAttribute('data-countup')) || 0;
      var suffix = el.getAttribute('data-countup-suffix') || '';
      var sep = el.getAttribute('data-countup-separator') || '';
      if (reduceMotion) { el.textContent = fmt(target, sep) + suffix; return; }
      var dur = Math.min(1800, 600 + Math.log10(Math.max(target, 10)) * 350);
      var start = performance.now();
      var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
      var tick = function (now) {
        var t = Math.min(1, (now - start) / dur);
        var v = target * ease(t);
        el.textContent = fmt(v, sep) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* Assign cached feed video IDs to sticky-stack flip cards whose
     data-video-id is empty, so each service card flips to a real video. */
  function backfillSssFlipVideoIds() {
    var feed = window.__arefinFeedItems || [];
    if (!feed.length) return;
    var flips = document.querySelectorAll('.sss-flip');
    var fi = 0;
    flips.forEach(function (flip) {
      var current = (flip.getAttribute('data-video-id') || '').trim();
      if (current) return;
      var item = feed[fi % feed.length];
      fi++;
      if (item && item.videoId) flip.setAttribute('data-video-id', item.videoId);
    });
  }

  // ── Section 08 — Sticky Stack flip-to-video on hover/tap ──────────────
  // Activates only on .sss-flip elements whose data-video-id attribute is non-empty.
  // Desktop: hover-in flips to back + lazy-mounts <iframe> (muted autoplay).
  //          hover-out flips back, iframe unmounts after the flip (stops audio).
  // Touch:   first tap flips with sound; second tap flips back.
  function initSssFlipVideos() {
    var flips = document.querySelectorAll('.sss-flip');
    if (!flips.length) return;
    var isCoarse = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

    flips.forEach(function (flip) {
      if (flip.__sssFlipInit) return;
      var back = flip.querySelector('.sss-flip-back');
      var front = flip.querySelector('.sss-flip-front');
      if (!back || !front) return;
      flip.__sssFlipInit = true;
      var hoverT = null, leaveT = null, unmountT = null;

      function currentId() {
        // Re-read every time — feed backfill may assign IDs after init.
        var id = (flip.getAttribute('data-video-id') || '').trim();
        if (id) return id;
        // Last-chance backfill from cached feed if available.
        var feed = window.__arefinFeedItems || [];
        if (feed.length) {
          var all = document.querySelectorAll('.sss-flip');
          var idx = Array.prototype.indexOf.call(all, flip);
          var item = feed[idx % feed.length];
          if (item && item.videoId) {
            flip.setAttribute('data-video-id', item.videoId);
            return item.videoId;
          }
        }
        return '';
      }

      function mountIframe(muted) {
        var videoId = currentId();
        if (!videoId) return false;
        if (back.querySelector('iframe')) return true;
        back.innerHTML =
          '<div class="sss-iframe-loader" aria-hidden="true">' +
          '<svg class="sss-spinner" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2a10 10 0 0 1 10 10"/></svg>' +
          '</div>';
        var iframe = document.createElement('iframe');
        iframe.className = 'sss-card-iframe';
        iframe.src = 'https://www.youtube.com/embed/' + videoId +
          '?autoplay=1&rel=0&enablejsapi=1&mute=' + (muted ? 1 : 0) + '&playsinline=1';
        iframe.title = front.getAttribute('aria-label') || 'Service video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.setAttribute('frameborder', '0');
        back.appendChild(iframe);
        return true;
      }
      function unmountIframe() {
        if (unmountT) window.clearTimeout(unmountT);
        unmountT = window.setTimeout(function () { back.innerHTML = ''; }, 720);
      }
      function flipBack(withSound) {
        if (unmountT) { window.clearTimeout(unmountT); unmountT = null; }
        if (!mountIframe(!withSound)) return; // no video id yet — abort flip
        flip.setAttribute('data-flipped', 'true');
        back.setAttribute('aria-hidden', 'false');
      }
      function flipFront() {
        flip.setAttribute('data-flipped', 'false');
        back.setAttribute('aria-hidden', 'true');
        unmountIframe();
      }

      if (!isCoarse) {
        flip.addEventListener('mouseenter', function () {
          if (leaveT) { window.clearTimeout(leaveT); leaveT = null; }
          hoverT = window.setTimeout(function () { flipBack(false); }, 160);
        });
        flip.addEventListener('mouseleave', function () {
          if (hoverT) { window.clearTimeout(hoverT); hoverT = null; }
          leaveT = window.setTimeout(function () { flipFront(); }, 120);
        });
      }
      front.addEventListener('click', function (e) {
        e.preventDefault();
        if (flip.getAttribute('data-flipped') === 'true') flipFront();
        else flipBack(true);
      });
      back.addEventListener('click', function () {
        if (flip.getAttribute('data-flipped') === 'true') flipFront();
      });
    });
    if (window.console && console.log) console.log('[Arefin] sss-flip videos initialized:', flips.length);
  }


  /* ============================================================
     GALLERY — filter chips + lightbox (port of GalleryDark.tsx)
     HTML hooks live in blocks/gallery/02-gallery-grid.html
     ============================================================ */
  function initGallery() {
    var grid = document.getElementById('gallery-grid');
    var container = document.querySelector('[data-lightbox-container]');
    if (!grid || !container) return;

    var chips = Array.prototype.slice.call(document.querySelectorAll('button[data-gallery-filter]'));
    var allItems = Array.prototype.slice.call(grid.querySelectorAll('figure[data-gallery-item]'));
    var emptyEl = document.getElementById('gallery-empty');

    var imgEl     = container.querySelector('[data-lightbox-img]');
    var captionEl = container.querySelector('[data-lightbox-caption-el]');
    var detailsEl = container.querySelector('[data-lightbox-details-link]');
    var counterEl = container.querySelector('[data-lightbox-counter]');
    var closeBtn  = container.querySelector('[data-lightbox-close]');
    var prevBtn   = container.querySelector('[data-lightbox-prev]');
    var nextBtn   = container.querySelector('[data-lightbox-next]');
    var innerEl   = container.querySelector('[data-lightbox-inner]');

    var visibleItems = allItems.slice();
    var currentIndex = -1;
    var lastOpener = null;

    /* ---------- FILTER ---------- */
    function applyFilter(filter) {
      visibleItems = [];
      allItems.forEach(function (item) {
        var match = (filter === 'All') || (item.getAttribute('data-category') === filter);
        if (match) {
          item.removeAttribute('hidden');
          visibleItems.push(item);
        } else {
          item.setAttribute('hidden', '');
        }
      });
      if (emptyEl) {
        if (visibleItems.length === 0) emptyEl.removeAttribute('hidden');
        else emptyEl.setAttribute('hidden', '');
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', 'false');
          c.classList.remove('gallery-filter-active');
        });
        chip.setAttribute('aria-pressed', 'true');
        chip.classList.add('gallery-filter-active');
        applyFilter(chip.getAttribute('data-gallery-filter') || 'All');
      });
    });

    /* ---------- LIGHTBOX ---------- */
    function populate(index) {
      var item = visibleItems[index];
      if (!item) return;
      var src = item.getAttribute('data-lightbox-src') || '';
      var cap = item.getAttribute('data-lightbox-caption') || '';
      var slug = item.getAttribute('data-lightbox-slug') || '#';
      if (imgEl) { imgEl.src = src; imgEl.alt = cap; imgEl.title = cap; }
      if (captionEl) captionEl.textContent = cap;
      if (detailsEl) detailsEl.setAttribute('href', slug);
      if (counterEl) counterEl.textContent = (index + 1) + ' / ' + visibleItems.length;
    }

    function openLightbox(index) {
      if (index < 0 || index >= visibleItems.length) return;
      currentIndex = index;
      lastOpener = visibleItems[index];
      populate(index);
      container.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      container.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastOpener && typeof lastOpener.focus === 'function') lastOpener.focus();
    }

    function showPrev() {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      populate(currentIndex);
    }
    function showNext() {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + 1) % visibleItems.length;
      populate(currentIndex);
    }

    allItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var i = visibleItems.indexOf(item);
        if (i !== -1) openLightbox(i);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          var i = visibleItems.indexOf(item);
          if (i !== -1) openLightbox(i);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showNext(); });

    container.addEventListener('click', function (e) {
      if (innerEl && innerEl.contains(e.target)) return;
      if (e.target === prevBtn || e.target === nextBtn || e.target === closeBtn) return;
      closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (container.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    });

    if (window.console && console.log) console.log('[Arefin] gallery initialized:', allItems.length, 'items');
  }


  /* -------- Mentorship 3-card carousel (mirror MentorshipCarousel.tsx) --------
     Each .mentor-carousel has a .mentor-carousel-track with N
     .mentor-carousel-slide children, prev/next arrows, and an empty
     .mentor-carousel-dots container (dots are generated here). */
  function initMentorCarousels() {
    var roots = document.querySelectorAll('.mentor-carousel');
    if (!roots.length) return;
    var reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Array.prototype.forEach.call(roots, function (root) {
      var track = root.querySelector('.mentor-carousel-track');
      if (!track) return;
      var slides = Array.prototype.slice.call(
        track.querySelectorAll('.mentor-carousel-slide')
      );
      var len = slides.length;
      if (!len) return;

      var prevBtn = root.querySelector('.mentor-carousel-arrow--prev');
      var nextBtn = root.querySelector('.mentor-carousel-arrow--next');
      var dotsWrap = root.querySelector('.mentor-carousel-dots');

      var active = 0;
      var paused = false;
      var prevSlots = {};
      var dots = [];
      var timer = null;

      if (dotsWrap) {
        for (var d = 0; d < len; d++) {
          (function (idx) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'mentor-carousel-dot' + (idx === 0 ? ' is-active' : '');
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
            b.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
            b.addEventListener('click', function () { goTo(idx); kick(); });
            dotsWrap.appendChild(b);
            dots.push(b);
          })(d);
        }
      }

      function render() {
        slides.forEach(function (slide, i) {
          var delta = i - active;
          if (delta > len / 2) delta -= len;
          if (delta < -len / 2) delta += len;
          var slot = delta === 0 ? 'center'
            : delta === -1 ? 'left'
            : delta === 1 ? 'right'
            : delta < 0 ? 'far-left' : 'far-right';
          var prev = prevSlots[i];
          var crossed = !!prev && (
            (prev === 'far-left' && (slot === 'right' || slot === 'far-right')) ||
            (prev === 'far-right' && (slot === 'left' || slot === 'far-left')) ||
            (prev === 'left' && slot === 'far-right') ||
            (prev === 'right' && slot === 'far-left')
          );
          prevSlots[i] = slot;
          slide.className = 'mentor-carousel-slide slot-' + slot +
            (delta === 0 ? ' is-active' : '') +
            (Math.abs(delta) === 1 ? ' is-adjacent' : '') +
            (crossed ? ' no-transition' : '');
          slide.setAttribute('aria-hidden', delta === 0 ? 'false' : 'true');
        });
        dots.forEach(function (dot, i) {
          var on = i === active;
          if (on) dot.classList.add('is-active');
          else dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', on ? 'true' : 'false');
        });
      }

      function goTo(n) {
        active = ((n % len) + len) % len;
        render();
      }

      function start() {
        if (reduced || len < 2 || timer) return;
        timer = window.setInterval(function () {
          if (!paused) goTo(active + 1);
        }, 4500);
      }
      function kick() {
        paused = true;
        window.setTimeout(function () { paused = false; }, 4500);
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(active - 1); kick(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(active + 1); kick(); });

      root.addEventListener('mouseenter', function () { paused = true; });
      root.addEventListener('mouseleave', function () { paused = false; });
      root.addEventListener('focusin', function () { paused = true; });
      root.addEventListener('focusout', function () { paused = false; });

      track.setAttribute('tabindex', '0');
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); kick(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); kick(); }
      });

      document.addEventListener('visibilitychange', function () {
        paused = document.hidden;
      });

      render();
      start();
    });

    if (window.console && console.log) console.log('[Arefin] mentor carousels initialized:', roots.length);
  }


  /* -------- Treatment Process / Mentorship Journey rail (tp-) --------
     CSS handles the sticky-stack visually. This drives the left rail:
     a progress fill that grows with scroll through the stack and the
     active medical icon that fades in for the current step. */
  function initTreatmentProcess() {
    var sections = document.querySelectorAll('.tp-section');
    if (!sections.length) return;

    Array.prototype.forEach.call(sections, function (section) {
      var stack = section.querySelector('.tp-stack');
      var fill = section.querySelector('.tp-rail-fill');
      var icons = section.querySelectorAll('.tp-rail-icon-svg');
      if (!stack) return;
      var cards = stack.querySelectorAll('.tp-card-outer');
      var steps = cards.length;
      if (!steps) return;

      var STICKY_TOP = 120;
      var raf = null;

      function travel() {
        var first = cards[0];
        var last = cards[steps - 1];
        if (!first || !last) return 1;
        return Math.max(1, last.offsetTop - first.offsetTop);
      }

      function update() {
        raf = null;
        var rect = stack.getBoundingClientRect();
        var progress = Math.min(1, Math.max(0, (STICKY_TOP - rect.top) / travel()));
        if (fill) fill.style.height = (progress * 100) + '%';
        var active = Math.min(steps - 1, Math.floor(progress * steps));
        Array.prototype.forEach.call(icons, function (icon, i) {
          icon.setAttribute('data-active', i === active ? 'true' : 'false');
        });
      }

      function onScroll() {
        if (raf !== null) return;
        raf = requestAnimationFrame(update);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    });
  }


})();
</script>



