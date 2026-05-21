'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { defaultLocale, type Locale } from './config';

let initialized = false;

export function initI18nClient(locale: Locale, resources: Record<string, Record<string, unknown>>) {
  if (initialized) {
    i18next.changeLanguage(locale);
    return;
  }
  initialized = true;

  i18next.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources: {
      [locale]: resources,
    },
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });
}

export { useTranslation };
