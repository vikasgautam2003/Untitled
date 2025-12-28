import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});





router.get("/protected", requireAuth, (req, res) => {
  res.json({ message: `Hello ${req.user.name}` });
});





export default router;
