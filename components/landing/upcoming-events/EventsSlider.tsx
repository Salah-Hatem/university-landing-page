"use client";

import {type ReactNode} from "react";

import {SliderControls} from "@/components/ui/slider/SliderControls";
import {useEmblaSlider} from "@/components/ui/slider/useEmblaSlider";

import {EventCard} from "./EventCard";
import type {getEventsData} from "./data";

type EventsSliderProps = {
    events: ReturnType<typeof getEventsData>["events"];
    /** Section call-to-action, composed into the controls row. */
    cta?: ReactNode;
};

/**
 * Upcoming-events slider. The interactive behaviour comes from Embla via the
 * shared {@link useEmblaSlider} engine; this component wires the event cards, the
 * reused prev/next controls, and the "explore all" CTA into it.
 */
export function EventsSlider({events, cta}: EventsSliderProps) {
    const {emblaRef, scrollPrev, scrollNext, atStart, atEnd} = useEmblaSlider();

    return (
        <>
            <div
                ref={emblaRef}
                className="w-full mobile:overflow-hidden"
                role="region"
                aria-roledescription="carousel"
                aria-label="Upcoming events"
            >
                <div className="flex gap-3xl">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            </div>

            <div className="flex flex-col mobile:flex-row w-full items-center justify-between gap-l">
                <SliderControls
                    onPrev={scrollPrev}
                    onNext={scrollNext}
                    atStart={atStart}
                    atEnd={atEnd}
                    prevLabel="Previous events"
                    nextLabel="Next events"
                />
                {cta}
            </div>
        </>
    );
}
