import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendContactNotification } from "../services/emailService.js";

export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  await sendContactNotification(contact);
  res.status(201).json({ success: true, data: contact });
});

export const getContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await Contact.countDocuments(filter);
  res.status(200).json({ success: true, data: contacts, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact not found" });
  }
  res.status(200).json({ success: true, data: contact });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const contact = await Contact.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true, runValidators: true });
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact not found" });
  }
  res.status(200).json({ success: true, data: contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact not found" });
  }
  res.status(200).json({ success: true, message: "Contact deleted successfully" });
});
