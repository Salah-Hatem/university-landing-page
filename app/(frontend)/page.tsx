import AdmissionSteps from "@/components/landing-page/admission-steps/AdmissionSteps";
import ContactSection from "@/components/landing-page/contact-section/ContactSection";
import CoreMajors from "@/components/landing-page/core-majors/CoreMajors";
import ExperienceCampus from "@/components/landing-page/experience-campus/ExperienceCampus";
import Footer from "@/components/landing-page/footer/Footer";
import GraduateSuccess from "@/components/landing-page/graduate-success/GraduateSuccess";
import Header from "@/components/landing-page/header/Header";
import HeroSection from "@/components/landing-page/hero-section/HeroSection";
import MarqueeRibbon from "@/components/landing-page/marquee-ribbon/MarqueeRibbon";
import ProudNews from "@/components/landing-page/proud-news/ProudNews";
import UniversityPartners from "@/components/landing-page/university-partners/UniversityPartners";
import UpcomingEvents from "@/components/landing-page/upcoming-events/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ExperienceCampus />
        <UniversityPartners />
        <MarqueeRibbon />
        <CoreMajors />
        <UpcomingEvents />
        <GraduateSuccess />
        <AdmissionSteps />
        <ProudNews />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
