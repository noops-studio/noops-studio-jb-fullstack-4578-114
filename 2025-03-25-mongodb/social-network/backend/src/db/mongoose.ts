import mongoose from "mongoose";
import config from "config";

// const dbURI = config.get<string>("db.uri"); // e.g. "mongodb://localhost:27017/twitter"

interface MongooseConfig {
    host: string;
    port: number;
    database: string;
  }

const {host , port ,database} = config.get<MongooseConfig>("mongoose");

const dbURI = `mongodb://${host}:${port}/${database}`;
export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default mongoose;
