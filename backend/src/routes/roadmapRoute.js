import express from "express";

import {
    getAllRoadmaps,
    getPersonalizedRoadmapController,
    getRoadmapById,
    getRoadmapsByRole,
} from "../controllers/roadmapController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllRoadmaps);
router.get("/role/:role", authMiddleware, getRoadmapsByRole);
router.get(
    "/personalized",
    authMiddleware,
    getPersonalizedRoadmapController
);
router.get("/:id", authMiddleware, getRoadmapById);

export default router;