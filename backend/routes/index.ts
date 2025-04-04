import express from "express";
import auth from "../apps/auth/auth.controller";
import user from "../apps/user/user.controller";
import task from "../apps/task/task.controller";
import subtask from "../apps/subtask/subtask.controller";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);
router.use("/tasks", task);
router.use("/subtasks", subtask);

export default router;
