import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const adminSchema = new Schema({
    adminId: {
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
        required: false, 
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

const AdminModel =mongoose.model("Admin", adminSchema);

export default AdminModel;