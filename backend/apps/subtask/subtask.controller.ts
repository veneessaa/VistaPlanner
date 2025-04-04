import express from "express";
import {
  createSubtask,
  deleteSubtask,
  getSubtasksByTaskId,
  updateSubtask,
} from "./subtask.repository";
import { createSubtaskSchema } from "./dto/createSubtask.dto";
import { getTaskById } from "../task/task.repository";
import { updateSubtaskSchema } from "./dto/updateSubtask.dto";
import { getUserById } from "../user/user.repository";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validatedData = createSubtaskSchema.parse(req.body);

    const task = await getTaskById(validatedData.taskId);
    if (!task) {
      res.status(400).json({ message: "Task not found" });
      return;
    }

    const newSubtask = await createSubtask(validatedData);

    res.status(201).json({
      message: "Create subtask successfully",
      subtask: newSubtask,
    });
  } catch (error: any) {
    console.error("Error during creating subtask:", error);

    if (error.name === "ZodError") {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    }

    res.status(500).json({ message: "Failed to create subtask" });
  }
});

router.get("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const subtasks = await getSubtasksByTaskId(taskId);

    res.status(200).json({
      message: "Get subtasks successfully",
      subtasks,
    });
  } catch (error: any) {
    console.error("Error during getting subtask:", error);

    res.status(500).json({ message: "Failed to get subtask" });
  }
});

router.put("/:subtaskId", async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const updatedData = req.body;
    const validatedData = updateSubtaskSchema.parse(updatedData);

    const updated = await updateSubtask(subtaskId, validatedData);

    let user = null;
    if (updated.userId) user = await getUserById(updated.userId);

    res.status(200).json({
      message: "Update subtask successfully",
      subtask: { ...updated, user },
    });
  } catch (error: any) {
    console.error("Error during updating subtask:", error);

    if (error.name === "ZodError") {
      res.status(400).json({
        message: "Invalid input",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Failed to update subtask" });
  }
});

router.delete("/:subtaskId", async (req, res) => {
  try {
    const { subtaskId } = req.params;

    await deleteSubtask(subtaskId);

    res.status(200).json({
      message: "Delete task successfully",
      subtaskId,
    });
  } catch (error: any) {
    console.error("Error during deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
