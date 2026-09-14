import type { Metadata } from "next";
import { getPublishedReviews } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { ReviewForm } from "@/components/site/ReviewForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Customer Reviews" };

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Testimonials</p>
        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">What Our Customers Say</h1>
        <p className="mt-3 text-base text-slate-300">Real feedback from riders across Dubai and the UAE.</p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {reviews.length === 0 ? (
            <p className="text-slate-400">No reviews yet. Be the first to share your experience!</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6">
                    <div className="text-amber-400">
                      {"★".repeat(review.rating)}
                      <span className="text-slate-600">{"★".repeat(5 - review.rating)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">&ldquo;{review.reviewText}&rdquo;</p>
                    <p className="mt-4 text-sm font-semibold text-white">{review.customerName}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal direction="left">
          <ReviewForm />
        </Reveal>
      </div>
    </div>
  );
}
