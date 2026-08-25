import BusinessSettings from "../models/BusinessSettings.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBusiness = asyncHandler(async (req, res) => {
  let settings = await BusinessSettings.findOne();
  if (!settings) {
    settings = await BusinessSettings.create({});
  }
  res.status(200).json({ success: true, data: settings });
});

export const updateBusiness = asyncHandler(async (req, res) => {
  let settings = await BusinessSettings.findOne();
  if (!settings) {
    settings = await BusinessSettings.create(req.body);
  } else {
    settings = await BusinessSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
  }
  res.status(200).json({ success: true, data: settings });
});
