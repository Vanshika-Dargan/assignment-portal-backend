import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    userId: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      id: {
        type: Number,
        unique: true,
      },
      password: { 
        type: String, 
        required: true, 
        minLength: 8 
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
