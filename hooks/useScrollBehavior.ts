'use client';

import { useState, useEffect } from 'react';

export interface ScrollState {
  scrollY: number;
  isNavSolid: boolean;        // scrollY > 80
  isMobileCTAActive: boolean; // scrollY > window.innerHeight
  isLeadFormVisible: boolean; // #lead-form intersecting viewport
}

export function useScrollBehavior(): ScrollState {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const el = document.getElementById('lead-form');
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsLeadFormVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    scrollY,
    isNavSolid: scrollY > 80,
    isMobileCTAActive: scrollY > windowHeight,
    isLeadFormVisible,
  };
}
