import type { Faq } from "@/db/schema";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";
import { FaqAccordion } from "../FaqAccordion";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Got Questions?" title="Frequently Asked Questions" align="center" />
        <Reveal className="mt-10">
          <FaqAccordion faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
