import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { getServiceIcon } from "@/components/site/icon-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore transportation services offered by 7 Emirates Carlift across Dubai and the UAE.",
};

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Our Services</p>
        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Transportation Services</h1>
        <p className="mt-3 text-base text-slate-300">
          Tailored transportation solutions built around your comfort, schedule and convenience.
        </p>
      </Reveal>

      {services.length === 0 ? (
        <p className="mt-12 text-slate-400">Services will be listed here soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-accent)]/15 text-3xl">
                  {getServiceIcon(service.icon)}
                </span>
                <h2 className="mt-4 text-lg font-bold text-white">{service.name}</h2>
                {service.description && <p className="mt-2 text-sm text-slate-400">{service.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
