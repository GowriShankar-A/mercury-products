import { Redis } from "@upstash/redis";

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
  status: "pending" | "approved";
}

export function getRedis() {
  const url = process.env.STORAGE_KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.STORAGE_KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash Redis env vars not set.");
  return new Redis({ url, token });
}

export async function submitReview(data: Omit<Review, "id" | "createdAt" | "status">) {
  const redis = getRedis();
  const id = crypto.randomUUID();
  const review: Review = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    status: "approved",
  };
  await redis.hset(`review:${id}`, review as any);
  await redis.lpush("reviews:approved", id);
  return { success: true };
}

export async function getApprovedReviews(): Promise<Review[]> {
  const redis = getRedis();
  const ids: string[] = await redis.lrange("reviews:approved", 0, -1);
  if (!ids.length) return [];
  const reviews = await Promise.all(
    ids.map(async (id) => (await redis.hgetall(`review:${id}`)) as unknown as Review)
  );
  return reviews.filter(Boolean).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPendingReviews(): Promise<Review[]> {
  const redis = getRedis();
  const ids: string[] = await redis.lrange("reviews:pending", 0, -1);
  if (!ids.length) return [];
  const reviews = await Promise.all(
    ids.map(async (id) => (await redis.hgetall(`review:${id}`)) as unknown as Review)
  );
  return reviews.filter(Boolean);
}

export async function approveReview(id: string) {
  const redis = getRedis();
  await redis.hset(`review:${id}`, { status: "approved" });
  await redis.lrem("reviews:pending", 0, id);
  await redis.lpush("reviews:approved", id);
}

export async function deleteReview(id: string) {
  const redis = getRedis();
  await redis.lrem("reviews:pending", 0, id);
  await redis.lrem("reviews:approved", 0, id);
  await redis.del(`review:${id}`);
}
