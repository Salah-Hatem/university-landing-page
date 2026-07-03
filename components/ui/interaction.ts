/**
 * Shared interaction-state class strings.
 *
 * Centralizes the hover / focus-visible feedback so every button, link and card
 * tile stays consistent. Feedback is colour-only: elements brighten (or shift to
 * the brand colour) on hover — no scale, lift, shadow or movement of any kind.
 * A keyboard-only focus ring is included for accessibility.
 *
 * Colors come from the existing design tokens (see globals.css).
 */

/** Keyboard focus ring — mirrors the existing SliderControls treatment. */
export const FOCUS_RING =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-tkh-primary focus-visible:ring-offset-2";

/**
 * Hover fill for brand-orange surfaces — a lighter/brighter shade of
 * `--surface-tkh-primary` (#e84925). `brightness` can't lighten flat fills
 * predictably, so brand pills swap to this explicit colour instead.
 */
export const BRAND_HOVER = "hover:bg-[#f15a3c]";

/** Orange pill buttons & CTA links: brighter orange on hover. No movement. */
export const INTERACTIVE_BUTTON =
    "transition-colors duration-200 ease-out " + BRAND_HOVER + " " + FOCUS_RING;

/** Transparent icon buttons: brighten their contents on hover. No movement. */
export const INTERACTIVE_ICON_BUTTON =
    "transition-[filter] duration-200 ease-out hover:brightness-110 " + FOCUS_RING;

/** Text links: colour shift to brand on hover. No movement. */
export const INTERACTIVE_LINK =
    "transition-colors duration-200 ease-out hover:text-text-tkh-primary " + FOCUS_RING;

/** Card-like tiles: brighten on hover. No movement. */
export const INTERACTIVE_CARD =
    "transition-[filter] duration-200 ease-out hover:brightness-110 " + FOCUS_RING;
