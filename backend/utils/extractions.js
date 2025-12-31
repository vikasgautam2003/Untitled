/**
 * Safely extracts the first valid JSON object from LLM output.
 * Handles cases where the response is wrapped in markdown
 * or has extra text before/after the JSON.
 */
export function extractJson(text) {
  if (typeof text !== "string") {
    throw new Error("LLM output is not a string");
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No valid JSON object found in LLM output");
  }

  return text.slice(firstBrace, lastBrace + 1);
}
