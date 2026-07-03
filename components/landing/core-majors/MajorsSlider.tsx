"use client";

import { SliderControls } from "@/components/ui/slider/SliderControls";
import { useEmblaSlider } from "@/components/ui/slider/useEmblaSlider";

import { MajorCard } from "./MajorCard";
import type { getCoreMajorsData } from "./data";

type MajorsSliderProps = {
    majors: ReturnType<typeof getCoreMajorsData>["majors"];
};

/**
 * Core-majors slider. Shares the Embla engine ({@link useEmblaSlider}) and
 * reused prev/next controls with the events and news sliders; this component
 * only wires the major cards into it.
 */
export function MajorsSlider({ majors }: MajorsSliderProps) {
    const { emblaRef, scrollPrev, scrollNext, atStart, atEnd } = useEmblaSlider();

    return (
        <>
            <div
                ref={emblaRef}
                className="w-full"
                role="region"
                aria-roledescription="carousel"
                aria-label="Core majors"
            >
                <div className="flex gap-l w-full mobile:gap-5xl tablet:gap-3xl">
                    {majors.map((major) => (
                        <MajorCard key={major.id} major={major} />
                    ))}
                </div>
            </div>

            <SliderControls
                onPrev={scrollPrev}
                onNext={scrollNext}
                atStart={atStart}
                atEnd={atEnd}
                prevLabel="Previous majors"
                nextLabel="Next majors"
            />
        </>
    );
}
