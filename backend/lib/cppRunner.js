export function buildCppRunner(problem, userCode) {
  const fn = problem.signature.functionName;

  return `
#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
    auto tests = ${JSON.stringify(problem.structuredTestCases)};
    for (auto &t : tests) {
        try {
            auto res = ${fn}(${problem.signature.params
              .map((_, i) => `t["args"][${i}]`)
              .join(",")});
            cout << res << endl;
        } catch (...) {
            cout << "RUNTIME_ERROR" << endl;
        }
    }
}
`;
}
