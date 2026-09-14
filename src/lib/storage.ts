import "server-only";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

export type UploadResult = {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
};

function safeExtension(fileName: string, fileType: string): string {
  const fromName = path.extname(fileName).replace(".", "").toLowerCase();
  if (fromName) return fromName;
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return map[fileType] ?? "bin";
}

/**
 * Stores an uploaded file. Uses Vercel Blob when a token is configured
 * (recommended for production/Vercel deployments), otherwise falls back to
 * writing into /public/uploads which works out of the box locally.
 */
export async function storeUploadedFile(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Please upload a JPG, PNG, WEBP, GIF or SVG image.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Maximum upload size is 8MB.");
  }

  const ext = safeExtension(file.name, file.type);
  const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${uniqueName}`, buffer, {
      access: "public",
      token: blobToken,
      contentType: file.type,
    });
    return { url: blob.url, fileName: file.name, fileType: file.type, fileSize: file.size };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, uniqueName), buffer);

  return {
    url: `/uploads/${uniqueName}`,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}
