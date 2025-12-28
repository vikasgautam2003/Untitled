import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET
};

if (!ENV.MONGO_URI || !ENV.REDIS_URL || !ENV.JWT_SECRET) {
  throw new Error("❌ Missing required environment variables");
}
