import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    addAssessment,
    getAssessments,
} from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/", authMiddleware, addAssessment);
router.get("/", authMiddleware, getAssessments);

export default router;