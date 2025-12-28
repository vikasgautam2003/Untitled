import { Router } from "express";
import {
  createProblem,
  listProblems,
  getProblemBySlug,
  getTopicSummary,
  getProblemsByTopic
} from "../controllers/problem.controller.js";

import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/topics/summary", getTopicSummary);


router.get("/topic/:topic", getProblemsByTopic);


router.get("/", listProblems);

// Problem detail
router.get("/:slug", getProblemBySlug);


router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "SUPER_ADMIN"),
  createProblem
);

export default router;
