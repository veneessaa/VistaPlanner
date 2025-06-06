import express from "express";
import {
  getUserById,
  resetStreakIfInactive,
  updateUser,
} from "../user/user.repository";
import { updateUserSchema } from "./dto/updateUser.dto";

const router = express.Router();

// update user by user id
router.put("/:id", async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const userId = req.params.id;
    const updatedUser = await updateUser(userId, validatedData);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const userId = req.params.id;
    const updatedUser = await updateUser(userId, validatedData);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/check-streak", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await getUserById(userId);
    await resetStreakIfInactive(user);
    res.status(200).json();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;