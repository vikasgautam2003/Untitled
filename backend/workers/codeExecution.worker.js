// import { Worker } from "bullmq";
// import redis from "../config/redis.js";
// import Submission from "../models/submission.model.js";
// import Problem from "../models/problem.model.js";
// import { ENV } from "../config/env.js";
// import mongoose from "mongoose";
// import { executeWithPiston } from "../lib/piston.js";
// import { normalizeOutput } from "../lib/normalize.js";

// await mongoose.connect(ENV.MONGO_URI);

// console.log("✅ Worker connected to MongoDB");

// const worker = new Worker(
//   "code-execution",
//   async job => {
//     console.log("🔥 Job received:", job.name, job.data);

//     const { submissionId } = job.data;

//     const submission = await Submission.findById(submissionId);
//     if (!submission) return;

//     const problem = await Problem.findById(submission.problemId);
//     if (!problem) return;

//     const testCases = problem.testCases;

//     if (!Array.isArray(testCases) || testCases.length === 0) {
//       await Submission.findByIdAndUpdate(submissionId, {
//         verdict: "Wrong Answer"
//       });
//       return;
//     }

//     try {
//       for (const tc of testCases) {
//         const result = await executeWithPiston({
//           language: submission.language,
//           code: submission.code,
//           stdin: tc.stdin || ""
//         });

//         if (result.run.stderr && result.run.stderr.length > 0) {
//           await Submission.findByIdAndUpdate(submissionId, {
//             verdict: "Runtime Error"
//           });
//           return;
//         }

//         const actual = normalizeOutput(result.run.stdout);
//         const expected = normalizeOutput(tc.expectedOutput);

//         if (actual !== expected) {
//           await Submission.findByIdAndUpdate(submissionId, {
//             verdict: "Wrong Answer"
//           });
//           return;
//         }
//       }

//       await Submission.findByIdAndUpdate(submissionId, {
//         verdict: "Accepted"
//       });

//     } catch (err) {
//       console.error(err);
//       await Submission.findByIdAndUpdate(submissionId, {
//         verdict: "Runtime Error"
//       });
//     }
//   },
//   { connection: redis }
// );

// export default worker;









import { Worker } from "bullmq";
import redis from "../config/redis.js";
import Submission from "../models/submission.model.js";
import Problem from "../models/problem.model.js";
import { ENV } from "../config/env.js";
import mongoose from "mongoose";
import { executeWithPiston } from "../lib/piston.js";
import { normalizeOutput } from "../lib/normalize.js";

await mongoose.connect(ENV.MONGO_URI);

console.log("✅ Worker connected to MongoDB");

const worker = new Worker(
  "code-execution",
  async job => {
    console.log("🔥 Job received:", job.name, job.data);

    const { submissionId } = job.data;

    const submission = await Submission.findById(submissionId);
    if (!submission) return;

    const problem = await Problem.findById(submission.problemId);
    if (!problem) return;

    const testCases = problem.testCases;

    if (!Array.isArray(testCases) || testCases.length === 0) {
      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Wrong Answer",
        testResults: []
      });
      return;
    }

    const results = [];

    try {
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];

        const result = await executeWithPiston({
          language: submission.language,
          code: submission.code,
          stdin: tc.stdin || ""
        });

        if (result.run.stderr && result.run.stderr.length > 0) {
          await Submission.findByIdAndUpdate(submissionId, {
            verdict: "Runtime Error",
            testResults: results
          });
          return;
        }

        const actual = normalizeOutput(result.run.stdout);
        const expected = normalizeOutput(tc.expectedOutput);

        const passed = actual === expected;

        results.push({
          index: i,
          passed,
          actual,
          expected
        });

        if (!passed) {
          await Submission.findByIdAndUpdate(submissionId, {
            verdict: "Wrong Answer",
            testResults: results
          });
          return;
        }
      }

      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Accepted",
        testResults: results
      });

    } catch (err) {
      console.error(err);
      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Runtime Error",
        testResults: results
      });
    }
  },
  { connection: redis }
);

export default worker;
