import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  temperature: 0.3
});
