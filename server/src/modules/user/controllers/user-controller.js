import UserModel from "../models/user-model.js";
import AdminModel from "../../admin/models/admin-model.js";
import { oauthClient } from "../../../shared/google-oath-config.js";
import axios from 'axios';

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
