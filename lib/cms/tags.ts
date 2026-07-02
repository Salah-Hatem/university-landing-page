// Single source of truth for cache tag names shared by the cached data
// fetchers (lib/cms/landing.ts) and the Payload revalidation hooks
// (lib/cms/revalidate.ts) so the strings can never drift apart.

export const globalTag = (slug: string) => `global:${slug}` as const;
export const collectionTag = (slug: string) => `collection:${slug}` as const;
