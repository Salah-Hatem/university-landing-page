import type { UniversitiesSection, University } from "@/payload-types";


export const RATING_BADGES: NonNullable<University["highlights"]> = [
    {
        title: "5 stars",
        description: "Overall Rating & Internationalization\nQS Stars University Ratings",
    },
    {
        title: "Queen's Award",
        description: "For Interprise\nInternational Trade 2022",
    },
    {
        title: "12th on world",
        description: "for international outlook\nThe Young University Rankings 2024",
    },
];

const DEFAULT_TEXT = {
    eyebrow: "Partner with Excellence",
    heading: "Study with The World's Top Ranked Universities",
    description:
        "TKH partners with prestigious European and UK universities to bring their academic excellence to Egypt.",
};

const COVENTRY: University = {
    id: 0,
    name: "Coventry University",
    image: {
        id: 0,
        alt: "Coventry University campus",
        url: "/university image.png",
        updatedAt: "",
        createdAt: "",
    },
    logo: {
        id: 0,
        alt: "Coventry University",
        url: "/image 30.png",
        width: 405,
        height: 148,
        updatedAt: "",
        createdAt: "",
    },
    cta: { label: "Explore Coventry", href: "/universities/coventry", openInNewTab: false },
    updatedAt: "",
    createdAt: "",
};

const NOVA: University = {
    id: 0,
    name: "NOVA University Lisbon",
    image: {
        id: 0,
        alt: "NOVA University Lisbon campus",
        url: "/img/nova-campus.png",
        updatedAt: "",
        createdAt: "",
    },
    logo: {
        id: 0,
        alt: "NOVA University Lisbon",
        url: "/img/nova-logo.png",
        width: 280,
        height: 156,
        updatedAt: "",
        createdAt: "",
    },
    cta: { label: "Explore NOVA", href: "/universities/nova", openInNewTab: false },
    updatedAt: "",
    createdAt: "",
};

// The stage/grid are authored for exactly four fixed slots (see CARD_LAYOUTS in
// PartnersStage / CARD_TILT in PartnersGrid), so the fallback provides four cards.
const FALLBACK_CARDS: University[] = [COVENTRY, NOVA, NOVA, COVENTRY];

function textOrDefault(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function isPopulatedUniversity(
    value: number | University | null | undefined,
): value is University {
    return typeof value === "object" && value !== null;
}

// Fill each of the four fixed slots with the matching CMS university when it is
// present and populated, otherwise fall back to the bundled default for that
// slot. Featured universities beyond the fourth are ignored to keep the layout.
function getCards(section?: UniversitiesSection | null): University[] {
    const featured = section?.featuredUniversities ?? [];

    return FALLBACK_CARDS.map((fallback, index) => {
        const university = featured[index];
        return isPopulatedUniversity(university) ? university : fallback;
    });
}

export function getUniversityPartnersData(section?: UniversitiesSection | null) {
    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        description: textOrDefault(section?.description, DEFAULT_TEXT.description),
        cards: getCards(section),
    };
}
