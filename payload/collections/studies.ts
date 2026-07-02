import type { CollectionConfig } from "payload";
import { activeField, linkFields, orderField } from "../fields/common";

export const Studies: CollectionConfig = {
  slug: "studies",
  labels: {
    singular: "Study",
    plural: "Studies",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "active", "order"],
  },
  defaultSort: "order",
  fields: [
    ...linkFields,
    orderField,
    activeField,
  ],
};
