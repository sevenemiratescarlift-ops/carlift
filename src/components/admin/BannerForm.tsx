"use client";

import { useActionState } from "react";
import type { Banner } from "@/db/schema";
import { ImageUploadField } from "./ImageUploadField";

type State = { error?: string; success?: string } | null;

export function BannerForm({ banner, action }: { banner?: Banner; action: (prevState: State, formData: FormData) => Promise<State> }) {
  const [state, formAction, isPending] = useActionState(action, null);
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <form action={formAction} className="space-y-5">
      <ImageUploadField name="imageUrl" label="Banner Image (required)" defaultValue={banner?.imageUrl} />
      <div>
        <label className={labelClass}>Title (optional)</label>
        <input name="title" defaultValue={banner?.title ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Description (optional)</label>
        <textarea name="description" rows={2} defaultValue={banner?.description ?? ""} className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>CTA Text</label>
          <input name="ctaText" defaultValue={banner?.ctaText ?? ""} className={inputClass} placeholder="e.g. Learn More" />
        </div>
        <div>
          <label className={labelClass}>CTA Link</label>
          <input name="ctaLink" defaultValue={banner?.ctaLink ?? ""} className={inputClass} placeholder="/fleet" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <label className={labelClass}>Display Order</label>
          <input type="number" name="displayOrder" defaultValue={banner?.displayOrder ?? 0} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" name="published" defaultChecked={banner?.published ?? true} className="h-4 w-4 accent-[#00B4D8]" />
          Published
        </label>
      </div>
      {state?.error && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>}
      <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 disabled:opacity-60">
        {isPending ? "Saving..." : banner ? "Save Changes" : "Create Banner"}
      </button>
    </form>
  );
}
