import type { CollectionConfig } from "payload";
import { activeField, ctaGroup, mediaField, orderField } from "../fields/common";

export const Universities: CollectionConfig = {
  slug: "universities",
  labels: {
    singular: "University",
    plural: "Universities",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "active", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    mediaField("logo", "Logo"),
    mediaField("image", "Card Image"),
    mediaField("marqueeLogo", "Marquee Logo"),
    {
      name: "brandColor",
      type: "text",
      label: "Brand Color",
      admin: {
        description: "Use a hex color such as #273480.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    ctaGroup("cta", "CTA"),
    {
      name: "highlights",
      type: "array",
      label: "Highlights",
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
      ],
    },
    orderField,
    activeField,
  ],
};
