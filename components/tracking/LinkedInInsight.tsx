'use client';

// LINKEDIN PARTNER ID: TODO — add from LinkedIn Campaign Manager
// Replace PARTNER_ID below with your real ID, e.g. '1234567'
// Then uncomment the Script block.

import Script from 'next/script';

const PARTNER_ID = 'TODO'; // ← replace

export function LinkedInInsight() {
  if (PARTNER_ID === 'TODO') return null;

  return (
    <Script
      id="linkedin-insight"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          _linkedin_partner_id = "${PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript"; b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `,
      }}
    />
  );
}
