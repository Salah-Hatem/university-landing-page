import type { CollectionConfig } from "payload";
import { activeField, mediaField, orderField } from "../fields/common";

export const GraduateStories: CollectionConfig = {
  slug: "graduateStories",
  labels: {
    singular: "Graduate Story",
    plural: "Graduate Stories",
  },
  admin: {
    useAsTitle: "graduateName",
    defaultColumns: ["graduateName", "graduationYear", "active", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "graduateName",
      type: "text",
      label: "Graduate Name",
      required: true,
    },
    {
      name: "graduationYear",
      type: "text",
      label: "Graduation Year",
      admin: {
        description: "For example: 2025 Grad.",
      },
    },
    {
      name: "role",
      type: "text",
      label: "Role or Title",
    },
    {
      name: "company",
      type: "text",
      label: "Company or Organization",
    },
    {
      name: "school",
      type: "text",
      label: "Partner School",
      admin: {
        description: "Partner school label shown on the card, e.g. NOVA, Coventry, or TKH.",
      },
    },
    {
      name: "quote",
      type: "textarea",
      label: "Story Quote",
      required: true,
    },
    mediaField("image", "Image"),
    mediaField("avatar", "Avatar"),
    orderField,
    activeField,
  ],
};
