'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FADE_UP_LG, FADE_UP_SM, STAGGER_MD, STAGGER_SM, EASE_OUT } from '@/lib/animations';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '6–8%',  label: 'Expected Annual Rental Yield'          },
  { value: '78%',   label: 'Peak Season Occupancy Rate'             },
  { value: '42%',   label: 'Property Value Growth — Istria 2019–2024' },
] as const;

const BENEFITS = [
  'Professional rental management — no owner involvement required',
  'Flexible owner usage — use your villa whenever you want',
  'All rental income managed and reported transparently',
  'Full legal compliance and guest registration handled',
  "Long-term capital appreciation in EU's fastest-growing luxury market",
  'No capital gains tax after 2 years for EU residents',
] as const;

const CROATIA_TAGS = [
  'EU member state',
  'Euro currency',
  'Schengen zone',
  'Established property law',
  'Strong demand from German, Austrian, Slovak markets',
] as const;

// ─── Stat block ───────────────────────────────────────────────────────────────

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={FADE_UP_LG}
      className="flex flex-col items-center text-center px-6 py-8 flex-1"
    >
      <span
        className="font-display font-light text-gold leading-none"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
      >
        {value}
      </span>
      <span className="font-body font-normal text-[12px] uppercase tracking-[0.14em] text-navy-deep/60 mt-3 max-w-[180px]">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function InvestmentCase() {
  return (
    <section id="investment" className="py-24" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={STAGGER_MD}
          className="text-center mb-16"
        >
          <motion.p
            variants={FADE_UP_SM}
            className="font-body font-bold text-xs uppercase tracking-[0.2em] text-gold"
          >
            The Investment
          </motion.p>

          <motion.h2
            variants={FADE_UP_LG}
            className="font-display font-light text-4xl md:text-5xl text-navy-deep mt-4"
            style={{ lineHeight: 1.1 }}
          >
            Your Villa Works For You — Year-Round
          </motion.h2>
        </motion.div>

        {/* ── Stat blocks ────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={STAGGER_MD}
          className="flex flex-col md:flex-row border border-gold/25 divide-y md:divide-y-0 md:divide-x divide-gold/25 mb-16"
        >
          {STATS.map((s) => (
            <StatBlock key={s.value} {...s} />
          ))}
        </motion.div>

        {/* ── Benefits list ──────────────────────────────────────────── */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={STAGGER_SM}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-16"
          role="list"
        >
          {BENEFITS.map((benefit) => (
            <motion.li
              key={benefit}
              variants={FADE_UP_SM}
              className="flex items-start gap-3"
              role="listitem"
            >
              <span
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(200,169,110,0.15)' }}
                aria-hidden="true"
              >
                <Check size={11} strokeWidth={2.5} className="text-gold" />
              </span>
              <span className="font-body font-normal text-[13px] text-navy-deep leading-relaxed">
                {benefit}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Croatia callout ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-10"
          style={{
            backgroundColor: '#0D2137',
            borderLeft: '4px solid #C8A96E',
            padding: '2rem 2rem 2rem 1.75rem',
          }}
        >
          <p className="font-body font-bold text-[13px] uppercase tracking-[0.15em] text-gold mb-3">
            Why Croatia? Why Now?
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {CROATIA_TAGS.map((tag) => (
              <span
                key={tag}
                className="font-body text-[11px] text-white/80 px-3 py-1 border border-white/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="font-display font-light italic text-xl md:text-2xl text-white/90 leading-snug"
          >
            &ldquo;Croatia is where smart European capital is moving — similar to Dubai a decade ago, but within the EU.&rdquo;
          </p>
        </motion.div>

        {/* ── Rental program explainer ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="text-center px-8 py-8 rounded-none"
          style={{ backgroundColor: 'rgba(200,169,110,0.07)', border: '1px solid rgba(200,169,110,0.2)' }}
        >
          <p className="font-body font-normal text-[13px] text-navy-deep/75 leading-relaxed max-w-2xl mx-auto">
            Petram Resort operates a fully managed rental programme — your villa is listed, maintained, and hosted by our on-site team while you earn. Owners receive quarterly income reports, flexible personal-use calendars, and a dedicated property manager. No effort required on your part.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
