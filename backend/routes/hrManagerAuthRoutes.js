import express from "express";
import { registerHR, loginHR } from "../controllers/hrManagerAuthController.js";

const router = express.Router();

router.post("/register", registerHR);
router.post("/login", loginHR);

export default router;
