import {
  getBanners,
  getContactSettings,
  getFaqs,
  getFeaturedVehicles,
  getHomepageSettings,
  getPublishedReviews,
  getServiceTypes,
  getServices,
  getSiteSettings,
} from "@/lib/data";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { BannerSection } from "@/components/site/sections/BannerSection";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
import { FleetSection } from "@/components/site/sections/FleetSection";
import { AboutWhyChooseSection } from "@/components/site/sections/AboutWhyChooseSection";
import { HowItWorksSection } from "@/components/site/sections/HowItWorksSection";
import { ReviewsSection } from "@/components/site/sections/ReviewsSection";
import { FaqSection } from "@/components/site/sections/FaqSection";
import { ContactCtaSection } from "@/components/site/sections/ContactCtaSection";

export default async function HomePage() {
  const [homepage, site, contact, banners, services, vehicles, reviews, faqs, serviceTypes] = await Promise.all([
    getHomepageSettings(),
    getSiteSettings(),
    getContactSettings(),
    getBanners(true),
    getServices(true),
    getFeaturedVehicles(4),
    getPublishedReviews(),
    getFaqs(true),
    getServiceTypes(true),
  ]);

  return (
    <>
      {homepage.showHero !== false && (
        <HeroSection homepage={homepage} companyName={site.companyName} whatsapp={contact.whatsapp} serviceTypes={serviceTypes} />
      )}

      <BannerSection banners={banners} />

      {homepage.showHowItWorks !== false && <HowItWorksSection title={homepage.howItWorksTitle} />}

      {homepage.showFleet !== false && <FleetSection vehicles={vehicles} />}

      {homepage.showServices !== false && <ServicesSection services={services} />}

      {(homepage.showAbout !== false || homepage.showWhyChoose !== false) && <AboutWhyChooseSection homepage={homepage} />}

      {homepage.showReviews !== false && <ReviewsSection reviews={reviews} />}

      {homepage.showFaq !== false && <FaqSection faqs={faqs} />}

      {homepage.showContactCta !== false && <ContactCtaSection homepage={homepage} whatsapp={contact.whatsapp} />}
    </>
  );
}
