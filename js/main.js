/* =============================================================================
   AEGIS LONDON - Production JavaScript
   Version: 2.0.0
   ============================================================================= */

// Remove no-js class immediately (before DOMContentLoaded)
document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV SCROLL EFFECT =====
  const nav = document.querySelector('.nav');
  if (nav && !nav.classList.contains('nav--dark')) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU =====
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close on link click
    links.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      if (counter.dataset.animated) return;
      const target = parseFloat(counter.dataset.target);
      const isFloat = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = target * eased;
        counter.textContent = isFloat ? current.toFixed(1) : Math.round(current);
        if (progress < 1) requestAnimationFrame(update);
      }
      counter.dataset.animated = 'true';
      requestAnimationFrame(update);
    });
  }

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Counter observer
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    const counterObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObs.disconnect();
      }
    }, { threshold: 0.3 });
    counterObs.observe(heroCard);
  }

  // ===== SPECIALISM TABS =====
  document.querySelectorAll('.spec-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.spec-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          revealObserver.observe(el);
        });
      }
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== COOKIE CONSENT =====
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner && !localStorage.getItem('aegis-cookies')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1500);

    cookieBanner.querySelector('.cookie-btn--accept')?.addEventListener('click', () => {
      localStorage.setItem('aegis-cookies', 'accepted');
      cookieBanner.classList.remove('visible');
    });
    cookieBanner.querySelector('.cookie-btn--decline')?.addEventListener('click', () => {
      localStorage.setItem('aegis-cookies', 'declined');
      cookieBanner.classList.remove('visible');
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Pre-fill from URL ?subject= parameter (from Enquire Now / Apply Now links)
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    if (subject) {
      const messageField = contactForm.querySelector('#message');
      if (messageField) {
        messageField.value = 'Enquiry regarding: ' + decodeURIComponent(subject.replace(/\+/g, ' '));
      }
      // Auto-select enquiry type if it matches
      const enquiryType = contactForm.querySelector('#enquiryType');
      if (enquiryType) {
        const subjectLower = subject.toLowerCase();
        if (subjectLower.includes('apply')) {
          enquiryType.value = 'careers';
        } else {
          enquiryType.value = 'underwriting';
        }
      }
    }
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg> Message Sent!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== STATS COUNTER ON SCROLL =====
  document.querySelectorAll('.stat-value .counter').forEach(counter => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counter.dataset.animated) {
        const target = parseFloat(counter.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          counter.textContent = isFloat ? (target * eased).toFixed(1) : Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(update);
        }
        counter.dataset.animated = 'true';
        requestAnimationFrame(update);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(counter);
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== NEWS FILTER (for news page) =====
  document.querySelectorAll('.news-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.news-card[data-category]').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== SEARCH FUNCTIONALITY (for underwriters page) =====
  const searchInput = document.getElementById('underwriterSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('.leader-card[data-name]').forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const area = (card.dataset.area || '').toLowerCase();
        card.style.display = (name.includes(query) || area.includes(query)) ? '' : 'none';
      });
    });
  }

  // ===== SITE SEARCH =====
  const searchToggle = document.getElementById('searchToggle');
  const searchModal = document.getElementById('searchModal');
  if (searchToggle && searchModal) {
    const searchInput = searchModal.querySelector('.search-input');
    const searchResults = searchModal.querySelector('.search-results');
    const searchClose = searchModal.querySelector('.search-close');

    // Search index — all pages with their content keywords
    const pages = [
      { title: 'Home', url: 'index.html', keywords: 'home homepage aegis london syndicate 1225 property casualty specialty underwriting mutual digital trading opal news leadership team' },
      { title: 'About AEGIS London', url: 'about.html', keywords: 'about us history ratings financials am best s&p canada toronto mutual strength market expertise syndicate 1225' },
      { title: 'Specialist Underwriting', url: 'underwriting.html', keywords: 'underwriting property casualty specialty cyber marine energy liability professional accident health political violence terrorism cargo' },
      { title: 'Digital Trading', url: 'digital.html', keywords: 'digital trading opal platform lead follow algorithmic mcgill partners technology innovation electronic placement' },
      { title: 'Portfolio Solutions', url: 'portfolio.html', keywords: 'portfolio solutions delegated authority binder coverholder mga binding line slips consortia monitoring' },
      { title: 'Claims', url: 'claims.html', keywords: 'claims process philosophy notify report timeline capabilities fair prompt resolution' },
      { title: 'News & Insights', url: 'news.html', keywords: 'news press releases thought leadership insights articles people promotions results' },
      { title: 'Management Team', url: 'team.html', keywords: 'team management board directors alex powell matthew yeldham marianne harvey katie wade adam oreilly rhic webb charity bare claire parkinson' },
      { title: 'Careers', url: 'careers.html', keywords: 'careers jobs vacancies apply underwriter analyst actuarial benefits culture diversity' },
      { title: 'Contact Us', url: 'contact.html', keywords: 'contact enquiry form phone email london toronto office address telephone' },
      { title: 'Privacy Notice', url: 'privacy.html', keywords: 'privacy notice gdpr data protection personal information cookies' },
      { title: 'Cookies Policy', url: 'cookies.html', keywords: 'cookies policy tracking analytics preferences' },
      { title: 'Terms of Use', url: 'terms.html', keywords: 'terms conditions use website legal' },
      { title: 'Modern Slavery Act', url: 'modern-slavery.html', keywords: 'modern slavery act statement supply chain' },
      { title: 'UK Tax Strategy', url: 'tax-strategy.html', keywords: 'tax strategy uk hmrc compliance' },
      { title: 'Diversity & Inclusion', url: 'diversity.html', keywords: 'diversity inclusion equity belonging policy' },
    ];

    function doSearch(query) {
      if (!query || query.length < 2) {
        searchResults.innerHTML = '<p class="search-hint">Type at least 2 characters to search...</p>';
        return;
      }
      const q = query.toLowerCase();
      const matches = pages.filter(p =>
        p.title.toLowerCase().includes(q) || p.keywords.includes(q)
      );
      if (matches.length === 0) {
        searchResults.innerHTML = '<p class="search-no-results">No results found for "' + query + '"</p>';
      } else {
        searchResults.innerHTML = matches.map(p =>
          `<a href="${p.url}" class="search-result-item">
            <strong>${p.title}</strong>
            <span>${p.url}</span>
          </a>`
        ).join('');
      }
    }

    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('active');
      setTimeout(() => searchInput.focus(), 100);
    });

    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
      }
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    searchInput.addEventListener('input', () => doSearch(searchInput.value));
  }

  // ===== CONFIG LOADER =====
  // Applies settings from config.js across the current page
  if (window.SITE_CONFIG) {
    const C = window.SITE_CONFIG;

    // Apply colour overrides as CSS custom properties
    if (C.colors) {
      const root = document.documentElement;
      if (C.colors.primary)      root.style.setProperty('--clr-orange', C.colors.primary);
      if (C.colors.primaryLight) root.style.setProperty('--clr-orange-light', C.colors.primaryLight);
      if (C.colors.charcoal)     root.style.setProperty('--clr-charcoal', C.colors.charcoal);
      if (C.colors.navy)         root.style.setProperty('--clr-navy', C.colors.navy);
      if (C.colors.primary) {
        const hex = C.colors.primary;
        root.style.setProperty('--clr-orange-glow', hex + '26');
      }
    }

    // Apply logo src to all logo images
    if (C.brand?.logoSrc) {
      document.querySelectorAll('.nav-logo-img').forEach(img => {
        img.src = C.brand.logoSrc;
        img.alt = C.brand.name || 'Logo';
      });
    }

    // Apply copyright text
    if (C.legal?.copyright) {
      const copyrightEl = document.querySelector('.footer-bottom > span');
      if (copyrightEl) copyrightEl.textContent = C.legal.copyright;
    }

    // Apply legal links dynamically
    if (C.legal?.policies) {
      const legalContainer = document.querySelector('.footer-legal');
      if (legalContainer) {
        legalContainer.innerHTML = C.legal.policies.map(p =>
          `<a href="${p.href}">${p.label}</a>`
        ).join('');
      }
    }

    // Apply LinkedIn link
    if (C.brand?.linkedIn) {
      document.querySelectorAll('.footer-social a[aria-label="LinkedIn"]').forEach(a => {
        a.href = C.brand.linkedIn;
      });
    }

    // Feature flags
    if (C.features) {
      if (!C.features.showCookieBanner) {
        document.querySelector('.cookie-banner')?.remove();
      }
      if (!C.features.showBackToTop) {
        document.querySelector('.back-to-top')?.remove();
      }
      if (!C.features.enableAnimations) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      }
      if (!C.features.showNewsTicker) {
        document.querySelector('.ticker')?.remove();
      }
    }

    // Data-config attribute binding: any element with data-config="path.to.value"
    // will have its text content (or href for links) set from config
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.dataset.config;
      const val = key.split('.').reduce((obj, k) => obj?.[k], C);
      if (val != null) {
        if (el.tagName === 'A' && key.includes('phone')) {
          el.href = C.contact?.phoneHref || `tel:${val}`;
          el.textContent = val;
        } else if (el.tagName === 'A' && key.includes('email')) {
          el.href = `mailto:${val}`;
          el.textContent = val;
        } else {
          el.textContent = val;
        }
      }
    });
  }

});
