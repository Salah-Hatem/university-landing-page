import { Button } from "@/components/ui/Button";
import { SubtitleTag } from "@/components/ui/SubtitleTag";

import { type getEventsData } from "./data";
import { EventsSlider } from "./EventsSlider";

type UpcomingEventsProps = {
    events: ReturnType<typeof getEventsData>;
};

export function UpcomingEvents({ events }: UpcomingEventsProps) {
    return (
        <section
            aria-labelledby="upcoming-events-heading"
            className="w-full bg-[linear-gradient(143.76deg,#F5F7FB_26.64%,#FDF1EE_76.11%)]"
        >
            <div className="mx-auto flex max-w-[1920px] flex-col items-center gap-2xl py-7xl px-2xl mobile:px-3xl">
                <div className="flex w-full max-w-[519px] flex-col items-center gap-xl">
                    <SubtitleTag>{events.eyebrow}</SubtitleTag>
                    <h2
                        id="upcoming-events-heading"
                        className="text-H2 text-center text-text-primary"
                    >
                        {events.heading}
                    </h2>
                </div>
                <EventsSlider
                    events={events.events}
                    cta={
                        <Button
                            href={events.cta.href}
                            variant="primary"
                            className="gap-l"
                            target={events.cta.openInNewTab ? "_blank" : undefined}
                            rel={events.cta.openInNewTab ? "noreferrer" : undefined}
                        >
                            {events.cta.label}
                        </Button>
                    }
                />
            </div>
        </section>
    );
}
