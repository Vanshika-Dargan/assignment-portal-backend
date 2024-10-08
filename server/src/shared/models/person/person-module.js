import mongoose, { Schema } from "mongoose";


const personSchema = new Schema({
    id: {
        type: Number,
        required: true,
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
      dob: {
        type: Date,
        required: true,
      },
});

export default personSchema;