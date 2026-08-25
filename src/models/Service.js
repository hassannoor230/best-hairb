import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    slug: { type: String, unique: true, required: true, lowercase: true },
    description: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: [true, "Price is required"], min: [0, "Price cannot be negative"] },
    duration: { type: Number, required: [true, "Duration is required"], min: [1, "Duration must be at least 1 minute"] },
    image: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

serviceSchema.index({ active: 1, featured: 1 });
serviceSchema.index({ sortOrder: 1 });

export default mongoose.model("Service", serviceSchema);
