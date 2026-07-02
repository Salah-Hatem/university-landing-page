import type { GlobalConfig } from "payload";
import { sectionIntroFields } from "../../fields/common";

export const CoreMajorsSection: GlobalConfig = {
  slug: "coreMajorsSection",
  label: "Core Majors Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "programs",
      type: "relationship",
      label: "Programs",
      relationTo: "programs" as never,
      hasMany: true,
    },
  ],
};
