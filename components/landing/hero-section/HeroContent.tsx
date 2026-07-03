"use client";

import { motion } from "motion/react";

import {Button} from "@/components/ui/Button";

import { type getHeroData } from "./data";
import { contentVariants } from "./motion";

type HeroCta = ReturnType<typeof getHeroData>["primaryCta"];

type HeroContentProps = {
    /** Reveal label driven by the hero orchestrator: "hidden" until the frame settles. */
    animate: "hidden" | "show";
    description: string;
    heading: string;
    primaryCta: HeroCta;
    secondaryCta: HeroCta;
};

export function HeroContent({
    animate,
    description,
    heading,
    primaryCta,
    secondaryCta,
}: HeroContentProps) {
    return (
        <motion.div
            className="absolute inset-x-0 bottom-0 z-20 flex w-full flex-col mobile:flex-row items-end gap-m px-m pb-m mobile:p-14 tablet:p-7xl"
            variants={contentVariants}
            initial="hidden"
            animate={animate}
        >
            <h1
                id="hero-heading"
                className="min-w-[min(500px,100%)] w-full text-text-invert text-H1"
            >
                {heading}
            </h1>
            <div className="flex min-w-[min(500px,100%)] w-full flex-col gap-l mobile:gap-l">
                <p className="text-body-1 text-text-invert">{description}</p>
                <div className="flex flex-col mobile:items-start tablet:flex-row tablet:justify-start gap-m">
                    <Button
                        href={primaryCta.href}
                        rel={primaryCta.openInNewTab ? "noreferrer" : undefined}
                        target={primaryCta.openInNewTab ? "_blank" : undefined}
                        variant="secondary"
                    >
                        {primaryCta.label}
                    </Button>
                    <Button
                        href={secondaryCta.href}
                        rel={secondaryCta.openInNewTab ? "noreferrer" : undefined}
                        target={secondaryCta.openInNewTab ? "_blank" : undefined}
                        variant="outline"
                        size={"L"}
                    >
                        {secondaryCta.label}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
