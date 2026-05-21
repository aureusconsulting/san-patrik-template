'use client';

import { useEffect } from 'react';
import { gtmEvents } from '@/lib/gtm';

export function TrackPageVisit() {
  useEffect(() => {
    gtmEvents.lpVisit();
  }, []);

  return null;
}
