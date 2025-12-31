import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ reply: "" });
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a short, witty, friendly developer assistant. React casually. One sentence only. No advice."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 40,
    temperature: 0.9
  });

  const reply =
    completion.choices?.[0]?.message?.content?.trim() ??
    "Alright, let’s see what this turns into.";

  return NextResponse.json({ reply });
}
