"use client";

import { useActionState, useRef, useEffect } from "react";
import { uploadMediaAction, type MediaActionState } from "@/actions/admin-media";

export function MediaUploadForm() {
  const initialState: MediaActionState = null;
  const [state, formAction, isPending] = useActionState(uploadMediaAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Choose File</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white file:mr-3 file:rounded-full file:border-0 file:bg-[#00B4D8] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-slate-900"
        />
      </div>
      <div className="min-w-[180px]">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Alt Text (optional)</label>
        <input name="altText" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00B4D8]" />
      </div>
      <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-6 py-2.5 text-sm font-bold text-slate-900 disabled:opacity-60">
        {isPending ? "Uploading..." : "Upload"}
      </button>
      {state?.error && <p className="w-full text-sm text-red-300">{state.error}</p>}
    </form>
  );
}
