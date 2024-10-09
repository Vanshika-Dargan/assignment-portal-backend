import express from "express";
import { register, login } from "../../../shared/auth/auth-controller.js";
import { getAssignmentsTagged,updateAssignmentStatus } from "../controllers/admin-controller.js";
export const adminRoutes = express.Router();

adminRoutes.post("/register", register);
adminRoutes.post("/login", login);
adminRoutes.get("/assignments", getAssignmentsTagged );
adminRoutes.post("/assignments/:id/:action", updateAssignmentStatus);

