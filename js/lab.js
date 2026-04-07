/* ═══════════════════════════════════════════════════════════
   HYPERMIND — Lab Page JS
   Scroll-reveal for .lab-reveal and .lab-line-reveal elements.
   Uses IntersectionObserver with will-change applied just
   before transition fires (avoids premature GPU layer promotion).
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.willChange = 'transform, opacity';
      el.classList.add('on');
      el.addEventListener('transitionend', () => {
        el.style.willChange = 'auto';
      }, { once: true });
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.lab-reveal, .lab-line-reveal')
    .forEach(el => observer.observe(el));

})();
