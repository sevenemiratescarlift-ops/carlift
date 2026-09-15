"use server";

import { db } from "@/db";
import {
  contactSettings,
  developerSettings,
  homepageSettings,
  siteSettings,
  themeSettings,
} from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { DEFAULT_THEME } from "@/lib/theme-presets";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type SettingsActionState = {
  error?: string;
  success?: string;
} | null;

function str(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null) return null;

  const trimmed = value.toString().trim();
  return trimmed.length ? trimmed : null;
}

function revalidateAllPublic() {
  revalidatePath("/", "layout");
  revalidatePath("/fleet");
  revalidatePath("/services");
  revalidatePath("/about");
  revalidatePath("/reviews");
  revalidatePath("/faq");
  revalidatePath("/contact");
}

// --------------------------------------------------------------- Site / SEO
export async function updateSiteSettingsAction(
  _prev: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminSession();

  const companyName = str(formData, "companyName") ?? "7 Emirates Carlift";

  const existing = await db.select().from(siteSettings).limit(1);

  const values = {
    companyName,
    logoUrl: str(formData, "logoUrl"),
    faviconUrl: str(formData, "faviconUrl"),
    tagline: str(formData, "tagline"),
    siteTitle: str(formData, "siteTitle"),
    metaDescription: str(formData, "metaDescription"),
    ogImageUrl: str(formData, "ogImageUrl"),
    canonicalUrl: str(formData, "canonicalUrl"),
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(siteSettings)
      .set(values)
      .where(eq(siteSettings.id, existing[0].id));
  } else {
    await db.insert(siteSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Branding & SEO settings saved.",
  };
}

// -------------------------------------------------------------------- Contact
export async function updateContactSettingsAction(
  _prev: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminSession();

  const existing = await db.select().from(contactSettings).limit(1);

  const values = {
    phone: str(formData, "phone"),
    whatsapp: str(formData, "whatsapp"),
    email: str(formData, "email"),
    address: str(formData, "address"),
    facebookUrl: str(formData, "facebookUrl"),
    instagramUrl: str(formData, "instagramUrl"),
    linkedinUrl: str(formData, "linkedinUrl"),
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(contactSettings)
      .set(values)
      .where(eq(contactSettings.id, existing[0].id));
  } else {
    await db.insert(contactSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Contact settings saved.",
  };
}

// ------------------------------------------------------------------ Homepage
export async function updateHomepageSettingsAction(
  _prev: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminSession();

  const existing = await db.select().from(homepageSettings).limit(1);

  const bool = (key: string) => formData.get(key) === "on";

  const values = {
    heroTitle: str(formData, "heroTitle"),
    heroDescription: str(formData, "heroDescription"),
    heroImageUrl: str(formData, "heroImageUrl"),
    heroPrimaryButtonText: str(formData, "heroPrimaryButtonText"),
    heroPrimaryButtonLink: str(formData, "heroPrimaryButtonLink"),
    heroSecondaryButtonText: str(formData, "heroSecondaryButtonText"),
    heroSecondaryButtonLink: str(formData, "heroSecondaryButtonLink"),

    availabilityTitle: str(formData, "availabilityTitle"),
    availabilityDescription: str(formData, "availabilityDescription"),

    aboutTitle: str(formData, "aboutTitle"),
    aboutDescription: str(formData, "aboutDescription"),
    aboutImageUrl: str(formData, "aboutImageUrl"),

    whyChooseTitle: str(formData, "whyChooseTitle"),
    whyChooseDescription: str(formData, "whyChooseDescription"),

    howItWorksTitle: str(formData, "howItWorksTitle"),

    contactCtaTitle: str(formData, "contactCtaTitle"),
    contactCtaDescription: str(formData, "contactCtaDescription"),

    showHero: bool("showHero"),
    showAvailability: bool("showAvailability"),
    showServices: bool("showServices"),
    showFleet: bool("showFleet"),
    showAbout: bool("showAbout"),
    showWhyChoose: bool("showWhyChoose"),
    showHowItWorks: bool("showHowItWorks"),
    showReviews: bool("showReviews"),
    showFaq: bool("showFaq"),
    showContactCta: bool("showContactCta"),

    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(homepageSettings)
      .set(values)
      .where(eq(homepageSettings.id, existing[0].id));
  } else {
    await db.insert(homepageSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Homepage settings saved.",
  };
}

// --------------------------------------------------------------------- Theme
export async function updateThemeSettingsAction(
  _prev: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminSession();

  const existing = await db.select().from(themeSettings).limit(1);

  const values = {
    presetName: str(formData, "presetName") ?? "custom",
    primaryColor: str(formData, "primaryColor"),
    secondaryColor: str(formData, "secondaryColor"),
    accentColor: str(formData, "accentColor"),
    backgroundColor: str(formData, "backgroundColor"),
    cardColor: str(formData, "cardColor"),
    textColor: str(formData, "textColor"),
    mutedTextColor: str(formData, "mutedTextColor"),
    borderColor: str(formData, "borderColor"),
    navbarColor: str(formData, "navbarColor"),
    footerColor: str(formData, "footerColor"),
    buttonColor: str(formData, "buttonColor"),
    buttonHoverColor: str(formData, "buttonHoverColor"),
    gradientStart: str(formData, "gradientStart"),
    gradientEnd: str(formData, "gradientEnd"),
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(themeSettings)
      .set(values)
      .where(eq(themeSettings.id, existing[0].id));
  } else {
    await db.insert(themeSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Theme updated across the whole website.",
  };
}

export async function resetThemeSettingsAction(): Promise<SettingsActionState> {
  await requireAdminSession();

  const existing = await db.select().from(themeSettings).limit(1);

  const values = {
    presetName: "ocean-blue",
    ...DEFAULT_THEME,
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(themeSettings)
      .set(values)
      .where(eq(themeSettings.id, existing[0].id));
  } else {
    await db.insert(themeSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Theme reset to default.",
  };
}

// ----------------------------------------------------------------- Developer
export async function updateDeveloperSettingsAction(
  _prev: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminSession();

  const existing = await db.select().from(developerSettings).limit(1);

  const values = {
    enabled: formData.get("enabled") === "on",
    creditText:
      str(formData, "creditText") ?? "Designed & Developed by",
    developerName:
      str(formData, "developerName") ?? "Afnan Afjal Rafi",
    whatsappNumber: str(formData, "whatsappNumber"),
    countryCode: str(formData, "countryCode"),
    whatsappMessage: str(formData, "whatsappMessage"),
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await db
      .update(developerSettings)
      .set(values)
      .where(eq(developerSettings.id, existing[0].id));
  } else {
    await db.insert(developerSettings).values(values);
  }

  revalidateAllPublic();

  return {
    success: "Developer settings saved.",
  };
}