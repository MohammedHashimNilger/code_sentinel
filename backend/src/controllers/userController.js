import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find();
  return res.status(200).json({ success: true, user });
});

export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json({ success: true, user });
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400);
    throw new Error("username and email is required");
  }

  const user = await User.create({ username, email });
  return res.status(201).json({ success: true, user });
});
