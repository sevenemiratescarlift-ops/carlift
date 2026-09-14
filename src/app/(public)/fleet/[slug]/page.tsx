import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, getVehicleImages } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.name,
    description: vehicle.description || `Book the ${vehicle.name} with 7 Emirates Carlift.`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle || !vehicle.published) notFound();

  const gallery = await getVehicleImages(vehicle.id);
  const features = vehicle.features ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/fleet" className="text-sm text-[var(--color-accent)] hover:underline">
        ← Back to Fleet
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal direction="right">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-slate-800">
            {vehicle.mainImageUrl ? (
              <Image src={vehicle.mainImageUrl} alt={vehicle.name} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-6xl">🚘</div>
            )}
          </div>

          {gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <Image src={img.imageUrl} alt={img.altText || vehicle.name} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {vehicle.description && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-white">About This Vehicle</h2>
              <p className="mt-2 text-slate-300">{vehicle.description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-white">Features</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-[var(--color-accent)]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="glass-panel sticky top-24 rounded-3xl p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">{vehicle.vehicleType ?? "Vehicle"}</p>
            <h1 className="mt-1 text-2xl font-extrabold text-white">{vehicle.name}</h1>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm text-slate-200">
              <div className="rounded-xl border border-[var(--color-border)] py-3">
                <p className="text-lg">👤</p>
                <p className="mt-1 font-semibold">{vehicle.seats ?? "-"}</p>
                <p className="text-xs text-slate-400">Seats</p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] py-3">
                <p className="text-lg">❄️</p>
                <p className="mt-1 font-semibold">{vehicle.ac ? "Yes" : "No"}</p>
                <p className="text-xs text-slate-400">AC</p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] py-3">
                <p className="text-lg">🧳</p>
                <p className="mt-1 font-semibold">{vehicle.luggageCapacity ?? "-"}</p>
                <p className="text-xs text-slate-400">Luggage</p>
              </div>
            </div>

            <Link
              href={`/fleet/${vehicle.slug}/book`}
              className="mt-6 block w-full rounded-full bg-[var(--color-button)] px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:bg-[var(--color-button-hover)] focus-ring"
            >
              Book Now
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400">
              Pricing will be shared and confirmed with you directly over WhatsApp.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
