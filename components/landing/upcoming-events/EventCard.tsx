import Image from "next/image";

import { INTERACTIVE_CARD } from "@/components/ui/interaction";

import {
    EVENT_DATE_CLIP_PATH,
    EVENT_IMAGE_CLIP_PATH,
    type getEventsData,
} from "./data";

/** One resolved event card from the CMS adapter. */
type EventItem = ReturnType<typeof getEventsData>["events"][number];

type EventCardProps = {
    event: EventItem;
};

/**
 * A single event slide: full-bleed image with the title/description anchored in
 * the bottom-left and an angular orange date badge nested into the top-right.
 */
export function EventCard({ event }: EventCardProps) {
    return (
        <div className={`relative aspect-video shrink-0 select-none overflow-hidden min-w-147 w-full tablet:w-240 ${INTERACTIVE_CARD}`}>
            <Image
                src={event.image.url}
                alt={event.image.alt}
                fill
                sizes="(max-width: 1280px) 85vw, 960px"
                className="pointer-events-none object-cover"
                style={{ clipPath: EVENT_IMAGE_CLIP_PATH }}
                draggable={false}
            />
            <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_60%,#000_100%)]"
                style={{ clipPath: EVENT_IMAGE_CLIP_PATH }}
            />

            <div
                className="absolute right-0 top-0 z-10 flex flex-col items-center justify-center gap-xs bg-surface-tkh-primary px-l py-m text-text-invert"
                style={{ clipPath: EVENT_DATE_CLIP_PATH }}
            >
                <span className="text-H4">{event.date.day}</span>
                <span className="text-body-2 whitespace-nowrap">{event.date.month}</span>
            </div>

            <div className="pointer-events-none absolute bottom-l left-l right-l z-10 flex max-w-[700px] flex-col gap-m text-text-invert tablet:bottom-2xl tablet:left-3xl">
                <span className="text-H3">{event.title}</span>
                <span className="text-body-2">{event.description}</span>
            </div>
        </div>
    );
}
