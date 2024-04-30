import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/upstashRedis/redis";

export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(3, "1800 s"),
    analytics: true
})