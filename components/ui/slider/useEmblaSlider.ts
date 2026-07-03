"use client";

import { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useReducedMotion } from "motion/react";

const BASE_OPTIONS: EmblaOptionsType = {
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 30,
};


export function useEmblaSlider(options: EmblaOptionsType = {}) {
    const prefersReducedMotion = useReducedMotion();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        ...BASE_OPTIONS,
        ...options,
        duration: prefersReducedMotion ? 0 : (options.duration ?? BASE_OPTIONS.duration),
    });

    const subscribe = useCallback(
        (onChange: () => void) => {
            if (!emblaApi) return () => {};
            emblaApi.on("select", onChange).on("reInit", onChange);
            return () => {
                emblaApi.off("select", onChange).off("reInit", onChange);
            };
        },
        [emblaApi],
    );

    // Edges default to "disabled" until Embla has measured (and during SSR).
    const atStart = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? !emblaApi.canScrollPrev() : true),
        () => true,
    );
    const atEnd = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? !emblaApi.canScrollNext() : true),
        () => true,
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return {
        /** Attach to the `overflow-hidden` viewport wrapper. */
        emblaRef,
        scrollPrev,
        scrollNext,
        atStart,
        atEnd,
    };
}
