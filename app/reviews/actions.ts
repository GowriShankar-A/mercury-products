"use server";
import { submitReview, approveReview, deleteReview } from "@/lib/reviews";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const rating = parseInt(formData.get("rating") as string, 10);
  const message = (formData.get("message") as string)?.trim();

  if (!name || !message || !rating || rating < 1 || rating > 5) {
    return { success: false, error: "Please fill all fields and select a rating." };
  }
  if (message.length > 500) {
    return { success: false, error: "Review must be under 500 characters." };
  }

  try {
    await submitReview({ name, rating, message });
    revalidatePath("/reviews");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to submit. Please try again." };
  }
}

export async function approveReviewAction(id: string, secret: string) {
  if (secret !== process.env.ADMIN_SECRET) return { success: false, error: "Unauthorized" };
  await approveReview(id);
  revalidatePath("/reviews");
  return { success: true };
}

export async function deleteReviewAction(id: string, secret: string) {
  if (secret !== process.env.ADMIN_SECRET) return { success: false, error: "Unauthorized" };
  await deleteReview(id);
  revalidatePath("/reviews");
  return { success: true };
}
