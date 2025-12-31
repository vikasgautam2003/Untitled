



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
//         verdict: "Wrong Answer",
//         testResults: []
//       });
//       return;
//     }

//     const results = [];

//     try {
//       for (let i = 0; i < testCases.length; i++) {
//         const tc = testCases[i];

//         const result = await executeWithPiston({
//           language: submission.language,
//           code: submission.code,
//           stdin: tc.stdin || ""
//         });

//         if (result.run.stderr && result.run.stderr.length > 0) {
//           await Submission.findByIdAndUpdate(submissionId, {
//             verdict: "Runtime Error",
//             testResults: results
//           });
//           return;
//         }

//         const actual = normalizeOutput(result.run.stdout);
//         const expected = normalizeOutput(tc.expectedOutput);

//         const passed = actual === expected;

//         results.push({
//           index: i,
//           passed,
//           actual,
//           expected
//         });

//         if (!passed) {
//           await Submission.findByIdAndUpdate(submissionId, {
//             verdict: "Wrong Answer",
//             testResults: results
//           });
//           return;
//         }
//       }

//       await Submission.findByIdAndUpdate(submissionId, {
//         verdict: "Accepted",
//         testResults: results
//       });

//     } catch (err) {
//       console.error(err);
//       await Submission.findByIdAndUpdate(submissionId, {
//         verdict: "Runtime Error",
//         testResults: results
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

console.log("🚀 Worker booting...");

await mongoose.connect(ENV.MONGO_URI);
console.log("✅ Worker connected to MongoDB");

const worker = new Worker(
  "code-execution",
  async (job) => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔥 Job received");
    console.log("Job ID:", job.id);
    console.log("Job Name:", job.name);
    console.log("Job Data:", job.data);

    const { submissionId } = job.data;

    if (!submissionId) {
      console.error("❌ Missing submissionId in job data");
      return;
    }

    console.log("🔍 Fetching submission:", submissionId);

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      console.error("❌ Submission not found:", submissionId);
      return;
    }

    console.log("✅ Submission found");
    console.log("Language:", submission.language);
    console.log("Problem ID:", submission.problemId);

    console.log("🔍 Fetching problem:", submission.problemId);

    const problem = await Problem.findById(submission.problemId);
    if (!problem) {
      console.error("❌ Problem not found:", submission.problemId);
      return;
    }

    console.log("✅ Problem found");
    console.log("Total test cases:", problem.testCases?.length);

    const testCases = problem.testCases;

    if (!Array.isArray(testCases) || testCases.length === 0) {
      console.warn("⚠️ No test cases found for problem");

      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Wrong Answer",
        testResults: []
      });

      console.log("📝 Submission marked as Wrong Answer (no test cases)");
      return;
    }

    const results = [];

    try {
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];

        console.log(`▶️ Running test case ${i}`);
        console.log("stdin:", tc.stdin);

        const result = await executeWithPiston({
          language: submission.language,
          code: submission.code,
          stdin: tc.stdin || ""
        });

        console.log(`⬅️ Execution result for test ${i}`);

        if (result.run.stderr && result.run.stderr.length > 0) {
          console.error("💥 Runtime Error detected");
          console.error("stderr:", result.run.stderr);

          await Submission.findByIdAndUpdate(submissionId, {
            verdict: "Runtime Error",
            testResults: results
          });

          console.log("📝 Submission marked as Runtime Error");
          return;
        }

        const actual = normalizeOutput(result.run.stdout);
        const expected = normalizeOutput(tc.expectedOutput);

        const passed = actual === expected;

        console.log("Expected:", expected);
        console.log("Actual:", actual);
        console.log("Passed:", passed);

        results.push({
          index: i,
          passed,
          actual,
          expected
        });

        if (!passed) {
          console.warn(`❌ Test case ${i} failed`);

          await Submission.findByIdAndUpdate(submissionId, {
            verdict: "Wrong Answer",
            testResults: results
          });

          console.log("📝 Submission marked as Wrong Answer");
          return;
        }

        console.log(`✅ Test case ${i} passed`);
      }

      console.log("🎉 All test cases passed");

      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Accepted",
        testResults: results
      });

      console.log("📝 Submission marked as Accepted");

    } catch (err) {
      console.error("🔥 Unexpected worker error");
      console.error(err);

      await Submission.findByIdAndUpdate(submissionId, {
        verdict: "Runtime Error",
        testResults: results
      });

      console.log("📝 Submission marked as Runtime Error (catch block)");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  },
  { connection: redis }
);

console.log("👷 Worker started and listening for jobs");

export default worker;
