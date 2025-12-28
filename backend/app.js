import express from "express";
import cors from "cors";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import healthRoute from "./routes/health.routes.js";
import authRoutes from "./routes/auth.route.js";
import  problemRoutes from "./routes/problem.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(globalRateLimiter);

app.use("/api", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes)

app.use(errorHandler);

export default app;
