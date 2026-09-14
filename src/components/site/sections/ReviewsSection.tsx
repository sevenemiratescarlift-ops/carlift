import type { Review } from "@/db/schema";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-[var(--color-card)]/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6">
                <div className="text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                  <span className="text-slate-600">{"★".repeat(5 - review.rating)}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">&ldquo;{review.reviewText}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-white">{review.customerName}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
