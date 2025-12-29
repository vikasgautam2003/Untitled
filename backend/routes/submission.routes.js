import { Router } from "express";
import {
  createSubmission,
  getMySubmissions,
  getMySubmissionsByProblem
} from "../controllers/submission.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";


const router = Router();


router.post("/", requireAuth, createSubmission);
router.get("/me", requireAuth, getMySubmissions);
router.get("/problem/:problemId", requireAuth, getMySubmissionsByProblem);

export default router;