import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
      },
      password: { 
        type: String, 
        required: false, 
        minLength: 8 
      },
      picture: {
        type: String, 
        required: false, 
      },
      loginMethod: {
        type: String,
        enum: ['google', 'custom'], 
      },
},
{ timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
