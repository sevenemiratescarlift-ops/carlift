import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// admin_users
// ---------------------------------------------------------------------------
export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("admin_users_email_idx").on(table.email),
  ],
);

// ---------------------------------------------------------------------------
// site_settings
// ---------------------------------------------------------------------------
export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  tagline: text("tagline"),
  siteTitle: text("site_title"),
  metaDescription: text("meta_description"),
  ogImageUrl: text("og_image_url"),
  canonicalUrl: text("canonical_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// contact_settings
// ---------------------------------------------------------------------------
export const contactSettings = pgTable("contact_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: varchar("phone", { length: 64 }),
  whatsapp: varchar("whatsapp", { length: 64 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  linkedinUrl: text("linkedin_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// homepage_settings
// ---------------------------------------------------------------------------
export const homepageSettings = pgTable("homepage_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),

  heroTitle: text("hero_title"),
  heroDescription: text("hero_description"),
  heroImageUrl: text("hero_image_url"),
  heroPrimaryButtonText: text("hero_primary_button_text"),
  heroPrimaryButtonLink: text("hero_primary_button_link"),
  heroSecondaryButtonText: text("hero_secondary_button_text"),
  heroSecondaryButtonLink: text("hero_secondary_button_link"),

  availabilityTitle: text("availability_title"),
  availabilityDescription: text("availability_description"),

  aboutTitle: text("about_title"),
  aboutDescription: text("about_description"),
  aboutImageUrl: text("about_image_url"),

  whyChooseTitle: text("why_choose_title"),
  whyChooseDescription: text("why_choose_description"),

  howItWorksTitle: text("how_it_works_title"),

  contactCtaTitle: text("contact_cta_title"),
  contactCtaDescription: text("contact_cta_description"),

  showHero: boolean("show_hero").default(true).notNull(),
  showAvailability: boolean("show_availability").default(true).notNull(),
  showServices: boolean("show_services").default(true).notNull(),
  showFleet: boolean("show_fleet").default(true).notNull(),
  showAbout: boolean("show_about").default(true).notNull(),
  showWhyChoose: boolean("show_why_choose").default(true).notNull(),
  showHowItWorks: boolean("show_how_it_works").default(true).notNull(),
  showReviews: boolean("show_reviews").default(true).notNull(),
  showFaq: boolean("show_faq").default(true).notNull(),
  showContactCta: boolean("show_contact_cta").default(true).notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// theme_settings
// ---------------------------------------------------------------------------
export const themeSettings = pgTable("theme_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  presetName: varchar("preset_name", { length: 64 }),
  primaryColor: varchar("primary_color", { length: 32 }),
  secondaryColor: varchar("secondary_color", { length: 32 }),
  accentColor: varchar("accent_color", { length: 32 }),
  backgroundColor: varchar("background_color", { length: 32 }),
  cardColor: varchar("card_color", { length: 32 }),
  textColor: varchar("text_color", { length: 32 }),
  mutedTextColor: varchar("muted_text_color", { length: 32 }),
  borderColor: varchar("border_color", { length: 32 }),
  navbarColor: varchar("navbar_color", { length: 32 }),
  footerColor: varchar("footer_color", { length: 32 }),
  buttonColor: varchar("button_color", { length: 32 }),
  buttonHoverColor: varchar("button_hover_color", { length: 32 }),
  gradientStart: varchar("gradient_start", { length: 32 }),
  gradientEnd: varchar("gradient_end", { length: 32 }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// developer_settings
// ---------------------------------------------------------------------------
export const developerSettings = pgTable("developer_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  enabled: boolean("enabled").default(true).notNull(),
  creditText: text("credit_text")
    .default("Designed & Developed by")
    .notNull(),
  developerName: varchar("developer_name", { length: 255 })
    .default("Afnan Afjal Rafi")
    .notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 64 }),
  countryCode: varchar("country_code", { length: 8 }),
  whatsappMessage: text("whatsapp_message"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// service_types
// ---------------------------------------------------------------------------
export const serviceTypes = pgTable(
  "service_types",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    published: boolean("published").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("service_types_published_idx").on(table.published),
    index("service_types_display_order_idx").on(table.displayOrder),
  ],
);

// ---------------------------------------------------------------------------
// services
// ---------------------------------------------------------------------------
export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 64 }),
    imageUrl: text("image_url"),
    published: boolean("published").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("services_slug_idx").on(table.slug),
    index("services_published_idx").on(table.published),
    index("services_display_order_idx").on(table.displayOrder),
  ],
);

// ---------------------------------------------------------------------------
// vehicles
// ---------------------------------------------------------------------------
export const vehicles = pgTable(
  "vehicles",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    vehicleType: varchar("vehicle_type", { length: 100 }),
    seats: integer("seats"),
    ac: boolean("ac").default(true).notNull(),
    luggageCapacity: varchar("luggage_capacity", { length: 100 }),
    description: text("description"),
    features: jsonb("features").$type<string[]>(),
    mainImageUrl: text("main_image_url"),
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("vehicles_slug_idx").on(table.slug),
    index("vehicles_published_idx").on(table.published),
    index("vehicles_featured_idx").on(table.featured),
    index("vehicles_display_order_idx").on(table.displayOrder),
  ],
);

// ---------------------------------------------------------------------------
// vehicle_images
// ---------------------------------------------------------------------------
export const vehicleImages = pgTable(
  "vehicle_images",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    vehicleId: uuid("vehicle_id")
      .notNull()
      .references(() => vehicles.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    altText: text("alt_text"),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("vehicle_images_vehicle_id_idx").on(table.vehicleId),
  ],
);

// ---------------------------------------------------------------------------
// reviews
// ---------------------------------------------------------------------------
export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    rating: integer("rating").notNull(),
    reviewText: text("review_text").notNull(),
    status: varchar("status", { length: 20 }).default("pending").notNull(),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("reviews_status_idx").on(table.status),
    index("reviews_published_idx").on(table.published),
  ],
);

// ---------------------------------------------------------------------------
// faqs
// ---------------------------------------------------------------------------
export const faqs = pgTable(
  "faqs",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    published: boolean("published").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("faqs_published_idx").on(table.published),
    index("faqs_display_order_idx").on(table.displayOrder),
  ],
);

// ---------------------------------------------------------------------------
// banners
// ---------------------------------------------------------------------------
export const banners = pgTable(
  "banners",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    title: text("title"),
    description: text("description"),
    imageUrl: text("image_url").notNull(),
    ctaText: text("cta_text"),
    ctaLink: text("cta_link"),
    published: boolean("published").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("banners_published_idx").on(table.published),
    index("banners_display_order_idx").on(table.displayOrder),
  ],
);

// ---------------------------------------------------------------------------
// inquiries
// ---------------------------------------------------------------------------
export const inquiries = pgTable(
  "inquiries",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    passengerName: varchar("passenger_name", { length: 255 }).notNull(),
    contactNumber: varchar("contact_number", { length: 64 }).notNull(),
    serviceTypeId: uuid("service_type_id").references(
      () => serviceTypes.id,
      { onDelete: "set null" },
    ),
    selectedVehicleId: uuid("selected_vehicle_id").references(
      () => vehicles.id,
      { onDelete: "set null" },
    ),
    pickupLocation: text("pickup_location").notNull(),
    dropoffLocation: text("dropoff_location").notNull(),
    scheduleDate: date("schedule_date").notNull(),
    scheduleTime: time("schedule_time").notNull(),
    status: varchar("status", { length: 20 }).default("new").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("inquiries_status_idx").on(table.status),
    index("inquiries_created_at_idx").on(table.createdAt),
  ],
);

// ---------------------------------------------------------------------------
// media
// ---------------------------------------------------------------------------
export const media = pgTable("media", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 100 }),
  fileSize: integer("file_size"),
  altText: text("alt_text"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------
export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  images: many(vehicleImages),
  inquiries: many(inquiries),
}));

export const vehicleImagesRelations = relations(
  vehicleImages,
  ({ one }) => ({
    vehicle: one(vehicles, {
      fields: [vehicleImages.vehicleId],
      references: [vehicles.id],
    }),
  }),
);

export const serviceTypesRelations = relations(
  serviceTypes,
  ({ many }) => ({
    inquiries: many(inquiries),
  }),
);

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  serviceType: one(serviceTypes, {
    fields: [inquiries.serviceTypeId],
    references: [serviceTypes.id],
  }),
  vehicle: one(vehicles, {
    fields: [inquiries.selectedVehicleId],
    references: [vehicles.id],
  }),
}));

export type AdminUser = typeof adminUsers.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type ContactSettings = typeof contactSettings.$inferSelect;
export type HomepageSettings = typeof homepageSettings.$inferSelect;
export type ThemeSettings = typeof themeSettings.$inferSelect;
export type DeveloperSettings = typeof developerSettings.$inferSelect;
export type ServiceType = typeof serviceTypes.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type VehicleImage = typeof vehicleImages.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Banner = typeof banners.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type Media = typeof media.$inferSelect;