import express from "express";
import {
    getTask,
    createTask,
    changeTaskPosition,
    deleteTaskPosition,
    updateTask,
} from "../controller/tasks.js";

const router = express.Router();

import auth from "../middleware/auth.js";

router.get("/", auth, getTask);
router.post("/", auth, createTask);
router.post("/taskposition", auth, changeTaskPosition);
router.delete("/taskposition", auth, deleteTaskPosition);
router.patch("/", auth, updateTask);
// router.patch("/:id",  updatePost);

export default router;
