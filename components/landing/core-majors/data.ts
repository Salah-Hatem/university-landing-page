import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { CoreMajorsSection, Program } from "@/payload-types";


export const CARD_CLIP_PATH =
    "polygon(0 0, 87.974682% 0, 100% 37.836109%, 100% 100%, 11.772152% 100%, 0 61.523691%)";

const DEFAULT_TEXT = {
    eyebrow: "Choose Your Future",
    heading: "Discover Your Path Across 5 Core Majors",
};

/**
 * One bundled fallback major, used slot-by-slot when the CMS provides no
 * populated programs
 */
type MajorFallback = {
    id: string;
    /** Display name, e.g. "Design & Media". */
    name: string;
    /** Number of programs offered within the major. */
    programCount: number;
    image: NormalizedMedia;
};

const FALLBACK_MAJORS: MajorFallback[] = [
    {
        id: "design-media",
        name: "Design & Media",
        programCount: 7,
        image: {
            url: "/img/majors/design-media.png",
            alt: "Students collaborating on a model-making project in a design studio.",
        },
    },
    {
        id: "engineering",
        name: "Engineering",
        programCount: 9,
        image: {
            url: "/img/majors/engineering.png",
            alt: "An engineering student in safety gear working on machinery in a workshop.",
        },
    },
    {
        id: "psychology",
        name: "Psychology",
        programCount: 3,
        image: {
            url: "/img/majors/psychology.png",
            alt: "A clinician guiding a patient through a rehabilitation walking exercise.",
        },
    },
    {
        id: "business",
        name: "Business",
        programCount: 5,
        image: {
            url: "/img/majors/business.png",
            alt: "Business students discussing work together on campus.",
        },
    },
    {
        id: "physiotherapy",
        name: "Physiotherapy",
        programCount: 3,
        image: {
            url: "/img/majors/physiotherapy.png",
            alt: "A physiotherapy session in a bright, equipped treatment space.",
        },
    },
];

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/** Pull the leading integer out of a label like "7 Programs", else the fallback. */
function parseLeadingCount(value: unknown, fallback: number): number {
    if (typeof value === "string") {
        const match = value.match(/\d+/);
        if (match) {
            return Number(match[0]);
        }
    }
    return fallback;
}

function isPopulatedProgram(
    value: number | Program | null | undefined,
): value is Program {
    return typeof value === "object" && value !== null;
}

/**
 * Map the CMS programs onto the slider's major cards, falling back to the
 * bundled defaults (by matching slot) for any field Payload leaves empty, and
 * to the full default set when the CMS provides no populated programs at all.
 */
export function getCoreMajorsData(section?: CoreMajorsSection | null) {
    const programs = (section?.programs ?? []).filter(isPopulatedProgram);

    const majors = programs.length
        ? programs.map((program, index) => {
              const fallback = FALLBACK_MAJORS[index % FALLBACK_MAJORS.length];
              const image = normalizeMedia(program.image);
              return {
                  id: `program-${program.id}`,
                  name: textOrDefault(program.title, fallback.name),
                  programCount: parseLeadingCount(
                      program.programCountLabel,
                      fallback.programCount,
                  ),
                  image: {
                      url: image?.url ?? fallback.image.url,
                      alt: image?.alt || fallback.image.alt,
                  },
              };
          })
        : FALLBACK_MAJORS;

    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        majors,
    };
}
