import Redis from "ioredis";
import { ENV } from "./env.js";


export const redis = new Redis(ENV.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});


redis.on("connect", () => {
  console.log("✅ Redis connected");
  console.log("🧠 Redis maxRetriesPerRequest =", redis.options.maxRetriesPerRequest);

});


export default redis;