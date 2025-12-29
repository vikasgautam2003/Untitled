import { Queue } from "bullmq"
import redis from "../config/redis.js"


export const codeExecutionQueue = new Queue(
    "code-execution",
    {
        connection: redis
    }
)