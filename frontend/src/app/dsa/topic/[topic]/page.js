



// "use client";

// import { useEffect, useState, use } from "react";
// import api from "../../../../lib/api-client";
// import Link from "next/link";

// export default function TopicProblems({ params }) {
//   const { topic } = use(params);
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     api.get(`/api/problems/topic/${topic}`)
//       .then(res => setProblems(res.data));
//   }, [topic]);

//   return (
//     <main style={{ padding: "2rem" }}>
//       <h2>{topic.replaceAll("_", " ")} Problems</h2>

//       <ul>
//         {problems.map(p => (
//           <li key={p._id}>
//             <Link href={`/dsa/${p.slug}`}>
//               {p.title}
//             </Link>{" "}
//             — {p.difficulty}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }















"use client";

import { useEffect, useState, use } from "react";
import api from "../../../../lib/api-client";
import Link from "next/link";

export default function TopicProblems({ params }) {
  const { topic } = use(params);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/problems/topic/${topic}`)
      .then(res => {
        setProblems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topic]);

  const getDifficultyBadge = (diff) => {
    const style = {
      EASY: "bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-500/10",
      MEDIUM: "bg-amber-50 text-amber-600 border-amber-200 ring-amber-500/10",
      HARD: "bg-rose-50 text-rose-600 border-rose-200 ring-rose-500/10",
    };
    return style[diff?.toUpperCase()] || "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-100">
      
      <aside className="w-72 bg-[#1e293b] text-white flex flex-col fixed inset-y-0 z-20 shadow-xl shadow-slate-900/5">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">DevCampus</span>
              <span className="text-[11px] text-blue-200/60 font-medium uppercase tracking-widest mt-0.5">Student Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link href="/web-dev" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all group">
            <div className="p-1 rounded-md bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            Web Engineering
          </Link>
          <Link href="/dsa" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-white bg-blue-600 shadow-md shadow-blue-900/20 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-100"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-1 rounded-md bg-white/20 text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              Data Structures
            </div>
          </Link>
          <Link href="/code-lab" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all group">
            <div className="p-1 rounded-md bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            Code Lab
          </Link>
        </nav>

        <div className="p-4 bg-[#162032]">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign out
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        <div className="max-w-6xl mx-auto px-10 py-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/dsa" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Module</Link>
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md capitalize">{topic.replaceAll("_", " ")}</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight capitalize mb-2">
                {topic.replaceAll("_", " ")}
              </h1>
              <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
                Complete the problem set below to master the core concepts. Ensure you review the time complexity constraints for each solution.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-700">Assignment List</h2>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                {problems.length} Problems Available
              </span>
            </div>

            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <span className="text-sm font-medium">Loading syllabus...</span>
              </div>
            ) : problems.length === 0 ? (
              <div className="p-20 text-center text-slate-500">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-lg font-semibold text-slate-700">No Assignments Yet</p>
                <p className="text-sm">Check back later for updates to this module.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {problems.map((p, index) => (
                  <div key={p._id} className="group flex items-center gap-6 px-8 py-5 hover:bg-slate-50 transition-all duration-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-500 font-mono text-xs font-semibold flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link href={`/dsa/${p.slug}`} className="block focus:outline-none">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                            {p.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            15 mins
                          </span>
                          <span>•</span>
                          <span>100 Points</span>
                        </div>
                      </Link>
                    </div>

                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getDifficultyBadge(p.difficulty)}`}>
                        {p.difficulty}
                      </span>
                    </div>

                    <div className="flex-shrink-0 pl-4">
                      <Link 
                        href={`/dsa/${p.slug}`}
                        className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}