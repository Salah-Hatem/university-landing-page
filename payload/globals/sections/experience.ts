import type { GlobalConfig } from "payload";
import { ctaGroup, mediaField, sectionIntroFields } from "../../fields/common";

export const ExperienceSection: GlobalConfig = {
  slug: "experienceSection",
  label: "Experience TKH Section",
  fields: [
    ...sectionIntroFields,
    {
      name: "tabs",
      type: "array",
      label: "Experience Tabs",
      fields: [
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
        mediaField("image", "Image"),
        {
          name: "stat",
          type: "group",
          label: "Stat",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Value",
            },
            {
              name: "label",
              type: "text",
              label: "Label",
            },
          ],
        },
      ],
    },
    ctaGroup("cta", "CTA"),
  ],
};
