import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getBusiness, updateBusiness } from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusiness);
router.put("/", authenticate, authorize("admin", "manager"), updateBusiness);

export default router;
