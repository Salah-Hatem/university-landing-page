import type { GlobalConfig } from "payload";
import { ctaGroup, sectionIntroFields } from "../../fields/common";

export const AdmissionsSection: GlobalConfig = {
  slug: "admissionsSection",
  label: "Admissions Section",
  fields: [
    ...sectionIntroFields,
    ctaGroup("cta", "CTA"),
    {
      name: "steps",
      type: "array",
      label: "Steps",
      fields: [
        {
          name: "number",
          type: "text",
          label: "Step Number",
        },
        {
          name: "title",
          type: "text",
          label: "Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
      ],
    },
  ],
};
