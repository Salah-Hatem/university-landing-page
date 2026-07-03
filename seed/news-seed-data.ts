/**
 * NEWS SEED DATA — wired into seed/seed.ts.
 *
 * Seeds 5 `news` collection docs and the `newsSection` global that references
 * them, mirroring the current content in components/landing/proud-news/data.ts.
 * `categoryColor` maps to a Tailwind text-color token via CATEGORY_COLOR_CLASS
 * in lib/cms/landing.ts.
 */

import type { News, NewsSection } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type NewsArticleSeed = Omit<News, "id" | "thumbnail" | "updatedAt" | "createdAt"> & {
  key: string;
  thumbnail?: MediaSeed;
};

export type NewsSeedData = Omit<
  NewsSection,
  "id" | "articles" | "updatedAt" | "createdAt"
> & {
  articles: NewsArticleSeed[];
  // Local article `key`s, in display order.
  featuredArticles: string[];
};

export const newsSeedData: NewsSeedData = {
  eyebrow: "Stay Updated",
  heading: "Proud News!",
  description:
    "Discover the latest achievements, partnerships, and news shaping the future of education at TKH.",
  cta: { label: "Explore Our All News", href: "#", openInNewTab: false },
  articles: [
    {
      key: "cuc-delegation-visit",
      category: "NOVA UNIVERSITY",
      categoryColor: "nova",
      title: "Communication University of China (CUC) Delegation Visits TKH",
      date: "2025-12-17",
      thumbnail: {
        src: "/news/news1.jpg",
        alt: "TKH faculty welcoming the CUC delegation on campus.",
      },
      order: 0,
      active: true,
    },
    {
      key: "nova-sbe-empathy",
      category: "DESIGN & MEDIA",
      categoryColor: "tkh-primary",
      title:
        "Cultivating Empathy Through Learning: NOVA SBE Students Explore Diversity, Equity & Inclusion",
      date: "2025-12-02",
      thumbnail: {
        src: "/news/new2.png",
        alt: "NOVA SBE students holding certificates after a diversity and inclusion workshop.",
      },
      order: 1,
      active: true,
    },
    {
      key: "el-enany-unesco",
      category: "School of Continuing Education",
      categoryColor: "uni-secondary",
      title:
        "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
      date: "2025-10-07",
      thumbnail: {
        src: "/news/news3.png",
        alt: "Portrait of Prof. Khaled El-Enany.",
      },
      order: 2,
      active: true,
    },
    {
      key: "el-enany-unesco2",
      category: "School of Continuing Education",
      categoryColor: "uni-secondary",
      title:
        "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
      date: "2025-10-07",
      thumbnail: {
        src: "/news/news1.jpg",
        alt: "Portrait of Prof. Khaled El-Enany.",
      },
      order: 3,
      active: true,
    },
    {
      key: "el-enany-unesco3",
      category: "School of Continuing Education",
      categoryColor: "uni-secondary",
      title:
        "H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO",
      date: "2025-10-07",
      thumbnail: {
        src: "/news/new2.png",
        alt: "Portrait of Prof. Khaled El-Enany.",
      },
      order: 4,
      active: true,
    },
  ],
  featuredArticles: [
    "cuc-delegation-visit",
    "nova-sbe-empathy",
    "el-enany-unesco",
    "el-enany-unesco2",
    "el-enany-unesco3",
  ],
};
