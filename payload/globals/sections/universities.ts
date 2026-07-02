import type { GlobalConfig } from "payload";
import { sectionIntroFields } from "../../fields/common";

export const UniversitiesSection: GlobalConfig = {
  slug: "universitiesSection",
  label: "Universities Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "featuredUniversities",
      type: "relationship",
      label: "Featured Universities",
      relationTo: "universities" as never,
      hasMany: true,
    },
  ],
};
