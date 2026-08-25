import express from "express";
import { body } from "express-validator";
import { login, logout, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", [body("email").isEmail().withMessage("Valid email is required"), body("password").notEmpty().withMessage("Password is required")], login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;
