"use client";

import type {ReactNode} from "react";

import {AUTO_ADVANCE_MS, type getExperienceData} from "./data";
import {ExperienceImageStage} from "./ExperienceImageStage";
import {ExperienceTabList} from "./ExperienceTabList";
import {TimelineIndicator} from "./TimelineIndicator";
import {useTabCarousel} from "./useTabCarousel";

type ExperienceTab = ReturnType<typeof getExperienceData>["tabs"][number];

type ExperienceCarouselProps = {
    tabs: ExperienceTab[];
    /** Server-rendered heading block (pill + H2), placed above the tabs. */
    heading: ReactNode;
    /** Server-rendered CTA, placed below the tabs. */
    cta: ReactNode;
};

/**
 * Interactive layout for the Experience section: timeline rail + tab list on the
 * left, sliding image stage on the right, all driven by a single active index.
 * Static heading/CTA are passed in as slots so they stay server-rendered.
 */
export function ExperienceCarousel({tabs, heading, cta}: ExperienceCarouselProps) {
    const {activeIndex, setActive} = useTabCarousel(tabs.length, AUTO_ADVANCE_MS);

    return (
        <div className="m-auto flex max-w-[1920px] flex-col items-start gap-3xl tablet:flex-row tablet:items-center tablet:justify-center p-4 pt-14 mobile:p-7xl tablet:gap-17 tablet:p-8xl">
            {/* Left column: heading + (timeline | tabs) + CTA */}
            <div className="flex w-full flex-1 flex-col gap-3xl mobile:max-w-[830px] tablet:max-w-fit">
                {heading}

                <div className="flex flex-col gap-3xl">
                    <div className="flex gap-l min-h-87 mobile:gap-3xl">
                        <TimelineIndicator activeIndex={activeIndex} total={tabs.length}/>
                        <ExperienceTabList
                            tabs={tabs}
                            activeIndex={activeIndex}
                            onSelect={setActive}
                        />
                    </div>
                    {cta}
                </div>
            </div>

            {/* Right column: sliding image stage */}
            <ExperienceImageStage tabs={tabs} activeIndex={activeIndex}/>
        </div>
    );
}
