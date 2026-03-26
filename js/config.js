/* =============================================================================
   AEGIS LONDON — Site Configuration
   =============================================================================
   Edit this file to customise the website content, branding, and settings.
   Changes here will be automatically applied across all pages on load.
   ============================================================================= */

const SITE_CONFIG = {

  // ─── BRAND ────────────────────────────────────────────────────────────────
  brand: {
    name:         "AEGIS London",
    shortName:    "AEGIS",
    tagline:      "A Different Kind of Lloyd's Syndicate",
    description:  "Specialist underwriting backed by the strength of the AEGIS mutual.",
    syndicate:    "Syndicate 1225",
    founded:      "1999",
    logoSrc:      "images/aegis-london-logo.png",
    faviconSrc:   "images/favicon.svg",
    linkedIn:     "https://www.linkedin.com/company/aegis-london/",
    website:      "https://aegislondon.co.uk",
  },

  // ─── COLOURS (CSS custom properties — override the defaults) ──────────────
  colors: {
    primary:      "#e8772e",   // AEGIS orange
    primaryLight: "#f09848",
    charcoal:     "#1a1a2e",
    navy:         "#16213e",
    // Set to null to keep the CSS default
    accentGold:   null,
  },

  // ─── CONTACT INFO ─────────────────────────────────────────────────────────
  contact: {
    phone:        "+44 (0) 20 7856 7856",
    phoneHref:    "tel:+442078567856",
    email:        "enquiries@aegislondon.co.uk",
    canadaEmail:  "BusinessPracticeGroupCanada@aegislondon.co.uk",
  },

  // ─── OFFICES ──────────────────────────────────────────────────────────────
  offices: {
    london: {
      label:   "London Office",
      role:    "Headquarters",
      street:  "25 Fenchurch Avenue",
      city:    "London EC3M 5AD",
      country: "United Kingdom",
    },
    toronto: {
      label:   "Toronto Office",
      role:    "Canadian Operations",
      street:  "79 Wellington Street West, 30th Floor",
      city:    "Toronto, Ontario M5K 1N2",
      country: "Canada",
    },
  },

  // ─── KEY STATS (used in hero, about, etc.) ────────────────────────────────
  stats: {
    gwp:            "$1.7B+",
    gwpValue:       1.7,          // for counter animation
    profit:         "$391M",
    profitValue:    391,
    combinedRatio:  "72.9%",
    combinedValue:  72.9,
    specialistClasses: "20+",
    classesValue:   20,
    underwriters:   "150+",
    underwritersValue: 150,
    yearsExcellence: "25+",
    yearsValue:     25,
    lloydsRanking:  "Top Quartile",
    digitalYear:       "2017",
    digitalPlatforms:  "3",
    digitalSpecialists:"12",
    digitalAccess:     "24/7",
  },

  // ─── RATINGS ──────────────────────────────────────────────────────────────
  ratings: {
    amBest:  { grade: "A+",  label: "A.M. Best",   detail: "Excellent (XV)" },
    sp:      { grade: "AA-", label: "S&P Global",   detail: "Strong" },
  },

  // ─── MANAGEMENT TEAM ──────────────────────────────────────────────────────
  team: [
    { name: "Alex Powell",       initials: "AP", title: "Chief Executive Officer" },
    { name: "Matthew Yeldham",   initials: "MY", title: "Chief Underwriting Officer" },
    { name: "Marianne Harvey",   initials: "MH", title: "Chief Operating Officer" },
    { name: "Katie Wade",        initials: "KW", title: "Chief Financial Officer" },
    { name: "Adam O'Reilly",     initials: "AO", title: "Chief Actuary" },
    { name: "Rhic Webb",         initials: "RW", title: "General Counsel & Company Secretary" },
    { name: "Charity Bare",      initials: "CB", title: "Chief Risk & Compliance Officer" },
    { name: "Claire Parkinson",  initials: "CP", title: "Chief Human Resources Officer" },
  ],

  // ─── CANADA ───────────────────────────────────────────────────────────────
  canada: {
    operatingSince:     "1999",
    topQuartileYears:   7,
    combinedRatio5yr:   "90.7%",
    claimsOutstanding:  6,       // consecutive years
    territoryRank:      "2nd largest",
    products: [
      "Property", "Accident & Health", "General Liability",
      "Professional Liability", "Marine & Cargo", "Terrorism", "Specialty"
    ],
    contacts: [
      { name: "Stephen Merrick", role: "Leader, Canadian Business Practice Group" },
      { name: "Carrie Trudeau",  role: "Head of Claims Operations" },
      { name: "Danny Summa",     role: "Client Services Manager" },
      { name: "Nazir Haji",      role: "SVP Business Development" },
    ],
  },

  // ─── UNDERWRITING CLASSES ─────────────────────────────────────────────────
  underwriting: {
    property: [
      { name: "Open Market Property",  desc: "Worldwide open market property risks including commercial, industrial, and residential exposures." },
      { name: "Binders & Line Slips",  desc: "Delegated authority and consortium arrangements for property portfolios." },
      { name: "Utility Property",      desc: "Specialist coverage for power generation, transmission, and distribution infrastructure." },
    ],
    casualty: [
      { name: "US General Liability",     desc: "Primary and excess general liability for US-domiciled risks across diverse industry sectors." },
      { name: "International Casualty",   desc: "Third-party liability coverage for non-US exposures across international markets." },
      { name: "Professional Liability",   desc: "Errors & omissions and directors & officers liability for professional service firms." },
      { name: "Energy Casualty",          desc: "Liability coverage for upstream and downstream energy operations worldwide." },
      { name: "Marine Liability",         desc: "Protection & indemnity and marine liability for shipowners and operators." },
    ],
    specialty: [
      { name: "Accident & Health",                desc: "Personal accident, travel, and health programmes through specialist partnerships." },
      { name: "Political & Financial Risk",       desc: "Credit, political risk, and structured trade credit insurance solutions." },
      { name: "Political Violence & Terrorism",   desc: "Coverage for terrorism, sabotage, and political violence worldwide." },
      { name: "Cyber",                            desc: "Data breach, ransomware, business interruption, and privacy liability coverage." },
      { name: "Marine Hull & War",                desc: "Hull, machinery, and war risks for ocean-going and coastal vessels." },
      { name: "Cargo & Specie",                   desc: "Transit, storage, and exhibition coverage for goods and valuables." },
      { name: "Energy Exploration & Production",  desc: "Physical damage coverage for upstream energy operations and installations." },
    ],
  },

  // ─── NEWS / LATEST ARTICLES ───────────────────────────────────────────────
  news: [
    {
      title:    "AEGIS London Reports Record 2025 Results",
      summary:  "Syndicate 1225 delivers $391m profit and a 72.9% combined ratio, marking another year of top-quartile performance.",
      date:     "March 2026",
      category: "press",
    },
    {
      title:    "Navigating Emerging Risks in a Changing World",
      summary:  "Our underwriting leaders share perspectives on evolving risk landscapes across cyber, climate, and geopolitical dimensions.",
      date:     "February 2026",
      category: "insight",
    },
    {
      title:    "AEGIS London Announces Claims Team Promotions",
      summary:  "Recognising excellence in our claims function with two senior promotions reflecting our commitment to talent development.",
      date:     "January 2026",
      category: "people",
    },
  ],

  // ─── CAREERS — CURRENT VACANCIES ──────────────────────────────────────────
  careers: [
    { title: "Senior Property Underwriter",      location: "London",  dept: "Underwriting", type: "Full-time" },
    { title: "Cyber Underwriter",                location: "London",  dept: "Underwriting", type: "Full-time" },
    { title: "Claims Analyst",                   location: "London",  dept: "Claims",       type: "Full-time" },
    { title: "Actuarial Analyst",                location: "London",  dept: "Actuarial",    type: "Full-time" },
    { title: "Portfolio Solutions Analyst — Canada", location: "Toronto", dept: "Portfolio", type: "Full-time" },
  ],

  // ─── FEATURE FLAGS ────────────────────────────────────────────────────────
  features: {
    showNewsTicker:   true,
    showCookieBanner: true,
    showBackToTop:    true,
    enableAnimations: true,
    enableCounters:   true,
  },

  // ─── LEGAL / COPYRIGHT ────────────────────────────────────────────────────
  legal: {
    copyright:  "© 2026 AEGIS London. All rights reserved.",
    policies: [
      { label: "Privacy Notice",     href: "privacy.html" },
      { label: "Cookies Policy",     href: "cookies.html" },
      { label: "Terms of Use",       href: "terms.html" },
      { label: "Modern Slavery Act", href: "modern-slavery.html" },
      { label: "UK Tax Strategy",    href: "tax-strategy.html" },
      { label: "Diversity Policy",   href: "diversity.html" },
    ],
  },
};

// Make available globally
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}
