import mongoose from "mongoose";

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/restaurant-lead-tracker";

const dbOptions = {
  autoCreate: true,
};

export const connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI, dbOptions);
    console.info("MongoDB connected");
  } catch (e) {
    console.error(e.message);
    console.info("MongoDB connection error");
    process.exit(-1);
  }
};
