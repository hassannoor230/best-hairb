import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  isOpen: { type: Boolean, default: true },
  open: { type: String, default: "10:00 AM" },
  close: { type: String, default: "01:00 AM" },
});

const businessSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, default: "Best Hair Salon" },
    tagline: { type: String, default: "Professional hair and grooming services" },
    description: { type: String, default: "Professional hair and grooming services in Satellite Town, Gujranwala." },
    phone: { type: String, default: "+92 300 6442344" },
    whatsapp: { type: String, default: "+923006442344" },
    email: { type: String, default: "" },
    address: { type: String, default: "Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan" },
    city: { type: String, default: "Gujranwala" },
    province: { type: String, default: "Punjab" },
    country: { type: String, default: "Pakistan" },
    googleMapsUrl: { type: String, default: "https://maps.google.com" },
    googleBusinessUrl: { type: String, default: "" },
    openingHours: {
      monday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      tuesday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      wednesday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      thursday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      friday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      saturday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
      sunday: { type: daySchema, default: () => ({ isOpen: true, open: "10:00 AM", close: "01:00 AM" }) },
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    seo: {
      siteTitle: { type: String, default: "Best Hair Salon - Professional Hair & Grooming in Gujranwala" },
      metaDescription: { type: String, default: "Best Hair Salon offers professional haircuts, beard grooming, and hair styling in Satellite Town, Gujranwala." },
      ogImage: { type: String, default: "" },
    },
    appointmentEnabled: { type: Boolean, default: true },
    whatsappEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessSettings", businessSettingsSchema);
