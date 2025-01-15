"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: String,
        enum: ['Low', 'Moderate', 'High'],
        default: 'Moderate'
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: false
    },
    image: String,
    imagePublicId: String,
    userId: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Task', TaskSchema);
