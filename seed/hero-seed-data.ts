/**
 * HERO SEED DATA — wired into seed/seed.ts.
 *
 * The data below conforms to the generated Payload `HeroSection` shape
 * (see payload-types.ts). It mirrors the default hero fallback in
 * components/landing/hero-section/data.ts so seeding populates the global with the
 * content already displayed on the landing page.
 *
 * Media fields (`image`, `backgroundImage`, `backgroundVideo`) accept a
 * `MediaSeed` (shared with header-seed-data.ts):
 *   - a path (mirrored under seed/assets/)  -> "/hero-video.mp4"
 *   - an object { src, alt }
 *   - null                                    -> leave the field empty
 * The seeder uploads each referenced file into the `media` collection and links
 * it by ID.
 */

import type { HeroSection } from "@/payload-types";

import type { MediaSeed } from "./header-seed-data";

// Conform to the generated HeroSection global, overriding the upload fields to
// accept a MediaSeed the seeder resolves to a media relation ID at runtime.
export type HeroSeedData = Omit<
  HeroSection,
  "id" | "image" | "backgroundImage" | "backgroundVideo" | "updatedAt" | "createdAt"
> & {
  image?: MediaSeed;
  backgroundImage?: MediaSeed;
  backgroundVideo?: MediaSeed;
};

export const heroSeedData: HeroSeedData = {
  heading: "Your Gateway To Global Education",
  description:
    "Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.",
  primaryCta: { label: "Explore Programs", href: "#", openInNewTab: false },
  secondaryCta: { label: "Explore Programs", href: "#", openInNewTab: false },
  image: null,
  backgroundImage: null,
  backgroundVideo: "/hero-video.mp4",
};
