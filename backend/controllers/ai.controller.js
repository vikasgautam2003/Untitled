import Problem from "../models/problem.model.js"
import { HINT_SYSTEM_PROMPT } from "../lib/ai/hintPrompt.js"
import { callLLM } from "../lib/ai/client.js"; 

export const getHint = async (req, res) => {
    const { problemId, language, code } = req.body;

    if(!problemId)
    {
        return res.status(400).json({ message: "problemId required" });
    }

    const problem = await Problem.findById(problemId).select(
        "title description difficulty topic"
    );

    if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
    }


    const userPrompt = `
        Problem:
        ${problem.description}

        Difficulty: ${problem.difficulty}
        Language: ${language}

        User code (may be incomplete):
        ${code || "No code yet"}

        Give hints only.
    `;


     const hint = await callLLM({
        system: HINT_SYSTEM_PROMPT,
        user: userPrompt,
        maxTokens: 200
    });

    res.json({ hint });
}