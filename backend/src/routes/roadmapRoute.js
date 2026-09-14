import express from "express";

import {
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapsByRole,
} from "../controllers/roadmapController.js";

const router = express.Router();
router.get("/", getAllRoadmaps);
router.get("/role/:role", getRoadmapsByRole);
router.get("/:id", getRoadmapById);

export default router;