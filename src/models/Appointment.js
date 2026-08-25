import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: [true, "Customer name is required"], trim: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    email: { type: String, trim: true },
    service: { type: String, required: [true, "Service is required"], trim: true },
    preferredDate: { type: Date, required: [true, "Preferred date is required"] },
    preferredTime: { type: String, required: [true, "Preferred time is required"], trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled", "rejected"], default: "pending" },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

appointmentSchema.index({ status: 1, preferredDate: 1, createdAt: -1 });

export default mongoose.model("Appointment", appointmentSchema);
