import { NextRequest, NextResponse } from "next/server";
import { getPendingReviews, approveReview, deleteReview } from "@/lib/reviews";
import { revalidatePath } from "next/cache";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const reviews = await getPendingReviews();
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const { action, id, secret } = await req.json();
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (action === "approve") {
    await approveReview(id);
    revalidatePath("/reviews");
    revalidatePath("/testimonials");
  } else if (action === "delete") {
    await deleteReview(id);
    revalidatePath("/reviews");
    revalidatePath("/testimonials");
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

// app/api/clear-reviews/route.ts

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL!,
  token: process.env.STORAGE_KV_REST_API_TOKEN!,
});

export async function DELETE() {
  await redis.del("reviews");
  return Response.json({ success: true });
}