import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
} from "../controllers/profile.controller.js";
import {
  deleteUserById,
  updateUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/public", getPublicProfile);

router.get("/private", authMiddleware, getPrivateProfile);
router.patch("/private", authMiddleware, updateUserById);
router.delete("/private", authMiddleware, deleteUserById);

export default router;
