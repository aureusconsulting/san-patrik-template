'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gtmEvents } from '@/lib/gtm';
import { EASE_OUT } from '@/lib/animations';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Can foreigners (EU and non-EU citizens) purchase property in Croatia?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Yes. EU citizens may purchase property in Croatia under the same conditions as Croatian nationals. Non-EU citizens may also purchase real estate in Croatia, subject to bilateral agreements and standard registration procedures. Our legal team handles the full acquisition process for international buyers.',
  },
  {
    question: 'What taxes and legal costs are involved in buying?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Property transfer tax in Croatia is 3% of the property value, payable by the buyer. Additional costs typically include notary fees, land registry fees, and legal representation — usually 1–2% combined. VAT applies to new-build properties from VAT-registered developers instead of transfer tax. Ivan can provide a full cost breakdown for your specific situation.',
  },
  {
    question: 'How does the Petram rental management program work?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Petram Resort operates a fully managed rental programme. Our on-site team handles listing, booking management, guest check-in and check-out, housekeeping, and maintenance. Owners receive quarterly income statements and can reserve their villa for personal use with advance notice. No action is required from owners.',
  },
  {
    question: 'What is the expected annual rental yield?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Based on comparable properties in Istria and our resort occupancy modelling, owners can expect 6–8% net annual rental yield. Peak season (June–August) typically sees 90%+ occupancy, with strong shoulder-season demand from the German, Austrian, and Slovenian markets.',
  },
  {
    question: 'What is included in the purchase price?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'All villas are delivered fully finished and fitted to resort standard. The purchase price includes interior furnishings, white goods, outdoor furniture, landscaping, and connection to resort utilities. A detailed inclusions schedule is provided with the reservation agreement.',
  },
  {
    question: 'When is the resort scheduled for completion?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Petram Resort is currently under development with construction progressing on schedule. Full resort completion and handover to owners is targeted for [DATE]. Buyers receive a construction progress report quarterly and are invited to a site visit prior to handover.',
  },
  {
    question: 'Can I finance the purchase with an EU mortgage?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Yes. Croatian banks and several EU lenders offer mortgage financing for property in Croatia. Typical loan-to-value ratios range from 60–70%. We work with preferred mortgage brokers who specialise in cross-border financing for international buyers and can introduce you to the right contacts.',
  },
  {
    question: 'What are my owner usage rights during peak season?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Owner usage is flexible. You may block weeks for personal use at any time, with reasonable advance notice during peak season (typically 90 days). There is no restriction on the total number of weeks you may use your villa. Owners who choose not to use their villa during peak season participate more fully in the rental income programme.',
  },
  {
    question: 'Is the investment legally protected in Croatia?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Croatia is an EU member state with a well-established legal framework for real estate ownership. Property rights are registered in the Land Registry (Zemljišna knjiga), which is publicly accessible and legally binding. All Petram transactions are handled by licensed Croatian notaries and registered with local authorities.',
  },
  {
    question: 'How do I arrange a viewing or investment trip?',
    // PLACEHOLDER: Ivan to fill
    answer:
      'Contact Ivan directly via the form on this page, by phone, or via WhatsApp. We organise private investment site visits, including airport transfers, accommodation in Istria, and a guided resort presentation. Most visits take place over one to two days and are arranged around your schedule.',
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-cream-dark last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="font-body font-semibold text-[14px] text-navy-deep leading-snug group-hover:text-gold transition-colors duration-200 flex-1"
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="flex-shrink-0 text-gold"
          aria-hidden="true"
        >
          <ChevronDown size={18} strokeWidth={1.75} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-body font-light text-[13px] text-charcoal leading-loose pb-5 max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
      gtmEvents.faqOpened(index, FAQ_ITEMS[index].question);
    }
  };

  return (
    <section id="faq" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <p className="font-body font-bold text-xs uppercase tracking-[0.2em] text-gold">
            Frequently Asked
          </p>
          <h2
            className="font-display font-light text-4xl md:text-5xl text-navy-deep mt-4"
            style={{ lineHeight: 1.1 }}
          >
            Your Questions, Answered
          </h2>
        </motion.div>

        {/* ── Accordion ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="border-t border-cream-dark"
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
