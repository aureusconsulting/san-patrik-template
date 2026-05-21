// GTM dataLayer type augmentation
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
};

// ─── Typed event helpers ──────────────────────────────────────────────────────

export const gtmEvents = {
  /** Fired once on page mount */
  lpVisit: () =>
    pushEvent('petram_lp_visit'),

  /** Any CTA button click — pass a short label for the source */
  ctaClicked: (label: string) =>
    pushEvent('petram_cta_clicked', { cta_label: label }),

  /** tel: link clicked */
  callClicked: () =>
    pushEvent('petram_call_clicked'),

  /** WhatsApp button or link clicked */
  whatsappClicked: () =>
    pushEvent('petram_whatsapp_clicked'),

  /** First focus on any lead form field */
  formStarted: () =>
    pushEvent('petram_form_started'),

  /** Lead form submitted successfully */
  formSubmitted: (params: { country: string; villaType: string }) =>
    pushEvent('petram_form_submitted', params),

  /** Villa card CTA clicked — pass villa name */
  villaTypeViewed: (villaType: string) =>
    pushEvent('petram_villa_type_viewed', { villa_type: villaType }),

  /** FAQ accordion item opened */
  faqOpened: (faqIndex: number, faqQuestion: string) =>
    pushEvent('petram_faq_opened', { faq_index: faqIndex, faq_question: faqQuestion }),

  /** Language switcher used */
  langSwitched: (languageSelected: string) =>
    pushEvent('petram_lang_switched', { language_selected: languageSelected }),
};
