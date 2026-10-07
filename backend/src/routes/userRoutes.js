import express from "express";
import {
  getUsers,
  getUserByID,
  createUser,
  loginUser,
} from "../controllers/userController.js";

import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", protect, (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      user: { id: req.user._id, username: req.user.username },
    });
});

export default router;
