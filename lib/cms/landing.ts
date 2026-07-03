import { cacheLife, cacheTag } from "next/cache";

import type { Config } from "@/payload-types";

import { getPayloadClient } from "./payload";
import { collectionTag, globalTag } from "./tags";

// Each global is cached independently under its own `global:<slug>` tag.
// `extraTags` lets a global declare cross-dependencies on collections it
// embeds (e.g. the header's mega-menu pulls in the `studies` collection),
// so editing that collection busts this cache too.
async function findGlobal<T extends keyof Config["globals"]>(
  slug: T,
  extraTags: string[] = [],
): Promise<Config["globals"][T]> {
  "use cache";
  cacheLife("days");
  // Every global embeds media directly (e.g. hero images) or transitively at
  // depth 2 via a collection relation, so all globals depend on the `media`
  // collection — editing a media doc must bust them.
  cacheTag(globalTag(slug), collectionTag("media"), ...extraTags);

  const payload = await getPayloadClient();
  return payload.findGlobal({ slug, depth: 2 });
}

// Wrap the cached fetch so a Vercel/Postgres connection failure degrades to the
// bundled fallback design instead of crashing the page: every section's data.ts
// transformer already renders complete defaults when handed `null`. The
// try/catch sits OUTSIDE findGlobal's `'use cache'` boundary, so a failed fetch
// is never cached — once the DB recovers, the next request re-fetches and caches
// live content (catching inside would pin the fallback for `cacheLife("days")`).
async function safeFindGlobal<T extends keyof Config["globals"]>(
  slug: T,
  extraTags: string[] = [],
): Promise<Config["globals"][T] | null> {
  try {
    return await findGlobal(slug, extraTags);
  } catch (err) {
    console.error(
      `[cms] Failed to load global "${slug}" from Vercel; rendering fallback content.`,
      err,
    );
    return null;
  }
}

// The header mega-menu embeds the `studies` collection, so a Study edit must
// invalidate the header cache as well — declared via the cross-dependency tag.
export const getHeader = () =>
  safeFindGlobal("header", [collectionTag("studies")]);
export const getFooter = () => safeFindGlobal("footer");
export const getHomePage = () => safeFindGlobal("homePage");

export const getHeroSection = () => safeFindGlobal("heroSection");
export const getExperienceSection = () => safeFindGlobal("experienceSection");
// The section embeds `universities` docs via `featuredUniversities`, so an
// edit to a University must invalidate this global's cache too.
export const getUniversitiesSection = () =>
  safeFindGlobal("universitiesSection", [collectionTag("universities")]);
// Each of these embeds documents from a collection via a relationship, so an
// edit to that collection must invalidate the global's cache too.
export const getMarqueeRibbonSection = () =>
  safeFindGlobal("marqueeRibbonSection", [collectionTag("universities")]);
export const getCoreMajorsSection = () =>
  safeFindGlobal("coreMajorsSection", [collectionTag("programs")]);
export const getEventsSection = () =>
  safeFindGlobal("eventsSection", [collectionTag("events")]);
export const getGraduateSuccessSection = () =>
  safeFindGlobal("graduateSuccessSection", [collectionTag("graduateStories")]);
export const getAdmissionsSection = () => safeFindGlobal("admissionsSection");
export const getNewsSection = () =>
  safeFindGlobal("newsSection", [collectionTag("news")]);
export const getContactSection = () => safeFindGlobal("contactSection");
