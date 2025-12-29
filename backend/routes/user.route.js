import { Router } from "express";
import { requestAdmin } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/request-admin", requireAuth, requestAdmin);

export default router;
