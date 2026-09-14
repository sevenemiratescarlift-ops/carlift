"use client";

import { useActionState } from "react";
import type { Vehicle } from "@/db/schema";
import { ImageUploadField } from "./ImageUploadField";
import { GalleryUploadField } from "./GalleryUploadField";

type State = { error?: string; success?: string } | null;

export function VehicleForm({
  vehicle,
  gallery,
  action,
}: {
  vehicle?: Vehicle;
  gallery?: string[];
  action: (prevState: State, formData: FormData) => Promise<State>;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Vehicle Name</label>
          <input name="name" required defaultValue={vehicle?.name} className={inputClass} placeholder="e.g. Toyota Camry" />
        </div>
        <div>
          <label className={labelClass}>Slug (URL) — optional</label>
          <input name="slug" defaultValue={vehicle?.slug} className={inputClass} placeholder="auto-generated from name" />
        </div>
        <div>
          <label className={labelClass}>Vehicle Type</label>
          <input name="vehicleType" defaultValue={vehicle?.vehicleType ?? ""} className={inputClass} placeholder="Sedan, SUV, Van..." />
        </div>
        <div>
          <label className={labelClass}>Seats</label>
          <input type="number" min={0} name="seats" defaultValue={vehicle?.seats ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Luggage Capacity</label>
          <input name="luggageCapacity" defaultValue={vehicle?.luggageCapacity ?? ""} className={inputClass} placeholder="e.g. 3 Luggage" />
        </div>
        <div>
          <label className={labelClass}>Display Order</label>
          <input type="number" name="displayOrder" defaultValue={vehicle?.displayOrder ?? 0} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={3} defaultValue={vehicle?.description ?? ""} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Features (one per line)</label>
        <textarea
          name="features"
          rows={4}
          defaultValue={(vehicle?.features ?? []).join("\n")}
          className={inputClass}
          placeholder={"Leather Seats\nBluetooth Audio"}
        />
      </div>

      <ImageUploadField name="mainImageUrl" label="Main Image" defaultValue={vehicle?.mainImageUrl} />
      <GalleryUploadField name="galleryImages" defaultValues={gallery} />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" name="ac" defaultChecked={vehicle?.ac ?? true} className="h-4 w-4 accent-[#00B4D8]" />
          Air Conditioning
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" name="featured" defaultChecked={vehicle?.featured ?? false} className="h-4 w-4 accent-[#00B4D8]" />
          Featured on Homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" name="published" defaultChecked={vehicle?.published ?? true} className="h-4 w-4 accent-[#00B4D8]" />
          Published
        </label>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 transition hover:brightness-110 disabled:opacity-60"
      >
        {isPending ? "Saving..." : vehicle ? "Save Changes" : "Create Vehicle"}
      </button>
    </form>
  );
}
