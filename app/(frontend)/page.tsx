import {AdmissionSteps} from "@/components/landing/admission-steps/AdmissionSteps";
import ContactSection from "@/components/landing/contact-section/ContactSection";
import {CoreMajors} from "@/components/landing/core-majors/CoreMajors";
import {ExperienceCampus} from "@/components/landing/experience-campus/ExperienceCampus";
import Footer from "@/components/landing/footer/Footer";
import {GraduateSuccess} from "@/components/landing/graduate-success/GraduateSuccess";
import {Header} from "@/components/landing/header/Header";
import {HeroSection} from "@/components/landing/hero-section/HeroSection";
import {MarqueeRibbon} from "@/components/landing/marquee-ribbon/MarqueeRibbon";
import ProudNews from "@/components/landing/proud-news/ProudNews";
import {UniversityPartners} from "@/components/landing/university-partners/UniversityPartners";
import {UpcomingEvents} from "@/components/landing/upcoming-events/UpcomingEvents";
import {HeroRevealProvider} from "@/components/landing/hero-section/HeroRevealContext";
import {Metadata} from "next";
import {
    getAdmissionsSection,
    getCoreMajorsSection, getEventsSection,
    getExperienceSection, getGraduateSuccessSection,
    getHeader,
    getHeroSection,
    getHomePage,
    getMarqueeRibbonSection,
    getUniversitiesSection
} from "@/lib/cms/landing";
import {getHeaderData} from "@/components/landing/header/data";
import {getHeroData} from "@/components/landing/hero-section/data";
import {getExperienceData} from "@/components/landing/experience-campus/data";
import {getUniversityPartnersData} from "@/components/landing/university-partners/data";
import {getCoreMajorsData} from "@/components/landing/core-majors/data";
import {getMarqueeData} from "@/components/landing/marquee-ribbon/data";
import {getAdmissionsData} from "@/components/landing/admission-steps/data";
import {getGraduateSuccessData} from "@/components/landing/graduate-success/data";
import {getEventsData} from "@/components/landing/upcoming-events/data";


export async function generateMetadata(): Promise<Metadata> {
    const seo = (await getHomePage())?.seo;
    const shareImage =
        seo?.shareImage && typeof seo.shareImage === "object"
            ? (seo.shareImage.url ?? undefined)
            : undefined;

    return {
        title: seo?.metaTitle || "The Knowledge Hub Universities",
        description:
            seo?.metaDescription ||
            "A CMS-powered university landing page for The Knowledge Hub Universities.",
        ...(shareImage ? {openGraph: {images: [{url: shareImage}]}} : {}),
    };
}

export default async function Home() {
    const header = getHeaderData(await getHeader());
    const hero = getHeroData(await getHeroSection());
    const experience = getExperienceData(await getExperienceSection());
    const partners = getUniversityPartnersData(await getUniversitiesSection());
    const marquee = getMarqueeData(await getMarqueeRibbonSection());
    const majors = getCoreMajorsData(await getCoreMajorsSection());
    const events = getEventsData(await getEventsSection());
    const graduates = getGraduateSuccessData(await getGraduateSuccessSection());
    const admissions = getAdmissionsData(await getAdmissionsSection());


    return (
        <>
            <HeroRevealProvider>

                <Header header={header}/>
                <main id="main-content">
                    <HeroSection hero={hero}/>
                    <ExperienceCampus experience={experience}/>
                    <UniversityPartners partners={partners}/>
                    <MarqueeRibbon marquee={marquee}/>
                    <CoreMajors majors={majors}/>
                    <UpcomingEvents events={events}/>
                    <GraduateSuccess graduates={graduates}/>
                    <AdmissionSteps admissions={admissions}/>
                    <ProudNews/>
                    <ContactSection/>
                </main>
                <Footer/>
            </HeroRevealProvider>
        </>
    );

}
