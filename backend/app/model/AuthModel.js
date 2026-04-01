import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String
    },
    otp: {
        type: String
    },
    otpCreatedAt: {
        type: Date
    }
})
export const AuthModel = mongoose.model("AuthModel", AuthSchema);


