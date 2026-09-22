import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getSkillGap } from "../controllers/skillGapController.js";

const router = express.Router();

router.get("/", authMiddleware, getSkillGap);

export default router;