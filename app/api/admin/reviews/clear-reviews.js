import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.STORAGE_KV_REST_API_URL,
    token: process.env.STORAGE_KV_REST_API_TOKEN,
});

await redis.del("reviews");

console.log("Reviews deleted.");