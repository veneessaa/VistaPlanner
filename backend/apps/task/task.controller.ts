import express from "express";
import {
  createTask,
  createUserInTask,
  deleteTaskWithCollabs,
  deleteUserInTask,
  getCollabTask,
  getTaskById,
  getTasksByUserId,
  getUsersByTaskId,
  updateTask,
} from "./task.repository";
import { CreateTaskDto, createTaskSchema } from "./dto/createTask.dto";
import { getUserByEmail, getUserById } from "../user/user.repository";
import { addUserSchema } from "./dto/addUser.dto";
import { updateTaskSchema } from "./dto/updateTask.dto";

const router = express.Router();

// create task
router.post("/", async (req, res) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);

    const user = await getUserById(validatedData.userId);
    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    const newTask = await createTask(validatedData);
    const owner = await getUserById(validatedData.userId);
    const collabUsers = await getUsersByTaskId(newTask.id);

    res.status(201).json({
      message: "Create task successfully",
      task: { ...newTask, owner, collabUsers },
    });
  } catch (error: any) {
    console.error("Error during creating task:", error);

    if (error.name === "ZodError") {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    }

    res.status(500).json({ message: "Failed to create task" });
  }
});

// get tasks by user id
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await getTasksByUserId(userId);
    const owner = await getUserById(userId);

    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const collabUsers = await getUsersByTaskId(task.id);
        return { ...task, owner, collabUsers };
      })
    );

    res.status(200).json({
      message: "Get task successfully",
      tasks: updatedTasks,
    });
  } catch (error: any) {
    console.error("Error during getting task:", error);

    if (error.name === "ZodError") {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    }

    res.status(500).json({ message: "Failed to get task" });
  }
});

// get collab tasks by user id
router.get("/collab/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await getCollabTask(userId);

    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const owner = await getUserById(task.userId);
        const collabUsers = await getUsersByTaskId(task.id);
        return { ...task, owner, collabUsers };
      })
    );

    res.status(200).json({
      message: "Get task successfully",
      tasks: updatedTasks,
    });
  } catch (error: any) {
    console.error("Error during getting task:", error);

    if (error.name === "ZodError") {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    }

    res.status(500).json({ message: "Failed to get task" });
  }
});

// add collab user in a task
router.post("/add-user", async (req, res) => {
  try {
    const validatedData = addUserSchema.parse(req.body);

    const user = await getUserByEmail(validatedData.email);
    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    const users = await getUsersByTaskId(validatedData.taskId);

    for (const u of users) {
      if (u.id === user.id) {
        res.status(400).json({ message: "User already assigned!" });
        return;
      }
    }

    const task = await getTaskById(validatedData.taskId);

    if (user.id == task.userId) {
      res.status(400).json({ message: "Cannot assign owner!" });
      return;
    }

    await createUserInTask(user.id, validatedData.taskId);

    const newMember = await getUserById(user.id);

    res.status(201).json({
      user: newMember,
      message: "Add user successfully",
    });
  } catch (error: any) {
    console.error("Error during adding user:", error);

    if (error.name === "ZodError") {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    }

    res.status(500).json({ message: "Failed to add user" });
  }
});

// update task by task id
router.put("/:taskId", async (req, res) => {
  try {
    const updatedData = updateTaskSchema.parse(req.body);
    const taskId = req.params.taskId;
    const updatedTask = await updateTask(taskId, updatedData);

    const owner = await getUserById(updatedData.userId);
    const collabUsers = await getUsersByTaskId(taskId);

    res.status(200).json({
      message: "Update task successfully",
      task: { ...updatedTask, owner, collabUsers },
    });
  } catch (error: any) {
    console.error("Error during updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// get task detail by task id
router.get("/task/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await getTaskById(taskId);

    const owner = await getUserById(task.userId);
    const collabUsers = await getUsersByTaskId(taskId);

    res.status(200).json({
      message: "Get task successfully",
      task: { ...task, owner, collabUsers },
    });
  } catch (error: any) {
    console.error("Error during getting task:", error);
    res.status(500).json({ message: "Failed to get task" });
  }
});

router.post("/remove-users", async (req, res) => {
  try {
    const { taskId, userIds } = req.body;

    await deleteUserInTask(taskId, userIds);

    res.status(200).json({
      message: "Delete collaborators successfully",
    });
  } catch (error: any) {
    console.error("Error removing user(s) from task:", error);

    if (error.name === "ZodError") {
      res.status(400).json({
        message: "Invalid input",
        errors: error.errors,
      });
      return;
    }

    res.status(500).json({
      message: "Failed to remove user(s) from task.",
    });
  }
});

// delete task by task id
router.delete("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    await deleteTaskWithCollabs(taskId);

    res.status(200).json({
      message: "Delete task successfully",
      taskId,
    });
  } catch (error: any) {
    console.error("Error during deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
