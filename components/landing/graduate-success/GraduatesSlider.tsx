"use client";

import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import GraduateCard from "@/components/landing/graduate-success/GraduateCard";
import {getGraduateSuccessData, TESTIMONIALS} from "@/components/landing/graduate-success/data";
import {NextOutlineIcon, PrevOutlineIcon} from "@/components/landing/header/icons";
import {INTERACTIVE_CARD, INTERACTIVE_ICON_BUTTON} from "@/components/ui/interaction";

/** One resolved testimonial from the CMS adapter. */
type Testimonial = ReturnType<typeof getGraduateSuccessData>["testimonials"][number];

/**
 * How many cards are shown at once. A fan is symmetric, so ODD numbers look
 * balanced (one flat card centred); an even number leans to one side.
 */
const VISIBLE =5;
const LEFT = Math.floor((VISIBLE - 1) / 2); // cards to the left of centre
const RIGHT = VISIBLE - 1 - LEFT; // cards to the right of centre

/** Extra ring kept mounted on each side so cards animate in/out instead of popping. */
const STAGING = 1;

/** How fast the fan opens. `x`/`y` are percentages of the card's own size. */
const STEP = {x: 26, y: 5, rot: 6} as const;

const TRANSITION = "transform 520ms cubic-bezier(.22,.61,.36,1), opacity 400ms ease";

type Ring = {
    /** Horizontal spread, % of card width. */
    x: number;
    /** Downward drop, % of card height. */
    y: number;
    /** Tilt, degrees. */
    rot: number;
    scale: number;
    z: number;
};


function ring(offset: number): Ring {
    const distance = Math.abs(offset);
    const direction = Math.sign(offset);
    return {
        x: STEP.x * Math.pow(distance, 0.9) * direction,
        y: STEP.y * Math.pow(distance, 1.3),
        rot: STEP.rot * distance * direction,
        scale: 1 - 0.03 * distance, // subtle shrink outward
        z: 50 - distance, // centre stays on top
    };
}

type GraduatesSliderProps = {
    items?: Testimonial[];
    /** Section call-to-action, composed into the per-breakpoint controls row. */
    cta?: ReactNode;
};

export default function GraduatesSlider({items = TESTIMONIALS, cta}: GraduatesSliderProps) {
    const count = items.length;
    const [active, setActive] = useState(() => Math.floor(count / 2));

    const go = useCallback(
        (delta: number) => setActive((current) => (current + delta + count) % count),
        [count],
    );

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    // Signed distance of each card from the active one, wrapped to (-count/2, count/2].
    // Keep only the visible window plus one staging ring on each side; the rest unmount.
    const slots = useMemo(
        () =>
            items
                .map((testimonial, index) => {
                    let diff = index - active;
                    if (diff > count / 2) diff -= count;
                    if (diff <= -count / 2) diff += count;
                    return {testimonial, index, diff};
                })
                .filter(({diff}) => diff >= -(LEFT + STAGING) && diff <= RIGHT + STAGING),
        [items, active, count],
    );

    return (
        <div className="flex w-full flex-col items-center gap-7xl tablet:gap-2xl">
            {/* Fan — prev/next float over it only on desktop */}
            <div className="relative flex w-full items-center justify-center">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className={`absolute left-5xl top-1/2 z-[60] hidden -translate-y-1/2 rounded-full tablet:block ${INTERACTIVE_ICON_BUTTON}`}
                >
                    <PrevOutlineIcon className="size-14 text-icon-tkh-primary"/>
                </button>

                <ul
                    className="relative h-[524px] max-w-243.5 mobile:h-[1108px] mobile:w-[974px] tablet:h-203.5 tablet:w-343.75"
                    role="group"
                    aria-roledescription="carousel"
                    aria-label="Graduate testimonials"
                >
                    {slots.map(({testimonial, index, diff}) => {
                        const isActive = diff === 0;
                        const inWindow = diff >= -LEFT && diff <= RIGHT;
                        const f = ring(diff);
                        const transform = `translate(-50%, 0) translateX(${f.x}%) translateY(${f.y}%) rotate(${f.rot}deg) scale(${f.scale})`;

                        return (
                            <li
                                key={testimonial.id}
                                aria-hidden={!inWindow}
                                className="absolute left-1/2 top-6 max-w-243.5 w-[372px] mobile:w-243.5 tablet:w-auto"
                                style={{
                                    transform,
                                    transformOrigin: "center center",
                                    zIndex: f.z,
                                    opacity: inWindow ? 1 : 0,
                                    pointerEvents: inWindow ? "auto" : "none",
                                    transition: TRANSITION,
                                }}
                            >
                                {isActive ? (
                                    <GraduateCard testimonial={testimonial}/>
                                ) : (
                                    <button
                                        type="button"
                                        tabIndex={inWindow ? 0 : -1}
                                        onClick={() => setActive(index)}
                                        aria-label={`Show testimonial from ${testimonial.graduateName}`}
                                        className={`cursor-pointer ${INTERACTIVE_CARD}`}
                                    >
                                        <GraduateCard testimonial={testimonial}/>
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className={`absolute right-5xl top-1/2 z-[60] hidden -translate-y-1/2 rounded-full tablet:block ${INTERACTIVE_ICON_BUTTON}`}
                >
                    <NextOutlineIcon className="size-14 text-icon-tkh-primary"/>
                </button>
            </div>

            {/* Bottom controls bar — mobile stacks centred, tablet rows arrows-left + CTA-right */}
            <div className="flex w-full flex-col items-center gap-xl tablet:hidden mobile:flex-row mobile:justify-between mobile:gap-0">
                <div className="flex items-center gap-l">
                    <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={`rounded-full ${INTERACTIVE_ICON_BUTTON}`}>
                        <PrevOutlineIcon className="size-14 text-icon-tkh-primary"/>
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={`rounded-full ${INTERACTIVE_ICON_BUTTON}`}>
                        <NextOutlineIcon className="size-14 text-icon-tkh-primary"/>
                    </button>
                </div>
                {cta}
            </div>

            {/* Desktop CTA — centred below the fan */}
            {cta ? <div className="hidden tablet:block">{cta}</div> : null}
        </div>
    );
}
