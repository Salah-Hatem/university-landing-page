import type { GlobalConfig } from "payload";
import { ctaGroup, sectionIntroFields } from "../../fields/common";

export const ContactSection: GlobalConfig = {
  slug: "contactSection",
  label: "Contact Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "fields",
      type: "array",
      label: "Form Fields",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label",
        },
        {
          name: "placeholder",
          type: "text",
          label: "Placeholder",
        },
        {
          name: "required",
          type: "checkbox",
          label: "Required",
          defaultValue: true,
        },
      ],
    },
    ctaGroup("submitCta", "Submit CTA"),
  ],
};
