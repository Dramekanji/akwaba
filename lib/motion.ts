import type { Variants } from "framer-motion";

/** Shared easing curve (smooth but snappy end) */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade in + rise slightly */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 4.0, ease: EASE }, // was 0.6
  },
};

/** Simple fade in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 4.0, ease: EASE }, // was 0.6
  },
};

/** Parent stagger controller (slower stagger by default) */
export const stagger = (staggerChildren: number = 0.2): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } }, // was 0.12
});
