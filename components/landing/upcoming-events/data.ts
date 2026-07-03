import { normalizeMedia, type NormalizedMedia } from "@/lib/cms/media";
import type { Event as PayloadEvent, EventsSection } from "@/payload-types";

export const EVENT_DATE_CLIP_PATH = "polygon(0 0, 100% 0, 100% 100%, 20% 100%, 0 60%)";


export const EVENT_IMAGE_CLIP_PATH =
    "polygon(11.97% 0, 100% 0, 100% 52.97%, 88.18% 100%, 0 100%, 0 46.24%)";

const DEFAULT_TEXT = {
    eyebrow: "Events",
    heading: "Don’t Miss Our Upcoming Events!",
};

const DEFAULT_CTA = {
    href: "#",
    label: "Explore Our All Events",
    openInNewTab: false,
};

/** Split day / month so the date badge can stack them. */
type EventDate = {
    /** Day of month, e.g. "25". */
    day: string;
    /** Month and year, e.g. "April 2026". */
    month: string;
};

/**
 * Design-fixed sample events, used verbatim when the CMS section is empty and
 * per-slot to backfill any field a CMS event leaves blank. Images use the
 * {@link NormalizedMedia} `url` shape so they interchange with `normalizeMedia`.
 */
type EventFallback = {
    id: string;
    title: string;
    description: string;
    image: NormalizedMedia;
    date: EventDate;
};

const FALLBACK_EVENTS: EventFallback[] = [
    {
        id: "nova-open-day",
        title: "NOVA Open Day!",
        description:
            "Join us for an Open Day! Discover opportunities and meet our campus. Explore your future with us!",
        image: {
            url: "/img/events/nova-open-day.png",
            alt: "Students talking and smiling together at a campus open day.",
        },
        date: { day: "25", month: "April 2026" },
    },
    {
        id: "cairo-innovation-hub",
        title: "Cairo Innovation Hub",
        description: "Visit our Campus! Learn about programs and meet campus.",
        image: {
            url: "/img/events/events1.png",
            alt: "Graduates in caps and gowns gathered at a commencement ceremony.",
        },
        date: { day: "25", month: "April 2026" },
    },
    {
        id: "campus-tour",
        title: "Guided Campus Tour",
        description:
            "Walk through our facilities, labs, and student spaces with a current student guide.",
        image: {
            url: "/img/events/events1.png",
            alt: "A wide view of the university campus grounds.",
        },
        date: { day: "08", month: "May 2026" },
    },
    {
        id: "research-showcase",
        title: "Research Showcase",
        description:
            "See student and faculty projects across engineering, design, and the sciences.",
        image: {
            url: "/img/events/events1.png",
            alt: "Students working with equipment in a research lab.",
        },
        date: { day: "19", month: "May 2026" },
    },
];

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function isPopulatedEvent(
    value: number | PayloadEvent | null | undefined,
): value is PayloadEvent {
    return typeof value === "object" && value !== null;
}

/**
 * Resolve the split day/month badge. Prefer the CMS `dateLabel` ("25 April 2026")
 * when present, else derive it from the `date` value; fall back to the sample
 * event's date only when both are missing/unparseable.
 */
function formatEventDate(event: PayloadEvent, fallback: EventDate): EventDate {
    if (typeof event.dateLabel === "string" && event.dateLabel.trim()) {
        const [day, ...rest] = event.dateLabel.trim().split(" ");
        if (rest.length) {
            return { day, month: rest.join(" ") };
        }
    }
    const parsed = new Date(event.date);
    if (!Number.isNaN(parsed.getTime())) {
        return {
            // Payload stores `date` as a date-only value parsed as UTC midnight —
            // read UTC fields (and format in the UTC zone) so the local server
            // timezone can never shift the displayed day backward/forward.
            day: String(parsed.getUTCDate()).padStart(2, "0"),
            month: parsed.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
            }),
        };
    }
    return fallback;
}

/**
 * Map the CMS events section onto the slider's view model. Populated event docs
 * become cards (each blank field backfilled from the same-index sample event);
 * an empty section renders the full {@link FALLBACK_EVENTS} set.
 */
export function getEventsData(section?: EventsSection | null) {
    const eventDocs = (section?.events ?? []).filter(isPopulatedEvent);
    const events = eventDocs.length
        ? eventDocs.map((event, index) => {
              const fallback = FALLBACK_EVENTS[index % FALLBACK_EVENTS.length];
              const image = normalizeMedia(event.image);
              return {
                  id: `event-${event.id}`,
                  title: textOrDefault(event.title, fallback.title),
                  description: textOrDefault(event.excerpt, fallback.description),
                  image: {
                      url: image?.url ?? fallback.image.url,
                      alt: image?.alt || fallback.image.alt,
                  },
                  date: formatEventDate(event, fallback.date),
              };
          })
        : FALLBACK_EVENTS;

    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        cta: {
            href: textOrDefault(section?.cta?.href, DEFAULT_CTA.href),
            label: textOrDefault(section?.cta?.label, DEFAULT_CTA.label),
            openInNewTab:
                typeof section?.cta?.openInNewTab === "boolean"
                    ? section.cta.openInNewTab
                    : DEFAULT_CTA.openInNewTab,
        },
        events,
    };
}
