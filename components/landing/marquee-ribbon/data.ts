import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { MarqueeRibbonSection, University } from "@/payload-types";


/**
 * Continuous scroll speed in px/second.
 *
 */
export const MARQUEE_SPEED = 40;

/** Shown on any band without a partner logo — the Figma grey "New Partnerships Soon" ribbon. */
export const FALLBACK_LABEL = "New Partnerships Soon";

export const LOGO_REPEAT = 12;

/**
 * Bundled fallback partners, used when the matching CMS slot has no populated
 * university. Authored as full Payload {@link University} records (mirroring
 * `university-partners`' COVENTRY/NOVA) so their `marqueeLogo` flows through the
 * same `normalizeMedia` path as live CMS data. `id: 0` + empty timestamps satisfy
 * the generated type without casts.
 */
const COVENTRY_FALLBACK: University = {
    id: 0,
    name: "Coventry University",
    marqueeLogo: {
        id: 0,
        alt: "Coventry University",
        url: "/img/coventry-marquee.png",
        updatedAt: "",
        createdAt: "",
    },
    updatedAt: "",
    createdAt: "",
};

const NOVA_FALLBACK: University = {
    id: 0,
    name: "NOVA University Lisbon",
    marqueeLogo: {
        id: 0,
        alt: "NOVA University Lisbon",
        url: "/img/nova-marquee.png",
        updatedAt: "",
        createdAt: "",
    },
    updatedAt: "",
    createdAt: "",
};

const BAND_LAYOUTS = [
    {
        id: "coventry",
        backgroundClassName: "bg-surface-coventry",
        direction: "left",
        rotateSign: -1,
        position: "top",
        defaultUniversity: COVENTRY_FALLBACK,
    },
    {
        id: "nova",
        backgroundClassName: "bg-surface-nova",
        direction: "right",
        rotateSign: 1,
        position: "center",
        defaultUniversity: NOVA_FALLBACK,
    },
    {
        id: "fallback",
        backgroundClassName: "bg-surface-inactive",
        direction: "left",
        rotateSign: -1,
        position: "bottom",
        defaultUniversity: null,
    },
] as const;

function isPopulatedUniversity(
    value: number | University | null | undefined,
): value is University {
    return typeof value === "object" && value !== null;
}

/**
 * Zip the fixed band layouts with CMS logos by index: each slot takes the marquee
 * logo of its first populated university, falling back to the layout's bundled
 * default (or the label ribbon) when the CMS provides nothing. CMS bands beyond
 * the three fixed slots are ignored to preserve the Figma layout.
 */
export function getMarqueeData(section?: MarqueeRibbonSection | null) {
    const sectionBands = section?.bands ?? [];

    const bands = BAND_LAYOUTS.map(({ defaultUniversity, ...layout }, index) => {
        const primary =
            (sectionBands[index]?.universities ?? []).find(isPopulatedUniversity) ??
            defaultUniversity;
        const media = normalizeMedia(primary?.marqueeLogo);
        const logo: NormalizedMedia | null = media
            ? { ...media, alt: media.alt || primary?.name || "" }
            : null;

        return { ...layout, logo };
    });

    return { bands };
}
