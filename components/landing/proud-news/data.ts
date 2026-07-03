import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { News, NewsSection } from "@/payload-types";


export const NEWS_IMAGE_CLIP_PATH =
    "polygon(8.13% 0, 100% 0, 100% 61.52%, 92.05% 100%, 0 100%, 0 37.84%)";

/**
 * A resolved news card: the `News` fields the card renders, plus a string React
 * key, the resolved category colour class, a pre-formatted date, and the
 * normalised image.
 */
type NewsItem = Pick<News, "category" | "title"> & {
    /** Stable identifier, used as the React key. */
    id: string;
    /** Tailwind text-color token for the category label (varies per item in the design). */
    categoryClassName: string;
    /** Publish date, pre-formatted e.g. "December 17, 2025". */
    date: string;
    image: NormalizedMedia;
};

/** Maps the CMS `categoryColor` enum onto its Tailwind text-color token. */
const CATEGORY_COLOR_CLASS: Record<NonNullable<News["categoryColor"]>, string> = {
    "tkh-primary": "text-text-tkh-primary",
    nova: "text-surface-nova",
    "uni-secondary": "text-text-uni-secondary",
};

/**
 * Bundled articles rendered when the CMS section has no populated news docs. Each
 * supplies a per-slot fallback for empty CMS fields.
 */
export const NEWS: NewsItem[] = [
    {
        id: "cuc-delegation-visit",
        category: "NOVA UNIVERSITY",
        categoryClassName: "text-surface-nova",
        title: "Communication University of China (CUC) Delegation Visits TKH",
        date: "December 17, 2025",
        image: {
            url: "/img/news1.png",
            alt: "TKH faculty welcoming the CUC delegation on campus.",
        },
    },
    {
        id: "nova-sbe-empathy",
        category: "DESIGN & MEDIA",
        categoryClassName: "text-text-tkh-primary",
        title: "Cultivating Empathy Through Learning: NOVA SBE Students Explore Diversity, Equity & Inclusion",
        date: "December 2, 2025",
        image: {
            url: "/img/news1.png",
            alt: "NOVA SBE students holding certificates after a diversity and inclusion workshop.",
        },
    },
    {
        id: "el-enany-unesco",
        category: "School of Continuing Education",
        categoryClassName: "text-text-uni-secondary",
        title: "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
        date: "October 7, 2025",
        image: {
            url: "/img/news1.png",
            alt: "Portrait of Prof. Khaled El-Enany.",
        },
    },
    {
        id: "el-enany-unesco2",
        category: "School of Continuing Education",
        categoryClassName: "text-text-uni-secondary",
        title: "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
        date: "October 7, 2025",
        image: {
            url: "/img/news1.png",
            alt: "Portrait of Prof. Khaled El-Enany.",
        },
    },
    {
        id: "el-enany-unesco3",
        category: "School of Continuing Education",
        categoryClassName: "text-text-uni-secondary",
        title: "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
        date: "October 7, 2025",
        image: {
            url: "/img/news1.png",
            alt: "Portrait of Prof. Khaled El-Enany.",
        },
    },
];

/** Design-fixed section copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    eyebrow: "Stay Updated",
    heading: "Proud News!",
    description:
        "Discover the latest achievements, partnerships, and news shaping the future of education at TKH.",
} as const;

/** Design-fixed CTA used when the CMS omits one. */
const DEFAULT_CTA = {
    href: "#",
    label: "Explore Our All News",
    openInNewTab: false,
} as const;

function textOrDefault(value: unknown, fallback: string | null | undefined): string {
    if (typeof value === "string" && value.trim()) return value.trim();
    return typeof fallback === "string" ? fallback : "";
}

function isPopulatedNews(
    value: number | News | null | undefined,
): value is News {
    return typeof value === "object" && value !== null;
}

function formatNewsDate(value: unknown, fallback: string): string {
    if (typeof value === "string" && value.trim()) {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            // Force UTC so a date-only string never shifts a day in either
            // direction under the server's local timezone.
            return parsed.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
            });
        }
    }
    return fallback;
}

/**
 * Resolve the news section from Payload: populated articles map onto news cards
 * (with a per-slot fallback for empty fields), and when the CMS provides none,
 * the full bundled set renders.
 */
export function getNewsData(section?: NewsSection | null) {
    const articleDocs = (section?.articles ?? []).filter(isPopulatedNews);
    const articles: NewsItem[] = articleDocs.length
        ? articleDocs.map((article, index) => {
              const fallback = NEWS[index % NEWS.length];
              const image = normalizeMedia(article.thumbnail);
              return {
                  id: `news-${article.id}`,
                  category: textOrDefault(article.category, fallback.category),
                  categoryClassName:
                      (article.categoryColor &&
                          CATEGORY_COLOR_CLASS[article.categoryColor]) ??
                      fallback.categoryClassName,
                  title: textOrDefault(article.title, fallback.title),
                  date: formatNewsDate(article.date, fallback.date),
                  image: {
                      url: image?.url ?? fallback.image.url,
                      alt: image?.alt || fallback.image.alt,
                  },
              };
          })
        : NEWS;

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
        articles,
    };
}
