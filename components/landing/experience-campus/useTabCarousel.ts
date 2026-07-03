"use client";

import {useCallback, useEffect, useState} from "react";
import {useReducedMotion} from "motion/react";

type TabCarousel = {
    activeIndex: number;
    setActive: (index: number) => void;
};

/**
 * Drives the Experience carousel: tracks the active tab and auto-advances on a
 * timer. Selecting a tab manually jumps to it and restarts the timer (the
 * interval effect re-runs whenever `activeIndex` changes). Auto-advance is
 * disabled for users who prefer reduced motion.
 */
export function useTabCarousel(count: number, intervalMs: number): TabCarousel {
    const [activeIndex, setActiveIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    const setActive = useCallback(
        (index: number) => {
            setActiveIndex(((index % count) + count) % count);
        },
        [count],
    );

    useEffect(() => {
        if (prefersReducedMotion || count <= 1) {
            return;
        }

        const timerId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % count);
        }, intervalMs);

        return () => window.clearInterval(timerId);
    }, [activeIndex, count, intervalMs, prefersReducedMotion]);

    return {activeIndex, setActive};
}
