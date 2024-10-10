import express from "express";
export const assignmentRoutes = express.Router();
import { createAssignment, getAllAssignments, updateAssignment, getAssignmentById, deleteAssignment } from "../controllers/assignment-controller.js";
assignmentRoutes.post("/create", createAssignment);
assignmentRoutes.get("/:id", getAssignmentById);
assignmentRoutes.put("/:id", updateAssignment);
assignmentRoutes.delete("/:id", deleteAssignment);
assignmentRoutes.get("/", getAllAssignments);


