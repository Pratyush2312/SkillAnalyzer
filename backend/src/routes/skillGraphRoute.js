import express from "express";
import {
    addEvidence,
    getMySkills,
} from "../controllers/skillGraphController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMySkills);
router.post("/evidence", authMiddleware, addEvidence);

export default router;