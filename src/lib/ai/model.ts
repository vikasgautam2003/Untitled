import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ FATAL ERROR: Missing NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
} else {
  console.log("✅ API Key Loaded successfully (Length: " + apiKey.length + ")");
}


export const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: apiKey,
  maxOutputTokens: 8192,
  temperature: 0.1,
});
