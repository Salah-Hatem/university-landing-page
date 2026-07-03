"use client";

import type { ReactNode } from "react";

import { SliderControls } from "@/components/ui/slider/SliderControls";
import { useEmblaSlider } from "@/components/ui/slider/useEmblaSlider";

import { NewsCard } from "./NewsCard";
import type { getNewsData } from "./data";

type NewsSliderProps = {
    news: ReturnType<typeof getNewsData>["articles"];
    /** Section call-to-action, composed into the controls row. */
    cta?: ReactNode;
};

/**
 * Proud-news slider. Shares the Embla engine ({@link useEmblaSlider}) and reused
 * prev/next controls with the events slider; wires the news cards and the
 * "explore all news" CTA into it.
 */
export function NewsSlider({ news, cta }: NewsSliderProps) {
    const { emblaRef, scrollPrev, scrollNext, atStart, atEnd } = useEmblaSlider();

    return (
        <>
            <div
                ref={emblaRef}
                className="w-full overflow-hidden"
                role="region"
                aria-roledescription="carousel"
                aria-label="Proud news"
            >
                <div className="flex gap-xl mobile:gap-3xl">
                    {news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col items-center gap-xl mobile:flex-row mobile:justify-between mobile:gap-l">
                <SliderControls
                    onPrev={scrollPrev}
                    onNext={scrollNext}
                    atStart={atStart}
                    atEnd={atEnd}
                    prevLabel="Previous news"
                    nextLabel="Next news"
                />
                {cta}
            </div>
        </>
    );
}
