"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitReviewAction, type ReviewActionState } from "@/actions/public";

export function ReviewForm() {
  const initialState: ReviewActionState = null;
  const [state, formAction, isPending] = useActionState(submitReviewAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRating(5);
    }
  }, [state]);

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/40";

  if (state?.success) {
    return (
      <div className="glass-panel rounded-2xl p-6 text-center">
        <p className="text-lg font-semibold text-emerald-300">Thank you for your feedback!</p>
        <p className="mt-1 text-sm text-slate-300">
          Your review has been submitted and will appear publicly once approved by our team.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="glass-panel space-y-4 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white">Share Your Experience</h3>
      <div>
        <label htmlFor="customerName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Your Name
        </label>
        <input id="customerName" name="customerName" required className={inputClass} placeholder="Enter your name" />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Rating</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              onClick={() => setRating(n)}
              className={`text-2xl transition ${n <= rating ? "text-amber-400" : "text-slate-600"}`}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>
      <div>
        <label htmlFor="reviewText" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Your Review
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us about your experience..."
        />
      </div>
      {state?.error && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[var(--color-button)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-button-hover)] disabled:opacity-60 focus-ring"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
