"use server";

import { db } from "@/db";
import { banners } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { bannerSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type SimpleActionState = { error?: string; success?: string } | null;

function revalidateBanners() {
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function createBannerAction(_prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = bannerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db.insert(banners).values({
    title: data.title || null,
    description: data.description || null,
    imageUrl: data.imageUrl,
    ctaText: data.ctaText || null,
    ctaLink: data.ctaLink || null,
    published: data.published ?? true,
    displayOrder: data.displayOrder ?? 0,
  });
  revalidateBanners();
  return { success: "Banner created." };
}

export async function updateBannerAction(id: string, _prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = bannerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db
    .update(banners)
    .set({
      title: data.title || null,
      description: data.description || null,
      imageUrl: data.imageUrl,
      ctaText: data.ctaText || null,
      ctaLink: data.ctaLink || null,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(banners.id, id));
  revalidateBanners();
  return { success: "Banner updated." };
}

export async function deleteBannerAction(id: string) {
  await requireAdminSession();
  await db.delete(banners).where(eq(banners.id, id));
  revalidateBanners();
}

export async function toggleBannerPublishedAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(banners).set({ published, updatedAt: new Date() }).where(eq(banners.id, id));
  revalidateBanners();
}

export async function reorderBannerAction(id: string, direction: "up" | "down") {
  await requireAdminSession();
  const all = await db.select().from(banners).orderBy(banners.displayOrder);
  const index = all.findIndex((v) => v.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const current = all[index];
  const other = all[swapWith];
  await db.transaction(async (tx) => {
    await tx.update(banners).set({ displayOrder: other.displayOrder }).where(eq(banners.id, current.id));
    await tx.update(banners).set({ displayOrder: current.displayOrder }).where(eq(banners.id, other.id));
  });
  revalidateBanners();
}
