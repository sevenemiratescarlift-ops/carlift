"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/actions/auth";

export function LoginForm() {
  const initialState: ActionState = null;
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/40";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Email Address
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="admin@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} placeholder="••••••••" />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
