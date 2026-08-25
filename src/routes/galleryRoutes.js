import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getGallery, createGallery, updateGallery, deleteGallery } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", authenticate, authorize("admin", "manager"), createGallery);
router.put("/:id", authenticate, authorize("admin", "manager"), updateGallery);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteGallery);

export default router;
