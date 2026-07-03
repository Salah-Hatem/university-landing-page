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

// Transitions live inside each variant (not a parent `transition` prop) so they
// reach the animating element — see the motion-variant-transition memo.
export const frameVariants: Variants = {
    // First paint: very slightly smaller so the frame eases in rather than
    // popping. Poster stays fully opaque (no LCP penalty); same collapsed size
    // as `collapsed`, so only `scale` moves — no layout animation.
    hidden: {
        height: HERO_FRAME.height,
        scale: 0.98,
        width: HERO_FRAME.width,
    },
    collapsed: {
        height: HERO_FRAME.height,
        scale: 1,
        transition: HERO_MOUNT_TRANSITION,
        width: HERO_FRAME.width,
    },
    expanded: {
        height: "100%",
        scale: 1,
        transition: HERO_EXPAND_TRANSITION,
        width: "100%",
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

// Header slides down in lockstep with the hero content reveal (driven by the same
// signal via HeroRevealContext). `-193` matches the old `headerReveal` keyframe.
export const headerVariants: Variants = {
    hidden: { y: -193 },
    show: { transition: HERO_REVEAL_TRANSITION, y: 0 },
};
