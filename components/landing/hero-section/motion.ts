import type { Transition, Variants } from "motion/react";

// Shared ease-out used across the project's motion (partners/experience).
const HERO_EASE = [0.2, 0, 0, 1] as const;

/** Quick, compositor-only fade/scale as the frame first appears. */
export const HERO_MOUNT_TRANSITION: Transition = {
    duration: 0.6,
    ease: HERO_EASE,
};

/** Frame "window → full-bleed" expand. Delay preserves the original 800ms settle. */
export const HERO_EXPAND_TRANSITION: Transition = {
    delay: 0.8,
    duration: 1.25,
    ease: HERO_EASE,
};

/** Overlay + content reveal, chained after the frame finishes expanding. */
export const HERO_REVEAL_TRANSITION: Transition = {
    duration: 1.25,
    ease: HERO_EASE,
};

/** Collapsed "window" the video frame starts from before expanding to full. */
export const HERO_FRAME = {
    height: 570,
    width: 1330,
} as const;


export const frameVariants: Variants = {
    hidden: {
        height: HERO_FRAME.height,
        scale: 0.98,
        width: HERO_FRAME.width,
        x: "-50%",
        y: "-50%",
    },
    collapsed: {
        height: HERO_FRAME.height,
        scale: 1,
        transition: HERO_MOUNT_TRANSITION,
        width: HERO_FRAME.width,
        x: "-50%",
        y: "-50%",
    },
    expanded: {
        height: "100%",
        scale: 1,
        transition: HERO_EXPAND_TRANSITION,
        width: "100%",
        x: "-50%",
        y: "-50%",
    },
};

export const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: HERO_REVEAL_TRANSITION },
};

export const contentVariants: Variants = {
    hidden: { opacity: 0, y: 193 },
    show: { opacity: 1, transition: HERO_REVEAL_TRANSITION, y: 0 },
};


export const headerVariants: Variants = {
    hidden: { y: -193 },
    show: { transition: HERO_REVEAL_TRANSITION, y: 0 },
};
