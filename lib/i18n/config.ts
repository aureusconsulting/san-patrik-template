export const locales = ['en', 'de', 'sl', 'sk', 'cs', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  sl: 'Slovenščina',
  sk: 'Slovenčina',
  cs: 'Čeština',
  es: 'Español',
};

export const localeSlugs: Record<Locale, string> = {
  en: 'petram-villas',
  de: 'petram-villen',
  sl: 'petram-vile',
  sk: 'petram-vily',
  cs: 'petram-vily',
  es: 'petram-villas',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
