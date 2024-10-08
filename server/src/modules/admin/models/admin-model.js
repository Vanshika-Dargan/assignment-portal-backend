import mongoose, { Schema } from "mongoose";
import personSchema from "../../../shared/person/person-module.js";

const adminSchema = new Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
      },
});

const adminSchemaExtended = personSchema.add(adminSchema);
const AdminModel = mongoose.model("Admin", adminSchemaExtended);

export default AdminModel;