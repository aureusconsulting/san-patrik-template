'use client';

// Use the client-component variant of NextStudio, not the server wrapper.
// The server wrapper (next-sanity/studio) uses preloadModule() and then passes
// Sanity's internal router objects (with functions) across the Server→Client
// boundary, which React 19 / Next.js 16 forbids. The client-component variant
// skips all of that — the Studio is fully client-side rendered.
import { NextStudio } from 'next-sanity/studio/client-component';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
