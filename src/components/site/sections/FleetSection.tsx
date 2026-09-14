import Link from "next/link";
import type { Vehicle } from "@/db/schema";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";
import { VehicleCard } from "../VehicleCard";

export function FleetSection({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) return null;

  return (
    <section className="bg-[var(--color-card)]/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Our Fleet" title="Premium Vehicles for Every Journey" description="Choose from our wide range of well-maintained vehicles." />
          <Link
            href="/fleet"
            className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] focus-ring"
          >
            View Full Fleet →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle, i) => (
            <Reveal key={vehicle.id} delay={i * 0.08}>
              <VehicleCard vehicle={vehicle} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
