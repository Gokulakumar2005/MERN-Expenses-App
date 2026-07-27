import mongoose from "mongoose";

const configureDB = async () => {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        console.error("DB_URL is not set in process.env");
        return;
    }
    console.log("Connecting to MongoDB...");
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default configureDB