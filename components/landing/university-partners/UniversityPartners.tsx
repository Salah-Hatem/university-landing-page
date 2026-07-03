import type { getUniversityPartnersData } from "./data";
import { PartnersGrid } from "./PartnersGrid";
import { PartnersHeader } from "./PartnersHeader";
import { PartnersStage } from "./PartnersStage";

/**
 * "Partner with Excellence" section. The CMS adapter prepares copy/card data;
 * this component only combines it with the fixed visual layouts and renders the
 * responsive grid/stage branches.
 */
export function UniversityPartners({ partners }: { partners: ReturnType<typeof getUniversityPartnersData> }) {
    const header = (
        <PartnersHeader
            eyebrow={partners.eyebrow}
            heading={partners.heading}
            description={partners.description}
        />
    );

    return (
        <section className="w-full">
            <PartnersGrid header={header} cards={partners.cards} />
            <PartnersStage header={header} cards={partners.cards} />
        </section>
    );
}
