import mongoose, { Schema } from "mongoose";
import personSchema from "../../../shared/person/person-module.js";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
      },
});

const userSchemaExtended = personSchema.add(userSchema);
const UserModel = mongoose.model("User", userSchemaExtended);

export default UserModel;
