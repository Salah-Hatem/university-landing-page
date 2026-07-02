import type { CollectionConfig } from "payload";
import { activeField, ctaGroup, mediaField, orderField } from "../fields/common";

export const Programs: CollectionConfig = {
  slug: "programs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "programCountLabel", "active", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "programCountLabel",
      type: "text",
      label: "Program Count Label",
      admin: {
        description: "For example: 7 Programs.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    mediaField("image", "Image"),
    ctaGroup("cta", "CTA"),
    orderField,
    activeField,
  ],
};
