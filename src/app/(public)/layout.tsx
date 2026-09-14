import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloatButton } from "@/components/site/WhatsAppFloatButton";
import { getContactSettings, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const [site, contact] = await Promise.all([getSiteSettings(), getContactSettings()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar companyName={site.companyName} logoUrl={site.logoUrl} whatsapp={contact.whatsapp} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatButton whatsapp={contact.whatsapp} />
    </div>
  );
}
