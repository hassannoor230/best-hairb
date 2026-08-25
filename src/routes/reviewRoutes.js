import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getReviews, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", authenticate, authorize("admin", "manager"), createReview);
router.put("/:id", authenticate, authorize("admin", "manager"), updateReview);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteReview);

export default router;
