"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const ALLOWED_STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"] as const;

export async function updateInquiryStatusAction(id: string, status: string) {
  await requireAdminSession();
  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) return;
  await db.update(inquiries).set({ status, updatedAt: new Date() }).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/dashboard");
}

export async function deleteInquiryAction(id: string) {
  await requireAdminSession();
  await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/dashboard");
}
