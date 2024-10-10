import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const attachmentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: false,
    },
    fileUrl: {
        type: String,
        required: false,
    },
});

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    fileUrl: {
        type: String,
    },
    marksObtained: {
        type: Number,
    },
    feedback: {
        type: String,
    },
    content: {
        type: String,
    },
    submittedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    status: {
        type: String,
        enum: ['accept', 'reject'],
    },
});

const assignmentSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    maxMarks: {
        type: Number,
        required: true,
        default: 100
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true,
    },
    attachments: [attachmentSchema],
    submissions: [submissionSchema],
},{timestamps: true});



const AssignmentModel = mongoose.model('Assignment', assignmentSchema);
export default AssignmentModel;
