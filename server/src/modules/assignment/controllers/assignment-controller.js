import { modifyResData } from "../../../shared/utilities/response-modifier.js";
import AssignmentModel from "../models/assignment-model.js";

export const createAssignment = async (req, res, next) => {
    const { title, subtitle, description, dueDate, maxMarks, assignedBy, fileName, fileUrl } = req.body;
   
    try {
      const assignment = await AssignmentModel.create({
        title,
        subtitle,
        description,
        dueDate,
        maxMarks,
        assignedBy,
        attachementSchema: {
          fileName,
          fileUrl
        }
      });
   
      res.status(201).json({ message: "Assignment created successfully", data: modifyResData(assignment,'assignmentId') });
    } catch (error) {
      next(error);
    }
  };
  

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await AssignmentModel.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ data: assignment });
  } catch (error) {
    res.status(400).json({ message: "Error fetching assignment", error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const assignment = await AssignmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ message: "Assignment updated successfully", data: assignment });
  } catch (error) {
    res.status(400).json({ message: "Error updating assignment", error: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await AssignmentModel.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting assignment", error: error.message });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentModel.find();
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(400).json({ message: "Error fetching assignments", error: error.message });
  }
};
