import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error in connecting to Database", err);
  });
  
  mongoose.connect(config.databaseURL as string).catch((err) => {
    console.log("Failed to Connect to Database", err);
    process.exit(1);
  });
};

export default connectDB;
