"use server";

import { db } from "@/db";
import { vehicleImages, vehicles } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { vehicleSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function ensureUniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let candidate = slugify(base) || `vehicle-${Date.now()}`;
  let suffix = 1;
  for (;;) {
    const existing = await db.select().from(vehicles).where(eq(vehicles.slug, candidate)).limit(1);
    if (!existing[0] || existing[0].id === ignoreId) return candidate;
    suffix += 1;
    candidate = `${slugify(base)}-${suffix}`;
  }
}

function parseFeatures(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

function revalidateFleet(slug?: string) {
  revalidatePath("/");
  revalidatePath("/fleet");
  revalidatePath("/admin/fleet");
  revalidatePath("/admin/dashboard");
  if (slug) revalidatePath(`/fleet/${slug}`);
}

export type VehicleActionState = { error?: string; success?: string } | null;

export async function createVehicleAction(_prev: VehicleActionState, formData: FormData): Promise<VehicleActionState> {
  await requireAdminSession();

  const parsed = vehicleSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const data = parsed.data;
  const slug = await ensureUniqueSlug(data.slug || data.name);

  const [created] = await db
    .insert(vehicles)
    .values({
      name: data.name,
      slug,
      vehicleType: data.vehicleType || null,
      seats: data.seats ?? null,
      ac: data.ac ?? true,
      luggageCapacity: data.luggageCapacity || null,
      description: data.description || null,
      features: parseFeatures(data.features),
      mainImageUrl: data.mainImageUrl || null,
      featured: data.featured ?? false,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
    })
    .returning();

  const galleryUrls = formData.getAll("galleryImages").map(String).filter(Boolean);
  if (galleryUrls.length) {
    await db.insert(vehicleImages).values(
      galleryUrls.map((url, i) => ({ vehicleId: created.id, imageUrl: url, displayOrder: i }))
    );
  }

  revalidateFleet(slug);
  redirect("/admin/fleet");
}

export async function updateVehicleAction(id: string, _prev: VehicleActionState, formData: FormData): Promise<VehicleActionState> {
  await requireAdminSession();

  const parsed = vehicleSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const data = parsed.data;
  const existing = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  if (!existing[0]) return { error: "Vehicle not found" };

  const slug = data.slug ? await ensureUniqueSlug(data.slug, id) : existing[0].slug;

  await db
    .update(vehicles)
    .set({
      name: data.name,
      slug,
      vehicleType: data.vehicleType || null,
      seats: data.seats ?? null,
      ac: data.ac ?? true,
      luggageCapacity: data.luggageCapacity || null,
      description: data.description || null,
      features: parseFeatures(data.features),
      mainImageUrl: data.mainImageUrl || null,
      featured: data.featured ?? false,
      published: data.published ?? true,
      displayOrder: data.displayOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(vehicles.id, id));

  const galleryUrls = formData.getAll("galleryImages").map(String).filter(Boolean);
  await db.delete(vehicleImages).where(eq(vehicleImages.vehicleId, id));
  if (galleryUrls.length) {
    await db.insert(vehicleImages).values(
      galleryUrls.map((url, i) => ({ vehicleId: id, imageUrl: url, displayOrder: i }))
    );
  }

  revalidateFleet(existing[0].slug);
  revalidateFleet(slug);
  redirect("/admin/fleet");
}

export async function deleteVehicleAction(id: string) {
  await requireAdminSession();
  const [existing] = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  await db.delete(vehicles).where(eq(vehicles.id, id));
  revalidateFleet(existing?.slug);
}

export async function toggleVehiclePublishedAction(id: string, published: boolean) {
  await requireAdminSession();
  await db.update(vehicles).set({ published, updatedAt: new Date() }).where(eq(vehicles.id, id));
  revalidateFleet();
}

export async function toggleVehicleFeaturedAction(id: string, featured: boolean) {
  await requireAdminSession();
  await db.update(vehicles).set({ featured, updatedAt: new Date() }).where(eq(vehicles.id, id));
  revalidateFleet();
}

export async function reorderVehicleAction(id: string, direction: "up" | "down") {
  await requireAdminSession();
  const all = await db.select().from(vehicles).orderBy(vehicles.displayOrder);
  const index = all.findIndex((v) => v.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;

  const current = all[index];
  const other = all[swapWith];
  await db.transaction(async (tx) => {
    await tx.update(vehicles).set({ displayOrder: other.displayOrder }).where(eq(vehicles.id, current.id));
    await tx.update(vehicles).set({ displayOrder: current.displayOrder }).where(eq(vehicles.id, other.id));
  });
  revalidateFleet();
}
