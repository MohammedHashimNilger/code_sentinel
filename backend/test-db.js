import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./src/config/db.js";
import { User } from "./src/models/user.model.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const user = await User.create({
    username: "hashim",
    email: "hashim@example.com",
  });
  console.log("Created:", user);

  const allUsers = await User.find();
  console.log("All users:", allUsers);

  await mongoose.disconnect();
};

run();
