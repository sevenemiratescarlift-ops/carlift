import Image from "next/image";
import Link from "next/link";
import type { HomepageSettings } from "@/db/schema";
import { Reveal } from "../Reveal";
import { InquiryForm } from "../InquiryForm";

export function HeroSection({
  homepage,
  companyName,
  whatsapp,
  serviceTypes,
}: {
  homepage: HomepageSettings;
  companyName: string;
  whatsapp: string | null;
  serviceTypes: { id: string; name: string }[];
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient opacity-90" />
      {homepage.heroImageUrl && (
        <Image
          src={homepage.heroImageUrl}
          alt={companyName}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-30 mix-blend-luminosity"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24 lg:px-8">
        <Reveal direction="right">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Safe • Comfortable • Reliable
          </span>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] text-white">
            {homepage.heroTitle || `Premium Transportation & Car Lift Services in Dubai`}
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-100/90 sm:text-lg">
            {homepage.heroDescription ||
              "Travel in comfort with our modern fleet and professional drivers. Your journey, our priority."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {homepage.heroPrimaryButtonText && (
              <Link
                href={homepage.heroPrimaryButtonLink || "#availability"}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[var(--color-secondary)] shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl focus-ring"
              >
                {homepage.heroPrimaryButtonText} →
              </Link>
            )}
            {homepage.heroSecondaryButtonText && (
              <Link
                href={homepage.heroSecondaryButtonLink || "/fleet"}
                className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 focus-ring"
              >
                {homepage.heroSecondaryButtonText} →
              </Link>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/90">
            <span className="flex items-center gap-2">👨‍✈️ Professional Drivers</span>
            <span className="flex items-center gap-2">🚘 Modern Fleet</span>
            <span className="flex items-center gap-2">🕐 24/7 Support</span>
          </div>
        </Reveal>

        {homepage.showAvailability !== false && (
          <Reveal direction="left" delay={0.15} className="lg:justify-self-end lg:w-full">
            <div id="availability" className="scroll-mt-24">
              <InquiryForm serviceTypes={serviceTypes} whatsapp={whatsapp} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
