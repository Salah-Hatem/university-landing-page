/**
 * MARQUEE SEED DATA — wired into seed/seed.ts.
 *
 * Global-only, but each band references the `universities` collection (already
 * seeded by university-seed-data.ts) by local `key` so the marquee logos come
 * from the same Coventry/NOVA docs the Partners section uses. The 3rd band
 * (fallback "New Partnerships Soon") has no university and renders the static
 * fallback ribbon (see getMarqueeData in components/landing/marquee-ribbon/data.ts).
 */

import type { MarqueeRibbonSection } from "@/payload-types";

type BandSeed = {
  label?: string;
  backgroundColor?: string;
  /** Local university `key`s (from university-seed-data.ts) to feature in this band. */
  universities: string[];
};

export type MarqueeSeedData = Omit<
  MarqueeRibbonSection,
  "id" | "bands" | "updatedAt" | "createdAt"
> & {
  bands: BandSeed[];
};

export const marqueeSeedData: MarqueeSeedData = {
  bands: [
    { label: "Coventry University", universities: ["coventry"] },
    { label: "NOVA University Lisbon", universities: ["nova"] },
    { label: "New Partnerships Soon", universities: [] },
  ],
};
