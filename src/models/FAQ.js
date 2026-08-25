import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"], trim: true },
    answer: { type: String, required: [true, "Answer is required"], trim: true },
    category: { type: String, required: [true, "Category is required"], trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ active: 1, sortOrder: 1 });

export default mongoose.model("FAQ", faqSchema);
