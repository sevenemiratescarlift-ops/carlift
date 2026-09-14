"use client";

import { useActionState } from "react";
import type { Service } from "@/db/schema";
import { ImageUploadField } from "./ImageUploadField";
import { SERVICE_ICON_MAP } from "@/components/site/icon-map";

type State = { error?: string; success?: string } | null;

export function ServiceForm({
  service,
  action,
}: {
  service?: Service;
  action: (prevState: State, formData: FormData) => Promise<State>;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Service Name</label>
          <input name="name" required defaultValue={service?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug — optional</label>
          <input name="slug" defaultValue={service?.slug} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={3} defaultValue={service?.description ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Icon</label>
        <select name="icon" defaultValue={service?.icon ?? ""} className={inputClass}>
          <option value="">No icon</option>
          {Object.keys(SERVICE_ICON_MAP).map((key) => (
            <option key={key} value={key}>
              {SERVICE_ICON_MAP[key]} {key}
            </option>
          ))}
        </select>
      </div>
      <ImageUploadField name="imageUrl" label="Cover Image (optional)" defaultValue={service?.imageUrl} />
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <label className={labelClass}>Display Order</label>
          <input type="number" name="displayOrder" defaultValue={service?.displayOrder ?? 0} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" name="published" defaultChecked={service?.published ?? true} className="h-4 w-4 accent-[#00B4D8]" />
          Published
        </label>
      </div>
      {state?.error && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>}
      {state?.success && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{state.success}</p>}
      <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 disabled:opacity-60">
        {isPending ? "Saving..." : service ? "Save Changes" : "Create Service"}
      </button>
    </form>
  );
}
