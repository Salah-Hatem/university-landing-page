"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { headerVariants } from "../hero-section/motion";
import { useHeroReveal } from "../hero-section/HeroRevealContext";

type HeaderRevealProps = {
    children: ReactNode;
    className?: string;
};

/**Thin client wrapper so the static `Header` stays a server component while its
 * outer element slides in together with the hero content (shared signal via
 * HeroRevealContext).
 */
export function HeaderReveal({ children, className }: HeaderRevealProps) {
    const { revealed, prefersReducedMotion } = useHeroReveal();

    return (
        <motion.header
            aria-label="Site header"
            className={className}
            variants={headerVariants}
            initial={prefersReducedMotion ? "show" : "hidden"}
            animate={revealed ? "show" : "hidden"}
        >
            {children}
        </motion.header>
    );
}
