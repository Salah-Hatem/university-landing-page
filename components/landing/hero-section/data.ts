import { normalizeMedia } from "@/lib/cms/media";
import type { HeroSection } from "@/payload-types";

/** Design-fixed hero copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    heading: "Your Gateway To Global Education",
    description:
        "Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.",
} as const;

/** Background video shown until the CMS supplies one. */
const DEFAULT_VIDEO_URL = "/video/videoplayback.mp4";

/** Design-fixed CTAs used when the CMS omits them. */
const DEFAULT_PRIMARY_CTA = {
    href: "#",
    label: "Explore Programs",
    openInNewTab: false,
} as const;

const DEFAULT_SECONDARY_CTA = {
    href: "#",
    label: "Explore Programs",
    openInNewTab: false,
} as const;

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
    return typeof value === "boolean" ? value : fallback;
}

function resolveCta(
    value: HeroSection["primaryCta"],
    fallback: { href: string; label: string; openInNewTab: boolean },
) {
    return {
        href: textOrDefault(value?.href, fallback.href),
        label: textOrDefault(value?.label, fallback.label),
        openInNewTab: booleanOrDefault(value?.openInNewTab, fallback.openInNewTab),
    };
}

/**
 * Resolve the hero section from Payload: each blank field falls back to the
 * design-fixed copy, and the media fields normalize to a `{ url, alt }` shape
 * (or `null` when absent). An empty section renders the full default hero.
 */
export function getHeroData(hero?: HeroSection | null) {
    return {
        backgroundVideoUrl:
            normalizeMedia(hero?.backgroundVideo)?.url ?? DEFAULT_VIDEO_URL,
        description: textOrDefault(hero?.description, DEFAULT_TEXT.description),
        foregroundImage: normalizeMedia(hero?.image),
        heading: textOrDefault(hero?.heading, DEFAULT_TEXT.heading),
        posterImage: normalizeMedia(hero?.backgroundImage),
        primaryCta: resolveCta(hero?.primaryCta, DEFAULT_PRIMARY_CTA),
        secondaryCta: resolveCta(hero?.secondaryCta, DEFAULT_SECONDARY_CTA),
    };
}
