import { Router } from "express";
import {
  createAdmin,
  listAdmins,
  removeAdmin,
  listAdminRequests,
  approveAdminRequest
} from "../controllers/admin.controller.js";

import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  createAdmin
);

router.get(
  "/list",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  listAdmins
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  removeAdmin
);

router.get(
  "/requests",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  listAdminRequests
);


router.post(
  "/approve/:id",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  approveAdminRequest
);





export default router;
