"use client";

import { useState } from "react";
import type { Faq } from "@/db/schema";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white/5">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring"
            >
              <span className="font-semibold text-white">{faq.question}</span>
              <span className={`shrink-0 text-xl text-[var(--color-accent)] transition-transform ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {isOpen && <div className="px-5 pb-4 text-sm leading-relaxed text-slate-300">{faq.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
