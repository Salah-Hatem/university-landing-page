"use client";

import {AnimatePresence, motion, useReducedMotion} from "motion/react";

import {type getExperienceData} from "./data";
import {FOCUS_RING} from "@/components/ui/interaction";

type ExperienceTab = ReturnType<typeof getExperienceData>["tabs"][number];

type ExperienceTabListProps = {
    tabs: ExperienceTab[];
    activeIndex: number;
    onSelect: (index: number) => void;
};

/**
 * Vertical list of tab titles. The active title is full opacity and reveals its
 * description (animated height + opacity); inactive titles dim to 50%.
 */
export function ExperienceTabList({tabs, activeIndex, onSelect}: ExperienceTabListProps) {
    const prefersReducedMotion = useReducedMotion();
    const revealTransition = prefersReducedMotion
        ? {duration: 0}
        : {duration: 0.4, ease: [0.2, 0, 0, 1] as const};

    return (
        <div className="flex flex-1 flex-col gap-3xl" role="tablist" aria-orientation="vertical">
            {tabs.map((tab, index) => {
                const isActive = index === activeIndex;

                return (
                    <div key={tab.id} className="flex flex-col">
                        <button
                            type="button"
                            role="tab"
                            id={`experience-tab-${tab.id}`}
                            aria-selected={isActive}
                            aria-controls={`experience-panel-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => onSelect(index)}
                            className={`w-full rounded-sm text-left ${FOCUS_RING}`}
                        >
                            <motion.span
                                className="block text-H4 text-text-primary"
                                initial={false}
                                animate={{opacity: isActive ? 1 : 0.5}}
                                whileHover={isActive ? undefined : {opacity: 0.85}}
                                transition={prefersReducedMotion ? {duration: 0} : {duration: 0.3}}
                            >
                                {tab.title}
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isActive ? (
                                <motion.div
                                    key="panel"
                                    id={`experience-panel-${tab.id}`}
                                    role="tabpanel"
                                    aria-labelledby={`experience-tab-${tab.id}`}
                                    className="overflow-hidden"
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: "auto", opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={revealTransition}
                                >
                                    <p className="pt-l text-body-2 text-text-primary">
                                        {tab.description}
                                    </p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
