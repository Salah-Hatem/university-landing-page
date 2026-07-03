"use client";

import Image from "next/image";
import {motion, useReducedMotion} from "motion/react";

import {type getExperienceData} from "./data";
import {StatBadge} from "./StatBadge";

type ExperienceTab = ReturnType<typeof getExperienceData>["tabs"][number];

type ExperienceImageStageProps = {
    tabs: ExperienceTab[];
    activeIndex: number;
};

/**
 * Right-hand image "filmstrip". All campus images are stacked vertically inside
 * the angular frame; changing the active tab slides the column up so the matching
 * image (and its stat badge) fills the frame.
 */
export function ExperienceImageStage({tabs, activeIndex}: ExperienceImageStageProps) {
    const prefersReducedMotion = useReducedMotion();
    const total = tabs.length;

    return (
        <div
            className="relative aspect-806/796 w-full max-w-201.5 mobile:ms-14 mobile:max-w-[942px] overflow-hidden tablet:ms-0 tablet:max-w-201.5 tablet:shrink-0 [clip-path:polygon(0_0,87.974682%_0,100%_37.836109%,100%_100%,11.772152%_100%,0_61.523691%)]"
        >
            <motion.div
                className="absolute inset-x-0 top-0 flex flex-col"
                style={{height: `${total * 100}%`}}
                initial={false}
                animate={{y: `-${(activeIndex / total) * 100}%`}}
                transition={
                    prefersReducedMotion
                        ? {duration: 0}
                        : {duration: 0.6, ease: [0.2, 0, 0, 1]}
                }
            >
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className="relative w-full shrink-0"
                        style={{height: `${100 / total}%`}}
                        aria-hidden={index !== activeIndex}
                    >
                        <Image
                            src={tab.image.src}
                            alt={tab.image.alt}
                            fill
                            sizes="(max-width: 1280px) 100vw, 806px"
                            className="object-cover"
                            priority={index === 0}
                        />
                        <StatBadge stat={tab.stat}/>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
