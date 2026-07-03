/**
 * HEADER SEED DATA — wired into seed/seed.ts.
 *
 * The data below conforms to the generated Payload `Header` shape
 * (see payload-types.ts), with two author-side exceptions the seeder resolves
 * at runtime because their stored values are IDs that don't exist yet:
 *
 * How media works:
 *   Image fields accept a `MediaSeed`:
 *     - a path (mirrored under seed/assets/)  -> "/header/TKH.svg"   (alt defaults to the file name)
 *     - an object { src, alt }                  -> { src: "/header/TKH.svg", alt: "TKH logo" }
 *       (the media collection REQUIRES alt text, so prefer the object form for anything meaningful)
 *     - null                                     -> leave the field empty
 *   The seeder uploads each referenced file into the `media` collection and links it by ID.
 *
 * How studies work:
 *   `studies` entries become rows in the `studies` collection.
 *   Reference them from a `studyLinks` block via their local `key`; the seeder
 *   resolves each key to the created study's relation ID.
 *
 * Tab / nav / sub-link types are explicit (matching Payload):
 *   - nav item:  `hasMegaMenu: true` + `megaMenu.tabs`, or `hasMegaMenu: false` + `href`
 *   - tab:       `blockType: "imageDescriptionTab"` (has `image`) or `"titleDescriptionTab"` (has `title`)
 *   - sub-link:  `blockType: "textLink" | "photoLink" | "studyLinks" | "linkGroup"`
 */

// ────────────────────────────────────────────────────────────────────────────
// Types — derived from the generated Payload `Header`/`Study` types so this seed
// data stays bound to the schema. Do not edit.
// ────────────────────────────────────────────────────────────────────────────

import type { Header, Study } from "@/payload-types";

/** Author input for a media field: a path mirrored under seed/assets/ or {src,alt}; resolved to an ID by the seeder. */
export type MediaSeed = string | { src: string; alt: string } | null;

// Writable element shapes pulled straight from the generated Header global.
type PayloadNavItem = NonNullable<Header["primaryNavigation"]>[number];
type PayloadTab = NonNullable<NonNullable<PayloadNavItem["megaMenu"]>["tabs"]>[number];
type PayloadSubLink = NonNullable<PayloadTab["subLinks"]>[number];

// Sub-link blocks: conform to Payload's blockType union; override only media/relation fields.
type TextLinkSeed = Extract<PayloadSubLink, { blockType: "textLink" }>;
type LinkGroupSeed = Extract<PayloadSubLink, { blockType: "linkGroup" }>;
type PhotoLinkSeed = Omit<Extract<PayloadSubLink, { blockType: "photoLink" }>, "image"> & {
    image?: MediaSeed;
};
// `items` holds local Study `key`s, resolved to relation IDs by the seeder.
type StudyLinksSeed = Omit<Extract<PayloadSubLink, { blockType: "studyLinks" }>, "items"> & {
    items: string[];
};
type SubLinkSeed = TextLinkSeed | PhotoLinkSeed | StudyLinksSeed | LinkGroupSeed;

// Tabs: conform to blockType union; override media + subLinks element type.
type ImageTabSeed = Omit<
    Extract<PayloadTab, { blockType: "imageDescriptionTab" }>,
    "image" | "previewImage" | "subLinks"
> & { image?: MediaSeed; previewImage?: MediaSeed; subLinks?: SubLinkSeed[] };
type TitleTabSeed = Omit<
    Extract<PayloadTab, { blockType: "titleDescriptionTab" }>,
    "previewImage" | "subLinks"
> & { previewImage?: MediaSeed; subLinks?: SubLinkSeed[] };
type TabSeed = ImageTabSeed | TitleTabSeed;

type NavItemSeed = Omit<PayloadNavItem, "megaMenu"> & {
    megaMenu?: { tabs?: TabSeed[] };
};

// Studies live in their own collection; derive from Study, add the local `key`.
type StudySeed = Omit<Study, "id" | "updatedAt" | "createdAt"> & { key: string };

export type HeaderSeedData = Omit<
    Header,
    "id" | "logo" | "primaryNavigation" | "updatedAt" | "createdAt"
> & {
    logo?: MediaSeed;
    primaryNavigation: NavItemSeed[];
    // Not part of Header; seeded into the `studies` collection and referenced by `key`.
    studies: StudySeed[];
};

// ────────────────────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────────────────────

export const headerSeedData: HeaderSeedData = {
    logo: {src: "/header/TKH.svg", alt: "The Knowledge Hub Universities"},

    topLinks: {
        universities: [
            {label: "Coventry University", href: "/universities/coventry"},
            {label: "NOVA University", href: "/universities/nova"},
        ],
        resources: [
            {label: "Alumni", href: "/alumni"},
            {label: "News", href: "/news"},
            {label: "Events", href: "/events"},
        ],
    },

    searchLabel: "Search",
    contactCta: {label: "Contact Us", href: "/contact"},
    applyCta: {label: "Apply Now", href: "/apply"},

    mobileMenu: {
        openLabel: "Menu",
        closeLabel: "Close",
    },

    // Rows for the `studies` collection. Reference by `key` from a studyLinks block.
    studies: [
        {key: "all", label: "All Programs", href: "/programs"},
        {key: "design_and_media", label: "Design & Media", href: "/programs/design-and-media"},
        {key: "design", label: "Design", href: "/programs/design"},
        {key: "engineering", label: "Engineering", href: "/programs/engineering"},
        {key: "Physiotherapy", label: "Physiotherapy", href: "/programs/physiotherapy"},
        {key: "psychology", label: "Psychology", href: "/programs/psychology"},
        {key: "business", label: "Business", href: "/programs/business"},
        {key: "English", label: "English", href: "/programs/english"},
    ],

    primaryNavigation: [
        // ── Simple link, no mega menu ──
        {label: "International Students", hasMegaMenu: false, href: "/international-students"},
        // Universities
        {
            label: "Universities",
            hasMegaMenu: true,
            megaMenu: {
                tabs: [
                    {
                        blockType: "imageDescriptionTab",
                        image: {src: "/header/TKH & NOVA.svg", alt: "TKH and NOVA"},
                        description: "Pursue world-class European education from NOVA Lisbon",
                        previewImage: {src: "/header/nova-campus.png", alt: "NOVA preview"},
                        subLinks: [
                            {blockType: "textLink", label: "About NOVA University", href: "#"},
                            {blockType: "textLink", label: "Tuition Fees", href: "#"},
                            {blockType: "textLink", label: "Admission Criteria", href: "#"},
                            {blockType: "textLink", label: "Schools and programs", href: "#"},
                        ],
                    },
                    {
                        blockType: "imageDescriptionTab",
                        image: {src: "/header/TKH & Conventry.svg", alt: "TKH and Conventry"},
                        description: "Earn a UK degree in Engineering, Computing, Business, or Design.",
                        previewImage: {src: "/header/Conventry.png", alt: "Conventry preview"},
                        subLinks: [
                            {blockType: "textLink", label: "About Conventry University", href: "#"},
                            {blockType: "textLink", label: "Tuition Fees", href: "#"},
                            {blockType: "textLink", label: "Admission Criteria", href: "#"},
                            {blockType: "textLink", label: "Schools and programs", href: "#"},
                        ],
                    },
                ],
            },
        },
        //   Study
        {
            label: "Study",
            hasMegaMenu: true,
            megaMenu: {
                tabs: [
                    {
                        blockType: "titleDescriptionTab",
                        title: "Undergraduates",
                        description: "Explore 20+ programs in different majors",
                        previewImage: {src: "/header/study.png", alt: "Programs preview"},
                        subLinks: [
                            // pulls links from the `studies` collection by key:
                            {
                                blockType: "studyLinks",
                                items: ["all", "design_and_media", "engineering", "Physiotherapy", "psychology", "business"]
                            },
                        ],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Postgraduates",
                        description: "Explore 10+ programs in different majors",
                        previewImage: {src: "/header/study.png", alt: "Programs preview"},
                        subLinks: [
                            // pulls links from the `studies` collection by key:
                            {
                                blockType: "studyLinks",
                                items: ["all", "design_and_media", "engineering", "Physiotherapy", "psychology", "business"]
                            },
                        ],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Continuing Education",
                        description: "Explore 15+ programs in different majors",
                        previewImage: {src: "/header/study.png", alt: "Programs preview"},
                        subLinks: [
                            // pulls links from the `studies` collection by key:
                            {blockType: "studyLinks", items: ["all", "design", "engineering", "business", "English"]},
                        ],
                    },
                ],
            },
        },
        //Campus Life
        {
            label: "Campus Life",
            hasMegaMenu: true,
            megaMenu: {
                tabs: [
                    {
                        blockType: "titleDescriptionTab",
                        title: "Student Life",
                        description: "Explore our student union, diverse clubs, and vibrant campus activities.",
                        previewImage: {src: "/header/campus.png", alt: "Campus life preview"},
                        subLinks: [
                            {blockType: "textLink", label: "Student Union", href: "#"},
                            {blockType: "textLink", label: "Student Activities", href: "#"},
                            {blockType: "textLink", label: "Development Programs", href: "#"},
                            {blockType: "textLink", label: "Clubs & Societies", href: "#"},
                            {blockType: "textLink", label: "Career Office", href: "#"},
                            {blockType: "textLink", label: "Policy", href: "#"},
                        ],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Services",
                        description: "Discover your home away and explore our bus routes and fees.",
                        previewImage: {src: "/header/campus.png", alt: "Campus life preview"},
                        subLinks: [
                            {blockType: "textLink", label: "Accommodation", href: "#"},
                            {blockType: "textLink", label: "Transportation", href: "#"},
                        ],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Support",
                        description: "Access wellbeing, counseling, IT help, and medical info.",
                        previewImage: {src: "/header/campus.png", alt: "Campus life preview"},
                        subLinks: [],
                    },
                ],
            },
        },
        // Admission
        {
            label: "Admission",
            hasMegaMenu: true,
            megaMenu: {
                tabs: [
                    {
                        blockType: "titleDescriptionTab",
                        title: "Entry Criteria",
                        description: "Review admission criteria and required documents.",
                        subLinks: [
                            {
                                blockType: "photoLink",
                                label: "NOVA University, Lisbon",
                                href: "#",
                                image: {src: "/header/TKH & NOVA.svg", alt: "NOVA"},
                                openInNewTab: true
                            },
                            {
                                blockType: "photoLink",
                                label: "Coventry University, UK",
                                href: "#",
                                image: {src: "/header/TKH & Conventry.svg", alt: "Conventry"},
                                openInNewTab: true
                            }],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Tuition Fees",
                        description: "Explore detailed program costs, check available scholarships.",
                        subLinks: [
                            {
                                blockType: "photoLink",
                                label: "NOVA University, Lisbon",
                                href: "#",
                                image: {src: "/header/TKH & NOVA.svg", alt: "NOVA"},
                                openInNewTab: true
                            },
                            {
                                blockType: "photoLink",
                                label: "Coventry University, UK",
                                href: "#",
                                image: {src: "/header/TKH & Conventry.svg", alt: "Conventry"},
                                openInNewTab: true
                            }],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "How to Apply?",
                        description: "Follow our step-by-step application guide.",
                        subLinks: [
                            {
                                blockType: "photoLink",
                                label: "NOVA University, Lisbon",
                                href: "#",
                                image: {src: "/header/TKH & NOVA.svg", alt: "NOVA"},
                                openInNewTab: true
                            },
                            {
                                blockType: "photoLink",
                                label: "Coventry University, UK",
                                href: "#",
                                image: {src: "/header/TKH & Conventry.svg", alt: "Conventry"},
                                openInNewTab: true
                            }],
                    },
                ],
            },
        },
        // About
        {
            label: "About",
            hasMegaMenu: true,
            megaMenu: {
                tabs: [
                    {
                        blockType: "titleDescriptionTab",
                        title: "Overview",
                        description: "Know who is TKH and its Misiion, Vision and Values.",
                        subLinks: [],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "Board of Trustees",
                        description: "TKH’s Head, members & independent members.",
                        subLinks: [],
                    },
                    {
                        blockType: "titleDescriptionTab",
                        title: "TKH Campus",
                        description: "Explore our campus facilities & book your private tour.",
                        previewImage: {src: "/header/about_tkh.png", alt: "TKH campus"},
                        subLinks: [
                            {
                                blockType: "linkGroup", heading: "Facilities", links: [
                                    {label: "Sports and Wellness Recreation", href: "#"},
                                    {label: "Research & Innovation Labs", href: "#"},
                                    {label: "State-of-the-art Library", href: "#"},
                                ]
                            },
                            {
                                blockType: "linkGroup", heading: "Campus Tour", links: [
                                    {label: "Virtual 360° Tour", href: "#"},
                                    {label: "Book Private Tour", href: "#", highlighted: true},
                                ]
                            },
                        ]
                    },
                ],
            },
        },
    ],
};
