"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteMediaAction } from "@/actions/admin-media";

export function MediaDeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Delete this file?")) return;
        startTransition(async () => {
          await deleteMediaAction(id);
          router.refresh();
        });
      }}
      className="rounded-full border border-red-400/30 px-2.5 py-1 text-[10px] font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
