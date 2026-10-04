import express from "express";
import {
  getUsers,
  getUserByID,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);

export default router;
