import { Router } from "express";
import { explainCode } from "../controllers/codeReview.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/explain", requireAuth, explainCode);

export default router;
