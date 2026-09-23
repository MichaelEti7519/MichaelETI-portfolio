/**
 * Shared Framer Motion variants and viewport triggers
 * Curated for a minimalist, high-craft editorial aesthetic
 * (smooth cubic-bezier easing, subtle translation distances, no bouncy cliches).
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutCubic = [0.21, 0.47, 0.32, 0.98] as const;

export const defaultViewport = {
  once: true,
  amount: 0.14,
  margin: '0px 0px -50px 0px',
} as const;

export const headerEntranceVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
    },
  },
};

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
      when: 'beforeChildren',
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
    },
  },
};

export const badgeStaggerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: easeOutExpo,
    },
  },
};
