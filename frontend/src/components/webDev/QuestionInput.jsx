"use client";

import { useState } from "react";

export default function QuestionInput({ onAsk, loading }) {
  const [q, setQ] = useState("");

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold">
        Web Dev Exploratory
      </h2>

      <textarea
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="e.g. What is Redis and why is it used?"
        className="w-full h-28 p-2 bg-[#111] border border-gray-700 rounded resize-none"
      />

      <button
        onClick={() => q.trim() && onAsk(q)}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Explain
      </button>
    </div>
  );
}
