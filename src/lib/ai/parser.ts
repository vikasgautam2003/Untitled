import { jsonrepair } from 'jsonrepair';
import { fixJsonWithGroq } from '@/lib/ai/repair';

export const robustParse = async (
  rawContent: string,
  stepName: string,
  addLog: (msg: string) => void
): Promise<any> => {
  let cleanJson = rawContent;

  if (rawContent.includes('```json')) {
    cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '');
  } else if (rawContent.includes('```')) {
    cleanJson = rawContent.replace(/```/g, '');
  }

  const firstBrace = cleanJson.indexOf('{');
  const lastBrace = cleanJson.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleanJson);
  } catch (_) {
    addLog(`${stepName}: Syntax Error. Attempting Repair...`);
    try {
      const repaired = jsonrepair(cleanJson);
      return JSON.parse(repaired);
    } catch (_) {
      addLog(`${stepName}: Heuristic Failed. Calling Groq Surgeon...`);
      try {
        const fixed = await fixJsonWithGroq(cleanJson);
        return JSON.parse(fixed);
      } catch (_) {
        throw new Error(`${stepName} JSON is invalid.`);
      }
    }
  }
};
