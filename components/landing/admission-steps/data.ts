import type { AdmissionsSection } from "@/payload-types";

/** One admission step: the CMS step fields the section renders. */
type AdmissionStep = Pick<
    NonNullable<AdmissionsSection["steps"]>[number],
    "number" | "title" | "description"
>;

/**
 * Bundled admission steps rendered when the CMS section has none. Each supplies a
 * per-slot fallback for empty CMS fields.
 */
const DEFAULT_STEPS: AdmissionStep[] = [
    {
        number: "1",
        title: "Apply Online",
        description: "Complete our simple online application form",
    },
    {
        number: "2",
        title: "Upload Docs",
        description: "Provide your academic transcripts and other required documents",
    },
    {
        number: "3",
        title: "Screening & Interview",
        description: "Participate in an interview with our admissions team",
    },
    {
        number: "4",
        title: "Placement Test",
        description: "Get your admission offer and next steps",
    },
    {
        number: "5",
        title: "Acceptance Offer",
        description: "Confirm your enrollment and prepare for your journey at TKH campus",
    },
];

/** Design-fixed section copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    eyebrow: "Take Action",
    heading: "Your Journey Starts Here!",
    description: "Just a few steps to join TKH campus.",
} as const;

/** Design-fixed CTA used when the CMS omits one. */
const DEFAULT_CTA = {
    href: "#",
    label: "Apply For 2026 Year",
    openInNewTab: false,
} as const;

function textOrDefault(value: unknown, fallback: string | null | undefined): string {
    if (typeof value === "string" && value.trim()) return value.trim();
    return typeof fallback === "string" ? fallback : "";
}

/**
 * Resolve the admissions section from Payload: CMS steps map onto the numbered
 * rows (with a per-slot fallback for empty fields), and when the CMS provides
 * none, the full bundled set renders.
 */
export function getAdmissionsData(section?: AdmissionsSection | null) {
    const steps: AdmissionStep[] = (section?.steps ?? []).map((step, index) => {
        const fallback = DEFAULT_STEPS[index];
        return {
            number: textOrDefault(step.number, fallback?.number ?? String(index + 1)),
            title: textOrDefault(step.title, fallback?.title),
            description: textOrDefault(step.description, fallback?.description),
        };
    });

    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        description: textOrDefault(section?.description, DEFAULT_TEXT.description),
        cta: {
            href: textOrDefault(section?.cta?.href, DEFAULT_CTA.href),
            label: textOrDefault(section?.cta?.label, DEFAULT_CTA.label),
            openInNewTab:
                typeof section?.cta?.openInNewTab === "boolean"
                    ? section.cta.openInNewTab
                    : DEFAULT_CTA.openInNewTab,
        },
        steps: steps.length ? steps : DEFAULT_STEPS,
    };
}
