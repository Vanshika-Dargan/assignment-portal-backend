import express from "express";
import { uploadAssignment, fetchAllAdmins } from "../controllers/user-controller.js";
import { register,login } from "../../../shared/auth/auth-controller.js";
export const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/upload", uploadAssignment);
userRoutes.get("/admins", fetchAllAdmins);
