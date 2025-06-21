import mongoose from "mongoose";
import config from "../config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.database_uri!);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ Error: ${error}`);
    process.exit(1);
  }
};
