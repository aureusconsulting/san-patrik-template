'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Waves, TrendingUp, CircleDollarSign, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animations';
import { gtmEvents } from '@/lib/gtm';
import { content } from '@/lib/content';

const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Stat item ────────────────────────────────────────────────────────────────

const STAT_ICONS = [Building2, Waves, TrendingUp, CircleDollarSign] as const;

function StatItem({
  value,
  label,
  Icon,
  className,
}: {
  value: string;
  label: string;
  Icon: (typeof STAT_ICONS)[number];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <Icon
        size={22}
        strokeWidth={1.4}
        className="text-gold mb-2.5"
        aria-hidden="true"
      />
      <span className="font-body font-bold text-white text-[15px] leading-none">
        {value}
      </span>
      <span className="font-body font-normal text-[10px] uppercase tracking-[0.14em] text-white/55 mt-1.5">
        {label}
      </span>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <>
      {/* Desktop — horizontal row with gold dividers */}
      <div className="hidden md:flex items-center justify-center" role="list">
        {content.hero.stats.map((stat, i) => (
          <div
            key={`${stat.value}-${stat.label}`}
            className="flex items-center"
            role="listitem"
          >
            <StatItem
              value={stat.value}
              label={stat.label}
              Icon={STAT_ICONS[i]}
              className="px-8 lg:px-10"
            />
            {i < content.hero.stats.length - 1 && (
              <div className="w-px h-10 bg-gold/25 flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile — 2 × 2 grid */}
      <div
        className="grid grid-cols-2 gap-x-10 gap-y-5 md:hidden max-w-[300px] mx-auto"
        role="list"
      >
        {content.hero.stats.map((stat, i) => (
          <StatItem
            key={`${stat.value}-${stat.label}`}
            value={stat.value}
            label={stat.label}
            Icon={STAT_ICONS[i]}
          />
        ))}
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const heroRef                         = useRef<HTMLElement>(null);
  const [scrolled50, setScrolled50]     = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  // Scroll indicator: fade in after 2 s, hide once user scrolls 50 px
  useEffect(() => {
    const t = setTimeout(() => setShowIndicator(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled50(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden flex items-center pt-[72px]"
      aria-label="Petram Resort hero"
    >
      {/* ── VIMEO VIDEO BACKGROUND ──────────────────────────────────────────── */}
      {/*
        Vimeo background mode (&background=1): autoplays silently, no controls,
        no Vimeo branding. The cover-fit technique (177.77vh / 56.25vw) ensures
        the 16:9 video fills the viewport at any aspect ratio without letterboxing.
        frameBorder="0" suppresses the default iframe border.
      */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          src={`https://player.vimeo.com/video/${content.hero.vimeoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
          style={{
            position:  'absolute',
            top:       '50%',
            left:      '50%',
            width:     '177.77vh',
            minWidth:  '100%',
            height:    '56.25vw',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          allow="autoplay; fullscreen"
          frameBorder="0"
          title="Petram Resort background video"
        />

        {/* Subtle gold dot-texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(200,169,110,0.055) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* ── DARK OVERLAY ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(13, 33, 55, 0.60)' }}
        aria-hidden="true"
      />

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      {/*
        pb-20 on mobile creates clearance below the CTA buttons so the
        absolute-positioned scroll indicator (bottom-8) never overlaps them.
        sm:pb-0 removes it on larger screens where the layout is taller.
      */}
      <div className="relative z-10 w-full px-6 pb-20 sm:pb-0">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="font-body font-bold text-sm uppercase tracking-[0.15em] text-gold"
          >
            {content.hero.eyebrow}
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: EASE_OUT }}
            className="font-display font-light text-5xl md:text-7xl text-white mt-5"
            style={{ lineHeight: 1.08 }}
          >
            {content.hero.headline.includes("'") ? (
              <>
                Where Europe&apos;s Elite
                <br className="hidden sm:block" />{' '}
                Choose to Invest
              </>
            ) : (
              content.hero.headline
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            className="font-body font-light text-xl mt-4 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            {content.hero.subheadline}
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.48, ease: EASE_OUT }}
            className="w-16 h-px bg-gold mx-auto my-8 origin-center"
            aria-hidden="true"
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.62 }}
          >
            <StatsBar />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82, ease: EASE_OUT }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => { scrollToLeadForm(); gtmEvents.ctaClicked('hero_primary'); }}
              className="bg-gold text-navy-deep font-body font-bold text-[13px] uppercase tracking-[0.1em] px-10 py-4 rounded-none hover:bg-gold-light active:bg-gold-dark transition-colors duration-200 w-full sm:w-auto cursor-pointer"
            >
              {content.hero.ctaPrimary}
            </button>
            <a
              href={`tel:${content.nav.phone}`}
              onClick={() => gtmEvents.callClicked()}
              className="border border-white text-white font-body font-bold text-[13px] uppercase tracking-[0.1em] px-10 py-4 rounded-none hover:bg-white/10 active:bg-white/20 transition-colors duration-200 w-full sm:w-auto text-center"
            >
              {content.hero.ctaPhone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showIndicator && !scrolled50 && (
          <motion.div
            key="scroll-ind"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.28em] text-white/35">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: EASE_IN_OUT }}
            >
              <ChevronDown size={22} strokeWidth={1.25} className="text-gold/65" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
