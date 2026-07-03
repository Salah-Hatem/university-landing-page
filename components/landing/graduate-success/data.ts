import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { GraduateStory, GraduateSuccessSection } from "@/payload-types";

/**
 * A resolved graduate card: the `GraduateStory` fields the card renders, plus a
 * string React key and a design-only `accent` colour (not a CMS field).
 */
type Testimonial = Pick<
    GraduateStory,
    "graduateName" | "graduationYear" | "role" | "school" | "quote"
> & {
    /** Stable identifier, used as the React key. */
    id: string;
    /** Brand accent colour (hex) used to theme the card. */
    accent: string;
    /** Large graduate photo shown at the top of the card. */
    image: NormalizedMedia;
    /** Round avatar shown beside the quote. */
    avatar: NormalizedMedia;
};

/** Bundled graduate photo, used when the CMS story has no `image`. */
const FALLBACK_IMAGE: NormalizedMedia = { url: "/2025grad.png", alt: "" };
/** Bundled avatar, used when the CMS story has no `avatar`. */
const FALLBACK_AVATAR: NormalizedMedia = { url: "/Avatar.png", alt: "" };

/**
 * Bundled testimonials rendered when the CMS section has no populated graduate
 * stories. Each supplies a per-slot fallback for empty CMS fields, and the accent
 * palette is derived from these so CMS-driven cards still get visual variety.
 */
export const TESTIMONIALS: Testimonial[] = [
    {
        id: "sarah-ahmed",
        graduateName: "Sarah Ahmed",
        role: "Software Engineer at Vodafone, Egypt",
        graduationYear: "2025",
        school: "NOVA",
        quote:
            "During my final year at TKH, the career services team helped me refine my CV, prepare for technical interviews, and connect with industry mentors. I landed my role shortly after graduation.",
        accent: "#5b6cff",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "ali-ahmed",
        graduateName: "Ali Ahmed",
        role: "Backend Engineer at Instabug, Egypt",
        graduationYear: "2025",
        school: "Coventry",
        quote:
            "The mock interviews were the turning point. By the time real interviews came around I felt calm and prepared, and it showed in the offers I received.",
        accent: "#28a17a",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "mariam-tarek",
        graduateName: "Mariam Tarek",
        role: "Data Analyst at Fawry, Egypt",
        graduationYear: "2024",
        school: "TKH",
        quote:
            "I went from not knowing where to start to having a portfolio I was proud of. The mentorship made the difference between hoping and knowing.",
        accent: "#d96a2b",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "omar-khaled",
        graduateName: "Omar Khaled",
        role: "Frontend Engineer at Swvl, Egypt",
        graduationYear: "2024",
        school: "Coventry",
        quote:
            "They pushed me to apply for roles I thought were out of reach. That confidence, plus real feedback on my work, got me hired.",
        accent: "#8b5cf6",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "nour-hassan",
        graduateName: "Nour Hassan",
        role: "Product Engineer at Paymob, Egypt",
        graduationYear: "2025",
        school: "NOVA",
        quote:
            "From CV reviews to salary negotiation, the support never stopped. I started my first role feeling genuinely ready for it.",
        accent: "#e84925",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "youssef-adel",
        graduateName: "Youssef Adel",
        role: "ML Engineer at Synapse, Egypt",
        graduationYear: "2024",
        school: "TKH",
        quote:
            "The hardest part was knowing my worth. The team helped me see it, and I walked into negotiations with real confidence.",
        accent: "#0ea5a3",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "habiba-sami",
        graduateName: "Habiba Sami",
        role: "UX Designer at Valu, Egypt",
        graduationYear: "2025",
        school: "Coventry",
        quote:
            "A portfolio review turned into a roadmap. Each session left me with something concrete to fix, and it added up fast.",
        accent: "#e0457b",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "karim-fouad",
        graduateName: "Karim Fouad",
        role: "DevOps Engineer at Robusta, Egypt",
        graduationYear: "2024",
        school: "NOVA",
        quote:
            "I applied to ten companies and got four interviews in a week. The prep work made me sound like someone who already had the job.",
        accent: "#3b82f6",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
    {
        id: "salma-reda",
        graduateName: "Salma Reda",
        role: "QA Engineer at Trella, Egypt",
        graduationYear: "2025",
        school: "TKH",
        quote:
            "They treated my goals as their own. That kind of backing is rare, and it changed how I show up in interviews.",
        accent: "#f59e0b",
        image: FALLBACK_IMAGE,
        avatar: FALLBACK_AVATAR,
    },
];

/** Design-fixed section copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    eyebrow: "Build Your Career",
    heading: "Success Career Journeys of Our Graduates",
    description: "98% of our graduates are employed within 6 months of graduation.",
} as const;

/** Design-fixed CTA used when the CMS omits one. */
const DEFAULT_CTA = {
    href: "#",
    label: "Explore Our Career Services",
    openInNewTab: false,
} as const;

// Accent colours aren't a CMS field (see GraduateStory) — cycle the bundled
// palette so CMS-driven cards still get visual variety.
const ACCENT_PALETTE = TESTIMONIALS.map((testimonial) => testimonial.accent);

function textOrDefault(value: unknown, fallback: string | null | undefined): string {
    if (typeof value === "string" && value.trim()) return value.trim();
    return typeof fallback === "string" ? fallback : "";
}

function isPopulatedGraduateStory(
    value: number | GraduateStory | null | undefined,
): value is GraduateStory {
    return typeof value === "object" && value !== null;
}

/**
 * Resolve the graduate-success section from Payload: populated stories map onto
 * testimonial cards (with a per-slot fallback for empty fields and a cycled
 * accent), and when the CMS provides none, the full bundled set renders.
 */
export function getGraduateSuccessData(section?: GraduateSuccessSection | null) {
    const stories = (section?.stories ?? []).filter(isPopulatedGraduateStory);
    const testimonials: Testimonial[] = stories.length
        ? stories.map((story, index) => {
              const fallback = TESTIMONIALS[index % TESTIMONIALS.length];
              const image = normalizeMedia(story.image);
              const avatar = normalizeMedia(story.avatar);
              return {
                  id: `graduate-story-${story.id}`,
                  graduateName: textOrDefault(story.graduateName, fallback.graduateName),
                  role: textOrDefault(story.role, fallback.role),
                  graduationYear: textOrDefault(story.graduationYear, fallback.graduationYear),
                  school: textOrDefault(story.school, fallback.school),
                  quote: textOrDefault(story.quote, fallback.quote),
                  accent: ACCENT_PALETTE[index % ACCENT_PALETTE.length],
                  image: {
                      url: image?.url ?? fallback.image.url,
                      alt: image?.alt || fallback.image.alt,
                  },
                  avatar: {
                      url: avatar?.url ?? fallback.avatar.url,
                      alt: avatar?.alt || fallback.avatar.alt,
                  },
              };
          })
        : TESTIMONIALS;

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
        testimonials,
    };
}
