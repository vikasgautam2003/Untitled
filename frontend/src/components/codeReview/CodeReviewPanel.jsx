// "use client";

// import { useState } from "react";
// import Editor from "@monaco-editor/react";
// import api from "../../lib/api-client";
// import CodeReviewViewer from "./CodeReviewViewer";

// const LANGUAGE_OPTIONS = [
//   { label: "Python", value: "python", monaco: "python" },
//   { label: "Java", value: "java", monaco: "java" },
//   { label: "C++", value: "cpp", monaco: "cpp" }
// ];

// export default function CodeReviewPanel() {
//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState("");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const runReview = async () => {
//     if (!code.trim()) {
//       setError("Please paste some code first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setData(null);

//     try {
//       const res = await api.post("/api/code-review/explain", {
//         language,
//         code
//       });
//       setData(res.data);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//         "Failed to explain code. Please retry."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border rounded p-5 mt-6">
//       <h2 className="text-xl font-semibold mb-1">
//         Code Review Lab
//       </h2>
//       <p className="text-gray-600 mb-4">
//         Paste your code and receive a structured explanation,
//         just like an interview code review.
//       </p>

//       {/* Language Selector */}
//       <div className="mb-3">
//         <label className="block text-sm font-medium mb-1">
//           Language
//         </label>
//         <select
//           value={language}
//           onChange={e => setLanguage(e.target.value)}
//           className="border px-3 py-2 rounded w-40"
//         >
//           {LANGUAGE_OPTIONS.map(opt => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Monaco Editor */}
//       <div className="border rounded overflow-hidden">
//         <Editor
//           height="320px"
//           language={
//             LANGUAGE_OPTIONS.find(l => l.value === language)?.monaco
//           }
//           value={code}
//           onChange={value => setCode(value || "")}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//             automaticLayout: true,
//             scrollBeyondLastLine: false
//           }}
//         />
//       </div>

//       {/* Action */}
//       <div className="mt-4">
//         <button
//           onClick={runReview}
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
//         >
//           Explain My Code
//         </button>
//       </div>

//       {/* States */}
//       {loading && (
//         <p className="mt-3 text-gray-600">
//           Analyzing code…
//         </p>
//       )}

//       {error && (
//         <p className="mt-3 text-red-600">
//           {error}
//         </p>
//       )}

//       {data && <CodeReviewViewer  data={{
//     ...data,
//     __originalCode: code
//   }}
//  />}
//     </div>
//   );
// }


















"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../../lib/api-client";
import CodeReviewViewer from "./CodeReviewViewer";

const LANGUAGE_OPTIONS = [
  { label: "Python", value: "python", monaco: "python" },
  { label: "Java", value: "java", monaco: "java" },
  { label: "C++", value: "cpp", monaco: "cpp" },
  { label: "JavaScript", value: "javascript", monaco: "javascript" }
];

export default function CodeReviewPanel() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runReview = async () => {
    if (!code.trim()) {
      setError("Please input source code to begin analysis.");
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
        "Analysis engine encountered an error. Please verify input and retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400/70"></div>
            </div>

            <div className="h-6 w-px bg-slate-300"></div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
            >
              {LANGUAGE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={runReview}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              loading
                ? "bg-slate-200 text-slate-500 cursor-wait"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md active:scale-[0.98]"
            }`}
          >
            {loading ? "Analyzing…" : "Run Analysis"}
          </button>
        </div>

        <div className="relative border-t border-slate-200 min-h-[420px]">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-slate-600">
                <svg className="w-6 h-6 animate-spin text-indigo-600" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
                <span className="text-sm font-medium">
                  Running static and semantic analysis
                </span>
              </div>
            </div>
          )}

          <Editor
            height="420px"
            language={LANGUAGE_OPTIONS.find(l => l.value === language)?.monaco}
            value={code}
            onChange={value => setCode(value || "")}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 24,
              fontFamily: "JetBrains Mono, Fira Code, monospace",
              padding: { top: 20, bottom: 20 },
              scrollBeyondLastLine: false,
              renderLineHighlight: "none",
              smoothScrolling: true
            }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="text-sm font-semibold text-red-800">
              Analysis Failed
            </div>
            <div className="text-sm text-red-700 mt-1">
              {error}
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
          <CodeReviewViewer data={{ ...data, __originalCode: code }} />
        </div>
      )}
    </div>
  );
}
