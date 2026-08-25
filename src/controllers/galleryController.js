import Gallery from "../models/Gallery.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getGallery = asyncHandler(async (req, res) => {
  const { category, active } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (active !== undefined) filter.active = active === "true";

  const gallery = await Gallery.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: gallery });
});

export const createGallery = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateGallery = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    return res.status(404).json({ success: false, message: "Gallery item not found" });
  }
  res.status(200).json({ success: true, data: item });
});

export const deleteGallery = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Gallery item not found" });
  }
  res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
});
