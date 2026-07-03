"use client";

import { motion } from "motion/react";

import { overlayVariants } from "./motion";

type HeroOverlayProps = {
    /** Reveal label driven by the hero orchestrator: "hidden" until the frame settles. */
    animate: "hidden" | "show";
};

export function HeroOverlay({ animate }: HeroOverlayProps) {
    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            variants={overlayVariants}
            initial="hidden"
            animate={animate}
            style={{
                background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50.06%, rgba(0, 0, 0, 0.50) 81.3%)",
            }}
        />
    );
}
