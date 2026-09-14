"use client";

import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";

export function ToggleButton({
  active,
  onToggle,
  activeLabel = "Published",
  inactiveLabel = "Hidden",
}: {
  active: boolean;
  onToggle: (next: boolean) => Promise<void>;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await onToggle(!active);
          router.refresh();
        })
      }
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
        active ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-500/15 text-slate-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-slate-500"}`} />
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}

export function ConfirmDeleteButton({ onDelete, label = "Delete" }: { onDelete: () => Promise<void>; label?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Are you sure you want to delete this item? This cannot be undone.")) return;
        startTransition(async () => {
          await onDelete();
          router.refresh();
        });
      }}
      className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? "..." : label}
    </button>
  );
}

export function ReorderButtons({
  onUp,
  onDown,
}: {
  onUp: () => Promise<void>;
  onDown: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex gap-1">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(async () => { await onUp(); router.refresh(); })}
        className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5 disabled:opacity-50"
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(async () => { await onDown(); router.refresh(); })}
        className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5 disabled:opacity-50"
        aria-label="Move down"
      >
        ↓
      </button>
    </div>
  );
}

export function ActionButton({
  onClick,
  children,
  variant = "default",
}: {
  onClick: () => Promise<void>;
  children: ReactNode;
  variant?: "default" | "primary";
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => { await onClick(); router.refresh(); })}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
        variant === "primary"
          ? "bg-[#00B4D8] text-slate-900 hover:brightness-110"
          : "border border-white/15 text-slate-200 hover:bg-white/5"
      }`}
    >
      {isPending ? "..." : children}
    </button>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className ?? ""}`}>{children}</div>;
}
