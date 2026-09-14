"use server";

import { db } from "@/db";
import { reviews } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function revalidateReviews() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/admin/dashboard");
}

export async function approveReviewAction(id: string) {
  await requireAdminSession();
  await db.update(reviews).set({ status: "approved", published: true, updatedAt: new Date() }).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function rejectReviewAction(id: string) {
  await requireAdminSession();
  await db.update(reviews).set({ status: "rejected", published: false, updatedAt: new Date() }).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function togglePublishedReviewAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(reviews).set({ published, updatedAt: new Date() }).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function deleteReviewAction(id: string) {
  await requireAdminSession();
  await db.delete(reviews).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function updateReviewAction(id: string, formData: FormData) {
  await requireAdminSession();
  const customerName = String(formData.get("customerName") ?? "").trim();
  const reviewText = String(formData.get("reviewText") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 5);
  if (!customerName || !reviewText) return;
  await db
    .update(reviews)
    .set({ customerName, reviewText, rating: Math.min(5, Math.max(1, rating)), updatedAt: new Date() })
    .where(eq(reviews.id, id));
  revalidateReviews();
}
