import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const resetAdmin = async () => {
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env");
  }

  await mongoose.connect(MONGO_URI);

  let admin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (admin) {
    admin.name = "Admin";
    admin.role = "admin";
    admin.isActive = true;
    admin.password = ADMIN_PASSWORD;
    await admin.save();
    console.log(`Admin account updated for ${admin.email}`);
  } else {
    admin = await User.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      isActive: true,
    });
    console.log(`Admin account created for ${admin.email}`);
  }

  await mongoose.disconnect();
};

resetAdmin().catch(async (error) => {
  console.error(`Admin reset failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
