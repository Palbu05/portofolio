document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const responseDiv = document.getElementById('formResponse');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseDiv.textContent = 'Thank you for your message! I will get back to you soon.';
        form.reset();
    });
});

// Fade-in animation for sections
const fadeEls = document.querySelectorAll('.fade-in-section');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// Slide-in animation for sections
const slideEls = document.querySelectorAll('.slide-in-section');
const slideObserver = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
slideEls.forEach(el => slideObserver.observe(el));

// Smooth scroll for nav and sidebar links
const navLinks = document.querySelectorAll('.nav-links a');
const sidebarLinks = document.querySelectorAll('.sidebar-index a');
[...navLinks, ...sidebarLinks].forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// --- Nav highlight with IntersectionObserver ---
const navLinksArr = Array.from(document.querySelectorAll('.nav-links a'));
const sectionMap = {};
navLinksArr.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    sectionMap[href.replace('#', '')] = link;
  }
});
const sectionObs = new window.IntersectionObserver((entries) => {
  let mostVisible = null;
  let maxRatio = 0;
  entries.forEach(entry => {
    if (entry.intersectionRatio > maxRatio) {
      maxRatio = entry.intersectionRatio;
      mostVisible = entry.target;
    }
  });
  if (mostVisible && mostVisible.id && sectionMap[mostVisible.id]) {
    navLinksArr.forEach(link => link.classList.remove('active'));
    sectionMap[mostVisible.id].classList.add('active');
  }
}, { threshold: [0.4, 0.6, 1] });
const sections = document.querySelectorAll('.hero-section, .purpose-section, .section');
sections.forEach(sec => sectionObs.observe(sec));

// Always start at the top on page load
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}); 