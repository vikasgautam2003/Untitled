import mongoose from "mongoose"
import { ENV } from "./env.js";

export const connectMongo = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}