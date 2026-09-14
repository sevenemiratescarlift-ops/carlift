import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContactSettings, getVehicleBySlug } from "@/lib/data";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: "Book a Vehicle" };

export default async function BookVehiclePage({ params }: Props) {
  const { slug } = await params;
  const [vehicle, contact] = await Promise.all([getVehicleBySlug(slug), getContactSettings()]);
  if (!vehicle || !vehicle.published) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href={`/fleet/${vehicle.slug}`} className="text-sm text-[var(--color-accent)] hover:underline">
        ← Back to {vehicle.name}
      </Link>
      <Reveal className="mt-4">
        <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-white">Book the {vehicle.name}</h1>
        <p className="mt-2 text-slate-300">
          Fill in your trip details below. Your selected vehicle is automatically attached — no need to choose again.
        </p>
      </Reveal>

      <div className="mt-8">
        <InquiryForm
          vehicle={{
            id: vehicle.id,
            name: vehicle.name,
            vehicleType: vehicle.vehicleType,
            seats: vehicle.seats,
            ac: vehicle.ac,
            luggageCapacity: vehicle.luggageCapacity,
          }}
          whatsapp={contact.whatsapp}
        />
      </div>
    </div>
  );
}
