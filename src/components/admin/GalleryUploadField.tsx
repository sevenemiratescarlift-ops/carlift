"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { quickUploadImageAction } from "@/actions/admin-media";

export function GalleryUploadField({ name, defaultValues }: { name: string; defaultValues?: string[] }) {
  const [urls, setUrls] = useState<string[]>(defaultValues ?? []);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Gallery Images</label>
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div key={`${url}-${i}`} className="relative h-20 w-24 overflow-hidden rounded-lg border border-white/10">
            <Image src={url} alt={`Gallery ${i + 1}`} fill sizes="96px" className="object-cover" />
            <input type="hidden" name={name} value={url} />
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
              className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-xs text-white"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="grid h-20 w-24 place-items-center rounded-lg border border-dashed border-white/20 text-xs text-slate-400 hover:border-[#00B4D8] disabled:opacity-50"
        >
          {isPending ? "..." : "+ Add"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setError(null);
            const fd = new FormData();
            fd.set("file", file);
            startTransition(async () => {
              const result = await quickUploadImageAction(fd);
              if (result.error) setError(result.error);
              if (result.url) setUrls((prev) => [...prev, result.url!]);
              if (fileInputRef.current) fileInputRef.current.value = "";
            });
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
