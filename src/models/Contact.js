import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true },
    message: { type: String, required: [true, "Message is required"], trim: true },
    status: { type: String, enum: ["new", "read", "contacted", "closed"], default: "new" },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Contact", contactSchema);
