import type { Header, Media } from "@/payload-types";

import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";

export type HeaderViewData = ReturnType<typeof getHeaderData>;
export type HeaderNavigationItem = HeaderViewData["primaryNavigation"][number];
export type HeaderMegaMenu = NonNullable<HeaderNavigationItem["megaMenu"]>;
export type MegaMenuTab = HeaderMegaMenu["tabs"][number];
export type MegaMenuSubLink = MegaMenuTab["links"][number];
export type MegaMenuLinkGroup = NonNullable<MegaMenuTab["groups"]>[number];
export type HeaderLink = HeaderViewData["applyCta"];
export type HeaderTopLinks = HeaderViewData["topLinks"];
export type HeaderImage = NormalizedMedia;

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------

// Fallback dimensions for media without stored intrinsic size (e.g. SVG logos).
const DEFAULT_IMAGE_WIDTH = 200;
const DEFAULT_IMAGE_HEIGHT = 56;

// Rendered when the CMS supplies no logo, so `next/image` always has a source.
const DEFAULT_LOGO: NormalizedMedia = {
  alt: "The Knowledge Hub Universities",
  height: 32,
  url: "/svg/TKH.svg",
  width: 252,
};

type RawMedia = Parameters<typeof normalizeMedia>[0];
type HeaderTab = NonNullable<
  NonNullable<NonNullable<Header["primaryNavigation"]>[number]["megaMenu"]>["tabs"]
>[number];
type HeaderSubLink = NonNullable<HeaderTab["subLinks"]>[number];

// Resolved image, with intrinsic size backfilled so non-`fill` `next/image`
// usages always receive concrete width/height.
function toImage(media: unknown): NormalizedMedia | undefined {
  const normalized = normalizeMedia(media as RawMedia);
  if (!normalized) {
    return undefined;
  }
  return {
    alt: normalized.alt,
    height: normalized.height ?? DEFAULT_IMAGE_HEIGHT,
    url: normalized.url,
    width: normalized.width ?? DEFAULT_IMAGE_WIDTH,
  };
}

function toLink(
  raw: {
    href?: string | null;
    id?: string | number | null;
    label?: string | null;
    openInNewTab?: boolean | null;
  },
  fallbackId: string,
) {
  return {
    href: raw.href ?? "#",
    id: raw.id != null ? String(raw.id) : fallbackId,
    label: raw.label ?? "",
    openInNewTab: raw.openInNewTab ?? undefined,
  };
}

// Every sub-link resolves to the same key set (`highlighted` / `image` present as
// `undefined` when absent) so TS infers one uniform element type per group.
function toSubLink(
  raw: {
    href?: string | null;
    id?: string | number | null;
    label?: string | null;
    openInNewTab?: boolean | null;
  },
  fallbackId: string,
  extra?: { highlighted?: boolean; image?: NormalizedMedia },
) {
  return {
    ...toLink(raw, fallbackId),
    highlighted: extra?.highlighted,
    image: extra?.image,
  };
}


function buildGroups(subLinks: HeaderTab["subLinks"]) {
  type SubLink = ReturnType<typeof toSubLink>;
  const groups: { heading: string | undefined; id: string; links: SubLink[] }[] = [];
  let pending: SubLink[] = [];

  const flushPending = () => {
    if (pending.length) {
      groups.push({ heading: undefined, id: `group-${groups.length}`, links: pending });
      pending = [];
    }
  };

  (subLinks ?? []).forEach((block: HeaderSubLink, index) => {
    switch (block.blockType) {
      case "textLink":
        pending.push(toSubLink(block, `text-${index}`));
        break;
      case "photoLink":
        pending.push(toSubLink(block, `photo-${index}`, { image: toImage(block.image) }));
        break;
      case "studyLinks":
        (block.items ?? []).forEach((item, itemIndex) => {
          if (typeof item === "number" || item.active === false) {
            return;
          }
          pending.push(toSubLink(item, `study-${index}-${itemIndex}`));
        });
        break;
      case "linkGroup":
        flushPending();
        groups.push({
          heading: block.heading ?? undefined,
          id: block.id ?? `linkgroup-${index}`,
          links: (block.links ?? []).map((link, linkIndex) =>
            toSubLink(link, `grouplink-${index}-${linkIndex}`, {
              highlighted: link.highlighted ?? undefined,
            }),
          ),
        });
        break;
    }
  });

  flushPending();

  return { groups, links: groups.flatMap((group) => group.links) };
}

function buildTab(tab: HeaderTab, index: number) {
  const { groups, links } = buildGroups(tab.subLinks);

  return {
    description: tab.description ?? "",
    groups,
    id: tab.id ?? `tab-${index}`,
    image: tab.blockType === "imageDescriptionTab" ? toImage(tab.image) : undefined,
    links,
    previewImage: toImage(tab.previewImage),
    title: tab.blockType === "imageDescriptionTab" ? "" : (tab.title ?? ""),
  };
}

function buildNavigation(header: Header) {
  return (header.primaryNavigation ?? []).map((item, index) => {
    const base = toLink(item, `nav-${index}`);
    const megaMenu =
      item.hasMegaMenu && item.megaMenu?.tabs?.length
        ? {
            ariaLabel: `${item.label} menu`,
            id: `${base.id}-menu`,
            tabs: item.megaMenu.tabs.map(buildTab),
          }
        : undefined;

    return { ...base, megaMenu };
  });
}

// Map the raw `header` global into the view model the header components consume.
// Both the live global and the fallback flow through this one builder so the
// return type is a single, cleanly inferred shape.
function buildHeaderView(header: Header) {
  return {
    applyCta: toLink(header.applyCta ?? {}, "apply-cta"),
    contactCta: toLink(header.contactCta ?? {}, "contact-cta"),
    logo: toImage(header.logo) ?? DEFAULT_LOGO,
    primaryNavigation: buildNavigation(header),
    searchLink: toLink({ href: "/search", label: header.searchLabel || "Search" }, "search"),
    topLinks: {
      resources: (header.topLinks?.resources ?? []).map((link, index) =>
        toLink(link, `resource-${index}`),
      ),
      universities: (header.topLinks?.universities ?? []).map((link, index) =>
        toLink(link, `university-${index}`),
      ),
    },
  };
}

/**
 * Map the raw `header` global into the view model the header components consume.
 * Falls back to the design-fixed `FALLBACK_HEADER` (built through the same
 * pipeline) when the global is empty/unseeded so the site always renders.
 */
export function getHeaderData(header?: Header | null) {
  if (header && toImage(header.logo) && (header.primaryNavigation?.length ?? 0) > 0) {
    return buildHeaderView(header);
  }

  return buildHeaderView(FALLBACK_HEADER);
}

// ---------------------------------------------------------------------------
// Fallback
//
// Design-fixed header content rendered when the `header` global is empty or
// unseeded. Authored in the Payload `Header` shape (blockType sub-links,
// `hasMegaMenu` nav items) so it stays bound to the schema and resolves through
// `buildHeaderView` exactly like live CMS content.
// ---------------------------------------------------------------------------

/** Build a `Media`-shaped value for the fallback (real id/timestamps are irrelevant here). */
function fallbackMedia(url: string, alt: string, width: number, height: number): Media {
  return { id: 0, alt, url, width, height, updatedAt: "", createdAt: "" };
}

const PREVIEW_IMAGE = fallbackMedia("/svg/TKH.svg", "The Knowledge Hub Universities", 616, 347);

const FALLBACK_HEADER: Header = {
  id: 0,
  logo: fallbackMedia("/svg/TKH.svg", "The Knowledge Hub Universities", 252, 32),
  topLinks: {
    universities: [
      { label: "Coventry University", href: "/universities/coventry", id: "coventry-university" },
      { label: "NOVA University", href: "/universities/nova", id: "nova-university" },
    ],
    resources: [
      { label: "Alumni", href: "/alumni", id: "alumni" },
      { label: "News", href: "/news", id: "news" },
      { label: "Events", href: "/events", id: "events" },
    ],
  },
  searchLabel: "Search",
  contactCta: { label: "Contact Us", href: "/contact", id: "contact-us" },
  applyCta: { label: "Apply Now", href: "/apply", id: "apply-now" },
  primaryNavigation: [
    {
      label: "Universities",
      hasMegaMenu: true,
      href: "/universities",
      id: "universities",
      megaMenu: {
        tabs: [
          {
            blockType: "imageDescriptionTab",
            id: "nova",
            image: fallbackMedia("/svg/TKH & NOVA.svg", "TKH and NOVA", 200, 56),
            description: "Pursue world-class European education from top-ranked NOVA Lisbon",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "nova-about", label: "About NOVA University", href: "/universities/nova/about" },
              { blockType: "textLink", id: "nova-tuition-fees", label: "Tuition Fees", href: "/universities/nova/tuition-fees" },
              { blockType: "textLink", id: "nova-admission-criteria", label: "Admission Criteria", href: "/universities/nova/admission-criteria" },
              { blockType: "textLink", id: "nova-schools-and-programs", label: "Schools and programs", href: "/universities/nova/schools-and-programs" },
            ],
          },
          {
            blockType: "imageDescriptionTab",
            id: "coventry",
            image: fallbackMedia("/svg/TKH.svg", "TKH and Coventry", 231, 65),
            description: "Earn a UK degree in Engineering, Computing, Business, or Design.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "coventry-about", label: "About Coventry University", href: "/universities/coventry/about" },
              { blockType: "textLink", id: "coventry-tuition-fees", label: "Tuition Fees", href: "/universities/coventry/tuition-fees" },
              { blockType: "textLink", id: "coventry-admission-criteria", label: "Admission Criteria", href: "/universities/coventry/admission-criteria" },
              { blockType: "textLink", id: "coventry-schools-and-programs", label: "Schools and programs", href: "/universities/coventry/schools-and-programs" },
            ],
          },
        ],
      },
    },
    {
      label: "Study",
      hasMegaMenu: true,
      href: "/study",
      id: "study",
      megaMenu: {
        tabs: [
          {
            blockType: "titleDescriptionTab",
            id: "undergraduates",
            title: "Undergraduates",
            description: "Explore 20+ programs in different majors",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "all-programs", label: "All Programs", href: "/programs" },
              { blockType: "textLink", id: "design-and-media", label: "Design & Media", href: "/programs/design-and-media" },
              { blockType: "textLink", id: "engineering", label: "Engineering", href: "/programs/engineering" },
              { blockType: "textLink", id: "physiotherapy", label: "Physiotherapy", href: "/programs/physiotherapy" },
              { blockType: "textLink", id: "psychology", label: "Psychology", href: "/programs/psychology" },
              { blockType: "textLink", id: "business", label: "Business", href: "/programs/business" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "postgraduates",
            title: "Postgraduates",
            description: "Explore 10+ programs in different majors",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "all-programs", label: "All Programs", href: "/programs" },
              { blockType: "textLink", id: "design-and-media", label: "Design & Media", href: "/programs/design-and-media" },
              { blockType: "textLink", id: "engineering", label: "Engineering", href: "/programs/engineering" },
              { blockType: "textLink", id: "physiotherapy", label: "Physiotherapy", href: "/programs/physiotherapy" },
              { blockType: "textLink", id: "psychology", label: "Psychology", href: "/programs/psychology" },
              { blockType: "textLink", id: "business", label: "Business", href: "/programs/business" },
              { blockType: "textLink", id: "Math", label: "Math", href: "/programs/business" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "continuing-education",
            title: "Continuing Education",
            description: "Explore 15+ programs in different majors",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "all-programs", label: "All Programs", href: "/programs" },
              { blockType: "textLink", id: "design", label: "Design ", href: "/programs/design-and-media" },
              { blockType: "textLink", id: "engineering", label: "Engineering", href: "/programs/engineering" },
              { blockType: "textLink", id: "Math", label: "Math", href: "/programs/business" },
              { blockType: "textLink", id: "physiotherapy", label: "Physiotherapy", href: "/programs/physiotherapy" },
            ],
          },
        ],
      },
    },
    {
      label: "Campus Life",
      hasMegaMenu: true,
      href: "/campus-life",
      id: "campus-life",
      megaMenu: {
        tabs: [
          {
            blockType: "titleDescriptionTab",
            id: "student-life",
            title: "Student Life",
            description: "Explore clubs, communities, and campus experiences.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "student-life-link", label: "Student Life", href: "/campus-life/student-life" },
              { blockType: "textLink", id: "campus-services", label: "Campus Services", href: "/campus-life/services" },
              { blockType: "textLink", id: "facilities", label: "Facilities", href: "/campus-life/facilities" },
              { blockType: "textLink", id: "clubs", label: "Clubs and Activities", href: "/campus-life/clubs" },
              { blockType: "textLink", id: "student-support", label: "Student Support", href: "/campus-life/support" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "services",
            title: "Services",
            description: "Find the support services available to every student.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "services-overview", label: "Services Overview", href: "/campus-life/services" },
              { blockType: "textLink", id: "support-services", label: "Student Support", href: "/campus-life/support" },
            ],
          },
        ],
      },
    },
    {
      label: "Admissions",
      hasMegaMenu: true,
      href: "/admissions",
      id: "admissions",
      megaMenu: {
        tabs: [
          {
            blockType: "titleDescriptionTab",
            id: "entry-criteria",
            title: "Entry Criteria",
            description: "Review admission requirements for every school.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "entry-criteria-link", label: "Entry Criteria", href: "/admissions/entry-criteria" },
              { blockType: "textLink", id: "tuition-fees", label: "Tuition Fees", href: "/tuition-fees" },
              { blockType: "textLink", id: "scholarships", label: "Scholarships", href: "/scholarships" },
              { blockType: "textLink", id: "how-to-apply", label: "How to Apply", href: "/admissions/how-to-apply" },
              { blockType: "textLink", id: "important-dates", label: "Important Dates", href: "/admissions/important-dates" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "tuition-fees-card",
            title: "Tuition Fees",
            description: "Explore fees, payment plans, and scholarships.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "fees-overview", label: "Tuition Fees", href: "/tuition-fees" },
              { blockType: "textLink", id: "scholarships-overview", label: "Scholarships", href: "/scholarships" },
            ],
          },
        ],
      },
    },
    {
      label: "International Students",
      hasMegaMenu: false,
      href: "/international-students",
      id: "international-students",
    },
    {
      label: "About TKH",
      hasMegaMenu: true,
      href: "/about",
      id: "about-tkh",
      megaMenu: {
        tabs: [
          {
            blockType: "titleDescriptionTab",
            id: "overview",
            title: "Overview",
            description: "Learn more about The Knowledge Hub Universities.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "about-overview", label: "About TKH", href: "/about" },
              { blockType: "textLink", id: "board-of-trustees", label: "Board of Trustees", href: "/about/board-of-trustees" },
              { blockType: "textLink", id: "tkh-campus", label: "TKH Campus", href: "/campus" },
              { blockType: "textLink", id: "our-universities", label: "Our Universities", href: "/universities" },
              { blockType: "textLink", id: "contact-tkh", label: "Contact TKH", href: "/contact" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "board",
            title: "Board of Trustees",
            description: "Meet the people guiding TKH's academic vision.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "board-members", label: "Board of Trustees", href: "/about/board-of-trustees" },
              { blockType: "textLink", id: "leadership", label: "Leadership", href: "/about/leadership" },
            ],
          },
          {
            blockType: "titleDescriptionTab",
            id: "campus",
            title: "TKH Campus",
            description: "Discover our purpose-built campus in New Cairo.",
            previewImage: PREVIEW_IMAGE,
            subLinks: [
              { blockType: "textLink", id: "campus-overview", label: "TKH Campus", href: "/campus" },
              { blockType: "textLink", id: "campus-facilities", label: "Facilities", href: "/campus-life/facilities" },
            ],
          },
        ],
      },
    },
  ],
};
