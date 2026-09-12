import express from 'express';
import { generateCareerRecommendations, getSkillMatch } from '../controllers/matchingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/match", authMiddleware, getSkillMatch);
router.get("/recommendations", authMiddleware, generateCareerRecommendations);
export default router;
