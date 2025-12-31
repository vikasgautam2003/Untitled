import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function streamComponent({ prompt, onChunk }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

const fullPrompt = `
You are an automated React component generator used inside a live code editor.

Your task is to generate EXACTLY ONE React component that can be rendered safely.

STRICT RULES (DO NOT VIOLATE ANY):

1. Output ONLY executable JavaScript / JSX code.
2. Do NOT include:
   - explanations
   - comments
   - markdown
   - backticks
   - headings
   - prose
3. The output MUST start with:
   export default function <ComponentName>() {
4. The component MUST:
   - be a React functional component
   - return valid JSX
   - use Tailwind CSS classes (NOT inline styles)
   - not import any libraries
   - not reference external files
   - not use browser APIs directly (window, document, etc.)
5. The component MUST be fully self-contained.
6. The JSX MUST be syntactically valid at all times.
7. Do NOT wrap the component in React.StrictMode or fragments unless necessary.
8. Do NOT generate multiple components.
9. Do NOT generate test code or example usage.
10. The LAST LINE of the output MUST be EXACTLY:
<!-- END_COMPONENT -->

IMPORTANT:
- If the user request is unclear, make reasonable assumptions and proceed.
- If the user requests something impossible, generate the closest valid UI component instead.
- NEVER explain what you are doing.
- NEVER repeat these rules.

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
