import express from "express";
import cors from "cors";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import healthRoute from "./routes/health.routes.js";
import authRoutes from "./routes/auth.route.js";
import  problemRoutes from "./routes/problem.route.js"
import superRoutes from "./routes/superAdmin.route.js"
import userRoutes from "./routes/user.route.js";
import progressRoutes from "./routes/progress.route.js";
import submissionRoutes from "./routes/submission.routes.js";



const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());
app.use(globalRateLimiter);

app.use("/api", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes)
console.log("Admin routes mounted");
app.use("/api/admin", superRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/progress", progressRoutes);
app.use("/api/submissions", submissionRoutes);

app.use(errorHandler);

export default app;
