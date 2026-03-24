# AEGIS London Website Redesign — Project Context

## Overview
Redesigned website for AEGIS London (Lloyd's Syndicate 1225), a specialist insurer.
Original site: https://aegislondon.co.uk/
This is a static HTML/CSS/JS site with **23 pages**, shared stylesheet, config, and script.

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JS (no frameworks)
- Google Fonts: Inter (body), Space Grotesk (headings)
- CSS custom properties design system in `css/styles.css`
- **Configurable via `js/config.js`** — all branding, colours, content, team, stats, legal links
- Shared JS in `js/main.js` (scroll animations, counters, tabs, form, cookies, search, config loader)
- All pages use consistent nav, footer, cookie banner, back-to-top

## File Structure
```
index.html          — Homepage (hero, ticker, specialisms tabs, digital, news, leadership, CTA)
about.html          — About Us (overview, stats, ratings AA-/A+, Canada section with styled stats/products/contacts)
underwriting.html   — Specialist Underwriting (Property 3, Casualty 5, Specialty 7 — "Enquire Now" links to contact)
digital.html        — Digital Trading (OPAL dashboard mockup, Digital Lead/Follow, timeline)
portfolio.html      — Portfolio Solutions (delegated authority, coverholder partnerships)
claims.html         — Claims (philosophy with 25+ years visual, 4-step timeline, capabilities)
news.html           — News & Insights (filterable cards by category, thought-leadership anchor)
team.html           — Management Team & Board of Directors (SVG silhouette avatars with initials)
careers.html        — Careers (culture, benefits grid, 5 job listings with apply CTAs)
contact.html        — Contact (form with validation, office cards London/Toronto, key contacts)
404.html            — Branded error page with navigation links
privacy.html        — Privacy Notice (GDPR-compliant)
cookies.html        — Cookies Policy
terms.html          — Terms of Use
modern-slavery.html — Modern Slavery Act Statement
tax-strategy.html   — UK Tax Strategy
diversity.html      — Diversity & Inclusion Policy
css/styles.css      — Shared stylesheet (~1150 lines, CSS custom properties, responsive, print)
js/config.js        — ⭐ CONFIGURATION FILE — edit this to change ALL site content/branding
js/main.js          — Shared JavaScript (~310 lines, includes config loader)
images/aegis-london-logo.png  — Real AEGIS London logo (downloaded from live site)
images/favicon.svg            — AEGIS diamond-pattern favicon
.claude/launch.json           — Dev server config (python http.server on port 3000)
```

## Configuration System (`js/config.js`)
The site is fully configurable via a single JS config file. Editable sections:
- **brand** — name, tagline, logo path, LinkedIn URL
- **colors** — primary, primaryLight, charcoal, navy (applied as CSS custom properties)
- **contact** — phone, email
- **offices** — London, Toronto addresses
- **stats** — GWP, profit, combined ratio, classes, underwriters, years
- **ratings** — A.M. Best, S&P grades
- **team** — management team names, initials, titles
- **canada** — stats, products, contacts
- **underwriting** — all class names and descriptions
- **news** — article titles, summaries, dates, categories
- **careers** — job titles, locations, departments
- **features** — toggle ticker, cookie banner, back-to-top, animations, counters
- **legal** — copyright text, policy page links

Config is loaded by `main.js` on DOMContentLoaded and applies:
- CSS custom property overrides for colours
- Logo src replacement
- Copyright and legal link injection
- Feature flag toggling (remove elements)
- `data-config="path.to.value"` attribute binding for any element

## Design System
- Primary: #e8772e (AEGIS orange) — configurable
- Dark: #1a1a2e (charcoal), #16213e (navy) — configurable
- Light: #f7f8fa (off-white), #eef0f4 (gray-100)
- Border radius: 12-24px (modern rounded)
- Animations: scroll-reveal (IntersectionObserver), counter animations, hover effects
- Responsive breakpoints: 1024px, 768px, 480px
- Print styles included

## Real AEGIS Data (sourced from live site)
- **Logo**: PNG downloaded to `images/aegis-london-logo.png`
- **OPAL platform**: https://marketing.opaluw.com/ — "Generate bindable quotes in minutes"
- **Team**: Alex Powell (CEO), Matthew Yeldham (CUO), Marianne Harvey (COO), Adam O'Reilly (Chief Actuary), Katie Wade (CFO), Rhic Webb (GC), Charity Bare (CRO), Claire Parkinson (CHRO)
- **Canada contacts**: Stephen Merrick, Carrie Trudeau, Danny Summa, Nazir Haji
- **Canada stats**: 1999 start, top quartile 7yrs, 90.7% combined ratio 5yr, claims outstanding 6yrs, 2nd largest territory
- **Offices**: London (25 Fenchurch Avenue, EC3M 5AD), Toronto (79 Wellington St W, 30th Floor, M5K 1N2)
- **Phone**: +44 (0) 20 7856 7856 | **Email**: enquiries@aegislondon.co.uk

## Running the Site
```bash
cd "C:/Users/ncamp/Documents/Work/ClaudeCode/Website Review"
python -m http.server 3000
# Open http://localhost:3000
```

## Deployment Options
- **Netlify Drop**: Drag folder to app.netlify.com/drop — instant free URL
- **GitHub Pages**: Push to repo, enable Pages in Settings
- **Vercel**: `npx vercel` for instant deploy
- **Any static hosting**: Just upload all files

---

# ISSUE LOG

## User-Reported Issues (Priority)
| # | Issue | Status | Page(s) |
|---|-------|--------|---------|
| 1 | Logo must match real AEGIS London logo | ✅ DONE | ALL — real PNG logo with CSS filter for dark/light |
| 2 | Underwriting "Learn More" links don't work | ✅ DONE | underwriting.html — changed to "Enquire Now" → contact.html?subject= |
| 3 | About/Underwriting dropdown menus disappear on hover | ✅ DONE | CSS — added ::before bridge element + removed gap |
| 4 | "AEGIS London in Canada" text looks odd | ✅ DONE | about.html — added CSS for canada-* classes, grid layout, real stats |
| 5 | OPAL mockup meaningless | ✅ DONE | index.html + digital.html — realistic quoting dashboard |
| 6 | "Fair" text in claims visual looks odd | ✅ DONE | claims.html — replaced with "25+ years" + "Outstanding" float card |
| 7 | Press release links don't work | ✅ DONE | news.html — self-contained cards, footer links correct |
| 8 | Thought leadership links don't work | ✅ DONE | news.html — #thought-leadership anchor exists |
| 9 | People category links don't work | ✅ DONE | news.html — filter buttons work for categories |
| 10 | Management team should have pictures | ✅ DONE | index.html + team.html — SVG silhouette + initials |
| 11 | No privacy notice page | ✅ DONE | privacy.html created |
| 12 | No cookies policy page | ✅ DONE | cookies.html created |
| 13 | No terms of use page | ✅ DONE | terms.html created |
| 14 | No modern slavery act page | ✅ DONE | modern-slavery.html created |
| 15 | No UK tax strategy page | ✅ DONE | tax-strategy.html created |
| 16 | No diversity policy page | ✅ DONE | diversity.html created |
| 17 | OPAL needs proper logo/branding | ✅ DONE | digital.html — OPAL branded header in mockup |

## Design Review — Additional Improvements
| # | Issue | Status | Page(s) |
|---|-------|--------|---------|
| 18 | Nav dropdown hover zone too small | ✅ DONE | css/styles.css — ::before bridge |
| 19 | Spec cards should link to contact | ✅ DONE | underwriting.html — "Enquire Now" links |
| 20 | News cards self-contained | ✅ DONE | news.html |
| 21 | Leadership section needs photos | ✅ DONE | index.html + team.html — silhouette avatars |
| 22 | Footer legal links go to "#" | ✅ DONE | ALL — linked to real policy pages |
| 23 | Cookie banner "Learn more" goes to "#" | ✅ DONE | ALL — linked to cookies.html |
| 24 | Canada section visual hierarchy | ✅ DONE | about.html — styled grid, pills, cards |
| 25 | Claims timeline step numbers | ✅ DONE | claims.html — timeline-date shows Step 1-4 |
| 26 | Contact form validation | DEFERRED | Would need more JS — basic HTML5 validation works |
| 27 | Careers hover states | DEFERRED | Uses inline JS for hover — works but could be cleaner |
| 28 | Add favicon | ✅ DONE | ALL 17 pages — AEGIS diamond pattern SVG |
| 29 | Breadcrumb wrapper consistency | MINOR | Most pages consistent |
| 30 | Print stylesheet improvements | MINOR | Cookie banner already hidden in print |
| 31 | Site configurable via config file | ✅ DONE | js/config.js + config loader in main.js |

## Production Audit — Page-by-Page Review (2026-03-24)

### CRITICAL ISSUES (Must Fix)
| # | Issue | Page(s) | Details |
|---|-------|---------|---------|
| A1 | ✅ DONE — OPAL dashboard mockup REMOVED | index.html, digital.html | Replaced with clean stats cards and OPAL info with link to opaluw.com |
| A2 | ✅ DONE — Homepage spec cards now "Enquire Now" | index.html | All 14 spec cards link to contact.html?subject=ClassName |
| A3 | ✅ DONE — OG image created + refs updated | ALL pages | Created images/og-image.svg, updated all 10 page OG meta tags |
| A4 | ✅ DONE — Structured data logo URL fixed | index.html | Changed to images/aegis-london-logo.png, foundingDate to 1999 |
| A5 | ✅ DONE — Hero ratings corrected | index.html | A.M. Best now shows A+, S&P now shows AA- |
| A6 | ✅ DONE — PV&T card added to homepage specialty | index.html | All 7 specialty classes now shown |

### HIGH PRIORITY ISSUES
| # | Issue | Page(s) | Details |
|---|-------|---------|---------|
| B1 | ✅ DONE — Careers "Apply Now" links now have subject params | careers.html | All 5 job Apply Now links now go to contact.html?subject=Apply:+JobTitle |
| B2 | ✅ DONE — Careers inline styles refactored | careers.html | Benefits grid, benefit cards, job cards, job meta all moved to CSS classes |
| B3 | ✅ DONE — Contact offices inline styles refactored | contact.html | Office grid and cards moved to .offices-grid / .office-card CSS classes |
| B4 | News cards have no images | news.html | All news cards use SVG icon placeholders, no article images |
| B5 | Team members have no real photos | team.html, index.html | SVG silhouette + initials — noted as limitation but worth logging |
| B6 | ✅ DONE — "Download Factsheet" changed to "Request Factsheet" | about.html | Now links to contact.html?subject=Factsheet+Request |
| B7 | No timeline section on digital.html | digital.html | Referenced in project context but not present in HTML |
| B8 | ✅ DONE — Homepage digital visual replaced | index.html | Now shows "2017 Digital Trading Launched" stats card |
| B9 | ✅ DONE — Portfolio spec cards now have "Enquire Now" links | portfolio.html | All 6 product cards link to contact.html?subject=ClassName |
| B10 | ✅ DONE — Careers nav active state fixed | careers.html | Removed "active" from About dropdown trigger, kept on Careers link inside |

### MEDIUM PRIORITY ISSUES
| # | Issue | Page(s) | Details |
|---|-------|---------|---------|
| C1 | ✅ DONE — About section ratings text corrected | index.html | Now shows "A+ (Excellent) from A.M. Best, AA- from S&P" |
| C2 | ✅ DONE — Contact form reads URL subject params | contact.html | Form pre-fills message and enquiry type from ?subject= parameter |
| C3 | ✅ DONE — Legal pages OG tags added | privacy.html, cookies.html, terms.html, etc. | All 6 legal pages now have OG meta tags |
| C4 | ✅ DONE — Legal pages Twitter Card tags added | privacy.html, cookies.html, terms.html, etc. | All 6 legal pages now have Twitter Card tags |
| C5 | ✅ DONE — Digital page hero standardised | digital.html | Now uses page-hero-inner like all other pages |
| C6 | ✅ DONE — Contact form novalidate removed | contact.html | HTML5 validation now active |
| C7 | Contact form doesn't actually send anywhere | contact.html | Form submit just shows success animation — no backend/action |
| C8 | No search functionality site-wide | ALL | No site search for users to find content |
| C9 | Portfolio page "50+ Coverholder Partners" stat is made up | portfolio.html | No source for this number |
| C10 | Digital page "12 Specialists" stat may not be accurate | digital.html | No source for this specific number |
| C11 | ✅ DONE — Breadcrumb consistency fixed | digital.html | Now uses &rsaquo; text separator like all other pages |

### LOW PRIORITY / POLISH
| # | Issue | Page(s) | Details |
|---|-------|---------|---------|
| D1 | ✅ DONE — sitemap.xml created | root | All 16 pages with priorities and change frequencies |
| D2 | ✅ DONE — robots.txt created | root | Allows all crawlers, references sitemap |
| D3 | ✅ DONE — Emoji icons replaced with SVGs | careers.html | All 8 benefit cards now use styled SVG icons matching design system |
| D4 | ✅ OK — Footer logo filter already exists | css/styles.css | .footer .nav-logo-img filter rule was already at line 85 |
| D5 | ✅ DONE — _redirects file created | root | Netlify _redirects file routes 404s to 404.html |
| D6 | ✅ DONE — Print stylesheet improved | css/styles.css | Now hides nav-toggle, skip-link, hero-orbs; fixes dark sections; shows URLs after links |
| D7 | ✅ DONE — foundingDate fixed to 1999 | index.html | JSON-LD now matches config.js |
| D8 | ✅ DONE — Progressive enhancement via no-js class | ALL | Added no-js class to html + CSS fallback; JS removes immediately on load |
| D9 | OK — News dates are current (today is March 2026) | news.html, index.html | Dates are appropriate for demo context |
| D10 | ✅ DONE — aria-hidden added to decorative SVGs | ALL 17 pages | Nav dropdown chevrons now aria-hidden="true" |
