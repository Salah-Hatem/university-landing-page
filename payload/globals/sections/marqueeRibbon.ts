import type { GlobalConfig } from "payload";
import { mediaField } from "../../fields/common";

export const MarqueeRibbonSection: GlobalConfig = {
  slug: "marqueeRibbonSection",
  label: "Marquee Ribbon Section",
  fields: [
    {
      name: "bands",
      type: "array",
      label: "Ribbon Bands",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label",
        },
        {
          name: "backgroundColor",
          type: "text",
          label: "Background Color",
          admin: {
            description: "Use a hex color such as #2F67A2.",
          },
        },
        {
          name: "universities",
          type: "relationship",
          label: "Universities",
          relationTo: "universities" as never,
          hasMany: true,
        },
        {
          name: "manualItems",
          type: "array",
          label: "Manual Items",
          fields: [
            {
              name: "label",
              type: "text",
              label: "Label",
            },
            mediaField("image", "Image"),
          ],
        },
      ],
    },
  ],
};
