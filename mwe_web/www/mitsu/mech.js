/**
 * MechWorld Eco — mech.js
 * Premium homepage interactivity
 * Pure vanilla ES6 — no dependencies
 */

(function () {
  'use strict';

  /* ==============================================================
     UTILITY
     ============================================================== */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ==============================================================
     PREFERS-REDUCED-MOTION
     ============================================================== */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyReducedMotion() {
    if (!prefersReducedMotion) return;
    // Immediately reveal all animated elements
    qsa('.mw-anim').forEach(function (el) {
      el.classList.add('mw-visible');
      el.style.transitionDuration = '0.001ms';
    });
    // Stop spinning animation on pump icon
    var pumpIcon = qs('.mw-node-pump .mw-flow-node-icon');
    if (pumpIcon) pumpIcon.style.animationDuration = '0.001ms';
    // Stop ticker animation
    var tickerInner = qs('#mw-ticker-inner');
    if (tickerInner) tickerInner.style.animationDuration = '0.001ms';
  }

  applyReducedMotion();
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
    prefersReducedMotion = e.matches;
    if (e.matches) applyReducedMotion();
  });

  /* ==============================================================
     PARTICLE CANVAS — hero background
     ============================================================== */
  (function initParticles() {
    if (prefersReducedMotion) return;

    var canvas = qs('#mw-particles-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var particles = [];
    var NUM_PARTICLES = 55;
    var raf;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        alpha: Math.random() * 0.4 + 0.1
      };
    }

    for (var i = 0; i < NUM_PARTICLES; i++) {
      particles.push(createParticle());
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.y > canvas.height + 4) p.y = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(127,229,166,' + p.alpha + ')';
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = 'rgba(127,229,166,' + (0.06 * (1 - dist / 90)) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(drawParticles);
    }

    resize();
    drawParticles();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    }, { passive: true });

    // Pause when tab is not visible (performance)
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        drawParticles();
      }
    });
  })();

  /* ==============================================================
     HERO ENTRANCE ANIMATION
     ============================================================== */
  (function heroEntrance() {
    var content = qs('#mw-hero-content');
    var visual  = qs('#mw-hero-visual');
    if (!content || !visual) return;

    if (prefersReducedMotion) {
      content.style.opacity = '1';
      visual.style.opacity  = '1';
      return;
    }

    content.style.cssText = 'opacity:0;transform:translateY(22px);transition:opacity 0.75s ease 0.2s,transform 0.75s ease 0.2s;';
    visual.style.cssText  = 'opacity:0;transform:translateY(22px);transition:opacity 0.75s ease 0.45s,transform 0.75s ease 0.45s;';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        content.style.opacity   = '1';
        content.style.transform = 'translateY(0)';
        visual.style.opacity    = '1';
        visual.style.transform  = 'translateY(0)';
      });
    });
  })();

  /* ==============================================================
     GAUGE BAR — hero efficiency animation
     ============================================================== */
  (function initGauge() {
    var fill  = qs('#mw-gauge-fill');
    var valueEl = qs('#mw-gauge-value');
    if (!fill || !valueEl) return;

    if (prefersReducedMotion) {
      fill.classList.add('mw-animated');
      fill.style.transition = 'none';
      valueEl.textContent = '70%';
      return;
    }

    setTimeout(function () {
      fill.classList.add('mw-animated');
      // Animate the percentage text from 0 to 70
      var start = null;
      var duration = 2000;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = progress * (2 - progress); // easeOutQuad
        var val = Math.floor(eased * 70);
        valueEl.textContent = val + '%';
        if (progress < 1) requestAnimationFrame(step);
        else valueEl.textContent = '70%';
      }
      requestAnimationFrame(step);
    }, 900);
  })();

  /* ==============================================================
     STICKY HEADER — scrolled class
     ============================================================== */
  var header = qs('#mw-header');

  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('mw-scrolled', window.scrollY > 48);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==============================================================
     MOBILE NAV — hamburger toggle
     ============================================================== */
  var hamburger = qs('#mw-hamburger');
  var mobileNav = qs('#mw-mobile-nav');
  var mwOpen = false;

  function mwOpenMobileNav() {
    if (!hamburger || !mobileNav) return;
    mwOpen = true;
    hamburger.classList.add('mw-open');
    mobileNav.classList.add('mw-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function mwCloseMobileNav() {
    if (!hamburger || !mobileNav) return;
    mwOpen = false;
    hamburger.classList.remove('mw-open');
    mobileNav.classList.remove('mw-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  window.mwCloseMobileNav = mwCloseMobileNav;

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mwOpen ? mwCloseMobileNav() : mwOpenMobileNav();
    });
  }

  // Close mobile nav on outside click
  document.addEventListener('click', function (e) {
    if (mwOpen && header && !header.contains(e.target)) {
      mwCloseMobileNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mwOpen) mwCloseMobileNav();
  });

  /* ==============================================================
     SMOOTH SCROLL — internal anchor links
     ============================================================== */
  qsa('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#' || id === '#mw-footer') return; // let footer jump naturally
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ==============================================================
     ACTIVE NAV LINK — highlight on scroll
     ============================================================== */
  var navLinks = qsa('#mw-desktop-nav .mw-nav-link');
  var sections = qsa('section[id], div[id]').filter(function (el) {
    return el.id && el.id.startsWith('mw-');
  });

  function updateActiveNav() {
    if (!header) return;
    var headerH  = header.offsetHeight;
    var scrollY  = window.pageYOffset + headerH + 100;
    var currentId = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        currentId = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('mw-active');
      } else {
        link.classList.remove('mw-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ==============================================================
     INTERSECTION OBSERVER — scroll fade-in animations
     ============================================================== */
  var animEls = qsa('.mw-anim');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    // Apply transition-delay from data-delay attribute
    animEls.forEach(function (el) {
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      if (delay > 0) {
        el.style.transitionDelay = delay + 'ms';
      }
    });

    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('mw-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animEls.forEach(function (el) { fadeObserver.observe(el); });

  } else {
    // Fallback — instant reveal
    animEls.forEach(function (el) { el.classList.add('mw-visible'); });
  }

  /* ==============================================================
     ANIMATED COUNTERS — ROI section
     ============================================================== */
  var counterEls = qsa('.mw-counter');
  var countersDone = false;

  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var start    = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(easeOutQuad(progress) * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function runCounters() {
    if (countersDone) return;
    countersDone = true;
    counterEls.forEach(function (el) {
      if (prefersReducedMotion) {
        el.textContent = el.getAttribute('data-target');
      } else {
        animateCounter(el);
      }
    });
  }

  if (counterEls.length > 0) {
    var roiSection = qs('#mw-roi');
    if ('IntersectionObserver' in window && roiSection) {
      var counterObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          runCounters();
          counterObs.disconnect();
        }
      }, { threshold: 0.25 });
      counterObs.observe(roiSection);
    } else {
      runCounters();
    }
  }

  /* ==============================================================
     MODAL — enquiry form
     ============================================================== */
  var modalOverlay = qs('#mw-modal');
  var modalEl      = modalOverlay ? qs('.mw-modal', modalOverlay) : null;
  var enquiryForm  = qs('#mw-enquiry-form');
  var formSuccess  = qs('#mw-form-success');
  var segmentSel   = qs('#mw-fsegment');
  var prevFocus    = null;

  function mwOpenModal() {
    if (!modalOverlay) return;
    prevFocus = document.activeElement;
    modalOverlay.classList.add('mw-open');
    document.body.style.overflow = 'hidden';
    // Focus first input after animation
    setTimeout(function () {
      var firstInput = qs('input, select, textarea', modalOverlay);
      if (firstInput) firstInput.focus();
    }, 360);
  }

  function mwCloseModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('mw-open');
    document.body.style.overflow = '';
    if (prevFocus) {
      setTimeout(function () { prevFocus.focus(); }, 50);
    }
  }

  function mwOpenModalWithSegment(segVal) {
    mwOpenModal();
    if (segmentSel) {
      setTimeout(function () { segmentSel.value = segVal; }, 60);
    }
  }

  // Expose globally for inline onclick attributes
  window.mwOpenModal            = mwOpenModal;
  window.mwCloseModal           = mwCloseModal;
  window.mwOpenModalWithSegment = mwOpenModalWithSegment;

  // Close on overlay backdrop click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) mwCloseModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('mw-open')) {
      mwCloseModal();
    }
  });

  // Focus trap inside modal
  if (modalOverlay) {
    modalOverlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      if (!modalOverlay.classList.contains('mw-open')) return;

      var focusable = qsa(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        modalOverlay
      ).filter(function (el) { return el.offsetParent !== null; });

      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ==============================================================
     FORM VALIDATION & SUBMISSION
     ============================================================== */
  function showError(input, message) {
    var wrapper = input.closest('.mw-form-group') || input.parentElement;
    clearError(input);
    input.classList.add('mw-error');
    if (input.parentElement.classList.contains('mw-select-wrap')) {
      input.parentElement.parentElement.classList.add('mw-error-group');
    }
    var errEl = document.createElement('p');
    errEl.className = 'mw-field-error';
    errEl.setAttribute('role', 'alert');
    errEl.textContent = message;
    wrapper.appendChild(errEl);
  }

  function clearError(input) {
    var wrapper = input.closest('.mw-form-group') || input.parentElement;
    input.classList.remove('mw-error');
    var errEl = wrapper.querySelector('.mw-field-error');
    if (errEl) errEl.remove();
  }

  function validateForm(form) {
    var valid = true;

    var nameInput  = qs('#mw-fname', form);
    var phoneInput = qs('#mw-fphone', form);
    var segInput   = qs('#mw-fsegment', form);

    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name.');
      valid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters.');
      valid = false;
    } else {
      clearError(nameInput);
    }

    // Phone validation — Indian format
    var rawPhone = phoneInput.value.trim().replace(/[\s\-().]/g, '');
    if (!rawPhone) {
      showError(phoneInput, 'Please enter your phone number.');
      valid = false;
    } else if (!/^(\+91)?[6-9]\d{9}$/.test(rawPhone) && !/^\+?[\d]{7,15}$/.test(rawPhone)) {
      showError(phoneInput, 'Please enter a valid Indian phone number.');
      valid = false;
    } else {
      clearError(phoneInput);
    }

    // Segment validation
    if (!segInput.value) {
      showError(segInput, 'Please select your industry segment.');
      valid = false;
    } else {
      clearError(segInput);
    }

    return valid;
  }

  function mwHandleSubmit(event) {
    event.preventDefault();
    var form = event.target;
    if (!validateForm(form)) {
      // Focus first error field
      var firstError = qs('.mw-error', form);
      if (firstError) firstError.focus();
      return;
    }

    var submitBtn = form.querySelector('.mw-form-submit');
    var origHTML  = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...';
    submitBtn.disabled  = true;
    submitBtn.style.opacity = '0.85';

    // Add spin animation to loading icon
    var spinner = submitBtn.querySelector('svg');
    if (spinner && !prefersReducedMotion) {
      spinner.style.animation = 'mwFormSpinner 1s linear infinite';
    }

    // Inject spinner keyframes if not already present
    if (!document.getElementById('mw-spinner-style')) {
      var styleEl = document.createElement('style');
      styleEl.id  = 'mw-spinner-style';
      styleEl.textContent = '@keyframes mwFormSpinner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(styleEl);
    }

    // Simulate submission (replace with real API endpoint via fetch())
    setTimeout(function () {
      // Show success
      form.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('mw-show');

      // Reset form state (quietly)
      form.reset();
      submitBtn.innerHTML = origHTML;
      submitBtn.disabled  = false;
      submitBtn.style.opacity = '';

      // Auto-close after 5 seconds
      setTimeout(function () {
        mwCloseModal();
        // Restore form after close animation
        setTimeout(function () {
          form.style.display = '';
          if (formSuccess) formSuccess.classList.remove('mw-show');
        }, 400);
      }, 5000);

    }, 1400);
  }

  window.mwHandleSubmit = mwHandleSubmit;

  // Real-time inline validation on blur/input
  if (enquiryForm) {
    qsa('input, select, textarea', enquiryForm).forEach(function (field) {
      field.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
          showError(this, 'This field is required.');
        }
      });
      field.addEventListener('input', function () {
        clearError(this);
      });
    });
  }

  /* ==============================================================
     APP CARDS — keyboard accessibility (Enter to trigger CTA)
     ============================================================== */
  qsa('.mw-app-card').forEach(function (card) {
    if (!card.getAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var btn = card.querySelector('.mw-btn');
        if (btn) btn.click();
      }
    });
  });

  /* ==============================================================
     COMPARISON TABLE — hover row highlight
     ============================================================== */
  (function initCompTable() {
    var table = qs('.mw-comparison-grid');
    if (!table) return;

    var featureCells = qsa('.mw-comp-feature-col.mw-comp-cell', table);
    var totalRows = featureCells.length;

    featureCells.forEach(function (cell, index) {
      var rowIndex = index + 1; // 1-based after header row

      function highlightRow(on) {
        // The grid has 3 cols per row. Feature cells are at positions 3n+1 (1-indexed)
        // Each data row spans 3 cells in sequence
        var allCells = qsa('.mw-comp-cell', table);
        var base = index * 3; // 0-indexed start of this row's cells
        for (var i = 0; i < 3; i++) {
          var c = allCells[base + i];
          if (c) c.style.background = on ? (i === 0 ? 'rgba(26,60,94,0.06)' : i === 1 ? 'rgba(231,76,60,0.09)' : 'rgba(39,174,96,0.09)') : '';
        }
      }

      cell.addEventListener('mouseenter', function () { highlightRow(true); });
      cell.addEventListener('mouseleave', function () { highlightRow(false); });
    });
  })();

  /* ==============================================================
     TICKER ANIMATION — ensure infinite scroll works correctly
     ============================================================== */
  (function initTicker() {
    var inner = qs('#mw-ticker-inner');
    if (!inner || prefersReducedMotion) return;
    // The ticker items are duplicated in HTML already for seamless loop
    // No JS needed — pure CSS animation handles it
    // Pause on hover is handled via CSS
  })();

  /* ==============================================================
     WHY CARDS — staggered reveal enhancement
     ============================================================== */
  (function initWhyCards() {
    var whyItems = qsa('.mw-why-item');
    whyItems.forEach(function (item, i) {
      if (!item.hasAttribute('data-delay')) {
        item.setAttribute('data-delay', String(i * 80));
      }
    });
  })();

  /* ==============================================================
     PAIN CARDS — top border color by index
     ============================================================== */
  (function paintPainCards() {
    var colors = ['#e67e22', '#e74c3c', '#f39c12', '#27ae60'];
    qsa('.mw-pain-card').forEach(function (card, i) {
      card.style.setProperty('--pain-accent', colors[i % colors.length]);
    });
    // Inject style for hover top border
    if (!document.getElementById('mw-pain-style')) {
      var s = document.createElement('style');
      s.id = 'mw-pain-style';
      s.textContent = '.mw-pain-card::before { background: var(--pain-accent); }';
      document.head.appendChild(s);
    }
  })();

  /* ==============================================================
     PROCESS STEPS — sequential highlight
     ============================================================== */
  (function initProcessSteps() {
    if (prefersReducedMotion) return;
    var steps = qsa('.mw-process-step');
    if (!steps.length) return;
    var current = 0;

    function highlightStep() {
      steps.forEach(function (step, i) {
        if (i === current) {
          step.style.transform = 'translateX(6px)';
          step.style.background = i === steps.length - 1
            ? 'rgba(39,174,96,0.22)'
            : 'rgba(255,255,255,0.13)';
        } else {
          step.style.transform = '';
          step.style.background = i === steps.length - 1
            ? 'rgba(39,174,96,0.14)'
            : '';
        }
      });
      current = (current + 1) % steps.length;
    }

    var stepInterval = setInterval(highlightStep, 1600);

    // Stop cycling when section is not in viewport
    var solutionSec = qs('#mw-solution');
    if (solutionSec && 'IntersectionObserver' in window) {
      var stepObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          stepInterval = stepInterval || setInterval(highlightStep, 1600);
        } else {
          clearInterval(stepInterval);
          stepInterval = null;
          // Reset styles
          steps.forEach(function (step, i) {
            step.style.transform = '';
            step.style.background = i === steps.length - 1 ? 'rgba(39,174,96,0.14)' : '';
          });
        }
      }, { threshold: 0.3 });
      stepObs.observe(solutionSec);
    }
  })();

  /* ==============================================================
     ROI STATS — hover tilt effect
     ============================================================== */
  (function initRoiTilt() {
    if (prefersReducedMotion) return;
    qsa('.mw-roi-stat').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 16px 48px rgba(26,60,94,0.28), 6px 0 0 0 rgba(39,174,96,0.4)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
      });
    });
  })();

  /* ==============================================================
     PROJECT CARDS — count-up on reveal
     ============================================================== */
  (function initProjectCounts() {
    var countEls = qsa('.mw-project-count');
    var done = false;

    function animateCounts() {
      if (done || prefersReducedMotion) return;
      done = true;
      countEls.forEach(function (el) {
        var text = el.textContent.trim();
        var numMatch = text.match(/\d+/);
        if (!numMatch) return;
        var target = parseInt(numMatch[0], 10);
        var suffix = text.replace(numMatch[0], '');
        var start  = null;
        var dur    = 1400;

        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor(easeOutQuad(p) * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
      });
    }

    var projectSec = qs('#mw-projects');
    if (projectSec && 'IntersectionObserver' in window) {
      var projObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { animateCounts(); projObs.disconnect(); }
      }, { threshold: 0.3 });
      projObs.observe(projectSec);
    }
  })();

  /* ==============================================================
     HEADER NAV SCROLL-BASED TRANSPARENCY
     ============================================================== */
  (function initHeaderScroll() {
    var heroSection = qs('#mw-hero');
    if (!header || !heroSection || !('IntersectionObserver' in window)) return;

    var heroObs = new IntersectionObserver(function (entries) {
      // When hero leaves viewport, header becomes fully opaque
      if (!entries[0].isIntersecting) {
        header.style.background = 'var(--mw-white)';
      } else {
        header.style.background = 'var(--mw-white)';
      }
    }, { threshold: 0 });

    heroObs.observe(heroSection);
  })();

  /* ==============================================================
     PERFORMANCE — lazy-load non-critical styles
     ============================================================== */
  (function lazyLoadFonts() {
    // Fonts loaded via <link> with display=swap in HTML. No extra work needed.
    // Ensure fonts are visible immediately via font-display:swap.
  })();

  /* ==============================================================
     PAGE VISIBILITY — pause animations when hidden
     ============================================================== */
  document.addEventListener('visibilitychange', function () {
    var tickerInner = qs('#mw-ticker-inner');
    if (tickerInner) {
      tickerInner.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
  });

  /* ==============================================================
     BACK TO TOP — on logo click scroll to top
     ============================================================== */
  qsa('.mw-logo').forEach(function (logo) {
    logo.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#mw-hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  /* ==============================================================
     KEBOARD SHORTCUT — Alt+Q opens modal
     ============================================================== */
  document.addEventListener('keydown', function (e) {
    if (e.altKey && e.key === 'q') {
      e.preventDefault();
      mwOpenModal();
    }
  });

  /* ==============================================================
     INIT COMPLETE LOG
     ============================================================== */
  if (typeof console !== 'undefined' && console.log) {
    console.log('%cMechWorld Eco %c| Powered by Advanced Heat Pump Technology',
      'color:#1a3c5e;font-weight:800;font-size:1rem;',
      'color:#27ae60;font-size:0.9rem;'
    );
  }

})();
