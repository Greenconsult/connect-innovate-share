// Speaker image upload utilities using Supabase Storage

import { supabase } from "./supabase";

const BUCKET_NAME = "speaker-images";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload a speaker image to Supabase Storage
 * @param file The image file to upload
 * @param eventId The event ID
 * @param speakerId The speaker ID
 * @returns Object with success status and public URL or error message
 */
export async function uploadSpeakerImage(
  file: File,
  eventId: string,
  speakerId: string
): Promise<UploadResult> {
  try {
    // Validate file
    if (!file) {
      return { success: false, error: "No file selected" };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: `File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      };
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Only JPG, PNG, WebP, and GIF images are allowed",
      };
    }

    // Generate unique file name with timestamp
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${speakerId}-${timestamp}.${ext}`;
    const filePath = `${eventId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        upsert: true, // Replace if file with same name exists
        contentType: file.type,
      });

    if (uploadError) {
      return { success: false, error: `Upload failed: ${uploadError.message}` };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      return { success: false, error: "Failed to generate public URL" };
    }

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Unexpected error: ${errorMessage}` };
  }
}

/**
 * Delete a speaker image from Supabase Storage
 * @param eventId The event ID
 * @param speakerId The speaker ID
 * @param url The public URL of the image (to extract file path)
 * @returns Object with success status or error message
 */
export async function deleteSpeakerImage(
  eventId: string,
  speakerId: string,
  url?: string
): Promise<UploadResult> {
  try {
    if (!url) {
      return { success: true }; // No image to delete
    }

    // Extract file path from URL (e.g., "https://.../.../eventId/speakerId-timestamp.jpg" -> "eventId/speakerId-timestamp.jpg")
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `${eventId}/${fileName}`;

    // Delete from Supabase Storage
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (deleteError) {
      return { success: false, error: `Delete failed: ${deleteError.message}` };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Unexpected error: ${errorMessage}` };
  }
}
