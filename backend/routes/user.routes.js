import express from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(protect);
router.use(admin);

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
