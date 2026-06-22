import { NextRequest, NextResponse } from "next/server";
import { getPendingReviews, approveReview, deleteReview } from "@/lib/reviews";

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
  if (action === "approve") await approveReview(id);
  else if (action === "delete") await deleteReview(id);
  else return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  return NextResponse.json({ success: true });
}
