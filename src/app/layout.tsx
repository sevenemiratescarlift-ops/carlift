import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteSettings, getThemeSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.siteTitle || `${site.companyName} | Premium Transportation in Dubai`,
      template: `%s | ${site.companyName}`,
    },
    description: site.metaDescription || site.tagline || undefined,
    icons: site.faviconUrl ? [{ url: site.faviconUrl }] : undefined,
    alternates: { canonical: site.canonicalUrl || siteUrl },
    openGraph: {
      title: site.siteTitle || site.companyName,
      description: site.metaDescription || site.tagline || undefined,
      url: site.canonicalUrl || siteUrl,
      siteName: site.companyName,
      images: site.ogImageUrl ? [{ url: site.ogImageUrl }] : undefined,
      locale: "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.siteTitle || site.companyName,
      description: site.metaDescription || site.tagline || undefined,
      images: site.ogImageUrl ? [site.ogImageUrl] : undefined,
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const theme = await getThemeSettings();

  const themeStyle = {
    "--color-primary": theme.primaryColor || undefined,
    "--color-secondary": theme.secondaryColor || undefined,
    "--color-accent": theme.accentColor || undefined,
    "--color-background": theme.backgroundColor || undefined,
    "--color-card": theme.cardColor || undefined,
    "--color-text": theme.textColor || undefined,
    "--color-muted": theme.mutedTextColor || undefined,
    "--color-border": theme.borderColor || undefined,
    "--color-navbar": theme.navbarColor || undefined,
    "--color-footer": theme.footerColor || undefined,
    "--color-button": theme.buttonColor || undefined,
    "--color-button-hover": theme.buttonHoverColor || undefined,
    "--gradient-start": theme.gradientStart || undefined,
    "--gradient-end": theme.gradientEnd || undefined,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body className="antialiased" style={themeStyle}>
        {children}
      </body>
    </html>
  );
}
