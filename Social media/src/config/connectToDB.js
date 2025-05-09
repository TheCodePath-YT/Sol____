import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/socialmedia');
        console.log("MongoDB is connected using Mongoose");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};
