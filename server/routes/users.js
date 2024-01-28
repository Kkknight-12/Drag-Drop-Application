import express from "express";
const router = express.Router();
import { login, register } from "../controller/users.js";

router.post("/login", login); // '/login'
router.post("/register", register); // '/register'

export default router;
