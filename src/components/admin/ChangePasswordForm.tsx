"use client";

import { useActionState } from "react";
import { changePasswordAction, type ActionState } from "@/actions/auth";

export function ChangePasswordForm() {
  const initialState: ActionState = null;
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className={labelClass}>Current Password</label>
        <input type="password" name="currentPassword" required autoComplete="current-password" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>New Password</label>
        <input type="password" name="newPassword" required autoComplete="new-password" minLength={8} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Confirm New Password</label>
        <input type="password" name="confirmPassword" required autoComplete="new-password" minLength={8} className={inputClass} />
      </div>
      {state?.error && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>}
      {state?.success && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{state.success}</p>}
      <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 disabled:opacity-60">
        {isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
