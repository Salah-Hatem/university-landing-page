import type { CollectionConfig } from "payload";
import { activeField, ctaGroup, mediaField, orderField } from "../fields/common";

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "News Article",
    plural: "News",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "active", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "category",
      type: "text",
      label: "Category",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "date",
      type: "date",
      label: "Date",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt",
    },
    {
      name: "categoryColor",
      type: "select",
      label: "Category Color",
      defaultValue: "tkh-primary",
      options: [
        { label: "TKH Primary", value: "tkh-primary" },
        { label: "NOVA", value: "nova" },
        { label: "University Secondary", value: "uni-secondary" },
      ],
      admin: {
        description: "Text color token applied to the category label.",
      },
    },
    mediaField("thumbnail", "Thumbnail"),
    ctaGroup("cta", "CTA"),
    orderField,
    activeField,
  ],
};
