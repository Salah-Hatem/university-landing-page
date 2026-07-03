"use client";

import {motion, useReducedMotion} from "motion/react";

type TimelineIndicatorProps = {
    activeIndex: number;
    total: number;
};

/**
 * Vertical progress rail beside the tabs. The gradient fill snaps to discrete
 * quarter steps (25% / 50% / 75% / 100%) based on the active tab and stretches
 * to the height of the tab list via `self-stretch`.
 */
export function TimelineIndicator({activeIndex, total}: TimelineIndicatorProps) {
    const prefersReducedMotion = useReducedMotion();
    const progress = ((activeIndex + 1) / total) * 100;

    return (
        <div
            className="relative w-2 min-w-2 shrink-0 self-stretch overflow-hidden rounded-full bg-[#6A728233]"
            role="progressbar"
            aria-label="Slide progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
        >
            <motion.div
                className="absolute inset-0 rounded-full bg-linear-to-b from-surface-tkh-primary to-surface-uni-secondary"
                initial={false}
                animate={{clipPath: `inset(0 0 ${100 - progress}% 0)`}}
                transition={
                    prefersReducedMotion
                        ? {duration: 0}
                        : {duration: 0.5, ease: [0.2, 0, 0, 1]}
                }
            />
        </div>
    );
}
