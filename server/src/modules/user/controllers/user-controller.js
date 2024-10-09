import UserModel from "../models/user-model.js";
import AdminModel from "../../admin/models/admin-model.js";
import { oauthClient } from "../../../shared/google-oath-config.js";
import axios from 'axios';
import AssignmentModel from "../../assignment/models/assignment-model.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { type } = req.body;
    const loginMethod = type==='google'?'google':'custom';
    if(type==='google'){
    const {code} = req.body;
    const {tokens} = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const googleUserData=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);

    const {email,name,picture}=googleUserData.data;

    // const email ='vanshikadargan.vd@gmail.com';
    // const name= 'vanshika'

    let user=await UserModel.findOne({email});
    console.log(user);
    try {
      if (!user) {
        user = await UserModel.create({
          email,
          name,
          loginMethod,
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    return res.status(200).json({ user: user});
    }
    else{
    }
  } catch (error) {
    return res.status(400).json({ message: "Login failed", error });
  }
};


export const uploadAssignment = async (req, res) => {
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
    if (!submissionDate || new Date() > assignment.dueDate) {
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
    res.status(400).json({ message: "Error uploading assignment", error });
  }
};



export const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};
