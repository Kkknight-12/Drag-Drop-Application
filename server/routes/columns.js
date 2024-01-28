import express from "express";

import { getColumn, createColumn } from "../controller/columns.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", auth, getColumn);
router.post("/", auth, createColumn);
// router.patch("/:id",  updatePost);

export default router;
