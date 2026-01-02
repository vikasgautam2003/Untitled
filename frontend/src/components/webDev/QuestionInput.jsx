"use client";

import { useState } from "react";

export default function QuestionInput({ onAsk, loading }) {
  const [q, setQ] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-white font-semibold tracking-tight text-lg">
        Web Dev Explorer
      </h2>

      <textarea
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="e.g. How does React reconciliation work?"
        className="w-full h-32 px-4 py-3 text-sm text-gray-200 bg-[#0b0b0b] border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder:text-gray-500 transition"
      />

      <button
        onClick={() => q.trim() && onAsk(q)}
        disabled={loading}
        className="w-full py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
      >
        Explain
      </button>
    </div>
  );
}
