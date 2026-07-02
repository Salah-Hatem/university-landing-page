import type { GlobalConfig } from "payload";
import { ctaGroup, sectionIntroFields, statsArray } from "../../fields/common";

export const GraduateSuccessSection: GlobalConfig = {
  slug: "graduateSuccessSection",
  label: "Graduate Success Section",
  fields: [
    ...sectionIntroFields,
    statsArray,
    {
      name: "stories",
      type: "relationship",
      label: "Graduate Stories",
      relationTo: "graduateStories" as never,
      hasMany: true,
    },
    ctaGroup("cta", "CTA"),
  ],
};
