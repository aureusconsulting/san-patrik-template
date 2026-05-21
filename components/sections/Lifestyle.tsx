'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { FADE_UP_SM, STAGGER_SM } from '@/lib/animations';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface LifestyleItem {
  caption: string;
  aspectClass: string;
  bg: CSSProperties['background'];
}

/*
  Column split (flexbox masonry):
    Col 1 — indices 0, 2, 4: landscape · landscape · portrait
    Col 2 — indices 1, 3, 5: portrait  · landscape · landscape

  Different aspect ratios create natural stagger between the two columns,
  giving the masonry feel without JavaScript height calculations.
*/
const ITEMS: LifestyleItem[] = [
  {
    caption: 'Largest rooftop pool in Europe',
    aspectClass: 'aspect-video',
    bg: 'linear-gradient(160deg, #061a2e 0%, #1B3A5C 100%)',
  },
  {
    caption: 'PGA National Golf — 10 minutes',
    aspectClass: 'aspect-[4/5]',
    bg: 'linear-gradient(160deg, #0b1a0b 0%, #1a3320 100%)',
  },
  {
    caption: 'Private beach for owners',
    aspectClass: 'aspect-[4/3]',
    bg: 'linear-gradient(160deg, #04111e 0%, #1B3A5C 100%)',
  },
  {
    caption: 'Award-winning fine dining',
    aspectClass: 'aspect-video',
    bg: 'linear-gradient(160deg, #1a1208 0%, #2C2010 100%)',
  },
  {
    caption: 'Spa & wellness sanctuary',
    aspectClass: 'aspect-[3/4]',
    bg: 'linear-gradient(160deg, #150a18 0%, #2E1B3A 100%)',
  },
  {
    caption: 'Istrian sunsets, every evening',
    aspectClass: 'aspect-[4/3]',
    bg: 'linear-gradient(160deg, #1a0e04 0%, #3a2010 100%)',
  },
];

// ─── Photo item ───────────────────────────────────────────────────────────────

function PhotoItem({ item }: { item: LifestyleItem }) {
  return (
    <motion.div variants={FADE_UP_SM} className="w-full">
      {/* Placeholder image block */}
      <div className={`w-full overflow-hidden relative ${item.aspectClass}`}>
        {/* Base gradient */}
        <div className="absolute inset-0" style={{ background: item.bg }} aria-hidden="true" />

        {/* Fine-grain texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
          aria-hidden="true"
        />

        {/* Subtle bottom vignette for caption readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 40%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Caption */}
      <p className="font-body font-light text-[11px] tracking-wide text-gold mt-2.5">
        {item.caption}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Lifestyle() {
  const col1 = ITEMS.filter((_, i) => i % 2 === 0);
  const col2 = ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section id="lifestyle" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Headline ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2
            className="font-display font-light italic text-5xl md:text-6xl text-navy-deep"
            style={{ lineHeight: 1.08 }}
          >
            A Life Earned. A Life Lived.
          </h2>
        </motion.div>

        {/* ── Masonry grid — two-column flexbox split ─────────────────
            Items are split by even/odd index across two flex columns.
            Different aspect ratios stagger the column heights organically.
        ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={STAGGER_SM}
          className="flex items-start gap-3 md:gap-5"
        >
          {/* Column 1: items 0, 2, 4 */}
          <div className="flex-1 flex flex-col gap-3 md:gap-5">
            {col1.map((item) => (
              <PhotoItem key={item.caption} item={item} />
            ))}
          </div>

          {/* Column 2: items 1, 3, 5 */}
          <div className="flex-1 flex flex-col gap-3 md:gap-5">
            {col2.map((item) => (
              <PhotoItem key={item.caption} item={item} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
