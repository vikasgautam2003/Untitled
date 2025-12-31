import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { generateComponentStream } from "../controllers/webDev.controller.js";

const router = Router();


router.post(
  "/generate",
  requireAuth,
  generateComponentStream
);

export default router;
