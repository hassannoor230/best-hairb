import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { createContact, getContacts, getContact, updateContactStatus, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", authenticate, authorize("admin", "manager"), getContacts);
router.get("/:id", authenticate, authorize("admin", "manager"), getContact);
router.patch("/:id/status", authenticate, authorize("admin", "manager"), updateContactStatus);
router.delete("/:id", authenticate, authorize("admin", "manager"), deleteContact);

export default router;
