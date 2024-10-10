import express from "express";
import { register, login } from "../../../shared/auth/controller/auth-controller.js";
import { getAssignmentsTagged,updateAssignmentStatus } from "../controllers/admin-controller.js";
import authMiddleware from "../../../shared/auth/middleware/auth-middleware.js";
export const adminRoutes = express.Router();

adminRoutes.post("/register", register);
adminRoutes.post("/login", login);
adminRoutes.get("/assignments",authMiddleware, getAssignmentsTagged );
adminRoutes.get("/assignments/:id/:action", authMiddleware,updateAssignmentStatus);

