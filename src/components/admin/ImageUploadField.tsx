"use client";

import { useRef, useState, useTransition } from "react";
import { quickUploadImageAction } from "@/actions/admin-media";

export function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(file: File | undefined) {
    if (!file) return;

    setError(null);

    const fd = new FormData();
    fd.set("file", file);

    startTransition(async () => {
      try {
        const result = await quickUploadImageAction(fd);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.url) {
          setUrl(result.url);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    });
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <div className="flex items-start gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {url ? (
            <img
              src={url}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={() => {
                setError(
                  "Image could not be loaded. Please check the image URL."
                );
              }}
            />
          ) : (
            <div className="grid h-full place-items-center text-2xl text-slate-600">
              🖼️
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => {
              setError(null);
              setUrl(e.target.value);
            }}
            placeholder="https://... or upload a file"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]"
          />

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5 disabled:opacity-50"
            >
              {isPending ? "Uploading..." : "Upload Image"}
            </button>

            {url && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setUrl("");
                }}
                className="text-xs font-medium text-red-300 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {error && <p className="text-xs text-red-300">{error}</p>}
        </div>
      </div>
    </div>
  );
}