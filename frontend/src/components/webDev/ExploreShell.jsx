






// "use client";

// import { useState } from "react";
// import QuestionInput from "./QuestionInput";
// import ExplanationPanel from "./ExplanationPanel";

// export default function ExploreShell() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const ask = async (question) => {
//     setLoading(true);
//     setError(null);
//     setData(null);

//     try {
//       const res = await fetch("/api/explain", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question })
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.message);
//       setData(json);
//     } catch (e) {
//       setError(e.message || "Failed to fetch explanation");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full min-h-0 bg-black text-gray-200">
//       {/* LEFT — QUESTION INPUT */}
//       <aside className="w-1/3 border-r border-gray-800 p-4">
//         <QuestionInput onAsk={ask} loading={loading} />
//       </aside>

//       {/* RIGHT — EXPLANATION / DISAMBIGUATION */}
//       <section className="w-2/3 p-6 overflow-y-auto">
//         {loading && <p>Explaining…</p>}

//         {error && <p className="text-red-400">{error}</p>}

//         {/* 🔀 DISAMBIGUATION CHIPS */}
//         {data?.needsDisambiguation && (
//           <div className="space-y-3">
//             <p className="text-gray-300">
//               Your question can mean different things. Choose one:
//             </p>

//             {data.options.map((opt, i) => (
//               <button
//                 key={i}
//                 onClick={() => ask(opt.clarifiedQuestion)}
//                 className="block w-full text-left px-3 py-2 bg-[#111] border border-gray-700 rounded hover:bg-[#1a1a1a]"
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* ✅ NORMAL EXPLANATION (E-1 + E-2A) */}
//         {data && !data.needsDisambiguation && (
//           <ExplanationPanel data={data} />
//         )}

//         {!loading && !data && !error && (
//           <p className="text-gray-500">
//             Ask any web development question to get started.
//           </p>
//         )}
//       </section>
//     </div>
//   );
// }
























"use client";

import { useState } from "react";
import { Search, Sparkles, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
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
    <div className="flex h-screen w-screen bg-black text-gray-300 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      <aside className="w-[400px] flex-shrink-0 border-r border-gray-800 bg-[#0a0a0a] flex flex-col z-20 shadow-xl h-full">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-2 text-white">
            <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
              <BookOpen size={20} />
            </div>
            <h2 className="font-bold text-lg tracking-tight">Concept Explorer</h2>
          </div>
         
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Your Question
            </label>
            <QuestionInput onAsk={ask} loading={loading} />
          </div>
        </div>
      </aside>

      <section className="flex-1 flex flex-col bg-black relative overflow-hidden h-full">
        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={16} className="text-purple-500 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-400 animate-pulse">Analyzing Concept...</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto w-full">
            
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
                <AlertCircle className="mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <h3 className="font-semibold text-sm">Unable to generate explanation</h3>
                  <p className="text-sm opacity-90 mt-1">{error}</p>
                </div>
              </div>
            )}

            {data?.needsDisambiguation && (
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">⚠️</span> Ambiguous Query
                  </h3>
                  <p className="text-gray-400 text-lg">
                    This topic has multiple contexts. Which one are you interested in?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {data.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => ask(opt.clarifiedQuestion)}
                      className="group flex items-center justify-between w-full p-5 text-left bg-[#111] border border-gray-800 rounded-xl hover:bg-[#1a1a1a] hover:border-purple-500/50 transition-all"
                    >
                      <span className="text-base font-medium text-gray-200 group-hover:text-white">
                        {opt.label}
                      </span>
                      <ArrowRight size={18} className="text-gray-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {data && !data.needsDisambiguation && (
              <ExplanationPanel data={data} />
            )}

            {!loading && !data && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40 select-none">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <Search className="text-gray-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">Ready to Explain</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Ask about DOM manipulation, React hooks, CSS layouts, or any complex web engineering topic.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
