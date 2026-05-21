'use client';

import { motion } from 'framer-motion';
import {
  Waves,
  Sparkles,
  Umbrella,
  Flag,
  UtensilsCrossed,
  Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FADE_UP, STAGGER_MD } from '@/lib/animations';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Amenity {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const AMENITIES: Amenity[] = [
  {
    Icon: Waves,
    title: 'PLACEHOLDER_AMENITY_1_TITLE',
    desc: 'PLACEHOLDER_AMENITY_1_DESC',
  },
  {
    Icon: Sparkles,
    title: 'PLACEHOLDER_AMENITY_2_TITLE',
    desc: 'PLACEHOLDER_AMENITY_2_DESC',
  },
  {
    Icon: Umbrella,
    title: 'PLACEHOLDER_AMENITY_3_TITLE',
    desc: 'PLACEHOLDER_AMENITY_3_DESC',
  },
  {
    Icon: Flag,
    title: 'PLACEHOLDER_AMENITY_4_TITLE',
    desc: 'PLACEHOLDER_AMENITY_4_DESC',
  },
  {
    Icon: UtensilsCrossed,
    title: 'PLACEHOLDER_AMENITY_5_TITLE',
    desc: 'PLACEHOLDER_AMENITY_5_DESC',
  },
  {
    Icon: Shield,
    title: 'PLACEHOLDER_AMENITY_6_TITLE',
    desc: 'PLACEHOLDER_AMENITY_6_DESC',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function WhatIsProject() {
  return (
    <section id="about" className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={STAGGER_MD}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={FADE_UP}
            className="font-body font-bold text-xs uppercase tracking-[0.2em] text-gold"
          >
            The Resort
          </motion.p>

          <motion.h2
            variants={FADE_UP}
            className="font-display font-light text-4xl md:text-5xl text-navy-deep mt-4"
            style={{ lineHeight: 1.1 }}
          >
            PLACEHOLDER_ABOUT_HEADLINE
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="font-body font-light text-base leading-relaxed mt-6"
            style={{ color: 'rgba(44,44,44,0.78)' }}
          >
            PLACEHOLDER_ABOUT_BODY
          </motion.p>
        </motion.div>

        {/* ── Gold divider ───────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-16 h-px bg-gold mx-auto mt-12 mb-14 origin-center"
          aria-hidden="true"
        />

        {/* ── Amenity grid ── collapsed-border technique ────────────── */}
        {/*
          Container:  border-t  border-l
          Each cell:  border-b  border-r
          → each shared edge has exactly one border, no doubles.
        */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={STAGGER_MD}
          className="grid grid-cols-2 lg:grid-cols-3 border-t border-l border-cream-dark"
        >
          {AMENITIES.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={FADE_UP}
              className="flex flex-col gap-4 p-6 lg:p-8 border-b border-r border-cream-dark"
            >
              {/* Gold icon circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(200,169,110,0.12)' }}
              >
                <Icon size={18} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
              </div>

              <div>
                <p className="font-body font-semibold text-sm text-navy-deep leading-snug">
                  {title}
                </p>
                <p
                  className="font-body font-light text-xs mt-1 leading-relaxed"
                  style={{ color: 'rgba(44,44,44,0.58)' }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Masterplan image placeholder ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-14 aspect-video w-full overflow-hidden relative"
          aria-label="Resort masterplan aerial view placeholder"
        >
          {/* Gradient base */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #0D2137 0%, #1B3A5C 50%, #2E4F6F 100%)',
            }}
          />
          {/* Dot texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(200,169,110,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          {/* Corner crop marks */}
          {[
            'top-4 left-4 border-t border-l',
            'top-4 right-4 border-t border-r',
            'bottom-4 left-4 border-b border-l',
            'bottom-4 right-4 border-b border-r',
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute w-5 h-5 border-gold/30 ${pos}`}
              aria-hidden="true"
            />
          ))}
          {/* Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-px bg-gold/35" aria-hidden="true" />
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-white/22">
              Masterplan — Aerial View
            </p>
            <div className="w-10 h-px bg-gold/35" aria-hidden="true" />
          </div>
        </motion.div>

        {/* ── LeadingRE badge ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 pt-10 border-t border-cream-dark flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          {/* Logo placeholder — swap with actual SVG/Image */}
          <div
            className="flex-shrink-0 w-14 h-14 border flex items-center justify-center"
            style={{ borderColor: 'rgba(13,33,55,0.18)' }}
            aria-label="Leading Real Estate Companies of the World logo placeholder"
          >
            <span
              className="font-body text-[7px] uppercase tracking-widest text-center leading-tight"
              style={{ color: 'rgba(13,33,55,0.28)' }}
            >
              LOGO
            </span>
          </div>

          <div>
            <p
              className="font-body text-[10px] uppercase tracking-[0.18em]"
              style={{ color: 'rgba(44,44,44,0.42)' }}
            >
              Member of
            </p>
            <p
              className="font-body font-semibold text-sm mt-0.5"
              style={{ color: 'rgba(44,44,44,0.72)' }}
            >
              Leading Real Estate Companies of the World™
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
