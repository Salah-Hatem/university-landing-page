"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { getMarqueeData } from "./data";

/** Direction a band's content travels, per the CMS adapter's fixed band layouts. */
type MarqueeDirection = ReturnType<typeof getMarqueeData>["bands"][number]["direction"];

type MarqueeProps = {
    /**
     * One run of the repeating content. It is rendered twice so the loop wraps
     * seamlessly, so this run must already be wide enough to fill the viewport.
     */
    children: ReactNode;
    /** Scroll speed in px/second — the loop duration scales with content width. */
    speed: number;
    /** Direction the content travels. */
    direction?: MarqueeDirection;
};


export function Marquee({ children, speed, direction = "left" }: MarqueeProps) {
    const prefersReducedMotion = useReducedMotion();
    const copyRef = useRef<HTMLDivElement>(null);
    const [copyWidth, setCopyWidth] = useState(0);


    useEffect(() => {
        const el = copyRef.current;
        if (!el) return;

        const measure = () => setCopyWidth(el.scrollWidth);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const animated = !prefersReducedMotion && copyWidth > 0;
    const keyframes = direction === "left" ? [0, -copyWidth] : [-copyWidth, 0];

    return (
        <motion.div
            className="flex w-max flex-none"
            animate={animated ? { x: keyframes } : undefined}
            transition={
                animated
                    ? { duration: copyWidth / speed, ease: "linear", repeat: Infinity }
                    : undefined
            }
        >
            <div ref={copyRef} className="flex w-max flex-none">
                {children}
            </div>
            <div className="flex w-max flex-none" aria-hidden>
                {children}
            </div>
        </motion.div>
    );
}
