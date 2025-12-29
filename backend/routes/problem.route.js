import { Router } from "express";
import {
  createProblem,
  listProblems,
  getProblemBySlug,
  updateProblem,
  deleteProblem,
  getProblemsByTopic,
  getTopicSummary
} from "../controllers/problem.controller.js";

import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

// for users
router.get("/", listProblems);
router.get("/topics/summary", getTopicSummary);
router.get("/topic/:topic", getProblemsByTopic);
router.get("/:slug", getProblemBySlug);

// now only for admins
router.post("/", requireAuth, requireRole("ADMIN", "SUPER_ADMIN"), createProblem);
router.put("/:id", requireAuth, requireRole("ADMIN", "SUPER_ADMIN"), updateProblem);
router.delete("/:id", requireAuth, requireRole("ADMIN", "SUPER_ADMIN"), deleteProblem);

export default router;
