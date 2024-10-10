import express from "express";
import { getAssignmentsTagged,updateAssignmentStatus } from "../controllers/admin-controller.js";
import authMiddleware from "../../../shared/auth/middleware/auth-middleware.js";
export const adminRoutes = express.Router();


adminRoutes.get("/assignments",authMiddleware, getAssignmentsTagged );
adminRoutes.post("/assignments/:id/:action", authMiddleware,updateAssignmentStatus);

