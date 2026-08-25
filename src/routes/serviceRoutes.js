import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getServices, getService, createService, updateService, deleteService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:slug", getService);
router.post("/", authenticate, authorize("admin", "manager"), createService);
router.put("/:id", authenticate, authorize("admin", "manager"), updateService);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteService);

export default router;
