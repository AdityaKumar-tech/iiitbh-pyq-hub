import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Skeletal MongoDB connection utility using Mongoose.
 * Connects using the connection string from environment variables.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/college-auth');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
