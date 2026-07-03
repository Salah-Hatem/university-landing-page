import AdmissionSteps from "@/components/landing/admission-steps/AdmissionSteps";
import ContactSection from "@/components/landing/contact-section/ContactSection";
import CoreMajors from "@/components/landing/core-majors/CoreMajors";
import ExperienceCampus from "@/components/landing/experience-campus/ExperienceCampus";
import Footer from "@/components/landing/footer/Footer";
import GraduateSuccess from "@/components/landing/graduate-success/GraduateSuccess";
import {Header} from "@/components/landing/header/Header";
import {HeroSection} from "@/components/landing/hero-section/HeroSection";
import MarqueeRibbon from "@/components/landing/marquee-ribbon/MarqueeRibbon";
import ProudNews from "@/components/landing/proud-news/ProudNews";
import UniversityPartners from "@/components/landing/university-partners/UniversityPartners";
import UpcomingEvents from "@/components/landing/upcoming-events/UpcomingEvents";
import {HeroRevealProvider} from "@/components/landing/hero-section/HeroRevealContext";
import {Metadata} from "next";
import {getHeader, getHeroSection, getHomePage} from "@/lib/cms/landing";
import {getHeaderData} from "@/components/landing/header/data";
import {getHeroData} from "@/components/landing/hero-section/data";


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

    return (
        <>
            <HeroRevealProvider>

                <Header header={header}/>
                <main id="main-content">
                    <HeroSection hero={hero}/>
                    <ExperienceCampus/>
                    <UniversityPartners/>
                    <MarqueeRibbon/>
                    <CoreMajors/>
                    <UpcomingEvents/>
                    <GraduateSuccess/>
                    <AdmissionSteps/>
                    <ProudNews/>
                    <ContactSection/>
                </main>
                <Footer/>
            </HeroRevealProvider>
        </>
    );

}
