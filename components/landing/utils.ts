export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Shared "frosted glass" surface used by every header panel
export const GLASS_PANEL =
  "bg-white/70 backdrop-blur-[33px] [-webkit-backdrop-filter:blur(33px)]";

// next/image refuses to optimize SVGs unless `dangerouslyAllowSVG` is enabled
// (it is intentionally off here). Render SVG sources unoptimized so they load
// directly while PNG/JPEG media still go through the optimizer.
export function isSvgSource(src: string) {
  return src.toLowerCase().endsWith(".svg");
}
