"use client";

import { useState } from "react";
import QuestionInput from "./QuestionInput";
import ExplanationPanel from "./ExplanationPanel";

export default function ExploreShell() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const ask = async (question) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setData(json);
    } catch (e) {
      setError(e.message || "Failed to fetch explanation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 bg-black text-gray-200">
      <aside className="w-1/3 border-r border-gray-800 p-4">
        <QuestionInput onAsk={ask} loading={loading} />
      </aside>

      <section className="w-2/3 p-6 overflow-y-auto">
        {loading && <p>Explaining…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {data && <ExplanationPanel data={data} />}
        {!loading && !data && !error && (
          <p className="text-gray-500">
            Ask any web development question to get started.
          </p>
        )}
      </section>
    </div>
  );
}
