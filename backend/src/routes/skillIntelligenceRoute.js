import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    getSkillIntelligenceController,
} from "../controllers/skillIntelligenceController.js";

const router = express.Router();

router.get(
    "/me",
    authMiddleware,
    getSkillIntelligenceController
);

export default router;