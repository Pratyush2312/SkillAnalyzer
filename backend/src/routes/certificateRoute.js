import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    addCertificate,
    getCertificates,
} from "../controllers/certificateController.js";

const router = express.Router();

router.post("/", authMiddleware, addCertificate);
router.get("/", authMiddleware, getCertificates);

export default router;