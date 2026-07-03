import Image from "next/image";

import { INTERACTIVE_CARD } from "@/components/ui/interaction";

import { NEWS_IMAGE_CLIP_PATH, type getNewsData } from "./data";

/** One resolved news card from the CMS adapter. */
type NewsItem = ReturnType<typeof getNewsData>["articles"][number];

type NewsCardProps = {
    news: NewsItem;
};

/**
 * A single news slide: angular clip-path photo with the faculty category, the
 * headline, and the publish date stacked beneath it.
 */
export function NewsCard({ news }: NewsCardProps) {
    return (
        <div className={`flex flex-col gap-l shrink-0 mobile:gap-xl w-[328px] mobile:w-[592px] tablet:w-[540px] ${INTERACTIVE_CARD}`}>
            <Image
                src={news.image.url}
                alt={news.image.alt}
                width={540}
                height={360}
                className="aspect-3/2 w-full object-cover"
                style={{ clipPath: NEWS_IMAGE_CLIP_PATH }}
            />
            <div className="flex flex-col gap-3.25 pl-3xl tablet:pl-0 w-full min-w-0">
                <h3 className={`hidden mobile:block text-body-2 ${news.categoryClassName}`}>
                    {news.category}
                </h3>
                <p className="text-H6 text-text-primary text-ellipsis">
                    {news.title}
                </p>
                <p className="text-body-2 text-text-secondary">{news.date}</p>
            </div>
        </div>
    );
}
