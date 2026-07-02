import type { Field, GlobalConfig } from "payload";
import { ctaGroup, linkFields, mediaField } from "../fields/common";

const subLinkBlocks: NonNullable<Extract<Field, { type: "blocks" }>["blocks"]> =
  [
    {
      slug: "textLink",
      labels: {
        singular: "Text Link",
        plural: "Text Links",
      },
      fields: linkFields,
    },
    {
      slug: "photoLink",
      labels: {
        singular: "Photo Link",
        plural: "Photo Links",
      },
      fields: [mediaField("image", "Image"), ...linkFields],
    },
    {
      slug: "studyLinks",
      labels: {
        singular: "Study Links",
        plural: "Study Links",
      },
      fields: [
        {
          name: "items",
          type: "relationship",
          label: "Studies",
          relationTo: "studies" as never,
          hasMany: true,
        },
      ],
    },
    {
      slug: "linkGroup",
      labels: {
        singular: "Link Group",
        plural: "Link Groups",
      },
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Group Heading",
        },
        {
          name: "links",
          type: "array",
          label: "Links",
          fields: [
            ...linkFields,
            {
              name: "highlighted",
              type: "checkbox",
              label: "Highlighted (accent color)",
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ];

const subLinksField: Field = {
  name: "subLinks",
  type: "blocks",
  label: "Sub Links",
  blocks: subLinkBlocks,
};

const previewImageField = mediaField("previewImage", "Right Preview Photo");

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  fields: [
    mediaField("logo", "Logo"),
    {
      name: "topLinks",
      type: "group",
      label: "Top Links",
      fields: [
        {
          name: "universities",
          type: "array",
          label: "Universities",
          fields: linkFields,
        },
        {
          name: "resources",
          type: "array",
          label: "Resources",
          fields: linkFields,
        },
      ],
    },
    {
      name: "primaryNavigation",
      type: "array",
      label: "Primary Navigation",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
        },
        {
          name: "hasMegaMenu",
          type: "checkbox",
          label: "Has Mega Menu",
          defaultValue: false,
        },
        {
          name: "href",
          type: "text",
          label: "URL",
          admin: {
            condition: (_, siblingData) => !siblingData?.hasMegaMenu,
          },
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          label: "Open in New Tab",
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => !siblingData?.hasMegaMenu,
          },
        },
        {
          name: "megaMenu",
          type: "group",
          label: "Mega Menu",
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasMegaMenu),
          },
          fields: [
            {
              name: "tabs",
              type: "blocks",
              label: "Tabs",
              blocks: [
                {
                  slug: "imageDescriptionTab",
                  labels: {
                    singular: "Image + Description Tab",
                    plural: "Image + Description Tabs",
                  },
                  fields: [
                    mediaField("image", "Tab Image / Logo"),
                    {
                      name: "description",
                      type: "textarea",
                      label: "Description",
                    },
                    previewImageField,
                    subLinksField,
                  ],
                },
                {
                  slug: "titleDescriptionTab",
                  labels: {
                    singular: "Title + Description Tab",
                    plural: "Title + Description Tabs",
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Title",
                      required: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Description",
                    },
                    previewImageField,
                    subLinksField,
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "searchLabel",
      type: "text",
      label: "Search Label",
    },
    ctaGroup("contactCta", "Contact CTA"),
    ctaGroup("applyCta", "Apply CTA"),
    {
      name: "mobileMenu",
      type: "group",
      label: "Mobile Menu",
      fields: [
        {
          name: "openLabel",
          type: "text",
          label: "Open Menu Label",
        },
        {
          name: "closeLabel",
          type: "text",
          label: "Close Menu Label",
        },
      ],
    },
  ],
};
