import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ActionButton } from "@/components/admin/ui";
import { approveReviewAction, deleteReviewAction, rejectReviewAction, togglePublishedReviewAction } from "@/actions/admin-reviews";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reviews" };

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-300",
  approved: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-red-500/15 text-red-300",
};

export default async function AdminReviewsPage() {
  const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));

  return (
    <div>
      <PageHeader title="Reviews & Moderation" description="Approve, reject or manage customer reviews before they go live." />
      <div className="grid gap-4">
        {allReviews.length === 0 && <Card><p className="text-center text-slate-500">No reviews submitted yet.</p></Card>}
        {allReviews.map((review) => (
          <Card key={review.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">{review.customerName}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[review.status] ?? "bg-slate-500/15 text-slate-300"}`}>
                    {review.status}
                  </span>
                </div>
                <div className="mt-1 text-amber-400 text-sm">
                  {"★".repeat(review.rating)}
                  <span className="text-slate-600">{"★".repeat(5 - review.rating)}</span>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">{review.reviewText}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ToggleButton
                  active={review.published}
                  onToggle={async (next) => { "use server"; await togglePublishedReviewAction(review.id, next); }}
                />
                {review.status !== "approved" && (
                  <ActionButton variant="primary" onClick={async () => { "use server"; await approveReviewAction(review.id); }}>
                    Approve
                  </ActionButton>
                )}
                {review.status !== "rejected" && (
                  <ActionButton onClick={async () => { "use server"; await rejectReviewAction(review.id); }}>Reject</ActionButton>
                )}
                <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteReviewAction(review.id); }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
