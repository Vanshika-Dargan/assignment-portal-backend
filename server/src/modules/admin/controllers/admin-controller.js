import AssignmentModel from "../../assignment/models/assignment-model.js";

export const getAssignmentsTagged = async (req, res, next) => {
  try {
    const { adminId } = req.body;
    const assignments = await AssignmentModel.find({
        "submissions.submittedTo": adminId,
      });

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found for this admin." });
    }

   return res.status(200).json(assignments);
  } catch (error) {
    next(error);
  }
};

export const updateAssignmentStatus = async (req, res, next) => {
    try {
      const {action} = req.params;
      const {assignmentId,adminId} = req.body;

  
      const assignment = await AssignmentModel.findOne({
        assignmentId,
        "submissions.submittedTo": adminId,
      });
  
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found or not tagged to this admin." });
      }
  
      if (action !== "accept" && action !== "reject") {
        return res.status(400).json({ message: "Invalid action. Must be 'accept' or 'reject'." });
      }
  
 
      const submission = assignment.submissions.find(
        (sub) => sub.submittedTo.toString() === adminId.toString()
      );
  
      if (!submission) {
        return res.status(404).json({ message: "No submission found for this admin." });
      }
  
      submission.status = action;
      await assignment.save();
  
      res.status(200).json({ message: `Assignment ${action}ed successfully.`, assignment });
    } catch (error) {
      next(error);
    }
  };