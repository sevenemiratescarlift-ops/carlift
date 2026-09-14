"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"];

export function InquiryStatusSelect({
  id,
  status,
  updateAction,
}: {
  id: string;
  status: string;
  updateAction: (id: string, status: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(async () => {
          await updateAction(id, e.target.value);
          router.refresh();
        })
      }
      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold capitalize text-slate-200 outline-none focus:border-[#00B4D8] disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#0b1120] capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}
