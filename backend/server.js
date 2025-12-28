import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import "./config/redis.js";

const startServer = async () => {
  await connectMongo();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();
