import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isActive: true });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";
    const cookieSecure = isProduction ? true : false;
    const cookieSameSite = process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax");

    res.cookie("token", token, {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: cookieSameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: { user: user.toJSON(), token } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};
