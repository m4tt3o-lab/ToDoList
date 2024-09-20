import mongoose from "mongoose";

const registerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type:String,
        required: true,
        unique: true
    }
}, { timestamps: true }); 

export const Auth = mongoose.model('Register', registerSchema);

