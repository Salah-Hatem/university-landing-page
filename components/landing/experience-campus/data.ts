import { normalizeMedia } from "@/lib/cms/media";
import type { ExperienceSection } from "@/payload-types";

/** How long each tab stays active before the carousel auto-advances. */
export const AUTO_ADVANCE_MS = 5000;

/** Design-fixed section copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    eyebrow: "Experience TKH",
    heading: "Experience a World-Class Campus",
} as const;

/** Design-fixed CTA used when the CMS omits one. */
const DEFAULT_CTA = {
    href: "#",
    label: "Know More About TKH",
    openInNewTab: false,
} as const;

/**
 * Tab content for the "Experience Campus" carousel, used verbatim when the CMS
 * section is empty and per-slot to backfill any field a CMS tab leaves blank.
 *
 * Tab 1 copy comes from the Figma design; tabs 2–4 descriptions are
 * representative placeholder copy (the design only exposes the first tab's
 * paragraph) and can be swapped for final CMS/marketing copy.
 */
const EXPERIENCE_TABS = [
    {
        id: "campus",
        title: "State-of-the-Art Campus",
        description:
            "Explore our premier hub featuring international university standards, specialized innovation zones, and a layout optimized for academic excellence and student wellbeing.",
        image: {
            src: "/img/experience/campus.png",
            alt: "Modern glass-and-stone academic building on the TKH campus.",
        },
        stat: { value: "50k m²", label: "Campus Area" },
    },
    {
        id: "facilities",
        title: "World-Class Facilities",
        description:
            "Step into cutting-edge laboratories, smart lecture halls, and research centers equipped with the technology our students need to lead in their fields.",
        image: {
            src: "/img/experience/labs.png",
            alt: "Students working inside a well-equipped modern laboratory.",
        },
        stat: { value: "20+", label: "Modern Labs" },
    },
    {
        id: "sports",
        title: "Sports & Recreation",
        description:
            "Stay active across professional-grade courts, fitness studios, and open recreational spaces designed to balance ambition with wellbeing.",
        image: {
            src: "/img/experience/facilities.png",
            alt: "Campus sports and recreation facilities.",
        },
        stat: { value: "15+", label: "Facilities" },
    },
    {
        id: "clubs",
        title: "Student Clubs & Societies",
        description:
            "Find your community among dozens of student-led clubs and societies, where leadership, creativity, and lifelong friendships take shape.",
        image: {
            src: "/img/experience/students.png",
            alt: "Students gathering and collaborating on campus.",
        },
        stat: { value: "20k+", label: "Students" },
    },
];

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/**
 * Map the CMS experience section onto the carousel's view model. Each CMS tab
 * maps onto the same-index sample tab (with every blank field backfilled from
 * it); an empty section renders the full {@link EXPERIENCE_TABS} set.
 */
export function getExperienceData(section?: ExperienceSection | null) {
    const tabs = (section?.tabs ?? []).map((tab, index) => {
        const fallback = EXPERIENCE_TABS[index % EXPERIENCE_TABS.length];
        const image = normalizeMedia(tab.image);
        return {
            id: tab.id ?? `experience-tab-${index}`,
            title: textOrDefault(tab.title, fallback.title),
            description: textOrDefault(tab.description, fallback.description),
            image: {
                src: image?.url ?? fallback.image.src,
                alt: image?.alt || fallback.image.alt,
            },
            stat: {
                value: textOrDefault(tab.stat?.value, fallback.stat.value),
                label: textOrDefault(tab.stat?.label, fallback.stat.label),
            },
        };
    });

    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        cta: {
            href: textOrDefault(section?.cta?.href, DEFAULT_CTA.href),
            label: textOrDefault(section?.cta?.label, DEFAULT_CTA.label),
            openInNewTab:
                typeof section?.cta?.openInNewTab === "boolean"
                    ? section.cta.openInNewTab
                    : DEFAULT_CTA.openInNewTab,
        },
        tabs: tabs.length ? tabs : EXPERIENCE_TABS,
    };
}
