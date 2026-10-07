import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";

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
  const { username, email, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("username and password are required");
  }

  const user = await User.create({ username, email, password });
  return res.status(201).json({ success: true, user });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user: { id: user._id, username: user.username },
  });
});
