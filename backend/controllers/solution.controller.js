import Submission from "../models/submission.model.js";
import SolutionUnlock from "../models/solutionUnlock.model.js";
import Problem from "../models/problem.model.js";
import { buildOptimalSolutionPrompt } from "../lib/prompts/optimalSolution.prompt.js";
import { validateOptimalSolutionSchema } from "../lib/validators/optimalSolution.schema.js";
import { callLLM } from "../lib/ai/client.js";
import { extractJson } from "../utils/extractions.js";


export const getSolutionAccess = async (req, res) => {

    const { problemId } = req.params;
    const userId = req.user.id;

    const hasAccepted = await Submission.exists({
        userId,
        problemId,
        verdict: "Accepted"
    });

    const isUnlocked = await SolutionUnlock.exists({ userId, problemId });

    res.json({
        hasAccepted: !!hasAccepted,
        isUnlocked: !!isUnlocked,
        canView: !!hasAccepted || !!isUnlocked
    });
}


export const unlockSolution = async (req, res) => {
    const { problemId } = req.params;
    const userId = req.user.id;

    await SolutionUnlock.findOneAndUpdate(
        { userId, problemId },
        { userId, problemId },
        { upsert: true }
    );

    res.json({ success: true });
}



export const generateOptimalSolution = async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user.id;

  const hasAccepted = await Submission.exists({
    userId,
    problemId,
    verdict: "Accepted"
  });

  const isUnlocked = await SolutionUnlock.exists({ userId, problemId });

  if (!hasAccepted && !isUnlocked) {
    return res.status(403).json({ message: "Solution locked" });
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  const prompt = buildOptimalSolutionPrompt(problem);

  let parsed;
  try {
    const aiText = await callLLM({
      system: "You are an interview preparation system.",
      user: prompt,
      maxTokens: 2048
    });
     console.log("🔍 RAW AI OUTPUT:\n", aiText);
     const jsonText = extractJson(aiText);
    parsed = JSON.parse(jsonText);
    validateOptimalSolutionSchema(parsed);
  } catch (err) {
    console.error("AI solution generation failed:", err);
    return res.status(500).json({ message: "AI output invalid" });
  }

  res.json(parsed);
};
