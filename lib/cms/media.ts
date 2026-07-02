export type PayloadMediaLike = {
  alt?: null | string;
  height?: null | number;
  url?: null | string;
  width?: null | number;
};

export type NormalizedMedia = {
  alt: string;
  height?: number;
  url: string;
  width?: number;
};

export function normalizeMedia(
  media: PayloadMediaLike | number | null | string | undefined,
): NormalizedMedia | null {
  if (!media || typeof media === "number") {
    return null;
  }

  if (typeof media === "string") {
    return {
      alt: "",
      url: media,
    };
  }

  if (!media.url) {
    return null;
  }

  return {
    alt: media.alt ?? "",
    height: media.height ?? undefined,
    url: media.url,
    width: media.width ?? undefined,
  };
}
