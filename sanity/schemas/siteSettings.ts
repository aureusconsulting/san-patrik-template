import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title',       title: 'Meta Title',       type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
      ],
    }),

    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline',    title: 'Headline',    type: 'string' }),
        defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
        defineField({ name: 'ctaPrimary',  title: 'Primary CTA Button',  type: 'string' }),
        defineField({ name: 'ctaPhone',    title: 'Phone CTA Button',    type: 'string' }),
        defineField({
          name: 'stats',
          title: 'Stats Bar (4 items)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
              preview: { select: { title: 'value', subtitle: 'label' } },
            },
          ],
        }),
      ],
    }),

    // ── Project ───────────────────────────────────────────────────────────────
    defineField({
      name: 'project',
      title: 'Project',
      type: 'object',
      fields: [
        defineField({ name: 'startingPrice',      title: 'Starting Price (full)',  type: 'string', description: 'e.g. €1,700,000' }),
        defineField({ name: 'startingPriceShort', title: 'Starting Price (short)', type: 'string', description: 'e.g. €1.7M' }),
        defineField({ name: 'remainingUnits',     title: 'Villas Remaining',       type: 'number' }),
      ],
    }),

    // ── Investment ────────────────────────────────────────────────────────────
    defineField({
      name: 'investment',
      title: 'Investment Stats',
      type: 'object',
      fields: [
        defineField({ name: 'yieldRange',       title: 'Yield Range',       type: 'string', description: 'e.g. 6–8%' }),
        defineField({ name: 'occupancyRate',    title: 'Occupancy Rate',    type: 'string', description: 'e.g. 78%' }),
        defineField({ name: 'appreciationRate', title: 'Appreciation Rate', type: 'string', description: 'e.g. 42%' }),
      ],
    }),

    // ── Agent ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'agent',
      title: 'Agent',
      type: 'object',
      fields: [
        defineField({ name: 'name',        title: 'Name',            type: 'string' }),
        defineField({ name: 'title',       title: 'Title',           type: 'string' }),
        defineField({ name: 'phone',       title: 'Phone (raw)',     type: 'string', description: 'e.g. +385992172314' }),
        defineField({ name: 'phoneDisplay',title: 'Phone (display)', type: 'string', description: 'e.g. +385 99 217 2314' }),
        defineField({ name: 'email',       title: 'Email',           type: 'string' }),
        defineField({ name: 'quote',       title: 'Quote',           type: 'text', rows: 4 }),
        defineField({ name: 'photo',       title: 'Photo',           type: 'image', options: { hotspot: true } }),
        defineField({ name: 'photoAlt',    title: 'Photo Alt Text',  type: 'string' }),
      ],
    }),

    // ── Villas ────────────────────────────────────────────────────────────────
    defineField({
      name: 'villas',
      title: 'Villa Prices & Availability',
      type: 'array',
      description: 'Update prices and availability. Order matches the page.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'typeId',   title: 'Type ID',   type: 'string', description: 'type-1, type-2, type-3, type-4 — do not change' }),
            defineField({ name: 'price',    title: 'Price',     type: 'string', description: 'e.g. €1,746,375' }),
            defineField({ name: 'soldOut',  title: 'Sold Out',  type: 'boolean' }),
            defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string' }),
          ],
          preview: { select: { title: 'typeId', subtitle: 'price' } },
        },
      ],
    }),

    // ── CTA buttons (shared) ──────────────────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'Default CTA Button Label',
      type: 'string',
      description: 'Used in nav and form submit button',
    }),

  ],
});
