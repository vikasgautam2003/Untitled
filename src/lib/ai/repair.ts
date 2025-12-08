// import { HumanMessage } from "@langchain/core/messages";
// import { groqModel } from '@/lib/ai/groq';

// export async function fixJsonWithGroq(brokenJson: string) {
//   const prompt = `
//     You are an expert JSON repair agent. 
//     The following JSON string is broken.
//     YOUR JOB:
//     1. Fix the syntax errors.
//     2. Remove any markdown or conversational text.
//     3. Return ONLY the valid, parsable JSON string.
    
//     BROKEN JSON:
//     ${brokenJson}
//   `;

//   const response = await groqModel.invoke([new HumanMessage(prompt)]);
//   let fixed = response.content as string;
  
//   if (fixed.includes('```json')) {
//     fixed = fixed.replace(/```json/g, '').replace(/```/g, '');
//   } else if (fixed.includes('```')) {
//     fixed = fixed.replace(/```/g, '');
//   }
  
//   return fixed;
// }




import { HumanMessage } from "@langchain/core/messages";
import { groqModel } from '@/lib/ai/groq';

export async function fixJsonWithGroq(brokenJson: string) {
  const prompt = `
    You are an expert JSON repair agent. 
    The following JSON string is broken.
    YOUR JOB:
    1. Fix the syntax errors.
    2. Remove any markdown or conversational text.
    3. Return ONLY the valid, parsable JSON string.
    
    BROKEN JSON:
    ${brokenJson}
  `;

  const response = await groqModel.invoke([new HumanMessage(prompt)]);
  let fixed = response.content as string;
  
  if (fixed.includes('```json')) {
    fixed = fixed.replace(/```json/g, '').replace(/```/g, '');
  } else if (fixed.includes('```')) {
    fixed = fixed.replace(/```/g, '');
  }
  
  return fixed;
}