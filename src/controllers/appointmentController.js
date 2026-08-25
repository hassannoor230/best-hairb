import Appointment from "../models/Appointment.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json({ success: true, data: appointment });
});

export const getAppointments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { service: { $regex: search, $options: "i" } },
    ];
  }
  const appointments = await Appointment.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await Appointment.countDocuments(filter);
  res.status(200).json({ success: true, data: appointments, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
});

export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ success: false, message: "Appointment not found" });
  }
  res.status(200).json({ success: true, data: appointment });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true, runValidators: true });
  if (!appointment) {
    return res.status(404).json({ success: false, message: "Appointment not found" });
  }
  res.status(200).json({ success: true, data: appointment });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) {
    return res.status(404).json({ success: false, message: "Appointment not found" });
  }
  res.status(200).json({ success: true, message: "Appointment deleted successfully" });
});
