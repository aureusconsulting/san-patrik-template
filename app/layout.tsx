import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { MetaPixel }       from '@/components/tracking/MetaPixel';
import { LinkedInInsight } from '@/components/tracking/LinkedInInsight';
import { CookieConsent }   from '@/components/tracking/CookieConsent';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Petram Resort & Residences',
    template: '%s | Petram Resort & Residences',
  },
  description:
    'Ultra-premium stone villas with private pools on the Istrian coast, Savudrija, Croatia.',
  metadataBase: new URL('https://petram.sanpatrik.co'),
};

// GTM container: GTM-MNH4R46C
// NOTE: Confirm with client whether to reuse the main site container or create a new one for petram.sanpatrik.co
const GTM_ID = 'GTM-MNH4R46C';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning because middleware sets lang via x-locale header;
    // the [locale] layout propagates the correct lang attribute at render time.
    <html
      className={`${cormorantGaramond.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="font-body bg-cream text-charcoal antialiased">
        {/* GTM noscript fallback — immediately after <body> open */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        {children}

        {/* Pixel tracking — renders null until IDs are filled in */}
        <MetaPixel />
        <LinkedInInsight />

        {/* Cookie consent — replace with real CMP before go-live */}
        <CookieConsent />
      </body>
    </html>
  );
}
