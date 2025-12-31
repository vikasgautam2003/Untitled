// export function buildJavaRunner(problem, userCode) {
//   const fn = problem.signature.functionName;

//   const calls = problem.structuredTestCases
//     .map(tc => {
//       const args = tc.args
//         .map(a =>
//           Array.isArray(a)
//             ? `new int[]{${a.join(",")}}`
//             : a
//         )
//         .join(",");

//       return `System.out.println(new Solution().${fn}(${args}));`;
//     })
//     .join("\n");

//   return `
// import java.util.*;

// public class Main {

// ${userCode}

// public static void main(String[] args) {
// ${calls}
// }
// }
// `;
// }













export function buildJavaRunner(problem, userCode) {
  const fn = problem.signature.functionName;

  const calls = problem.structuredTestCases
    .map(tc => {
      const args = tc.args
        .map(a =>
          Array.isArray(a)
            ? `new int[]{${a.join(",")}}`
            : a
        )
        .join(",");

      return `
        Object result = new Solution().${fn}(${args});
        if (result instanceof int[]) {
          System.out.println(Arrays.toString((int[]) result));
        } else {
          System.out.println(result);
        }
      `;
    })
    .join("\n");

  return `
import java.util.*;

${userCode}

public class Main {
  public static void main(String[] args) {
    ${calls}
  }
}
`;
}
