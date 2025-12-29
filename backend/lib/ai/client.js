import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function callLLM({ system, user, maxTokens }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
        ${system}

        USER CONTEXT:
        ${user}
        `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
