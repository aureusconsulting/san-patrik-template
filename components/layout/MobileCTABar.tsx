'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useScrollBehavior } from '@/hooks/useScrollBehavior';
import { gtmEvents } from '@/lib/gtm';

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

export function MobileCTABar() {
  const { isMobileCTAActive, isLeadFormVisible } = useScrollBehavior();
  const visible = isMobileCTAActive && !isLeadFormVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-cta-bar"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden flex"
          style={{ height: '56px', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <a
            href="tel:+385992172314"
            onClick={() => gtmEvents.callClicked()}
            className="flex-1 flex items-center justify-center gap-2 bg-white border-t border-r border-navy-deep text-navy-deep font-body font-semibold text-sm tracking-wide"
          >
            <span aria-hidden="true">📞</span>
            <span>Call Ivan</span>
          </a>

          <button
            onClick={() => { scrollToLeadForm(); gtmEvents.ctaClicked('mobile_cta_bar'); }}
            className="flex-1 flex items-center justify-center bg-gold text-navy-deep font-body font-bold text-sm tracking-wide border-t border-gold-dark"
          >
            Request Details
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
