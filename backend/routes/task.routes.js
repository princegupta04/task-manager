import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", updateTaskStatus);

export default router;
