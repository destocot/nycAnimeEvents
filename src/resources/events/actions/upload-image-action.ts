"use server";

import { cloudinary } from "@/lib/cloudinary";

export type UploadedImage = {
  cloudinaryId: string;
  url: string;
  width: number | null;
  height: number | null;
  format: string | null;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

export async function uploadImageFileAction(
  formData: FormData
): Promise<{ data: UploadedImage } | { error: string }> {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided." };
  if (!ACCEPTED_TYPES.includes(file.type)) return { error: "Only JPG, PNG, WebP, and GIF are accepted." };
  if (file.size > MAX_BYTES) return { error: "Image must be under 8MB." };

  try {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: "nycanimeevents" });
    return {
      data: {
        cloudinaryId: result.public_id,
        url: result.secure_url,
        width: result.width ?? null,
        height: result.height ?? null,
        format: result.format ?? null,
      },
    };
  } catch (e) {
    console.error("[upload-image] file upload failed:", e);
    return { error: "Upload failed. Please try again." };
  }
}

export async function uploadImageUrlAction(
  url: string
): Promise<{ data: UploadedImage } | { error: string }> {
  if (!url) return { error: "No URL provided." };
  try {
    new URL(url);
  } catch {
    return { error: "Invalid URL." };
  }

  try {
    const result = await cloudinary.uploader.upload(url, { folder: "nycanimeevents" });
    return {
      data: {
        cloudinaryId: result.public_id,
        url: result.secure_url,
        width: result.width ?? null,
        height: result.height ?? null,
        format: result.format ?? null,
      },
    };
  } catch (e) {
    console.error("[upload-image] url upload failed:", e);
    return { error: "Could not fetch the image at that URL. Make sure it's a direct link to a public image." };
  }
}
