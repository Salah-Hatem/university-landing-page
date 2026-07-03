/**
 * PARTNERS SEED DATA — wired into seed/seed.ts.
 *
 * Seeds two `universities` collection docs (Coventry, NOVA) and the
 * `universitiesSection` global that references them. The data mirrors the
 * current content in components/landing/university-partners/data.ts so seeding populates
 * the CMS with what's already displayed on the landing page.
 *
 * Each university's `logo`/`image` accepts a `MediaSeed` (shared with
 * header-seed-data.ts). `featuredUniversities` holds local `key`s (defined per
 * university below), resolved to relation IDs by the seeder — the same
 * key-reference pattern the header uses for `studyLinks`. The four keys map
 * onto the four fixed stage slots (Coventry/NOVA/NOVA/Coventry, matching Figma).
 */

import type { UniversitiesSection, University } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

type UniversitySeed = Omit<
  University,
  "id" | "logo" | "image" | "marqueeLogo" | "updatedAt" | "createdAt"
> & {
  key: string;
  logo?: MediaSeed;
  image?: MediaSeed;
  marqueeLogo?: MediaSeed;
};

export type PartnersSeedData = Omit<
  UniversitiesSection,
  "id" | "featuredUniversities" | "updatedAt" | "createdAt"
> & {
  universities: UniversitySeed[];
  // Local university `key`s for the four fixed stage slots.
  featuredUniversities: string[];
};

export const partnersSeedData: PartnersSeedData = {
  eyebrow: "Partner with Excellence",
  heading: "Study with The World’s Top Ranked Universities",
  description:
    "TKH partners with prestigious European and UK universities to bring their academic excellence to Egypt.",
  universities: [
    {
      key: "coventry",
      name: "Coventry University",
      logo: { src: "/partners/Coventry-White.png", alt: "Coventry University logo" },
      image: { src: "/partners/Coventry.png", alt: "Coventry University campus" },
      marqueeLogo: { src: "/marquee/Coventry-White-s.png", alt: "Coventry University" },
      cta: { label: "Explore Coventry", href: "/universities/coventry", openInNewTab: false },
      order: 0,
      active: true,
    },
    {
      key: "nova",
      name: "NOVA University Lisbon",
      logo: { src: "/partners/Nova-White.png", alt: "NOVA University Lisbon logo" },
      image: { src: "/partners/Nova.png", alt: "NOVA University Lisbon campus" },
      marqueeLogo: { src: "/marquee/Nova-White-Full.png", alt: "NOVA University Lisbon" },
      cta: { label: "Explore NOVA", href: "/universities/nova", openInNewTab: false },
      order: 1,
      active: true,
    },
  ],
  featuredUniversities: ["coventry", "nova", "nova", "coventry"],
};
