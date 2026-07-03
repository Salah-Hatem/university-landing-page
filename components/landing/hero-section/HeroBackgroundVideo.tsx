"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { frameVariants } from "./motion";

type HeroBackgroundVideoProps = {
    className?: string;
    /** Fires once the frame finishes expanding, so the overlay/content can follow. */
    onExpandComplete?: () => void;
    poster?: string;
    /** When true, skip the expand animation and render full-bleed immediately. */
    reduceMotion?: boolean;
    src: string;
};

type VideoState = "pending" | "loading" | "ready";

const frameClass = "overflow-hidden rounded-[40px]";

const videoClass = "h-full w-full max-w-none object-cover";
const fallbackLoadDelay = 900;
const idleLoadTimeout = 1400;
// Backstop so the expand→reveal chain (which now also gates the header) always runs
// even if the video never reaches `canplay`. A true safety net — longer than a normal
// deferred load takes to reveal, so a slow-but-working video isn't preempted into a
// poster-then-pop. `onError` covers deterministic failures (404/decode) instantly.
const revealFallbackDelay = 6000;

export function HeroBackgroundVideo({
    className,
    onExpandComplete,
    poster,
    reduceMotion = false,
    src,
}: HeroBackgroundVideoProps) {
    const [videoState, setVideoState] = useState<VideoState>("pending");

    useEffect(() => {
        let cancelled = false;
        const start = () => {
            if (!cancelled) setVideoState("loading");
        };
        const scheduleIdle = () => {
            const requestIdle =
                window.requestIdleCallback ??
                ((cb: IdleRequestCallback) =>
                    window.setTimeout(cb, fallbackLoadDelay));
            requestIdle(start, { timeout: idleLoadTimeout });
        };

        if (document.readyState === "complete") scheduleIdle();
        else window.addEventListener("load", scheduleIdle, { once: true });

        return () => {
            cancelled = true;
            window.removeEventListener("load", scheduleIdle);
        };
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(
            () => setVideoState((state) => (state === "ready" ? state : "ready")),
            revealFallbackDelay,
        );
        return () => window.clearTimeout(timer);
    }, []);

    const isReady = videoState === "ready";
    const shouldLoadVideo = videoState === "loading" || isReady;
    const isExpanded = reduceMotion || isReady;

    return (
        <div className="absolute inset-0 h-full w-full">
            <motion.div
                className={`${frameClass} absolute left-1/2 top-1/2`}
                variants={frameVariants}
                initial={reduceMotion ? "expanded" : "hidden"}
                animate={isExpanded ? "expanded" : "collapsed"}
                onAnimationComplete={(definition) => {
                    if (definition === "expanded") {
                        onExpandComplete?.();
                    }
                }}
            >
                <video
                    aria-hidden="true"
                    autoPlay
                    className={[videoClass, className].filter(Boolean).join(" ")}
                    disablePictureInPicture
                    loop
                    muted
                    onCanPlay={() => setVideoState("ready")}
                    onError={() => setVideoState("ready")}
                    playsInline
                    poster={poster}
                    preload={shouldLoadVideo ? "metadata" : "none"}
                    src={shouldLoadVideo ? src : undefined}
                    tabIndex={-1}
                />
            </motion.div>
        </div>
    );
}
