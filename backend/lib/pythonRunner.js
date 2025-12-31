export function buildPythonRunner(problem, userCode) {
  const { signature, structuredTestCases } = problem;
  const fn = signature.functionName;

  return `
from typing import *

${userCode}

tests = ${JSON.stringify(structuredTestCases)}

def __run__():
    for t in tests:
        try:
            result = ${fn}(*t["args"])
            print(result)
        except Exception as e:
            print("RUNTIME_ERROR")

__run__()
`;
}
