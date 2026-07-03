import {SubtitleTag} from "@/components/ui/SubtitleTag";
import {Button} from "@/components/ui/Button";
import {NewsSlider} from "@/components/landing/proud-news/NewsSlider";
import type {getNewsData} from "@/components/landing/proud-news/data";

type ProudNewsProps = {
    news: ReturnType<typeof getNewsData>;
};

export function ProudNews({news}: ProudNewsProps) {
    return (

        <section
            className="w-full flex flex-col gap-2xl items-center bg-[linear-gradient(233deg,#FDF1EE_11.13%,#F5F7FB_85.19%)]"
        >
            <div className="mx-auto flex max-w-[1920px] w-full flex-col items-center gap-xl px-m py-8xl mobile:gap-[88px] mobile:px-8xl tablet:gap-2xl tablet:py-7xl">

                {/*  Title */}
                <div className="flex w-full flex-col items-center gap-3xl mobile:max-w-193.5 tablet:gap-xl">
                    <SubtitleTag>{news.eyebrow}</SubtitleTag>
                    <div className="flex flex-col items-center gap-2xl tablet:gap-m">
                        <h2
                            id="upcoming-events-heading"
                            className="text-H2 text-center text-text-primary"
                        >
                            {news.heading}
                        </h2>
                        <p className="text-body-1 text-center text-text-secondary max-w-188.5">
                            {news.description}
                        </p>
                    </div>
                </div>

            {/*  Slider  */}
                <NewsSlider
                    news={news.articles}
                    cta={
                        <Button
                            href={news.cta.href}
                            variant="primary"
                            target={news.cta.openInNewTab ? "_blank" : undefined}
                            rel={news.cta.openInNewTab ? "noreferrer" : undefined}
                        >
                            {news.cta.label}
                        </Button>
                    }
                />
            </div>

        </section>
    )
}

