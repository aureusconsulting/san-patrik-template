// Locale-specific layout kept as a thin pass-through.
// The locale segment exists only to catch old /en /de /sl etc. URLs
// and redirect them to / (handled in page.tsx).
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
