import type { Variants } from 'framer-motion';

// Cubic-bezier equivalents — avoids Framer Motion v12 string-ease type narrowing issue
const EASE_OUT  = [0.22, 1, 0.36, 1] as const;  // ≈ 'easeOut'
const EASE_SOFT = [0.4, 0, 0.2, 1] as const;    // material-style

export const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

export const FADE_UP_SM: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const FADE_UP_LG: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

export const STAGGER_SM: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const STAGGER_MD: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const STAGGER_LG: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export { EASE_OUT, EASE_SOFT };
