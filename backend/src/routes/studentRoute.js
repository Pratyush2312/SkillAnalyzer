import express from "express";
import { createProfile, getProfile } from "../controllers/studentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, createProfile);
router.get("/profile/get", authMiddleware, getProfile)

export default router;