import type { GlobalConfig } from "payload";
import { ctaGroup, linkFields, mediaField } from "../fields/common";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  fields: [
    mediaField("logo", "Logo"),
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "contact",
      type: "group",
      label: "Contact",
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Heading",
        },
        {
          name: "phone",
          type: "text",
          label: "Phone",
        },
        {
          name: "address",
          type: "textarea",
          label: "Address",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
        },
        ctaGroup("cta", "CTA"),
      ],
    },
    {
      name: "search",
      type: "group",
      label: "Search",
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Heading",
        },
        {
          name: "placeholder",
          type: "text",
          label: "Placeholder",
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Button Label",
        },
      ],
    },
    {
      name: "linkColumns",
      type: "array",
      label: "Link Columns",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Column Title",
        },
        {
          name: "links",
          type: "array",
          label: "Links",
          fields: linkFields,
        },
      ],
    },
    {
      name: "moreLinks",
      type: "array",
      label: "More Links",
      fields: linkFields,
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Links",
      fields: [
        {
          name: "platform",
          type: "select",
          label: "Platform",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
          ],
        },
        {
          name: "url",
          type: "text",
          label: "URL",
        },
      ],
    },
    {
      name: "legalLinks",
      type: "array",
      label: "Legal Links",
      fields: linkFields,
    },
    {
      name: "copyright",
      type: "text",
      label: "Copyright",
    },
  ],
};
