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

// The header mega-menu embeds the `studies` collection, so a Study edit must
// invalidate the header cache as well — declared via the cross-dependency tag.
export const getHeader = () => findGlobal("header", [collectionTag("studies")]);
export const getFooter = () => findGlobal("footer");
export const getHomePage = () => findGlobal("homePage");

export const getHeroSection = () => findGlobal("heroSection");
export const getExperienceSection = () => findGlobal("experienceSection");
// The section embeds `universities` docs via `featuredUniversities`, so an
// edit to a University must invalidate this global's cache too.
export const getUniversitiesSection = () =>
  findGlobal("universitiesSection", [collectionTag("universities")]);
// Each of these embeds documents from a collection via a relationship, so an
// edit to that collection must invalidate the global's cache too.
export const getMarqueeRibbonSection = () =>
  findGlobal("marqueeRibbonSection", [collectionTag("universities")]);
export const getCoreMajorsSection = () =>
  findGlobal("coreMajorsSection", [collectionTag("programs")]);
export const getEventsSection = () =>
  findGlobal("eventsSection", [collectionTag("events")]);
export const getGraduateSuccessSection = () =>
  findGlobal("graduateSuccessSection", [collectionTag("graduateStories")]);
export const getAdmissionsSection = () => findGlobal("admissionsSection");
export const getNewsSection = () =>
  findGlobal("newsSection", [collectionTag("news")]);
export const getContactSection = () => findGlobal("contactSection");
