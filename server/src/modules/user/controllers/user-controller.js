import UserModel from "../models/user-model.js";
import AdminModel from "../../admin/models/admin-model.js";
import AssignmentModel from "../../assignment/models/assignment-model.js";
import { excludeFields } from "../../../shared/utilities/response-modifier.js";

export const uploadAssignment = async (req, res,next) => {
  const { userId, assignmentId, assignmentContent, adminId } = req.body;
  
  try {
    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if admin exists
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if assignment exists
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if submission date is valid
    if (new Date() > assignment.dueDate) {
      return res.status(400).json({ message: "Submission date exceeds due date" });
    }

    // Check if assignment content is not empty
    if (!assignmentContent || assignmentContent.trim() === "") {
      return res.status(400).json({ message: "Assignment content should not be empty" });
    }


    const newSubmission = {
      userId,
      submittedAt: new Date(),
      content: assignmentContent,
      submittedTo: adminId,
    };


    assignment.submissions.push(newSubmission);

    await assignment.save();

    res.status(201).json({ message: "Assignment submitted successfully", submission: newSubmission });

  } catch (error) {
    next(error);
  }
};



export const fetchAllAdmins = async (req, res, next) => {
  try {
    const admins = await AdminModel.find();
    return res.status(200).json(excludeFields(admins));
  } catch (error) {
   next(error)
  }
};
