import type { Field } from "payload";

export const orderField: Field = {
  name: "order",
  type: "number",
  label: "Order",
  defaultValue: 0,
  admin: {
    description: "Lower numbers appear first.",
    position: "sidebar",
  },
};

export const activeField: Field = {
  name: "active",
  type: "checkbox",
  label: "Active",
  defaultValue: true,
  admin: {
    position: "sidebar",
  },
};

export const mediaField = (name: string, label: string): Field => ({
  name,
  type: "upload",
  label,
  relationTo: "media" as never,
});

export const linkFields: Field[] = [
  {
    name: "label",
    type: "text",
    label: "Label",
  },
  {
    name: "href",
    type: "text",
    label: "URL",
  },
  {
    name: "openInNewTab",
    type: "checkbox",
    label: "Open in New Tab",
    defaultValue: false,
  },
];

export const ctaGroup = (name: string, label: string): Field => ({
  name,
  type: "group",
  label,
  fields: linkFields,
});

export const sectionIntroFields: Field[] = [
  {
    name: "eyebrow",
    type: "text",
    label: "Eyebrow",
  },
  {
    name: "heading",
    type: "text",
    label: "Heading",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
  },
];

export const statsArray: Field = {
  name: "stats",
  type: "array",
  label: "Stats",
  fields: [
    {
      name: "label",
      type: "text",
      label: "Label",
    },
    {
      name: "value",
      type: "text",
      label: "Value",
    },
  ],
};

export const seoGroup: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Title",
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta Description",
    },
    mediaField("shareImage", "Share Image"),
  ],
};
