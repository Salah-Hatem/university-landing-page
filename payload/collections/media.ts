import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    // Media is served to the public site, so files must be readable anonymously.
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      required: true,
      admin: {
        description: "Describe this media item for accessibility and search.",
      },
    },
  ],
};
