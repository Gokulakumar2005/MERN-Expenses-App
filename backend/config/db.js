import mongoose from "mongoose";

const configureDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
    }
}

export default configureDB