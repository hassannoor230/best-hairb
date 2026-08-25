import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: [true, "Image URL is required"], trim: true },
    category: { type: String, required: [true, "Category is required"], trim: true },
    altText: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

gallerySchema.index({ category: 1, active: 1, sortOrder: 1 });

export default mongoose.model("Gallery", gallerySchema);
