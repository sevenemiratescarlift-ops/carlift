import Link from "next/link";
import type { Service } from "@/db/schema";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";
import { getServiceIcon } from "../icon-map";

export function ServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Our Services" title="Transportation Services" description="Tailored for your comfort and convenience." />
          <Link
            href="/services"
            className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] focus-ring"
          >
            View All Services →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6 transition hover:border-[var(--color-accent)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-accent)]/15 text-2xl">
                  {getServiceIcon(service.icon)}
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{service.name}</h3>
                {service.description && <p className="mt-2 text-sm text-slate-400 line-clamp-3">{service.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
