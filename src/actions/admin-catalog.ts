"use server";

import { db } from "@/db";
import { faqs, serviceTypes, services } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { faqSchema, serviceSchema, serviceTypeSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type SimpleActionState = { error?: string; success?: string } | null;

function revalidateCommon() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/faq");
  revalidatePath("/admin/services");
  revalidatePath("/admin/service-types");
  revalidatePath("/admin/faqs");
  revalidatePath("/admin/dashboard");
}

async function uniqueServiceSlug(base: string, ignoreId?: string) {
  let candidate = slugify(base) || `service-${Date.now()}`;
  let suffix = 1;
  for (;;) {
    const existing = await db.select().from(services).where(eq(services.slug, candidate)).limit(1);
    if (!existing[0] || existing[0].id === ignoreId) return candidate;
    suffix += 1;
    candidate = `${slugify(base)}-${suffix}`;
  }
}

// ---------------------------------------------------------------- Services
export async function createServiceAction(_prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  const slug = await uniqueServiceSlug(data.slug || data.name);
  await db.insert(services).values({
    name: data.name,
    slug,
    description: data.description || null,
    icon: data.icon || null,
    imageUrl: data.imageUrl || null,
    published: data.published ?? true,
    displayOrder: data.displayOrder ?? 0,
  });
  revalidateCommon();
  return { success: "Service created." };
}

export async function updateServiceAction(id: string, _prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  const slug = data.slug ? await uniqueServiceSlug(data.slug, id) : undefined;
  await db
    .update(services)
    .set({
      name: data.name,
      ...(slug ? { slug } : {}),
      description: data.description || null,
      icon: data.icon || null,
      imageUrl: data.imageUrl || null,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));
  revalidateCommon();
  return { success: "Service updated." };
}

export async function deleteServiceAction(id: string) {
  await requireAdminSession();
  await db.delete(services).where(eq(services.id, id));
  revalidateCommon();
}

export async function toggleServicePublishedAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(services).set({ published, updatedAt: new Date() }).where(eq(services.id, id));
  revalidateCommon();
}

export async function reorderServiceAction(id: string, direction: "up" | "down") {
  await requireAdminSession();
  const all = await db.select().from(services).orderBy(services.displayOrder);
  const index = all.findIndex((v) => v.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const current = all[index];
  const other = all[swapWith];
  await db.transaction(async (tx) => {
    await tx.update(services).set({ displayOrder: other.displayOrder }).where(eq(services.id, current.id));
    await tx.update(services).set({ displayOrder: current.displayOrder }).where(eq(services.id, other.id));
  });
  revalidateCommon();
}

// ------------------------------------------------------------ Service types
export async function createServiceTypeAction(_prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = serviceTypeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db.insert(serviceTypes).values({
    name: data.name,
    description: data.description || null,
    published: data.published ?? true,
    displayOrder: data.displayOrder ?? 0,
  });
  revalidateCommon();
  return { success: "Service type created." };
}

export async function updateServiceTypeAction(id: string, _prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = serviceTypeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db
    .update(serviceTypes)
    .set({
      name: data.name,
      description: data.description || null,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(serviceTypes.id, id));
  revalidateCommon();
  return { success: "Service type updated." };
}

export async function deleteServiceTypeAction(id: string) {
  await requireAdminSession();
  await db.delete(serviceTypes).where(eq(serviceTypes.id, id));
  revalidateCommon();
}

export async function toggleServiceTypePublishedAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(serviceTypes).set({ published, updatedAt: new Date() }).where(eq(serviceTypes.id, id));
  revalidateCommon();
}

export async function reorderServiceTypeAction(id: string, direction: "up" | "down") {
  await requireAdminSession();
  const all = await db.select().from(serviceTypes).orderBy(serviceTypes.displayOrder);
  const index = all.findIndex((v) => v.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const current = all[index];
  const other = all[swapWith];
  await db.transaction(async (tx) => {
    await tx.update(serviceTypes).set({ displayOrder: other.displayOrder }).where(eq(serviceTypes.id, current.id));
    await tx.update(serviceTypes).set({ displayOrder: current.displayOrder }).where(eq(serviceTypes.id, other.id));
  });
  revalidateCommon();
}

// ---------------------------------------------------------------------- FAQ
export async function createFaqAction(_prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db.insert(faqs).values({
    question: data.question,
    answer: data.answer,
    published: data.published ?? true,
    displayOrder: data.displayOrder ?? 0,
  });
  revalidateCommon();
  return { success: "FAQ created." };
}

export async function updateFaqAction(id: string, _prev: SimpleActionState, formData: FormData): Promise<SimpleActionState> {
  await requireAdminSession();
  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const data = parsed.data;
  await db
    .update(faqs)
    .set({
      question: data.question,
      answer: data.answer,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(faqs.id, id));
  revalidateCommon();
  return { success: "FAQ updated." };
}

export async function deleteFaqAction(id: string) {
  await requireAdminSession();
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidateCommon();
}

export async function toggleFaqPublishedAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(faqs).set({ published, updatedAt: new Date() }).where(eq(faqs.id, id));
  revalidateCommon();
}

export async function reorderFaqAction(id: string, direction: "up" | "down") {
  await requireAdminSession();
  const all = await db.select().from(faqs).orderBy(faqs.displayOrder);
  const index = all.findIndex((v) => v.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const current = all[index];
  const other = all[swapWith];
  await db.transaction(async (tx) => {
    await tx.update(faqs).set({ displayOrder: other.displayOrder }).where(eq(faqs.id, current.id));
    await tx.update(faqs).set({ displayOrder: current.displayOrder }).where(eq(faqs.id, other.id));
  });
  revalidateCommon();
}
