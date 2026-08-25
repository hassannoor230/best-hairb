import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFaqs);
router.post("/", authenticate, authorize("admin", "manager"), createFaq);
router.put("/:id", authenticate, authorize("admin", "manager"), updateFaq);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteFaq);

export default router;
