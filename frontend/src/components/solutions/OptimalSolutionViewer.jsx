// "use client";

// import { useState } from "react";
// import api from "../../lib/api-client";

// export default function OptimalSolutionViewer({ problemId }) {
//   const [solution, setSolution] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasRequested, setHasRequested] = useState(false);

//   const fetchSolution = async () => {
//     setHasRequested(true);
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await api.post(`/api/solutions/${problemId}/generate`);
//       setSolution(res.data);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//         "Failed to generate solution. Please retry."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- UI STATES ---------- */

//   // 1️⃣ Initial state — NOTHING auto-runs
//   if (!hasRequested) {
//     return (
//       <div className="border p-4 rounded">
//         <button
//           onClick={fetchSolution}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Generate Optimal Solution
//         </button>
//       </div>
//     );
//   }

//   // 2️⃣ Loading state
//   if (loading) {
//     return <p>Generating optimal solution...</p>;
//   }

//   // 3️⃣ Error + retry
//   if (error) {
//     return (
//       <div className="border p-4 rounded">
//         <p className="text-red-600 mb-3">{error}</p>
//         <button
//           onClick={fetchSolution}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // 4️⃣ Safety (should not happen)
//   if (!solution) {
//     return null;
//   }

//   /* ---------- RENDER SOLUTION ---------- */

//   return (
//     <div className="space-y-6">
//       <section>
//         <h3 className="font-semibold">{solution.approach.title}</h3>
//         <p>{solution.approach.intuition}</p>
//         <ul>
//           {solution.approach.strategy.map((s, i) => (
//             <li key={i}>{s}</li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>Algorithm</h3>
//         <ol>
//           {solution.algorithm.map((step, i) => (
//             <li key={i}>{step}</li>
//           ))}
//         </ol>
//       </section>

//       <section>
//         <h3>Correctness</h3>
//         <ul>
//           {solution.correctness.map((c, i) => (
//             <li key={i}>{c}</li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>Complexity</h3>
//         <p>Time: {solution.complexity.time}</p>
//         <p>Space: {solution.complexity.space}</p>
//       </section>

//       <section>
//         <h3>Edge Cases</h3>
//         <ul>
//           {solution.edgeCases.map((e, i) => (
//             <li key={i}>{e}</li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>Reference Code</h3>
//         <pre className="bg-gray-100 p-3 rounded">
//           {solution.referenceImplementation.python}
//         </pre>
//       </section>
//     </div>
//   );
// }














"use client";

import { useState } from "react";
import api from "../../lib/api-client";

export default function OptimalSolutionViewer({ problemId }) {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);

  const fetchSolution = async () => {
    setHasRequested(true);
    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`/api/solutions/${problemId}/generate`);
      setSolution(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to generate solution. Please retry."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI STATES ---------- */

  if (!hasRequested) {
    return (
      <div className="bg-[#edf4ff] border border-black/10 rounded-2xl px-8 py-7">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[#0f172a]">
            Generate Optimal Solution
          </h3>

          <p className="text-sm text-[#64748b] leading-relaxed">
            This will generate a complete editorial-style explanation, including
            the algorithm, correctness proof, complexity analysis, and a clean
            reference implementation.
          </p>

          <div className="pt-1">
            <button
              onClick={fetchSolution}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition"
            >
              Generate Solution
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border border-black/10 rounded-2xl px-8 py-7">
        <div className="text-sm text-[#2563eb] font-medium">
          Generating optimal solution…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-black/10 rounded-2xl px-8 py-7">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#dc2626]">{error}</p>
          <div>
            <button
              onClick={fetchSolution}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!solution) return null;

  /* ---------- RENDER SOLUTION ---------- */

  return (
    <div className="bg-white border border-black/10 rounded-2xl px-10 py-10 space-y-12 text-[#0f172a]">

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          {solution.approach.title}
        </h3>

        <p className="text-sm leading-7 text-[#475569]">
          {solution.approach.intuition}
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[#475569]">
          {solution.approach.strategy.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Algorithm
        </h3>

        <ol className="list-decimal pl-5 space-y-2 text-sm text-[#475569]">
          {solution.algorithm.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Correctness Proof
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[#475569]">
          {solution.correctness.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Complexity Analysis
        </h3>

        <div className="text-sm text-[#475569] space-y-1">
          <p>
            <span className="font-medium text-[#0f172a]">Time:</span>{" "}
            {solution.complexity.time}
          </p>
          <p>
            <span className="font-medium text-[#0f172a]">Space:</span>{" "}
            {solution.complexity.space}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Edge Cases
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[#475569]">
          {solution.edgeCases.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Reference Implementation
        </h3>

        <pre className="bg-[#f1f5f9] border border-black/10 rounded-xl p-5 text-sm overflow-x-auto">
          {solution.referenceImplementation.python}
        </pre>
      </section>

    </div>
  );
}
