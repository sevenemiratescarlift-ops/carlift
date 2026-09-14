"use server";

import { db } from "@/db";
import { media } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/guard";
import { storeUploadedFile } from "@/lib/storage";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type MediaActionState = { error?: string; success?: string } | null;

export async function uploadMediaAction(_prev: MediaActionState, formData: FormData): Promise<MediaActionState> {
  await requireAdminSession();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose a file to upload." };
  }
  const altText = formData.get("altText")?.toString() || null;

  try {
    const result = await storeUploadedFile(file);
    await db.insert(media).values({
      fileName: result.fileName,
      fileUrl: result.url,
      fileType: result.fileType,
      fileSize: result.fileSize,
      altText,
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed." };
  }

  revalidatePath("/admin/media");
  return { success: "File uploaded." };
}

export async function deleteMediaAction(id: string) {
  await requireAdminSession();
  await db.delete(media).where(eq(media.id, id));
  revalidatePath("/admin/media");
}

export type QuickUploadResult = { url?: string; error?: string };

/** Used by inline image pickers (vehicle/service/banner forms) to upload and get a URL back immediately. */
export async function quickUploadImageAction(formData: FormData): Promise<QuickUploadResult> {
  await requireAdminSession();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose a file to upload." };
  }
  try {
    const result = await storeUploadedFile(file);
    await db.insert(media).values({
      fileName: result.fileName,
      fileUrl: result.url,
      fileType: result.fileType,
      fileSize: result.fileSize,
    });
    revalidatePath("/admin/media");
    return { url: result.url };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed." };
  }
}
