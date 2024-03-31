import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "Cluster0",
    });
    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
