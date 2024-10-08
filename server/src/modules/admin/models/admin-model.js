import mongoose, { Schema } from "mongoose";
import personSchema from "../../../shared/models/person/person-model.js";

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