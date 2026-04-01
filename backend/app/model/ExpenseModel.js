import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthModel',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        default: 'Other'
    },
    receiptUrl: {
        type: String
    }
}, { timestamps: true });

export const ExpenseModel = mongoose.model("ExpenseModel", ExpenseSchema);
