import mongoose from "mongoose";

const configureDB = async () => {
    let dbUrl = process.env.DB_URL;
    console.log("Connecting to MongoDB Atlas...");
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default configureDB