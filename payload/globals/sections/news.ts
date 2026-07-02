import type { GlobalConfig } from "payload";
import { ctaGroup, sectionIntroFields } from "../../fields/common";

export const NewsSection: GlobalConfig = {
  slug: "newsSection",
  label: "News Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "articles",
      type: "relationship",
      label: "News Articles",
      relationTo: "news" as never,
      hasMany: true,
    },
    ctaGroup("cta", "CTA"),
  ],
};
