import express from "express";
export const assignmentRoutes = express.Router();
import { createAssignment, getAllAssignments, updateAssignment, getAssignmentById, deleteAssignment } from "../controllers/assignment-controller.js";
import authMiddleware from "../../../shared/auth/middleware/auth-middleware.js";

assignmentRoutes.post("/create",authMiddleware, createAssignment);
assignmentRoutes.get("/:id", getAssignmentById);
assignmentRoutes.put("/:id", updateAssignment);
assignmentRoutes.delete("/:id", deleteAssignment);
assignmentRoutes.get("/", getAllAssignments);


