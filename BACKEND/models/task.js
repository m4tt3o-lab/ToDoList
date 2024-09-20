import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true, 
    }
}, { timestamps: true }); 

export const Task = mongoose.model('Task', todoSchema);

