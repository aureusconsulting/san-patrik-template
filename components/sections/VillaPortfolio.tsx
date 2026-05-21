'use client';

import { motion } from 'framer-motion';
import { BedDouble, Bath, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FADE_UP_LG, STAGGER_MD, STAGGER_LG } from '@/lib/animations';
import { gtmEvents } from '@/lib/gtm';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Villa {
  type: string;
  name: string;
  size: string;
  beds: number;
  baths: number;
  feature: string;
  price: string;
  soldOut: boolean;
  cardGradient: string;
}

const VILLAS: Villa[] = [
  {
    type: 'Type I',
    name: 'Garden Villa',
    size: '280 – 320 m²',
    beds: 4,
    baths: 5,
    feature: '🏊 Private Rooftop Pool',
    price: 'From €1,700,000',
    soldOut: false,
    cardGradient: 'linear-gradient(160deg, #1B3A5C 0%, #0D2137 100%)',
  },
  {
    type: 'Type II',
    name: 'Sea View Villa',
    size: '320 – 380 m²',
    beds: 4,
    baths: 5,
    feature: '🌊 Panoramic Sea Terrace',
    price: 'From €2,100,000',
    soldOut: false,
    cardGradient: 'linear-gradient(160deg, #2E4F6F 0%, #0D2137 100%)',
  },
  {
    type: 'Type III',
    name: 'Cliff Penthouse',
    size: '400 – 450 m²',
    beds: 5,
    baths: 6,
    feature: '✨ Rooftop Cinema & Terrace',
    price: 'From €2,800,000',
    soldOut: true,
    cardGradient: 'linear-gradient(160deg, #0A1825 0%, #152d45 100%)',
  },
  {
    type: 'Type IV',
    name: 'Signature Estate',
    size: '480 – 550 m²',
    beds: 6,
    baths: 7,
    feature: '🏆 Private Cliffside Estate',
    price: 'From €3,500,000',
    soldOut: false,
    cardGradient: 'linear-gradient(160deg, #1a1210 0%, #2C1E14 100%)',
  },
];

const AVAILABILITY = 12;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Villa card ───────────────────────────────────────────────────────────────

function VillaCard({ villa }: { villa: Villa }) {
  return (
    <motion.article
      variants={FADE_UP_LG}
      whileHover={villa.soldOut ? {} : { y: -6, transition: { duration: 0.22 } }}
      className="flex flex-col overflow-hidden border border-gold/20"
      style={{ backgroundColor: '#1B3A5C' }}
    >
      {/* ── Card image ─────────────────────────────────────────────── */}
      <div className="aspect-video w-full relative overflow-hidden">
        {/* Gradient placeholder */}
        <div
          className="absolute inset-0"
          style={{ background: villa.cardGradient }}
          aria-hidden="true"
        />
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(200,169,110,0.04) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(13,33,55,0.6) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Type badge — top-left */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1"
          style={{ backgroundColor: 'rgba(13,33,55,0.75)' }}
        >
          <span className="font-body font-bold text-[10px] uppercase tracking-[0.15em] text-gold">
            {villa.type}
          </span>
        </div>

        {/* Sold-out overlay */}
        {villa.soldOut && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(13,33,55,0.82)' }}
            aria-label="Villa sold out"
          >
            <div className="border px-7 py-2.5" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
              <span className="font-body font-bold text-xs uppercase tracking-[0.35em] text-white/75">
                Sold Out
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">
        {/* Name + size */}
        <div>
          <p className="font-display font-light text-2xl text-white leading-tight">
            {villa.name}
          </p>
          <p className="font-body text-xs mt-1 tracking-wide" style={{ color: 'rgba(255,255,255,0.42)' }}>
            {villa.size}
          </p>
        </div>

        {/* Bed / Bath */}
        <div className="flex items-center gap-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
          <span className="flex items-center gap-1.5 font-body text-xs">
            <BedDouble size={13} strokeWidth={1.5} aria-hidden="true" />
            {villa.beds} bed
          </span>
          <span className="w-px h-3" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }} aria-hidden="true" />
          <span className="flex items-center gap-1.5 font-body text-xs">
            <Bath size={13} strokeWidth={1.5} aria-hidden="true" />
            {villa.baths} bath
          </span>
        </div>

        {/* Feature badge */}
        <span
          className="self-start font-body text-[11px] text-gold px-3 py-1 tracking-wide border"
          style={{ borderColor: 'rgba(200,169,110,0.3)' }}
        >
          {villa.feature}
        </span>

        {/* Price */}
        <p className="font-display font-light text-2xl text-gold mt-auto">
          {villa.price}
        </p>

        {/* CTA */}
        <button
          onClick={villa.soldOut ? undefined : () => { scrollToLeadForm(); gtmEvents.villaTypeViewed(villa.name); }}
          disabled={villa.soldOut}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3 border font-body font-semibold text-[12px] uppercase tracking-[0.1em] transition-colors duration-200',
            villa.soldOut
              ? 'border-white/15 text-white/25 cursor-not-allowed'
              : 'border-white text-white hover:bg-gold hover:border-gold hover:text-navy-deep cursor-pointer',
          )}
          aria-label={
            villa.soldOut
              ? `${villa.name} is sold out`
              : `Request details for ${villa.name}`
          }
        >
          {villa.soldOut ? (
            'Unavailable'
          ) : (
            <>
              View Villa Details
              <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VillaPortfolio() {
  return (
    <section id="villas" className="bg-navy-deep py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={STAGGER_MD}
          className="text-center"
        >
          <motion.p
            variants={FADE_UP_LG}
            className="font-body font-bold text-xs uppercase tracking-[0.2em] text-gold"
          >
            Villa Portfolio
          </motion.p>

          <motion.h2
            variants={FADE_UP_LG}
            className="font-display font-light text-4xl md:text-5xl text-white mt-4"
            style={{ lineHeight: 1.1 }}
          >
            Choose Your Villa — 55 Residences, Four Distinct Types
          </motion.h2>

          <motion.p
            variants={FADE_UP_LG}
            className="font-body text-[13px] text-gold mt-3 tracking-wide"
          >
            ⚡ Limited availability — only {AVAILABILITY} villas remaining
          </motion.p>
        </motion.div>

        {/* ── Gold divider ───────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-16 h-px bg-gold mx-auto mt-10 mb-14 origin-center"
          aria-hidden="true"
        />

        {/* ── Cards ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER_LG}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {VILLAS.map((villa) => (
            <VillaCard key={villa.name} villa={villa} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
