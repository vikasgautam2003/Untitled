import Problem from "../models/problem.model.js";
import HintUsage from "../models/hintUsage.model.js";
import { HINT_SYSTEM_PROMPT } from "../lib/ai/hintPrompt.js";
import { callLLM } from "../lib/ai/client.js";

export const getHint = async (req, res) => {
  const { problemId, language, code } = req.body;
  const userId = req.user.id;

  if (!problemId) {
    return res.status(400).json({ message: "problemId required" });
  }

  const problem = await Problem.findById(problemId).select(
    "title description difficulty topic"
  );
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  const usage = await HintUsage.findOneAndUpdate(
    { userId, problemId },
    { $setOnInsert: { count: 0 } },
    { upsert: true, new: true }
  );

  if (usage.count >= 3) {
    return res.status(429).json({ message: "No more hints available" });
  }

  const level = usage.count + 1;

  const userPrompt = `
Problem:
${problem.description}

Difficulty: ${problem.difficulty}
Language: ${language}

User code:
${code || "No code yet"}

Give HINT LEVEL ${level} ONLY.
Rules:
- No code
- No pseudocode
- No final algorithm
- Be more specific than previous hints
`;

  const hint = await callLLM({
    system: HINT_SYSTEM_PROMPT,
    user: userPrompt,
    maxTokens: 200
  });

  usage.count = level;
  await usage.save();

  res.json({ hint, level, remaining: 3 - level });
};
