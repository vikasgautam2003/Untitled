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

  // 1️⃣ Initial state — NOTHING auto-runs
  if (!hasRequested) {
    return (
      <div className="border p-4 rounded">
        <button
          onClick={fetchSolution}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Generate Optimal Solution
        </button>
      </div>
    );
  }

  // 2️⃣ Loading state
  if (loading) {
    return <p>Generating optimal solution...</p>;
  }

  // 3️⃣ Error + retry
  if (error) {
    return (
      <div className="border p-4 rounded">
        <p className="text-red-600 mb-3">{error}</p>
        <button
          onClick={fetchSolution}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // 4️⃣ Safety (should not happen)
  if (!solution) {
    return null;
  }

  /* ---------- RENDER SOLUTION ---------- */

  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-semibold">{solution.approach.title}</h3>
        <p>{solution.approach.intuition}</p>
        <ul>
          {solution.approach.strategy.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Algorithm</h3>
        <ol>
          {solution.algorithm.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3>Correctness</h3>
        <ul>
          {solution.correctness.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Complexity</h3>
        <p>Time: {solution.complexity.time}</p>
        <p>Space: {solution.complexity.space}</p>
      </section>

      <section>
        <h3>Edge Cases</h3>
        <ul>
          {solution.edgeCases.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Reference Code</h3>
        <pre className="bg-gray-100 p-3 rounded">
          {solution.referenceImplementation.python}
        </pre>
      </section>
    </div>
  );
}
