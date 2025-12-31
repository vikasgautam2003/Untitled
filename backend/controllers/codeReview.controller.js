import { callLLM } from "../lib/ai/client.js";
import { extractJson } from "../utils/extractions.js";
import { buildCodeReviewPrompt } from "../lib/prompts/codeReview.prompt.js";
import { validateCodeReviewSchema } from "../lib/validators/codeReview.schema.js";


export const explainCode = async(req, res) => {
    const { language, code } = req.body;

    if (!language || !code || code.length < 10) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try{

        const prompt = buildCodeReviewPrompt({ language, code });

        const aiText = await callLLM({
            system: "You are a senior software engineer.",
            user: prompt,
            maxTokens: 2500
        });

        const jsonText = extractJson(aiText);
        const parsed = JSON.parse(jsonText);

        validateCodeReviewSchema(parsed);

        res.json(parsed);

    } catch (err) {
        console.error("❌ Code review failed:", err);
        res.status(500).json({ message: "AI review failed" });
    }
}