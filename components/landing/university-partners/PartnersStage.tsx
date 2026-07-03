"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Transition, type Variants } from "motion/react";

import type { University } from "@/payload-types";

import { UniversityCard } from "./UniversityCard";

type PartnersStageProps = {
    /** Server-rendered header block; fades in as the cards part. */
    header: ReactNode;
    /** The four partner cards, in fixed stage-slot order. */
    cards: University[];
};

/** The stage is authored on a fixed 1920×1687 canvas; below 1920 it scales to fit. */
const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1687;
const CARD_WRAPPER = { width: 1480.672, height: 748.785 };
const REVEAL_TRANSITION: Transition = { duration: 0.8, ease: [0.2, 0, 0, 1] };
const HOVER_TRANSITION: Transition = { duration: 1, ease: [0.2, 0, 0, 1] };


const CARD_LAYOUTS = [
    {
        layout: { anchor: "left", offset: -803.34, top: 77, rotate: 4, from: { x: 321, y: 32 } },
        hover: { focus: { x: 951, y: 50 }, recede: { x: -468 } },
    },
    {
        layout: { anchor: "right", offset: -809.67, top: 77.63, rotate: -4, from: { x: -327, y: 32 } },
        hover: { focus: { x: -957, y: 49 }, recede: { x: 461 } },
    },
    {
        layout: { anchor: "left", offset: -810, top: 860.63, rotate: -4, from: { x: 321, y: -32 } },
        hover: { focus: { x: 958, y: -49 }, recede: { x: -463 } },
    },
    {
        layout: { anchor: "right", offset: -809.33, top: 861, rotate: 4, from: { x: -320, y: -32 } },
        hover: { focus: { x: -957, y: -49 }, recede: { x: 466 } },
    },
] as const;

// The reveal transition lives inside the variants (not the parent's `transition`
// prop) so it actually drives each card/header move — a parent transition does
// not propagate to children animating via variant labels, which left the parting
// reveal falling back to motion's snappy default spring.
const headerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: REVEAL_TRANSITION },
};

const cardVariants: Variants = {
    hidden: (from: { x: number; y: number }) => ({ x: from.x, y: from.y }),
    show: { x: 0, y: 0, transition: REVEAL_TRANSITION },
};

/**
 * Uniform scale that fits the fixed-pixel stage into the viewport: full size at
 * ≥1920, shrinking proportionally down to the tablet breakpoint (1281px) where
 * the stage takes over from the static grid. Measured on the client so the
 * authored layout and parting animation are preserved exactly — just smaller.
 */
function useStageScale() {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => setScale(Math.min(1, window.innerWidth / STAGE_WIDTH));
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return scale;
}

/**
 * Resolve a card's hover transform from the currently focused index: the focused
 * card slides in and straightens, its siblings slide out, everything else rests.
 * Reduced motion (or no active card) keeps every card at its resting transform.
 */
function getCardInteraction(
    slot: (typeof CARD_LAYOUTS)[number],
    index: number,
    activeIndex: number | null,
    prefersReducedMotion: boolean | null,
) {
    const { rotate } = slot.layout;

    if (prefersReducedMotion || activeIndex === null) {
        return { x: 0, y: 0, rotate };
    }
    if (index === activeIndex) {
        return { x: slot.hover.focus.x, y: slot.hover.focus.y, rotate: 0 };
    }
    return { x: slot.hover.recede.x, y: 0, rotate };
}

export function PartnersStage({ header, cards }: PartnersStageProps) {
    const prefersReducedMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [revealed, setRevealed] = useState(false);
    const scale = useStageScale();

    const reveal = () => setRevealed(true);

    const activate = (index: number) => () => {
        if (!prefersReducedMotion) setActiveIndex(index);
    };
    const clear = () => setActiveIndex(null);

    return (
        <div
            className="hidden w-full justify-center overflow-hidden tablet:flex"
            style={{ height: STAGE_HEIGHT * scale }}
        >
            <div
                className="relative h-[1687px] w-[1920px] shrink-0"
                style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
            >
                <motion.div
                    className="absolute inset-0"
                    initial={prefersReducedMotion ? "show" : "hidden"}
                    animate={prefersReducedMotion || revealed ? "show" : "hidden"}
                    onMouseEnter={reveal}
                >
                    {/* Centered header revealed in the gap, hidden while a card is focused */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div variants={headerVariants}>
                            <motion.div
                                className="flex w-[572px] flex-col items-center gap-xl"
                                initial={false}
                                animate={{ opacity: activeIndex === null ? 1 : 0 }}
                                transition={HOVER_TRANSITION}
                            >
                                {header}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Four cards: part outward on reveal, then focus/recede on hover */}
                    {cards.map((card, index) => {
                        const slot = CARD_LAYOUTS[index];
                        return (
                            <motion.div
                                key={index}
                                className="absolute flex items-center justify-center"
                                style={{
                                    width: CARD_WRAPPER.width,
                                    height: CARD_WRAPPER.height,
                                    top: slot.layout.top,
                                    [slot.layout.anchor]: slot.layout.offset,
                                    zIndex: index === activeIndex ? 30 : 10,
                                }}
                                variants={cardVariants}
                                custom={slot.layout.from}
                            >
                                <motion.div
                                    className="h-162.5 w-360 flex-none"
                                    initial={false}
                                    animate={getCardInteraction(
                                        slot,
                                        index,
                                        activeIndex,
                                        prefersReducedMotion,
                                    )}
                                    transition={HOVER_TRANSITION}
                                    onHoverStart={activate(index)}
                                    onHoverEnd={clear}
                                    onFocusCapture={activate(index)}
                                    onBlurCapture={clear}
                                >
                                    <UniversityCard university={card} />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
