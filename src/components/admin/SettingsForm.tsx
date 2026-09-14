"use client";

import { useActionState, type ReactNode } from "react";

type State = { error?: string; success?: string } | null;

export function SettingsForm({
  action,
  children,
  submitLabel = "Save Changes",
}: {
  action: (prevState: State, formData: FormData) => Promise<State>;
  children: ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {children}
      {state?.error && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>}
      {state?.success && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{state.success}</p>}
      <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 disabled:opacity-60">
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
