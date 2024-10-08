import mongoose, { Schema } from "mongoose";
import personSchema from "../../../shared/models/person/person-model.js";

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
