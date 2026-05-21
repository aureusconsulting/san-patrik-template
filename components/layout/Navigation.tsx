'use client';

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { gtmEvents } from '@/lib/gtm';

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.5 4.18 2 2 0 012.58 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.08-.93a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export function Navigation() {
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 80, 200], [
    'rgba(13, 33, 55, 0)',
    'rgba(13, 33, 55, 0.88)',
    'rgba(13, 33, 55, 1)',
  ]);

  const borderOpacity = useTransform(scrollY, [0, 80, 200], [0, 0.25, 0.45]);
  const boxShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 24px rgba(0,0,0,0.35)'],
  );

  return (
    <motion.header
      style={{ backgroundColor, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center"
    >
      {/* Animated bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-navy-light"
        style={{ opacity: borderOpacity }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 flex items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0"
          aria-label="San Patrik — home"
        >
          <Image
            src="/images/logos/san-patrik-logo.png"
            alt="San Patrik"
            width={140}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </a>

        {/* Phone — desktop center */}
        <div className="hidden md:flex flex-1 justify-center">
          <a
            href="tel:+385992172314"
            onClick={() => gtmEvents.callClicked()}
            className="font-body font-normal text-white text-[13px] tracking-[0.22em] hover:text-gold transition-colors duration-200"
          >
            +385 99 217 2314
          </a>
        </div>

        {/* Right cluster */}
        <div className="ml-auto md:ml-0 flex items-center gap-5">
          {/* CTA — desktop only */}
          <button
            onClick={() => { scrollToLeadForm(); gtmEvents.ctaClicked('nav_cta'); }}
            className="hidden md:block bg-gold text-navy-deep font-body font-bold text-[13px] px-6 py-3 rounded-none tracking-[0.1em] hover:bg-gold-light active:bg-gold-dark transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Request Villa Details
          </button>

          {/* Phone icon — mobile only */}
          <a
            href="tel:+385992172314"
            onClick={() => gtmEvents.callClicked()}
            className="md:hidden text-white hover:text-gold transition-colors duration-200"
            aria-label="Call +385 99 217 2314"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
