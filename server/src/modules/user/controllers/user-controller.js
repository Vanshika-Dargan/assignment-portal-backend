import UserModel from "../models/user-model.js";
import AdminModel from "../../admin/models/admin-model.js";
import { oauthClient } from "../../../shared/google-oath-config.js";
import axios from 'axios';
import AssignmentModel from "../../assignment/models/assignment-model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res,next) => {
  const {name,email,password,confirmPassword} = req.body;
  try {

    const existingUser = await UserModel.findOne({email});
    if(existingUser){
      return res.status(404).json({message:'User already exists. Please Log In'})
    }
    if(password!=confirmPassword){
      return res.status(400).json({message:'Passwords dont match'})
    }
    let hashedPassword = ''
    bcrypt.hash(password,10,function(err,hash){
       hashedPassword = hash;
    })
    
    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword
    });
    const {_id,userId} =user;
    const token = jwt.sign({_id,email,userId},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
    res.status(201).json({ message: "user registeration success", data: {
    token,
    user
    } });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { type } = req.body;
    const loginMethod = type==='google'?'google':'custom';
    if(type==='google'){
    const {code} = req.body;
    const {tokens} = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const googleUserData=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);

    const {email,name,picture}=googleUserData.data;

    let user=await UserModel.findOne({email});
      if (!user) {
        user = await UserModel.create({
          email,
          name,
          picture,
          loginMethod,
        });
        const {_id,userId} = user;
        const token = jwt.sign({_id,email,userId},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
    return res.status(201).json({ message: 'user login successful', data:{token,user}});
    }
    else{
      
    }
  }
  } catch (error) {
    next(error)
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
