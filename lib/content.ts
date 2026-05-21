// ─────────────────────────────────────────────────────────────────────────────
// San Patrik Landing Page Template — content.ts
// Replace every PLACEHOLDER_ value before deploying. Do not touch JSX files.
// ─────────────────────────────────────────────────────────────────────────────

export const content = {

  // ── Meta / SEO ──────────────────────────────────────────────────────────────
  meta: {
    title:       'PLACEHOLDER_PROJECT_TITLE',
    description: 'PLACEHOLDER_META_DESCRIPTION',
    siteUrl:     'https://PLACEHOLDER_SUBDOMAIN.sanpatrik.co',
    ogImage:     '/images/hero/hero-poster.webp',
  },

  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    brandName:    'PLACEHOLDER_BRAND_NAME',
    brandTagline: 'SAN PATRIK',
    phone:        'PLACEHOLDER_PHONE_E164',       // e.g. +385991234567
    phoneDisplay: 'PLACEHOLDER_PHONE_DISPLAY',    // e.g. +385 99 123 4567
    ctaLabel:     'Request Details',
  },

  // ── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    vimeoId:     'PLACEHOLDER_VIMEO_ID',
    eyebrow:     'PLACEHOLDER_PROJECT_TITLE · PLACEHOLDER_LOCATION',
    headline:    'PLACEHOLDER_HERO_HEADLINE',
    subheadline: 'PLACEHOLDER_HERO_SUBHEADLINE',
    ctaPrimary:  'Request Villa Details',
    ctaPhone:    'Call PLACEHOLDER_AGENT_FIRST_NAME Now',
    stats: [
      { value: 'PLACEHOLDER_STAT_1_VALUE', label: 'PLACEHOLDER_STAT_1_LABEL' },
      { value: 'PLACEHOLDER_STAT_2_VALUE', label: 'PLACEHOLDER_STAT_2_LABEL' },
      { value: 'PLACEHOLDER_STAT_3_VALUE', label: 'PLACEHOLDER_STAT_3_LABEL' },
      { value: 'PLACEHOLDER_STAT_4_VALUE', label: 'PLACEHOLDER_STAT_4_LABEL' },
    ],
  },

  // ── Project facts (shared across sections) ──────────────────────────────────
  project: {
    name:               'PLACEHOLDER_PROJECT_TITLE',
    location:           'PLACEHOLDER_LOCATION',
    totalUnits:         0,                         // replace with actual number
    startingPrice:      'PLACEHOLDER_PRICE',       // e.g. €1,700,000
    startingPriceShort: 'PLACEHOLDER_PRICE_SHORT', // e.g. €1.7M
    developer:          'PLACEHOLDER_DEVELOPER',
    leadingReMember:    false,
    remainingUnits:     0,                         // replace with actual number
  },

  // ── Investment case ──────────────────────────────────────────────────────────
  investment: {
    yieldRange:        'PLACEHOLDER_YIELD',          // e.g. 6–8%
    yieldLabel:        'Projected Annual Yield',
    occupancyRate:     'PLACEHOLDER_OCCUPANCY',      // e.g. 78%
    occupancyLabel:    'Average Occupancy Rate',
    appreciationRate:  'PLACEHOLDER_APPRECIATION',   // e.g. 42%
    appreciationLabel: 'PLACEHOLDER_APPRECIATION_LABEL',
    rentalProgramName: 'PLACEHOLDER_RENTAL_PROGRAM_NAME',
  },

  // ── Agent ────────────────────────────────────────────────────────────────────
  agent: {
    name:         'PLACEHOLDER_AGENT_NAME',
    title:        'PLACEHOLDER_AGENT_TITLE',
    phone:        'PLACEHOLDER_PHONE_E164',
    phoneDisplay: 'PLACEHOLDER_PHONE_DISPLAY',
    email:        'PLACEHOLDER_AGENT_EMAIL',
    whatsappUrl:  'https://wa.me/PLACEHOLDER_PHONE_DIGITS', // digits only, no +
    quote:        'PLACEHOLDER_AGENT_QUOTE',
    imageSrc:     '/images/agent/PLACEHOLDER_AGENT_SLUG.webp',
    imageAlt:     'PLACEHOLDER_AGENT_NAME — PLACEHOLDER_AGENT_TITLE',
  },

  // ── Villa portfolio ──────────────────────────────────────────────────────────
  villas: [
    {
      typeId:   'type-1',
      type:     'Type I',
      name:     'PLACEHOLDER_VILLA_1_NAME',
      size:     'PLACEHOLDER_VILLA_1_SIZE',
      beds:     0,
      baths:    0,
      feature:  'PLACEHOLDER_VILLA_1_FEATURE',
      price:    'PLACEHOLDER_VILLA_1_PRICE',
      soldOut:  false,
      imageSrc: '/images/villas/villa-type-1.webp',
      imageAlt: 'PLACEHOLDER_VILLA_1_NAME — PLACEHOLDER_PROJECT_TITLE',
    },
    {
      typeId:   'type-2',
      type:     'Type II',
      name:     'PLACEHOLDER_VILLA_2_NAME',
      size:     'PLACEHOLDER_VILLA_2_SIZE',
      beds:     0,
      baths:    0,
      feature:  'PLACEHOLDER_VILLA_2_FEATURE',
      price:    'PLACEHOLDER_VILLA_2_PRICE',
      soldOut:  false,
      imageSrc: '/images/villas/villa-type-2.webp',
      imageAlt: 'PLACEHOLDER_VILLA_2_NAME — PLACEHOLDER_PROJECT_TITLE',
    },
    {
      typeId:   'type-3',
      type:     'Type III',
      name:     'PLACEHOLDER_VILLA_3_NAME',
      size:     'PLACEHOLDER_VILLA_3_SIZE',
      beds:     0,
      baths:    0,
      feature:  'PLACEHOLDER_VILLA_3_FEATURE',
      price:    'PLACEHOLDER_VILLA_3_PRICE',
      soldOut:  false,
      imageSrc: '/images/villas/villa-type-3.webp',
      imageAlt: 'PLACEHOLDER_VILLA_3_NAME — PLACEHOLDER_PROJECT_TITLE',
    },
    {
      typeId:   'type-4',
      type:     'Type IV',
      name:     'PLACEHOLDER_VILLA_4_NAME',
      size:     'PLACEHOLDER_VILLA_4_SIZE',
      beds:     0,
      baths:    0,
      feature:  'PLACEHOLDER_VILLA_4_FEATURE',
      price:    'PLACEHOLDER_VILLA_4_PRICE',
      soldOut:  false,
      imageSrc: '/images/villas/villa-type-4.webp',
      imageAlt: 'PLACEHOLDER_VILLA_4_NAME — PLACEHOLDER_PROJECT_TITLE',
    },
  ],

  // ── Final CTA / Footer ───────────────────────────────────────────────────────
  finalCta: {
    urgencyLabel: 'Only PLACEHOLDER_REMAINING Villas Remaining',
    headline:     'Secure Your\nPLACEHOLDER_PROJECT_SHORT_NAME Villa',
    subheadline:  'Limited release. Priority access for registered investors.',
    ctaPrimary:   'Request Villa Details',
    legalEntity:  'PLACEHOLDER_LEGAL_ENTITY',
    year:         '2026',
  },

} as const;
