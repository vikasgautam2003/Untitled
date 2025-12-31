import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function streamComponent({ prompt, onChunk }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const fullPrompt = `
Generate a SINGLE React component.

Rules:
- Output ONLY valid JSX
- No markdown
- No explanations
- No backticks

User request:
${prompt}
`;

  console.log("🟢 Starting Gemini stream");

  const result = await model.generateContentStream(fullPrompt);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    console.log("🟡 CHUNK:", JSON.stringify(text));

    if (text && text.length > 0) {
      onChunk(text);
    }
  }

  console.log("🟢 Gemini stream completed");
}
