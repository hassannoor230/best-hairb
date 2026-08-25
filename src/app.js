import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const configuredOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://best-hairb.vercel.app",
  "https://best-hair.vercel.app",
  ...configuredOrigins,
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts, please try again later." },
});

const prefixes = ["/api/v1", "/v1"];

prefixes.forEach((prefix) => {
  app.use(`${prefix}/auth/login`, authLimiter);
  app.use(`${prefix}`, limiter);

  app.use(`${prefix}/health`, (req, res) => {
    res.status(200).json({ success: true, message: "API is healthy" });
  });

  app.get(`${prefix}`, (req, res) => {
    res.status(200).json({
      success: true,
      message: "Best Hair Salon API",
      health: `${prefix}/health`,
    });
  });

  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/services`, serviceRoutes);
  app.use(`${prefix}/appointments`, appointmentRoutes);
  app.use(`${prefix}/contact`, contactRoutes);
  app.use(`${prefix}/reviews`, reviewRoutes);
  app.use(`${prefix}/gallery`, galleryRoutes);
  app.use(`${prefix}/faqs`, faqRoutes);
  app.use(`${prefix}/business`, businessRoutes);
});

app.use(notFound);
app.use(errorHandler);

export default app;
