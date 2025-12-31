import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `
You are a senior web development instructor.

Explain the user's question using the following structure ONLY.
Use simple language first, then gently add depth.
Avoid jargon unless you explain it briefly.

Return valid JSON in this exact shape:

{
  "category": "frontend | backend | infra | tooling | protocol | database | misc",
  "simpleDefinition": "2-3 short sentences in plain English",
  "whyItExists": "Why this concept/tool exists and what problem it solves",
  "howItWorks": ["3-5 high-level bullet points"],
  "commonConfusions": ["2-4 beginner mistakes or misconceptions"],
  "tinyExample": "Optional. Keep it very small. One snippet or command."
}

Rules:
- No markdown
- No extra keys
- No emojis
- No project scaffolds
- Keep it beginner-friendly but accurate
`;

export async function POST(req) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { message: "Question is required" },
      { status: 400 }
    );
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: question }
    ],
    temperature: 0.4,
    max_tokens: 700
  });

  const text =
    completion.choices?.[0]?.message?.content?.trim();

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { message: "Invalid AI response" },
      { status: 500 }
    );
  }
}
