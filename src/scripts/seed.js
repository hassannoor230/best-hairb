import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Service from "../models/Service.js";
import FAQ from "../models/FAQ.js";
import Review from "../models/Review.js";
import Gallery from "../models/Gallery.js";
import BusinessSettings from "../models/BusinessSettings.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await User.deleteMany({});
  await Service.deleteMany({});
  await FAQ.deleteMany({});
  await Review.deleteMany({});
  await Gallery.deleteMany({});
  await BusinessSettings.deleteMany({});

  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  await User.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: adminPassword,
    role: "admin",
    isActive: true,
  });

  await Service.create([
    { name: "Classic Haircut", slug: "classic-haircut", category: "Haircut", price: 500, duration: 30, description: "A timeless classic haircut tailored to your style.", featured: true, active: true, sortOrder: 1 },
    { name: "Beard Grooming", slug: "beard-grooming", category: "Beard Grooming", price: 300, duration: 20, description: "Expert beard trimming and shaping.", featured: true, active: true, sortOrder: 2 },
    { name: "Hair Styling", slug: "hair-styling", category: "Hair Styling", price: 700, duration: 40, description: "Professional hair styling for any occasion.", featured: false, active: true, sortOrder: 3 },
    { name: "Shaving", slug: "shaving", category: "Shaving", price: 400, duration: 25, description: "Traditional hot towel shave.", featured: false, active: true, sortOrder: 4 },
    { name: "Hair Treatment", slug: "hair-treatment", category: "Hair Treatment", price: 1000, duration: 45, description: "Deep conditioning and scalp treatment.", featured: false, active: true, sortOrder: 5 },
  ]);

  await FAQ.create([
    { question: "What are your salon hours?", answer: "We are open from 10:00 AM to 1:00 AM daily.", category: "Hours", sortOrder: 1, active: true },
    { question: "Do I need an appointment?", answer: "Appointments are recommended but walk-ins are welcome based on availability.", category: "Appointments", sortOrder: 1, active: true },
    { question: "What payment methods do you accept?", answer: "We accept cash and all major payment methods.", category: "Payment", sortOrder: 1, active: true },
  ]);

  await Review.create([
    { customerName: "Ali R.", rating: 5, review: "Best haircut experience in Gujranwala. The attention to detail is incredible.", source: "Google", featured: true, approved: true },
    { customerName: "Hassan M.", rating: 5, review: "Professional service and great atmosphere. Highly recommended.", source: "Google", featured: true, approved: true },
    { customerName: "Ahmed K.", rating: 4, review: "Excellent beard grooming service. Clean and comfortable salon.", source: "Google", featured: false, approved: true },
  ]);

  await Gallery.create([
    { title: "Salon Interior", description: "Modern and clean salon environment", imageUrl: "/placeholder.jpg", category: "Salon", altText: "Best Hair Salon interior", featured: true, sortOrder: 1, active: true },
    { title: "Haircut Style", description: "Professional haircut showcase", imageUrl: "/placeholder.jpg", category: "Haircuts", altText: "Professional haircut", featured: true, sortOrder: 1, active: true },
    { title: "Beard Grooming", description: "Beard grooming service", imageUrl: "/placeholder.jpg", category: "Beard", altText: "Beard grooming", featured: false, sortOrder: 1, active: true },
  ]);

  await BusinessSettings.create({
    businessName: "Best Hair Salon",
    tagline: "Professional hair and grooming services",
    description: "Professional hair and grooming services in Satellite Town, Gujranwala.",
    phone: "+92 300 6442344",
    whatsapp: "+923006442344",
    email: "",
    address: "Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan",
    city: "Gujranwala",
    province: "Punjab",
    country: "Pakistan",
    googleMapsUrl: "https://maps.google.com",
    googleBusinessUrl: "",
    appointmentEnabled: true,
    whatsappEnabled: true,
    seo: {
      siteTitle: "Best Hair Salon - Professional Hair & Grooming in Gujranwala",
      metaDescription: "Best Hair Salon offers professional haircuts, beard grooming, and hair styling in Satellite Town, Gujranwala.",
    },
  });

  console.log("Seed data created successfully!");
  process.exit(0);
};

connectDB().then(() => seedData());
