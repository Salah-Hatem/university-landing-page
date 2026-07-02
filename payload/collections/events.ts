import type { CollectionConfig } from "payload";
import { activeField, ctaGroup, mediaField, orderField } from "../fields/common";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "active", "order"],
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
      name: "date",
      type: "date",
      label: "Date",
      required: true,
    },
    {
      name: "dateLabel",
      type: "text",
      label: "Display Date",
      admin: {
        description: "Optional label such as April 2026.",
      },
    },
    {
      name: "time",
      type: "text",
      label: "Time",
    },
    {
      name: "location",
      type: "text",
      label: "Location",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt",
    },
    mediaField("image", "Image"),
    ctaGroup("cta", "CTA"),
    orderField,
    activeField,
  ],
};
