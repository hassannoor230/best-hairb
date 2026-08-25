import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getServices = asyncHandler(async (req, res) => {
  const { featured, active, category } = req.query;
  const filter = {};
  if (featured !== undefined) filter.featured = featured === "true";
  if (active !== undefined) filter.active = active === "true";
  if (category) filter.category = category;

  const services = await Service.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: services });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, active: true });
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }
  res.status(200).json({ success: true, data: service });
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }
  res.status(200).json({ success: true, data: service });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }
  res.status(200).json({ success: true, message: "Service deleted successfully" });
});
