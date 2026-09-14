import type { Metadata } from "next";
import { getVehicles } from "@/lib/data";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Fleet",
  description: "Explore our premium fleet of sedans, SUVs, vans and minibuses available across Dubai and the UAE.",
};

export default async function FleetPage() {
  const vehicles = await getVehicles(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Our Fleet</p>
        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Premium Vehicles for Every Journey</h1>
        <p className="mt-3 text-base text-slate-300">
          Choose from our wide range of well-maintained vehicles, all driven by professional and courteous chauffeurs.
        </p>
      </Reveal>

      {vehicles.length === 0 ? (
        <p className="mt-12 text-slate-400">No vehicles are available right now. Please check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, i) => (
            <Reveal key={vehicle.id} delay={i * 0.05}>
              <VehicleCard vehicle={vehicle} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
