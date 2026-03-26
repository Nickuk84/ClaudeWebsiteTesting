# AEGIS London Website — Product Backlog

**Last Updated:** 2026-03-26
**Status:** Strong Beta — ready for internal demo, not yet production-ready

---

## Completed Features

- [x] 18-page responsive static site (HTML5/CSS3/Vanilla JS)
- [x] Modern design: glassmorphism, parallax, animated gradient orbs, 3D card tilt
- [x] Real press images from aegislondon.co.uk on news and team pages
- [x] News article popup modals with full body content, hero images, share buttons
- [x] Hover effects: rotating gradient borders, bio slide-up overlays, magnetic buttons
- [x] Scroll progress bar, page loader animation, back-to-top button
- [x] Scroll-reveal animations with staggered delays
- [x] Category filtering on news page (All / Press / Thought Leadership / People)
- [x] Tabbed specialisms (Property / Casualty / Specialty) on homepage
- [x] Counter animations on stats (GWP, profit, combined ratio)
- [x] Site-wide search modal (Ctrl+K shortcut)
- [x] Cookie consent banner with Accept/Decline
- [x] Admin CMS with dashboard, content editing, JSON backup/restore
- [x] One-click GitHub publishing from CMS (via GitHub API)
- [x] Live site preview in CMS iframe
- [x] Full SEO: meta tags, OG tags, JSON-LD structured data, canonical URLs
- [x] Accessibility: skip links, ARIA attributes, keyboard navigation, focus trapping
- [x] Mobile responsive at 1024px / 768px / 480px breakpoints
- [x] Print stylesheet
- [x] GitHub Pages deployment at nickuk84.github.io/ClaudeWebsiteTesting
- [x] Config-driven content via js/config.js

---

## P0 — Must Fix Before Launch

| # | Issue | Detail | File(s) |
|---|-------|--------|---------|
| 1 | Contact form has no backend | Form doesn't submit anywhere — needs Formspree, Netlify Forms, or similar | contact.html |
| 2 | Host key images locally | All images depend on aegislondon.co.uk CDN — if their DAM changes, images break | All pages with images |

## P1 — Should Fix Soon

| # | Issue | Detail | File(s) |
|---|-------|--------|---------|
| 3 | OG image is SVG | Social platforms (LinkedIn, Twitter) need raster PNG/JPG (1200x630) | All pages |
| 4 | Mismatched image on OPAL Digital card | Katie Wade headshot shown for "OPAL Digital Platform Evolution" article | news.html |
| 5 | Cookie banner doesn't persist | No localStorage save — banner reappears on every page load | js/main.js |
| 6 | Add sitemap.xml and robots.txt | Missing — needed for search engine crawling | Root directory |
| 7 | Homepage news "Read More" links generic | Point to news.html instead of specific articles or opening modals | index.html |

## P2 — Nice to Have / Enhancements

| # | Enhancement | Detail |
|---|-------------|--------|
| 8 | Board member headshots | Currently use initials placeholders — real photos would look more polished |
| 9 | Replace remaining logo/gradient placeholders | A few news cards still use company logo or CSS gradients instead of real photos |
| 10 | Protect admin page | Add basic auth or remove admin.html before production deployment |
| 11 | Image error fallbacks | Add onerror handlers to show initials/placeholder when external images fail |
| 12 | Add loading="lazy" consistently | Some images missing lazy loading attribute |
| 13 | ARIA live region for search | Screen readers should announce search results as user types |
| 14 | Add theme-color meta tag | Improves mobile browser chrome appearance |
| 15 | Preload hero images | Add link rel="preload" for key above-fold images to improve LCP |
| 16 | News article structured data | Add NewsArticle JSON-LD schema for individual articles |
| 17 | CSS minification | 1,720-line CSS could be minified for production performance |
| 18 | Add favicon.ico fallback | Only SVG favicon exists — older browsers need ICO/PNG |

---

## Demo Access

- **Live Site:** https://nickuk84.github.io/ClaudeWebsiteTesting/
- **Admin CMS:** https://nickuk84.github.io/ClaudeWebsiteTesting/admin.html
- **GitHub Repo:** https://github.com/Nickuk84/ClaudeWebsiteTesting

## How to Update Content

1. Go to admin.html
2. Edit News, Team, or Careers content
3. Go to the Publish tab
4. Enter your GitHub Personal Access Token (one-time setup)
5. Click "Publish Now" — live site updates in ~60 seconds

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript (no frameworks)
- Google Fonts: Inter (body), Space Grotesk (headings)
- GitHub Pages for hosting
- GitHub API for CMS publishing
- localStorage for CMS data persistence
