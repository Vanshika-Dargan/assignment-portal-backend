import UserModel from "../../modules/user/models/user-model.js";
import AdminModel from "../../modules/admin/models/admin-model.js";
import { oauthClient } from "./google-oath-config.js";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const register = async (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if(!role){
    return res.status(404).json({message:'role is required, youare user or admin?'});
  }
  let Model = role === 'admin' ? AdminModel : UserModel;

  try {
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const model = await Model.create({
      email,
      name,
      password: hashedPassword,
    });

    const { _id } = model;
    let typeId = role === 'admin' ? 'adminId': 'userId'
    const token = jwt.sign({[typeId]: _id, email, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} registration success`,
      data: {
        token,
        model,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const login = async (req, res, next) => {
  try {
    const { type,role } = req.body;
    if(!role){
      return res.status(404).json({message:'role is required, youare user or admin?'});
    }
    const loginMethod = type==='google'?'google':'custom';
    let Model = role === 'admin' ? AdminModel : UserModel;
    if(type==='google'){
    const {code} = req.body;
    const {tokens} = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const googleUserData=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);

    const {email,name,picture}=googleUserData.data;

    let model=await Model.findOne({email});
      if (!user) {
        user = await Model.create({
          email,
          name,
          picture,
          loginMethod,
        });
        const {_id} = model;
        const token = jwt.sign({_id,email},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
    return res.status(201).json({ message: 'user login successful', data:{token,user}});
    }
    else{
      
    }
  }
  } catch (error) {
    next(error)
  }
};
