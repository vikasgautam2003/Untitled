import { Router } from "express";
import { getHint } from "../controllers/ai.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/hint", requireAuth, getHint);

export default router;
