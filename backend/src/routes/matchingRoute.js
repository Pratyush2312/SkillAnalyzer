import express from 'express';
import { matchRole } from '../controllers/matchingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/",authMiddleware, matchRole);
export default router;
