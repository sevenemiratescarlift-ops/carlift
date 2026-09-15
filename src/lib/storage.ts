import "server-only";

import { randomUUID } from "crypto";
import path from "path";
import { put } from "@vercel/blob";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

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
 * Uploads images to Vercel Blob.
 *
 * On Vercel, the connected Blob store can authenticate through
 * Vercel OIDC automatically, so we do not need to pass a long-lived
 * BLOB_READ_WRITE_TOKEN here.
 *
 * For local development, if BLOB_READ_WRITE_TOKEN exists, the Blob SDK
 * will use it automatically.
 */
export async function storeUploadedFile(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported file type. Please upload a JPG, PNG, WEBP, GIF or SVG image."
    );
  }

  if (file.size <= 0) {
    throw new Error("The selected file is empty.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Maximum upload size is 8MB.");
  }

  const ext = safeExtension(file.name, file.type);
  const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;

  const blob = await put(`uploads/${uniqueName}`, file, {
    access: "public",
    contentType: file.type,
  });

  return {
    url: blob.url,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}