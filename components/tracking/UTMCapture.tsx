'use client';

import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

export function UTMCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) sessionStorage.setItem(key, val);
    });
  }, []);

  return null;
}
