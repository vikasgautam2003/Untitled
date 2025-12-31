export function buildOptimalSolutionPrompt(problem) {
  return `
Return ONLY valid JSON. No markdown.

Schema:
{
  "approach": {
    "title": string,
    "intuition": string,
    "strategy": string[]
  },
  "algorithm": string[],
  "complexity": { "time": string, "space": string },
  "correctness": string[],
  "edgeCases": string[],
  "referenceImplementation": {
    "python": string,
    "java": string,
    "cpp": string
  }
}

Rules:
- Optimal solution only
- No brute force
- No alternative approaches

Problem:
Title: ${problem.title}
Description: ${problem.description}
Constraints: ${problem.constraints}
`;
}
