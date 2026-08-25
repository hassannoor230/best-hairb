import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { createAppointment, getAppointments, getAppointment, updateAppointmentStatus, deleteAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", authenticate, authorize("admin", "manager"), getAppointments);
router.get("/:id", authenticate, authorize("admin", "manager"), getAppointment);
router.patch("/:id/status", authenticate, authorize("admin", "manager"), updateAppointmentStatus);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteAppointment);

export default router;
