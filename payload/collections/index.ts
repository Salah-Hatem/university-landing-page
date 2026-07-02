import type { CollectionConfig } from "payload";
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from "@/lib/cms/revalidate";
import { Events } from "./events";
import { GraduateStories } from "./graduateStories";
import { Media } from "./media";
import { News } from "./news";
import { Programs } from "./programs";
import { Studies } from "./studies";
import { Universities } from "./universities";
import { Users } from "./users";

function withLandingRevalidation(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [
        ...(collection.hooks?.afterChange ?? []),
        revalidateCollectionAfterChange,
      ],
      afterDelete: [
        ...(collection.hooks?.afterDelete ?? []),
        revalidateCollectionAfterDelete,
      ],
    },
  };
}

export const collections: CollectionConfig[] = [
  Users,
  ...[
    Media,
    Universities,
    Programs,
    Events,
    GraduateStories,
    News,
    Studies,
  ].map(withLandingRevalidation),
];
