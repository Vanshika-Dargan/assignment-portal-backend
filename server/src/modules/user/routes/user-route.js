import express from "express";
import { uploadAssignment, fetchAllAdmins } from "../controllers/user-controller.js";
export const userRoutes = express.Router();

userRoutes.post("/upload", uploadAssignment);
userRoutes.get("/admins", fetchAllAdmins);
