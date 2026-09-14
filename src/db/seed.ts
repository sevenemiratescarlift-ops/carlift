import "dotenv/config";
import { db, pool } from "./index";
import {
  adminUsers,
  contactSettings,
  developerSettings,
  faqs,
  homepageSettings,
  serviceTypes,
  services,
  siteSettings,
  themeSettings,
  vehicles,
} from "./schema";
import bcrypt from "bcryptjs";
import { DEFAULT_THEME } from "@/lib/theme-presets";

async function seed() {
  console.log("Seeding database...");

  // --- Admin user -----------------------------------------------------
  const existingAdminCount = await db.select().from(adminUsers);
  if (existingAdminCount.length === 0) {
    const email = process.env.INITIAL_ADMIN_EMAIL || "admin@7emiratescarlift.com";
    const password = process.env.INITIAL_ADMIN_PASSWORD || "ChangeMe#2024";
    const name = process.env.INITIAL_ADMIN_NAME || "Admin";
    const passwordHash = await bcrypt.hash(password, 12);
    await db.insert(adminUsers).values({ name, email, passwordHash });
    console.log(`Created initial admin user: ${email}`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  // --- Site settings ----------------------------------------------------
  const existingSite = await db.select().from(siteSettings);
  if (existingSite.length === 0) {
    await db.insert(siteSettings).values({
      companyName: "7 Emirates Carlift",
      tagline: "Premium Transportation & Car Lift Services in Dubai",
      siteTitle: "7 Emirates Carlift | Premium Transportation in Dubai",
      metaDescription:
        "Book safe, reliable and premium car lift, car rental, and airport transfer services across Dubai and the UAE with 7 Emirates Carlift.",
      logoUrl: null,
      faviconUrl: null,
      ogImageUrl: null,
      canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    });
    console.log("Created site settings.");
  }

  // --- Contact settings ---------------------------------------------------
  const existingContact = await db.select().from(contactSettings);
  if (existingContact.length === 0) {
    await db.insert(contactSettings).values({
      phone: "+971500000000",
      whatsapp: "+971500000000",
      email: "info@7emiratescarlift.com",
      address: "Sheikh Zayed Road, Dubai, United Arab Emirates",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
    });
    console.log("Created contact settings.");
  }

  // --- Homepage settings ---------------------------------------------
  const existingHome = await db.select().from(homepageSettings);
  if (existingHome.length === 0) {
    await db.insert(homepageSettings).values({
      heroTitle: "Premium Transportation & Car Lift Services in Dubai",
      heroDescription:
        "Travel in comfort with our modern fleet and professional drivers. Your journey, our priority — anywhere across the UAE.",
      heroImageUrl: "/images/hero-dubai.jpg",
      heroPrimaryButtonText: "Check Ride Availability",
      heroPrimaryButtonLink: "#availability",
      heroSecondaryButtonText: "Explore Our Fleet",
      heroSecondaryButtonLink: "/fleet",
      availabilityTitle: "Check Ride Availability",
      availabilityDescription: "Tell us your trip details and we'll get back to you on WhatsApp within minutes.",
      aboutTitle: "Your Comfort, Our Commitment",
      aboutDescription:
        "We provide safe, reliable and luxurious transportation services across Dubai and the UAE. With a professional team and a modern fleet, your journey is always in good hands.",
      whyChooseTitle: "Why Choose 7 Emirates Carlift",
      whyChooseDescription: "We go beyond transportation to deliver a premium, dependable experience for every ride.",
      howItWorksTitle: "Simple & Easy Booking Steps",
      contactCtaTitle: "Ready for Your Next Journey?",
      contactCtaDescription: "Book now or get in touch with us on WhatsApp — our team is available 24/7.",
    });
    console.log("Created homepage settings.");
  }

  // --- Theme settings -----------------------------------------------
  const existingTheme = await db.select().from(themeSettings);
  if (existingTheme.length === 0) {
    await db.insert(themeSettings).values({
      presetName: "ocean-blue",
      ...DEFAULT_THEME,
    });
    console.log("Created theme settings.");
  }

  // --- Developer settings --------------------------------------------
  const existingDeveloper = await db.select().from(developerSettings);
  if (existingDeveloper.length === 0) {
    await db.insert(developerSettings).values({
      enabled: true,
      creditText: "Designed & Developed by",
      developerName: "Afnan Afjal Rafi",
      whatsappNumber: "1XXXXXXXXXX",
      countryCode: "+880",
      whatsappMessage:
        "Hello Afnan Afjal Rafi, I found your work through the 7 Emirates Carlift website and would like to discuss a website/project.",
    });
    console.log("Created developer settings.");
  }

  // --- Service types -----------------------------------------------
  const existingServiceTypes = await db.select().from(serviceTypes);
  if (existingServiceTypes.length === 0) {
    const defaultServiceTypes = [
      "Car Lift",
      "Car Rental",
      "Airport Pickup",
      "Airport Drop-off",
      "Airport Pickup & Drop-off",
      "Corporate Transportation",
      "Hotel Transfer",
      "City Tour",
      "Other / Not Sure",
    ];
    await db.insert(serviceTypes).values(
      defaultServiceTypes.map((name, index) => ({
        name,
        published: true,
        displayOrder: index,
      }))
    );
    console.log("Created default service types.");
  }

  // --- Services --------------------------------------------------------
  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    const starterServices = [
      {
        name: "Airport Transfer",
        slug: "airport-transfer",
        description: "Hassle-free airport pickups and drop-offs with flight tracking and meet & greet.",
        icon: "plane",
      },
      {
        name: "City Tour",
        slug: "city-tour",
        description: "Explore Dubai in style with a private driver and a flexible, curated itinerary.",
        icon: "map-pin",
      },
      {
        name: "Corporate Transport",
        slug: "corporate-transport",
        description: "Professional and reliable transportation solutions for business and events.",
        icon: "briefcase",
      },
      {
        name: "Long Distance",
        slug: "long-distance",
        description: "Comfortable inter-emirate transfers with experienced drivers, UAE-wide coverage.",
        icon: "map",
      },
      {
        name: "Car Lift",
        slug: "car-lift",
        description: "Daily and monthly car lift arrangements tailored to your commute schedule.",
        icon: "car",
      },
      {
        name: "Hotel Transfer",
        slug: "hotel-transfer",
        description: "Smooth, punctual transfers between hotels, venues and the airport.",
        icon: "building",
      },
    ];
    await db.insert(services).values(
      starterServices.map((s, index) => ({ ...s, published: true, displayOrder: index }))
    );
    console.log("Created starter services.");
  }

  // --- Vehicles -------------------------------------------------------
  const existingVehicles = await db.select().from(vehicles);
  if (existingVehicles.length === 0) {
    const starterVehicles = [
      {
        name: "Toyota Camry",
        slug: "toyota-camry",
        vehicleType: "Sedan",
        seats: 4,
        ac: true,
        luggageCapacity: "2 Luggage",
        description: "A smooth, comfortable sedan perfect for city rides and airport transfers.",
        features: ["Leather Seats", "Bluetooth Audio", "Child Seat on Request", "Bottled Water"],
        mainImageUrl: "/images/vehicles/toyota-camry.jpg",
        featured: true,
        displayOrder: 0,
      },
      {
        name: "Mercedes GLE",
        slug: "mercedes-gle",
        vehicleType: "SUV",
        seats: 6,
        ac: true,
        luggageCapacity: "3 Luggage",
        description: "A luxury SUV offering premium comfort for executive travel and family trips.",
        features: ["Premium Leather", "Panoramic Roof", "Extra Legroom", "Wi-Fi Onboard"],
        mainImageUrl: "/images/vehicles/mercedes-gle.jpg",
        featured: true,
        displayOrder: 1,
      },
      {
        name: "Toyota Hiace",
        slug: "toyota-hiace",
        vehicleType: "Van",
        seats: 12,
        ac: true,
        luggageCapacity: "6 Luggage",
        description: "Spacious van ideal for group transportation and corporate outings.",
        features: ["Individual AC Vents", "Ample Luggage Space", "Group Seating"],
        mainImageUrl: "/images/vehicles/toyota-hiace.jpg",
        featured: true,
        displayOrder: 2,
      },
      {
        name: "Hyundai Staria",
        slug: "hyundai-staria",
        vehicleType: "Minibus",
        seats: 15,
        ac: true,
        luggageCapacity: "8 Luggage",
        description: "Modern minibus for larger groups needing extra comfort and space.",
        features: ["Reclining Seats", "USB Charging", "Large Windows"],
        mainImageUrl: "/images/vehicles/hyundai-staria.jpg",
        featured: true,
        displayOrder: 3,
      },
    ];
    await db.insert(vehicles).values(starterVehicles);
    console.log("Created starter vehicles.");
  }

  // --- FAQs -------------------------------------------------------------
  const existingFaqs = await db.select().from(faqs);
  if (existingFaqs.length === 0) {
    const starterFaqs = [
      {
        question: "How do I book a ride with 7 Emirates Carlift?",
        answer:
          "Simply use the 'Check Ride Availability' form on our homepage or select a vehicle from our fleet and click 'Book Now'. We'll confirm your booking over WhatsApp.",
      },
      {
        question: "Do you provide 24/7 service?",
        answer: "Yes, our team and drivers are available around the clock, including holidays.",
      },
      {
        question: "How is pricing determined?",
        answer:
          "Pricing depends on distance, vehicle type and trip duration. Our team will discuss and confirm the fare with you directly on WhatsApp before confirming your booking.",
      },
      {
        question: "Can I request a specific vehicle?",
        answer: "Absolutely. Browse our fleet page and select 'Book Now' on the vehicle you'd like to reserve.",
      },
      {
        question: "Is airport pickup tracking available?",
        answer: "Yes, we track your flight status so your driver arrives on time even if your flight is delayed.",
      },
    ];
    await db.insert(faqs).values(starterFaqs.map((f, index) => ({ ...f, published: true, displayOrder: index })));
    console.log("Created starter FAQs.");
  }

  console.log("Seeding complete.");
}

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
