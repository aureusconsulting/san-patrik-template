import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLocale, type Locale } from './config';

async function loadNamespace(locale: Locale, ns: string) {
  return (await import(`../../messages/${locale}/${ns}.json`)).default;
}

export async function getTranslations(locale: Locale, namespaces: string[] = ['common']) {
  const i18n = createInstance();

  const resources: Record<string, Record<string, unknown>> = {};
  for (const ns of namespaces) {
    resources[ns] = await loadNamespace(locale, ns);
  }

  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources: {
      [locale]: resources,
    },
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

  return i18n.t.bind(i18n);
}
