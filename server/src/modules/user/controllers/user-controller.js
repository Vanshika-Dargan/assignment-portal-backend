import UserModel from "../models/user-model.js";
import AdminModel from "../../admin/models/admin-model.js";



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
    const { email, password } = req.body;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
  }
};


export const uploadAssignment = async (req, res) => {
  try {
    res.status(200).json({ message: "Assignment uploaded successfully" });
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
