import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    addProject,
    getProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, addProject);

router.get("/", authMiddleware, getProjects);

export default router;