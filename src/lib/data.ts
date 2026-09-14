import "server-only";
import { db } from "@/db";
import {
  banners,
  contactSettings,
  developerSettings,
  faqs,
  homepageSettings,
  inquiries,
  reviews,
  serviceTypes,
  services,
  siteSettings,
  themeSettings,
  vehicleImages,
  vehicles,
} from "@/db/schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { DEFAULT_THEME } from "./theme-presets";

export async function getSiteSettings() {
  const [row] = await db.select().from(siteSettings).limit(1);
  return (
    row ?? {
      id: "",
      companyName: "7 Emirates Carlift",
      logoUrl: null,
      faviconUrl: null,
      tagline: "Premium Transportation & Car Lift Services in Dubai",
      siteTitle: "7 Emirates Carlift | Premium Transportation in Dubai",
      metaDescription: "Book safe, reliable and premium car lift, car rental and airport transfer services across Dubai and the UAE.",
      ogImageUrl: null,
      canonicalUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
}

export async function getContactSettings() {
  const [row] = await db.select().from(contactSettings).limit(1);
  return (
    row ?? {
      id: "",
      phone: null,
      whatsapp: null,
      email: null,
      address: null,
      facebookUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
}

export async function getHomepageSettings() {
  const [row] = await db.select().from(homepageSettings).limit(1);
  return (
    row ?? {
      id: "",
      heroTitle: "Premium Transportation & Car Lift Services in Dubai",
      heroDescription: "Travel in comfort with our modern fleet and professional drivers. Your journey, our priority.",
      heroImageUrl: null,
      heroPrimaryButtonText: "Check Ride Availability",
      heroPrimaryButtonLink: "#availability",
      heroSecondaryButtonText: "Explore Our Fleet",
      heroSecondaryButtonLink: "/fleet",
      availabilityTitle: "Check Ride Availability",
      availabilityDescription: "Tell us your trip details and we'll get back to you on WhatsApp.",
      aboutTitle: "Your Comfort, Our Commitment",
      aboutDescription: "We provide safe, reliable and luxurious transportation services across Dubai and the UAE. With a professional team and modern fleet, your journey is always in good hands.",
      whyChooseTitle: "Why Choose 7 Emirates Carlift",
      whyChooseDescription: "We go beyond transportation to deliver a premium, dependable experience for every ride.",
      howItWorksTitle: "Simple & Easy Booking Steps",
      contactCtaTitle: "Ready for Your Next Journey?",
      contactCtaDescription: "Book now or get in touch with us on WhatsApp.",
      showHero: true,
      showAvailability: true,
      showServices: true,
      showFleet: true,
      showAbout: true,
      showWhyChoose: true,
      showHowItWorks: true,
      showReviews: true,
      showFaq: true,
      showContactCta: true,
      updatedAt: new Date(),
    }
  );
}

export async function getThemeSettings() {
  const [row] = await db.select().from(themeSettings).limit(1);
  if (!row) {
    return {
      id: "",
      presetName: "ocean-blue",
      ...DEFAULT_THEME,
      updatedAt: new Date(),
    };
  }
  return row;
}

export async function getDeveloperSettings() {
  const [row] = await db.select().from(developerSettings).limit(1);
  return (
    row ?? {
      id: "",
      enabled: true,
      creditText: "Designed & Developed by",
      developerName: "Afnan Afjal Rafi",
      whatsappNumber: null,
      countryCode: null,
      whatsappMessage: null,
      updatedAt: new Date(),
    }
  );
}

export async function getServiceTypes(onlyPublished = true) {
  const query = db.select().from(serviceTypes).orderBy(asc(serviceTypes.displayOrder), asc(serviceTypes.createdAt));
  if (onlyPublished) {
    return db
      .select()
      .from(serviceTypes)
      .where(eq(serviceTypes.published, true))
      .orderBy(asc(serviceTypes.displayOrder), asc(serviceTypes.createdAt));
  }
  return query;
}

export async function getServices(onlyPublished = true) {
  if (onlyPublished) {
    return db
      .select()
      .from(services)
      .where(eq(services.published, true))
      .orderBy(asc(services.displayOrder), asc(services.createdAt));
  }
  return db.select().from(services).orderBy(asc(services.displayOrder), asc(services.createdAt));
}

export async function getServiceBySlug(slug: string) {
  const [row] = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return row ?? null;
}

export async function getVehicles(onlyPublished = true) {
  if (onlyPublished) {
    return db
      .select()
      .from(vehicles)
      .where(eq(vehicles.published, true))
      .orderBy(asc(vehicles.displayOrder), asc(vehicles.createdAt));
  }
  return db.select().from(vehicles).orderBy(asc(vehicles.displayOrder), asc(vehicles.createdAt));
}

export async function getFeaturedVehicles(limit = 4) {
  return db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.published, true), eq(vehicles.featured, true)))
    .orderBy(asc(vehicles.displayOrder), asc(vehicles.createdAt))
    .limit(limit);
}

export async function getVehicleBySlug(slug: string) {
  const [row] = await db.select().from(vehicles).where(eq(vehicles.slug, slug)).limit(1);
  return row ?? null;
}

export async function getVehicleById(id: string) {
  const [row] = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  return row ?? null;
}

export async function getVehicleImages(vehicleId: string) {
  return db
    .select()
    .from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, vehicleId))
    .orderBy(asc(vehicleImages.displayOrder), asc(vehicleImages.createdAt));
}

export async function getPublishedReviews() {
  return db
    .select()
    .from(reviews)
    .where(and(eq(reviews.published, true), eq(reviews.status, "approved")))
    .orderBy(desc(reviews.createdAt));
}

export async function getFaqs(onlyPublished = true) {
  if (onlyPublished) {
    return db.select().from(faqs).where(eq(faqs.published, true)).orderBy(asc(faqs.displayOrder), asc(faqs.createdAt));
  }
  return db.select().from(faqs).orderBy(asc(faqs.displayOrder), asc(faqs.createdAt));
}

export async function getBanners(onlyPublished = true) {
  if (onlyPublished) {
    return db.select().from(banners).where(eq(banners.published, true)).orderBy(asc(banners.displayOrder), asc(banners.createdAt));
  }
  return db.select().from(banners).orderBy(asc(banners.displayOrder), asc(banners.createdAt));
}

export async function getDashboardStats() {
  const [
    [{ count: totalVehicles }],
    [{ count: publishedVehicles }],
    [{ count: featuredVehicles }],
    [{ count: totalInquiries }],
    [{ count: newInquiries }],
    [{ count: pendingReviews }],
    [{ count: publishedServices }],
    [{ count: publishedFaqs }],
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(vehicles),
    db.select({ count: sql<number>`count(*)::int` }).from(vehicles).where(eq(vehicles.published, true)),
    db.select({ count: sql<number>`count(*)::int` }).from(vehicles).where(eq(vehicles.featured, true)),
    db.select({ count: sql<number>`count(*)::int` }).from(inquiries),
    db.select({ count: sql<number>`count(*)::int` }).from(inquiries).where(eq(inquiries.status, "new")),
    db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(eq(reviews.status, "pending")),
    db.select({ count: sql<number>`count(*)::int` }).from(services).where(eq(services.published, true)),
    db.select({ count: sql<number>`count(*)::int` }).from(faqs).where(eq(faqs.published, true)),
  ]);

  return {
    totalVehicles,
    publishedVehicles,
    featuredVehicles,
    totalInquiries,
    newInquiries,
    pendingReviews,
    publishedServices,
    publishedFaqs,
  };
}

export async function getRecentInquiries(limit = 8) {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit);
}
