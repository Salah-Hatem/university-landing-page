import { normalizeMedia } from "@/lib/cms/media";
import type { Footer } from "@/payload-types";

/** The three social platforms the footer renders a bundled brand icon for. */
export type SocialPlatform = "facebook" | "instagram" | "linkedin";

/** Public path to the white TKH wordmark, used until the CMS supplies a logo. */
const DEFAULT_LOGO_URL = "/svg/footer/tkh-white.svg";

/** Design-fixed footer copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    description:
        "Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.",
    copyright: "© 2024 TKH - The Knowledge Hub. All rights reserved.",
} as const;

const DEFAULT_CONTACT = {
    heading: "Contact Us",
    phone: "19940 , +20 123 456 789",
    address:
        "New Administrative Capital, Residential Area 7, R7, Cairo Governorate",
    email: "hello@tkh.edu.eg",
    ctaLabel: "Apply Now",
    ctaHref: "#",
} as const;

const DEFAULT_SEARCH = {
    heading: "Can't find what you're looking for?",
    placeholder: "Search for program, Fees, University..",
    buttonLabel: "Search",
} as const;

/** Column link lists shown when the CMS supplies no `linkColumns`. */
const DEFAULT_LINK_COLUMNS = [
    { title: "Universities", links: ["Coventry University", "NOVA University"] },
    {
        title: "Study",
        links: ["Undergraduate", "Postgraduate", "Continuing Education"],
    },
    { title: "Campus Life", links: ["Student Life", "Services", "Support"] },
    {
        title: "Admissions",
        links: ["Entry Criteria", "Tuition Fees", "How to Apply"],
    },
    {
        title: "About TKH",
        links: [
            "Overview",
            "Board of Trustees",
            "TKH Campus",
            "Work With TKH",
            "FAQs",
        ],
    },
] as const;

const DEFAULT_MORE_LINKS = [
    "International Students",
    "Policies & Regulations",
    "Alumni",
    "News",
    "Events",
] as const;

const DEFAULT_SOCIALS: { platform: SocialPlatform; label: string }[] = [
    { platform: "facebook", label: "Facebook" },
    { platform: "instagram", label: "Instagram" },
    { platform: "linkedin", label: "LinkedIn" },
];

const DEFAULT_LEGAL_LINKS = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
] as const;

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
};

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
    return typeof value === "boolean" ? value : fallback;
}

type FooterLink = { label: string; href: string; openInNewTab: boolean };

/** Map a CMS link (or a bare fallback label) to a resolved `{ label, href, openInNewTab }`. */
function resolveLink(
    link: { label?: string | null; href?: string | null; openInNewTab?: boolean | null } | undefined,
    fallbackLabel: string,
): FooterLink {
    return {
        label: textOrDefault(link?.label, fallbackLabel),
        href: textOrDefault(link?.href, "#"),
        openInNewTab: booleanOrDefault(link?.openInNewTab, false),
    };
}

/** Resolve an array of CMS links, falling back to the design-fixed label list when empty. */
function resolveLinks(
    links: NonNullable<Footer["moreLinks"]> | undefined,
    fallbackLabels: readonly string[],
): FooterLink[] {
    if (links && links.length > 0) {
        return links.map((link) => resolveLink(link, textOrDefault(link?.label, "")));
    }
    return fallbackLabels.map((label) => resolveLink(undefined, label));
}

/**
 * Resolve the footer from Payload: each blank field falls back to the
 * design-fixed copy, media normalizes to `{ url, alt }`, and social links carry
 * a `platform` the component maps to a bundled brand icon. An empty global
 * renders the full default footer already shown on the landing page.
 */
export function getFooterData(footer?: Footer | null) {
    const logo = normalizeMedia(footer?.logo);

    const linkColumns =
        footer?.linkColumns && footer.linkColumns.length > 0
            ? footer.linkColumns.map((column) => ({
                  title: textOrDefault(column?.title, ""),
                  links: (column?.links ?? []).map((link) =>
                      resolveLink(link, textOrDefault(link?.label, "")),
                  ),
              }))
            : DEFAULT_LINK_COLUMNS.map((column) => ({
                  title: column.title,
                  links: column.links.map((label) => resolveLink(undefined, label)),
              }));

    const socials =
        footer?.socialLinks && footer.socialLinks.length > 0
            ? footer.socialLinks.flatMap((social) => {
                  const platform = social?.platform;
                  if (!platform) return [];
                  return [
                      {
                          platform,
                          label: SOCIAL_LABELS[platform],
                          url: textOrDefault(social?.url, "#"),
                      },
                  ];
              })
            : DEFAULT_SOCIALS.map((social) => ({ ...social, url: "#" }));

    return {
        logo: { url: logo?.url ?? DEFAULT_LOGO_URL, alt: logo?.alt || "The Knowledge Hub Universities" },
        description: textOrDefault(footer?.description, DEFAULT_TEXT.description),
        contact: {
            heading: textOrDefault(footer?.contact?.heading, DEFAULT_CONTACT.heading),
            phone: textOrDefault(footer?.contact?.phone, DEFAULT_CONTACT.phone),
            address: textOrDefault(footer?.contact?.address, DEFAULT_CONTACT.address),
            email: textOrDefault(footer?.contact?.email, DEFAULT_CONTACT.email),
            cta: {
                label: textOrDefault(footer?.contact?.cta?.label, DEFAULT_CONTACT.ctaLabel),
                href: textOrDefault(footer?.contact?.cta?.href, DEFAULT_CONTACT.ctaHref),
                openInNewTab: booleanOrDefault(footer?.contact?.cta?.openInNewTab, false),
            },
        },
        search: {
            heading: textOrDefault(footer?.search?.heading, DEFAULT_SEARCH.heading),
            placeholder: textOrDefault(footer?.search?.placeholder, DEFAULT_SEARCH.placeholder),
            buttonLabel: textOrDefault(footer?.search?.buttonLabel, DEFAULT_SEARCH.buttonLabel),
        },
        linkColumns,
        moreLinks: resolveLinks(footer?.moreLinks ?? undefined, DEFAULT_MORE_LINKS),
        socials,
        legalLinks: resolveLinks(footer?.legalLinks ?? undefined, DEFAULT_LEGAL_LINKS),
        copyright: textOrDefault(footer?.copyright, DEFAULT_TEXT.copyright),
    };
}
