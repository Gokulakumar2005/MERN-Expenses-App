import mongoose from "mongoose";

const configureDB = async () => {
    const dbUrl = process.env.DB_URL || "mongodb+srv://expensetracker_user:Gokulakumar2005@expensetracker.bibr3mx.mongodb.net/?appName=ExpenseTracker";
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default configureDB