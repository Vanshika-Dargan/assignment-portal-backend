import express from "express";
import { registerUser, loginUser, uploadAssignment, fetchAllAdmins } from "../controllers/user-controller.js";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/upload", uploadAssignment);
userRoutes.get("/admins", fetchAllAdmins);
