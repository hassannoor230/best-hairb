import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: [true, "Customer name is required"], trim: true },
    rating: { type: Number, required: [true, "Rating is required"], min: [1, "Rating must be at least 1"], max: [5, "Rating cannot exceed 5"] },
    review: { type: String, required: [true, "Review is required"], trim: true },
    source: { type: String, trim: true, default: "Manual" },
    date: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.index({ approved: 1, featured: 1 });

export default mongoose.model("Review", reviewSchema);
