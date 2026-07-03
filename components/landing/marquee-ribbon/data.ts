import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { MarqueeRibbonSection, University } from "@/payload-types";


/**
 * Continuous scroll speed in px/second.
 *
 *
 */
export const MARQUEE_SPEED = 40;

export const FALLBACK_LABEL = "New Partnerships Soon";

/**
 * Logo/label copies rendered per marquee run.
 */
export const LOGO_REPEAT = 12;

/**
 * Design-fixed geometry for one diagonal ribbon.
 */
type BandLayout = {
    id: string;
    /** Tailwind background utility backed by a design token (e.g. `bg-surface-nova`). */
    backgroundClassName: string;
    /** Direction the logos travel. */
    direction: "left" | "right";
    /** Tilt direction: -1 leans up-left, +1 leans up-right. Magnitude is fixed (4°). */
    rotateSign: -1 | 1;
    /** Vertical placement of the strip's centre (25% / 50% / 75% of the section height). */
    position: "top" | "center" | "bottom";
    /** Bundled logo used when the CMS slot has none; `null` renders the fallback label. */
    defaultLogo: NormalizedMedia | null;
};


const BAND_LAYOUTS: BandLayout[] = [
    {
        id: "coventry",
        backgroundClassName: "bg-surface-coventry",
        direction: "left",
        rotateSign: -1,
        position: "top",
        defaultLogo: { url: "/img/coventry-marquee.png", alt: "Coventry University" },
    },
    {
        id: "nova",
        backgroundClassName: "bg-surface-nova",
        direction: "right",
        rotateSign: 1,
        position: "center",
        defaultLogo: { url: "/img/nova-marquee.png", alt: "NOVA University Lisbon" },
    },
    {
        id: "fallback",
        backgroundClassName: "bg-surface-inactive",
        direction: "left",
        rotateSign: -1,
        position: "bottom",
        defaultLogo: null,
    },
];

function isPopulatedUniversity(
    value: number | University | null | undefined,
): value is University {
    return typeof value === "object" && value !== null;
}

/**
 * Zip the fixed band layouts with CMS logos by index: each slot takes the marquee
 * logo of its first populated university, falling back to the layout's bundled
 * default (or the label ribbon) when the CMS provides nothing.
 */
export function getMarqueeData(section?: MarqueeRibbonSection | null) {
    const sectionBands = section?.bands ?? [];

    const bands = BAND_LAYOUTS.map(({ defaultLogo, ...layout }, index) => {
        const primary = (sectionBands[index]?.universities ?? []).find(
            isPopulatedUniversity,
        );
        const media = normalizeMedia(primary?.marqueeLogo);
        const logo: NormalizedMedia | null = media
            ? { ...media, alt: media.alt || primary?.name || "" }
            : defaultLogo;

        return { ...layout, logo };
    });

    return { bands };
}
