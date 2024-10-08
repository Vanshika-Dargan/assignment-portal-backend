import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
}, { _id: false });

const submissionSchema = new mongoose.Schema({
    student: {
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
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    assignmentId: {
        type: String,
        required: true,
        unique: true,
    },
    heading: {
        type: String,
        required: true,
    },
    subheading: {
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
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: [Date], 
    },
    attachments: [attachmentSchema],
    submissions: [submissionSchema],
});


assignmentSchema.pre('save', function (next) {
    this.updatedAt.push(Date.now());
    next();
});


const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
