import Review from "../models/Review.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getReviews = asyncHandler(async (req, res) => {
  const { approved, featured, rating } = req.query;
  const filter = {};
  if (approved !== undefined) filter.approved = approved === "true";
  if (featured !== undefined) filter.featured = featured === "true";
  if (rating) filter.rating = +rating;

  const reviews = await Review.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!review) {
    return res.status(404).json({ success: false, message: "Review not found" });
  }
  res.status(200).json({ success: true, data: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return res.status(404).json({ success: false, message: "Review not found" });
  }
  res.status(200).json({ success: true, message: "Review deleted successfully" });
});
