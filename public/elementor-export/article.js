<script>
/* =============================================================
   Dr. Arefin — Elementor Export :: article.js
   STANDALONE interactivity for the SINGLE BLOG POST page.
   ------------------------------------------------------------
   Works on the REAL WordPress/Elementor single-post DOM
   (.entry-content, .hfe-post-card). Progressive enhancement:
   a body gate class is added FIRST so content is never hidden
   if JS fails. Vanilla JS only, idempotent.

   Deploy as a WPCode "HTML Snippet", condition "Singular > Posts",
   insertion = Footer.
   ============================================================= */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") { fn(); }
    else { document.addEventListener("DOMContentLoaded", fn); }
  }

  function initReveal() {
    if (!document.body.classList.contains("single-post")) return;

    var targets = [].slice.call(document.querySelectorAll(
      ".entry-content > p, .entry-content > h2, .entry-content > h3, " +
      ".entry-content > ul, .entry-content > ol, .entry-content > figure, " +
      ".entry-content > blockquote, .entry-content > img, .hfe-post-card"
    ));
    if (!targets.length) return;

    /* Gate enables the hidden initial state ONLY when JS runs */
    document.body.classList.add("arefin-reveal-on");
    targets.forEach(function (el) { el.classList.add("arefin-reveal-item"); });

    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });

    targets.forEach(function (el) { io.observe(el); });
  }

  ready(initReveal);
})();
</script>
