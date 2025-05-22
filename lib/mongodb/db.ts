import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected")
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An error occurred");
        process.exit(1);
    }
}

export default connectDB;