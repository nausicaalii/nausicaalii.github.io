// ========================================
// TerraShare — Main Scripts
// ========================================

(function () {
  'use strict';

  // --- Nav scroll effect ---
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });

  // --- Waitlist form ---
  const form = document.getElementById('waitlist-form');
  const success = document.getElementById('waitlist-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        form.hidden = true;
        success.hidden = false;
      } else {
        alert('Something went wrong. Please try again.');
      }
    }).catch(function () {
      alert('Something went wrong. Please try again.');
    });
  });

  // --- Scroll-triggered fade-in animations ---
  // Add .fade-in to key elements
  var animTargets = document.querySelectorAll(
    '.step, .visual-card, .community-card, .card, .testimonial, .value, .mission-block, .cta-block'
  );

  animTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animTargets.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
