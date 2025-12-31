import { Router } from "express";
import {
  getSolutionAccess,
  unlockSolution,
  generateOptimalSolution
} from "../controllers/solution.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:problemId/access", requireAuth, getSolutionAccess);
router.post("/:problemId/unlock", requireAuth, unlockSolution);
router.post("/:problemId/generate", requireAuth, generateOptimalSolution);

export default router;
