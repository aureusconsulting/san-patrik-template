import { ContentProvider }   from '@/lib/content-context';
import { fetchSiteContent }  from '@/lib/sanity/fetch';
import { Navigation }        from '@/components/layout/Navigation';
import { WhatsAppButton }    from '@/components/layout/WhatsAppButton';
import { MobileCTABar }      from '@/components/layout/MobileCTABar';
import { Hero }              from '@/components/sections/Hero';
import { WhatIsProject }     from '@/components/sections/WhatIsProject';
import { VillaPortfolio }    from '@/components/sections/VillaPortfolio';
import { Lifestyle }         from '@/components/sections/Lifestyle';
import { InvestmentCase }    from '@/components/sections/InvestmentCase';
import { Location }          from '@/components/sections/Location';
import { AgentLeadForm }     from '@/components/sections/AgentLeadForm';
import { SocialProof }       from '@/components/sections/SocialProof';
import { FAQ }               from '@/components/sections/FAQ';
import { FinalCTA }          from '@/components/sections/FinalCTA';
import { TrackPageVisit }    from '@/components/tracking/TrackPageVisit';
import { UTMCapture }        from '@/components/tracking/UTMCapture';

export const revalidate = 60; // ISR: rebuild every 60s after a Sanity save

export default async function Home() {
  const pageContent = await fetchSiteContent();

  return (
    <ContentProvider value={pageContent}>
      <Navigation />

      <main>
        <Hero />
        <WhatIsProject />
        <VillaPortfolio />
        <Lifestyle />
        <InvestmentCase />
        <Location />
        <AgentLeadForm />
        <SocialProof />
        <FAQ />
      </main>

      <FinalCTA />

      <WhatsAppButton />
      <MobileCTABar />

      {/* Tracking — no visual output */}
      <TrackPageVisit />
      <UTMCapture />
    </ContentProvider>
  );
}
