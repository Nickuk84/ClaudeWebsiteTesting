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

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }, { passive: true });
  }

  // ===== NEWS ARTICLE MODAL =====
  const newsModal = document.getElementById('newsModal');
  if (newsModal) {
    const modalImage = document.getElementById('newsModalImage');
    const modalTag = document.getElementById('newsModalTag');
    const modalDate = document.getElementById('newsModalDate');
    const modalTitle = document.getElementById('newsModalTitle');
    const modalBody = document.getElementById('newsModalBody');
    const modalLink = document.getElementById('newsModalLink');
    const modalClose = newsModal.querySelector('.news-modal-close');

    // Extended article content for modal popups
    const articleContent = {
      'AEGIS London Announces Record Full-Year 2025 Results': '<p>AEGIS London has announced record full-year results for the year ending 31 December 2025, with UK GAAP profit of $391m, a 27% increase from 2024\'s $307m.</p><p>The combined ratio of 72.9% reflects continued underwriting discipline and portfolio management across all lines of business.</p><p><strong>Key highlights:</strong></p><ul><li>Gross written premium growth of 12% year-on-year</li><li>Combined ratio of 72.9%, well below the 100% profitability threshold</li><li>Return on capital significantly exceeding market average</li><li>Continued investment in digital trading and technology platforms</li></ul><p>Alex Powell, CEO, commented: "These results demonstrate the strength of our mutual model and the quality of our underwriting team. Our focus on disciplined underwriting, combined with strategic investments in technology and talent, continues to deliver outstanding results for our stakeholders."</p>',
      'Double Claims Manager Promotion': '<p>AEGIS London has promoted Jenny Macartney and Zoe Hill to Claims Manager, strengthening the claims leadership team.</p><p>Both promotions recognise exceptional performance and leadership in claims handling, contributing to AEGIS London\'s continued top-quartile claims service recognition.</p><p>The claims team has been recognised with the Gracechurch Claims Quality Marque for 10 consecutive years, a testament to the quality and dedication of the team.</p>',
      'Neil Bayles Appointed Chief Information Officer': '<p>AEGIS London has appointed Neil Bayles to the newly created role of Chief Information Officer, reporting to Chief Operating Officer Marianne Harvey.</p><p>The CIO position has been created to drive technology strategy and digital transformation across the business, reflecting the increasing importance of technology in the Lloyd\'s market.</p><p>Neil brings extensive experience in technology leadership within financial services and will be responsible for all aspects of IT strategy, infrastructure, and digital innovation.</p>',
      'AEGIS London Responds to LMA Report': '<p>Matthew Yeldham, Chief Underwriting Officer at AEGIS London, has responded to the London Market Association\'s latest industry report.</p><p>The response addresses key themes including market conditions, underwriting discipline, and the evolving role of technology in the London market.</p><p>AEGIS London continues to advocate for sustainable market practices and innovative approaches to risk management.</p>',
      'Gracechurch Claims Quality Marque for 10th Consecutive Year': '<p>AEGIS London has been awarded the Gracechurch Claims Quality Marque for the 10th consecutive year, maintaining its position in the top quartile for claims service excellence.</p><p>This milestone achievement reflects the consistent quality and responsiveness of the AEGIS London claims team, led by Andrew Gunn, Head of Claims.</p><p><strong>The award recognises excellence in:</strong></p><ul><li>Speed and efficiency of claims handling</li><li>Quality of communication with policyholders and brokers</li><li>Technical expertise and fair settlement practices</li><li>Overall client satisfaction</li></ul>',
      'Tom Prifti Promoted to E&O Class Underwriter': '<p>AEGIS London has promoted Tom Prifti to the role of Errors & Omissions Class Underwriter, succeeding Martin King.</p><p>Tom brings deep expertise in professional liability underwriting and has been instrumental in growing the E&O portfolio at AEGIS London.</p>',
      'The Widening Lead-Follow Spectrum': '<p>Matthew Yeldham, CUO at AEGIS London, examines the evolving dynamics of lead and follow underwriting in the Lloyd\'s market.</p><p>The article explores how the traditional binary distinction between lead and follow underwriters is giving way to a more nuanced spectrum, with implications for pricing, capacity deployment, and market efficiency.</p><p>Key themes include the role of data analytics in follow underwriting decisions, the impact of digital trading platforms, and the strategic positioning of syndicates across the lead-follow spectrum.</p>',
      'Forget Cyber Rate Reductions, Focus on Growth': '<p>Lydia Lambert and Dan Johnson from AEGIS London argue that the cyber insurance market should prioritise sustainable growth over rate competition.</p><p>The article examines current market dynamics, including increasing competition and downward pressure on rates, and makes the case for focusing on portfolio growth and risk selection rather than price-driven strategies.</p>',
      'Navigating US Casualty Realities': '<p>Charles McDonagh provides insights into the current US casualty landscape and strategies for navigating market challenges.</p><p>The article covers social inflation trends, litigation funding developments, and the implications for London market underwriters writing US casualty business.</p>',
      'Strategic Digital Partnership with McGill and Partners': '<p>AEGIS London has announced a strategic partnership with McGill and Partners to expand digital trading capabilities.</p><p>The partnership leverages AEGIS London\'s OPAL digital trading platform and McGill\'s distribution network to create new opportunities for efficient, data-driven placement.</p>',
      'Tom Squires Appointed Head of Distribution and Digital Trading': '<p>Tom Squires has been appointed as Head of Distribution and Digital Trading at AEGIS London.</p><p>In this newly created role, Tom will lead distribution strategy and digital trading initiatives, working closely with the underwriting and technology teams to drive innovation in market access.</p>',
      'Political &amp; Financial Risk Line Size Increases': '<p>AEGIS London has significantly increased its capacity for political and financial risk products.</p><p>Sovereign non-payment capacity has been increased by 50%, and credit capacity has been doubled to meet growing market demand for these specialist products.</p>',
      'Sarah Yuile Appointed International Casualty Underwriter': '<p>Sarah Yuile has joined AEGIS London as an International Casualty Underwriter, strengthening the international casualty team.</p><p>Sarah brings extensive experience in casualty underwriting across international markets and will contribute to growing AEGIS London\'s international casualty portfolio.</p>',
      'Digital Terrorism Product Capacity Doubled to $500m': '<p>AEGIS London has doubled its digital terrorism product capacity to $500m, responding to increasing market demand.</p><p>The expanded capacity is available through the OPAL digital trading platform, enabling efficient placement of terrorism risks for brokers worldwide.</p>',
      'Full Year Results for 2024: GBP 247m Profit': '<p>AEGIS London has reported strong full-year results for 2024, with a profit of GBP 247m.</p><p>The results reflect consistent underwriting discipline and effective portfolio management across all lines of business, with a combined ratio well below 100%.</p>',
      'Charity Bare Appointed Chief Risk and Compliance Officer': '<p>Charity Bare has been appointed as Chief Risk and Compliance Officer at AEGIS London.</p><p>Charity brings deep expertise in risk management and regulatory frameworks within the London insurance market, and will lead the risk and compliance function across the organisation.</p>',
      '$100m Political Violence Consortium Launched': '<p>AEGIS London has launched a new consortium offering $100m capacity for political violence risks across multiple territories.</p><p>The consortium brings together specialist expertise to provide comprehensive coverage for political violence exposures, including terrorism, civil unrest, and politically motivated events.</p>',
      'Gracechurch Claims Quality Marque for 9th Consecutive Year': '<p>AEGIS London has been awarded the Gracechurch Claims Quality Marque for the ninth consecutive year.</p><p>The continued top quartile recognition reflects the claims team\'s commitment to service excellence and responsiveness in handling complex insurance claims.</p>',
      'Portfolio Solutions Launched': '<p>AEGIS London has launched its new Portfolio Solutions division, led by Richard Palengat.</p><p>The division expands AEGIS London\'s service offering to clients, providing comprehensive portfolio management, delegated authority arrangements, and bespoke risk solutions.</p>',
      'Three Colleagues Celebrate 25 Years': '<p>AEGIS London celebrates the remarkable achievement of three colleagues who have each completed 25 years of service, including CEO Alex Powell and Gemma Burns.</p><p>Their combined 75 years of experience represent an extraordinary commitment to the company and the London insurance market.</p>',
      'OPAL Digital Platform Evolution': '<p>Mark Wilding explores how AEGIS London\'s OPAL platform continues to evolve and reshape digital trading in the Lloyd\'s market.</p><p>The article covers recent platform enhancements, adoption metrics, and the strategic vision for digital trading at AEGIS London.</p>',
      '60% Follow Market at Lloyd\'s': '<p>Matt Yeldham analyses the structure of the follow market at Lloyd\'s, which represents approximately 60% of total capacity.</p><p>The article examines the implications for syndicate strategy, pricing dynamics, and the role of data and technology in follow underwriting decisions.</p>',
      'Women in Insurance Awards Finalists': '<p>Grace Hymas, Natalie Skillett, and Louise Daveney from AEGIS London have been recognised as finalists at the Women in Insurance Awards.</p><p>The nominations reflect AEGIS London\'s commitment to diversity and inclusion, and the exceptional contributions of these three professionals to the insurance industry.</p>',
      'Mentoring Programme': '<p>Katie Wade (CFO) and Eliza Dickie share insights from AEGIS London\'s internal mentoring programme.</p><p>The programme has been instrumental in supporting career development, knowledge sharing, and building connections across the organisation.</p>',
    };

    function openNewsModal(card) {
      const title = card.querySelector('h3')?.textContent || '';
      const summary = card.querySelector('.news-card-body > p')?.textContent || '';
      const date = card.querySelector('.news-card-date')?.textContent || '';
      const tag = card.querySelector('.news-card-tag');
      const img = card.querySelector('.news-card-image img');
      const link = card.querySelector('.news-read-more');

      modalTitle.textContent = title;
      modalDate.textContent = date;

      if (tag) {
        modalTag.textContent = tag.textContent;
        modalTag.className = 'news-card-tag ' + (tag.classList[1] || '');
      }

      if (img) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        newsModal.querySelector('.news-modal-hero').style.display = '';
      } else {
        newsModal.querySelector('.news-modal-hero').style.display = 'none';
      }

      // Try to find extended content
      const body = articleContent[title] || '<p>' + summary + '</p>';
      modalBody.innerHTML = body;

      if (link) {
        modalLink.href = link.href;
        modalLink.style.display = '';
      } else {
        modalLink.style.display = 'none';
      }

      document.body.style.overflow = 'hidden';
      newsModal.classList.add('active');
      newsModal.classList.remove('closing');

      // Focus trap
      setTimeout(() => modalClose.focus(), 100);
    }

    function closeNewsModal() {
      newsModal.classList.add('closing');
      setTimeout(() => {
        newsModal.classList.remove('active', 'closing');
        document.body.style.overflow = '';
      }, 250);
    }

    // Click on news cards opens modal
    document.querySelectorAll('.news-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't intercept if clicking the external link directly with modifier
        if (e.target.closest('.news-read-more') && (e.ctrlKey || e.metaKey)) return;
        e.preventDefault();
        openNewsModal(card);
      });

      // Make cards keyboard accessible
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openNewsModal(card);
        }
      });
    });

    modalClose.addEventListener('click', closeNewsModal);
    newsModal.addEventListener('click', (e) => {
      if (e.target === newsModal) closeNewsModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && newsModal.classList.contains('active')) closeNewsModal();
    });
  }

  // ===== HERO PARALLAX ON SCROLL =====
  const heroOrbs = document.querySelectorAll('.hero-orb');
  if (heroOrbs.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroOrbs.forEach((orb, i) => {
        const rate = (i + 1) * 0.15;
        orb.style.transform = `translateY(${scrollY * rate}px)`;
      });
    }, { passive: true });
  }

  // ===== LEADER CARD PARALLAX TILT =====
  document.querySelectorAll('.leader-card--full').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== MAGNETIC BUTTON EFFECT =====
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.classList.add('btn-magnetic');
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ===== IMAGE LAZY LOAD WITH BLUR-UP =====
  document.querySelectorAll('.img-lazy').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  // ===== PAGE LOADER CLEANUP =====
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    setTimeout(() => pageLoader.remove(), 1000);
  }

  // ===== BOARD MEMBER CARD DATA-ROLE ATTRIBUTE =====
  document.querySelectorAll('.leader-card:not(.leader-card--full)').forEach(card => {
    const title = card.querySelector('.leader-title');
    if (title) card.setAttribute('data-role', title.textContent);
  });

});
