import type { HomepageSettings } from "@/db/schema";
import { Reveal } from "../Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ContactCtaSection({ homepage, whatsapp }: { homepage: HomepageSettings; whatsapp: string | null }) {
  const link = whatsapp ? buildWhatsAppLink(whatsapp, "Hello! I'd like to get in touch regarding a ride.") : null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl brand-gradient p-8 text-center shadow-2xl sm:flex-row sm:text-left sm:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Get In Touch</p>
              <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-white">
                {homepage.contactCtaTitle || "Ready for Your Next Journey?"}
              </h2>
              <p className="mt-2 text-sm text-white/85 sm:text-base">
                {homepage.contactCtaDescription || "Book now or get in touch with us on WhatsApp."}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <a
                href="/#availability"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[var(--color-secondary)] shadow-lg transition hover:-translate-y-0.5 focus-ring"
              >
                Book Now
              </a>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/50 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 focus-ring"
                >
                  Chat on WhatsApp →
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
