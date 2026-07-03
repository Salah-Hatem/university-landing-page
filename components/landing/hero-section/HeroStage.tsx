"use client";

import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import { HeroContent } from "./HeroContent";
import { HeroOverlay } from "./HeroOverlay";
import { useHeroReveal } from "./HeroRevealContext";
import { type getHeroData } from "./data";

type HeroStageProps = {
    hero: ReturnType<typeof getHeroData>;
};

/**
 * Client orchestrator for the hero entrance. The frame expands once the video is
 * ready, and only when that expand completes does it flip `revealed`, so the
 * overlay and content always rise into the settled frame (instead of firing on a
 * fixed delay that can desync from a slow video load). The reveal signal lives in
 * HeroRevealContext so the site header rises in lockstep. Reduced motion shows
 * everything settled up front.
 */
export function HeroStage({ hero }: HeroStageProps) {
    const { revealed, prefersReducedMotion, reveal } = useHeroReveal();

    const animate = revealed ? "show" : "hidden";

    return (
        <div className="relative h-200 tablet:h-265.5 mobile:h-180.5 w-full overflow-hidden rounded-[40px]">
            <HeroBackgroundVideo
                poster={hero.posterImage?.url}
                src={hero.backgroundVideoUrl}
                reduceMotion={prefersReducedMotion}
                onExpandComplete={reveal}
            />
            <HeroOverlay animate={animate} />
            <HeroContent
                animate={animate}
                description={hero.description}
                heading={hero.heading}
                primaryCta={hero.primaryCta}
                secondaryCta={hero.secondaryCta}
            />
        </div>
    );
}
