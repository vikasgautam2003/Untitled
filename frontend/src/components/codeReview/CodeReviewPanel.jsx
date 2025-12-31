"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../../lib/api-client";
import CodeReviewViewer from "./CodeReviewViewer";

const LANGUAGE_OPTIONS = [
  { label: "Python", value: "python", monaco: "python" },
  { label: "Java", value: "java", monaco: "java" },
  { label: "C++", value: "cpp", monaco: "cpp" }
];

export default function CodeReviewPanel() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runReview = async () => {
    if (!code.trim()) {
      setError("Please paste some code first.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.post("/api/code-review/explain", {
        language,
        code
      });
      setData(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to explain code. Please retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-5 mt-6">
      <h2 className="text-xl font-semibold mb-1">
        Code Review Lab
      </h2>
      <p className="text-gray-600 mb-4">
        Paste your code and receive a structured explanation,
        just like an interview code review.
      </p>

      {/* Language Selector */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Language
        </label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        >
          {LANGUAGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monaco Editor */}
      <div className="border rounded overflow-hidden">
        <Editor
          height="320px"
          language={
            LANGUAGE_OPTIONS.find(l => l.value === language)?.monaco
          }
          value={code}
          onChange={value => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>

      {/* Action */}
      <div className="mt-4">
        <button
          onClick={runReview}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          Explain My Code
        </button>
      </div>

      {/* States */}
      {loading && (
        <p className="mt-3 text-gray-600">
          Analyzing code…
        </p>
      )}

      {error && (
        <p className="mt-3 text-red-600">
          {error}
        </p>
      )}

      {data && <CodeReviewViewer  data={{
    ...data,
    __originalCode: code
  }}
 />}
    </div>
  );
}
