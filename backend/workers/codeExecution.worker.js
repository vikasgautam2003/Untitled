import { Worker } from "bullmq";
import redis from "../config/redis.js";
import Submission from "../models/submission.model.js";
import { ENV } from "../config/env.js";
import mongoose from "mongoose";

// 🔑 CONNECT TO MONGODB (CRITICAL)
await mongoose.connect(ENV.MONGO_URI);

console.log("✅ Worker connected to MongoDB");



const worker = new Worker(
    "code-execution",

    async job => {
       
        console.log("Processing job:", job.id, job.name, job.data);

        const { submissionId } = job.data;

        await new Promise(resolve => setTimeout(resolve, 2000));

        if(submissionId)
        {
            await Submission.findByIdAndUpdate(submissionId, { verdict: "Accepted" }, { runValidators: true });
        }

        return { success: true};
    }, {
    connection: redis
  }

)


worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});

export default worker;