import { revalidateTag } from "next/cache";
import type { CollectionConfig, GlobalConfig, PayloadRequest } from "payload";

import { collectionTag, globalTag } from "./tags";

type CollectionAfterChangeHook = NonNullable<
  NonNullable<CollectionConfig["hooks"]>["afterChange"]
>[number];

type CollectionAfterDeleteHook = NonNullable<
  NonNullable<CollectionConfig["hooks"]>["afterDelete"]
>[number];

type GlobalAfterChangeHook = NonNullable<
  NonNullable<GlobalConfig["hooks"]>["afterChange"]
>[number];


// editor's save is reflected on the next visit's background refresh.
function revalidate(req: PayloadRequest, tag: string, source: string) {
  try {
    revalidateTag(tag, "max");
  } catch (err) {
    req.payload.logger.warn({
      err,
      msg: `Failed to revalidate ${tag} after ${source}.`,
    });
  }
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook =
  async ({ collection, req }) => {
    revalidate(
      req,
      collectionTag(collection.slug),
      `collection change: ${collection.slug}`,
    );
  };

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook =
  async ({ collection, req }) => {
    revalidate(
      req,
      collectionTag(collection.slug),
      `collection delete: ${collection.slug}`,
    );
  };

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({
  global,
  req,
}) => {
  revalidate(req, globalTag(global.slug), `global change: ${global.slug}`);
};
