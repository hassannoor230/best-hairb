import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .then((mongooseInstance) => {
        console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw new Error(`MongoDB connection failed: ${error.message}`);
      });
  }

  return connectionPromise;
};

export default connectDB;
