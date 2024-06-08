import express from "express";
import { UserController } from "../controller/user.controller.js";

const router = express.Router();

// Define routes for users
router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);

export default router;
