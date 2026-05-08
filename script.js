/* FQC 2026 — minimal interactivity */
(() => {
  'use strict';

  const header  = document.querySelector('.site-header');
  const toggle  = document.querySelector('.nav-toggle');
  const nav     = document.getElementById('primary-nav');

  /* Mobile nav */
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* Header scroll state */
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Reveal on scroll — progressive enhancement.
     We only hide elements once JS confirms IntersectionObserver works,
     so SEO / no-JS / pre-paint snapshots show full content. */
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll(
      '.speaker, .register-card, .day, .org-list li, .past-list li, .section-head, .col-head, .col-body'
    );
    reveals.forEach((el) => el.classList.add('reveal'));
    document.documentElement.classList.add('reveal-ready');

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

    reveals.forEach((el) => io.observe(el));

    /* Failsafe: anything still hidden after 1.5s gets revealed.
       Catches edge cases where elements are taller than the viewport
       or the page is restored from bfcache without intersection events. */
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }, 1500);
  }
})();
