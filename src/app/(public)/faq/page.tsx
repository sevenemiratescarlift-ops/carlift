import type { Metadata } from "next";
import { getFaqs } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { FaqAccordion } from "@/components/site/FaqAccordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Frequently Asked Questions" };

export default async function FaqPage() {
  const faqs = await getFaqs(true);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Got Questions?</p>
        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Frequently Asked Questions</h1>
      </Reveal>

      <div className="mt-10">
        {faqs.length === 0 ? (
          <p className="text-center text-slate-400">FAQs will be added soon.</p>
        ) : (
          <FaqAccordion faqs={faqs} />
        )}
      </div>
    </div>
  );
}
