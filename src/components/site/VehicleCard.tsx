import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/db/schema";

export function VehicleCard({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const features = (vehicle.features ?? []).slice(0, 3);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        {vehicle.mainImageUrl ? (
          <Image
            src={vehicle.mainImageUrl}
            alt={vehicle.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-4xl">🚘</div>
        )}
        {vehicle.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-slate-900 shadow">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
        <p className="text-sm text-[var(--color-muted)]">{vehicle.vehicleType ?? "Premium Vehicle"}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
          {vehicle.seats && <span>👤 {vehicle.seats} Seats</span>}
          <span>❄️ {vehicle.ac ? "AC" : "Non-AC"}</span>
          {vehicle.luggageCapacity && <span>🧳 {vehicle.luggageCapacity}</span>}
        </div>

        {vehicle.description && <p className="mt-3 line-clamp-2 text-sm text-slate-400">{vehicle.description}</p>}

        {features.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {features.map((f) => (
              <li key={f} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link
            href={`/fleet/${vehicle.slug}`}
            className="flex-1 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:border-[var(--color-accent)] focus-ring"
          >
            View Details
          </Link>
          <Link
            href={`/fleet/${vehicle.slug}/book`}
            className="flex-1 rounded-full bg-[var(--color-button)] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[var(--color-button-hover)] focus-ring"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
