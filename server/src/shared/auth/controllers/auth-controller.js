import UserModel from "../../../modules/user/models/user-model.js";
import AdminModel from "../../../modules/admin/models/admin-model.js";
import { oauthClient } from "../config/google-oath-config.js";
import axios from 'axios';
import bcrypt from 'bcrypt';
import { excludeFields } from "../../utilities/response-modifier.js";
import { generateToken } from "../../utilities/token.js";
import { authSchema } from "../validations/auth-validation.js";


export const register = async (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const result = authSchema.validate({name, email,password});

if (result.error) {
  return res.status(400).json({error:result.error.details});
} 
  
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


    let model = await Model.create({
      email,
      name,
      password: hashedPassword,
    });

    const { _id } = model;
    let typeId = role === 'admin' ? 'adminId': 'userId'
    const token = generateToken({[typeId]: _id, email, role });

    model = excludeFields(model);
    

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} registration success`,
      data: {
        token,
        data: model
      },
    });
  } catch (error) {
    next(error);
  }
};



export const login = async (req, res, next) => {
  try {
    const { type,role,email,password,code } = req.body;
    
    if(!role){
      return res.status(404).json({message:'role is required, youare user or admin?'});
    }
    const loginMethod = type==='google'?'google':'custom';
    let Model = role === 'admin' ? AdminModel : UserModel;
    let typeId = role === 'admin' ? 'adminId': 'userId'

    if(type==='google'){
    
    const {tokens} = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const googleUserData=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);

    const {email,name,picture}=googleUserData.data;
    
    let model=await Model.findOne({email});
    if(model){
    return res.status(400).json({message: 'User already exists'});
    }
      else {
        model = await Model.create({
          email,
          name,
          picture,
          loginMethod,
        });
        const {_id} = model;
        const token = generateToken({[typeId]: _id,email});
    return res.status(201).json({ message: 'user login successful', data:{token,data:model}});
    }
  }
    else{
      let model = await Model.findOne({ email });
      if (!model) {
          return res.status(404).json({ message: 'User not found. Please register.' });
      }

      const isPasswordValid = await bcrypt.compare(password, model.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
      }
      const {_id} = model;
      const token = generateToken({[typeId]: _id,email});
      return res.status(201).json({ message: 'User logged in successfully', data: { token, data:model } });

      
    }
  
  } catch (error) {
    next(error)
  }
};
