'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { gtmEvents } from '@/lib/gtm';
import { EASE_OUT } from '@/lib/animations';

// ─── Constants ────────────────────────────────────────────────────────────────

const AVAILABILITY = 12;
const WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=385992172314&text=Hi+Ivan%2C+I%27d+like+to+know+more+about+Petram+Resort+villas.';

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FinalCTA() {
  return (
    <footer id="final-cta" className="bg-navy-deep py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* ── Headline ───────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-white"
          style={{ lineHeight: 1.08 }}
        >
          Only {AVAILABILITY} Villas Remaining —
          <br className="hidden sm:block" />{' '}
          Secure Your Viewing Today
        </motion.h2>

        {/* ── Gold divider ───────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="w-16 h-px bg-gold mx-auto my-10 origin-center"
          aria-hidden="true"
        />

        {/* ── Primary CTA ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          <button
            onClick={() => {
              scrollToLeadForm();
              gtmEvents.ctaClicked('final_cta_primary');
            }}
            className="bg-gold text-navy-deep font-body font-bold text-[13px] uppercase tracking-[0.1em] px-12 py-4 hover:bg-gold-light active:bg-gold-dark transition-colors duration-200 cursor-pointer w-full sm:w-auto"
          >
            Request Villa Details
          </button>
        </motion.div>

        {/* ── Direct contact row ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <a
            href="tel:+385992172314"
            onClick={() => gtmEvents.callClicked()}
            className="flex items-center gap-2 font-body font-normal text-[13px] text-white/70 hover:text-gold transition-colors duration-200"
          >
            <Phone size={15} strokeWidth={1.5} className="text-gold flex-shrink-0" />
            +385 99 217 2314
          </a>

          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gtmEvents.whatsappClicked()}
            className="flex items-center gap-2 font-body font-normal text-[13px] text-white/70 hover:text-gold transition-colors duration-200"
          >
            <MessageCircle size={15} strokeWidth={1.5} className="text-gold flex-shrink-0" />
            WhatsApp Ivan
          </a>
        </motion.div>

        {/* ── Legal footer ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <a
            href="/privacy-policy"
            className="font-body font-light text-[11px] text-white/35 hover:text-white/60 transition-colors tracking-wide"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:block text-white/20" aria-hidden="true">·</span>
          <a
            href="/cookie-policy"
            className="font-body font-light text-[11px] text-white/35 hover:text-white/60 transition-colors tracking-wide"
          >
            Cookie Policy
          </a>
          <span className="hidden sm:block text-white/20" aria-hidden="true">·</span>
          <span className="font-body font-light text-[11px] text-white/30 tracking-wide">
            © 2026 San Patrik (Nobilis Expo d.o.o.)
          </span>
        </motion.div>

      </div>
    </footer>
  );
}
