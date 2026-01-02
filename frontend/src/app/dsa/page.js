// "use client";

// import { useEffect, useState } from "react";
// import api from "../../lib/api-client"
// import TopicCard from "../../components/TopicCard";

// export default function DsaDashboard() 
// {
//     const [topics, setTopics] = useState([]);

//     useEffect(() => {
//         api.get("/api/problems/topics/summary")
//         .then(res => setTopics(res.data));
//     }, []);

//     return (
//         <main style={{ padding: "2rem" }}>
//             <h1>DSA Practice</h1>

//             <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
//                 {topics.map(topic => (
//                 <TopicCard key={topic.topic} data={topic} />
//                 ))}
//             </div>
//         </main>
//     )
// }







"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api-client";
import TopicCard from "../../components/TopicCard";

export default function DsaDashboard() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/api/problems/topics/summary")
      .then(res => setTopics(res.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-100">
      
      <aside className="w-72 bg-[#1e293b] text-white flex flex-col fixed inset-y-0 z-20 shadow-xl shadow-slate-900/5">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-3-3 3-3M16 7l3 3-3 3M14 3l-4 18" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">Dev Prep</span>
              <span className="text-[11px] text-blue-200/60 font-medium uppercase tracking-widest mt-0.5">
                Student Portal
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link href="/web-dev" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all">
            Web Engineering
          </Link>

          <Link href="/dsa" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-white bg-blue-600 rounded-xl shadow-md shadow-blue-900/20">
            Data Structures
          </Link>

          <Link href="/code-lab" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all">
            Code Lab
          </Link>
        </nav>

        <div className="p-4 bg-[#162032]">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Sign out
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        <div className="max-w-7xl mx-auto px-10 py-12">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-blue-600"></span>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Core Curriculum
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Data Structures <br /> & Algorithms
              </h1>
              <p className="mt-3 text-lg text-slate-500 max-w-2xl">
                Structured problem-solving modules aligned with technical interview standards.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-[220px]">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Current Focus
                </div>
                <div className="mt-2 text-sm font-medium text-slate-800">
                  Strengthening fundamentals through guided practice
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-[220px]">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Learning Discipline
                </div>
                <div className="mt-2 text-sm font-medium text-slate-800">
                  Consistent engagement improves long-term retention
                </div>
              </div>
            </div>
          </header>

          <div className="w-full h-px bg-slate-200 mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map(topic => (
              <div key={topic.topic} className="h-full bg-white border border-slate-200 rounded-2xl p-1 transition-all duration-200 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1">
                <TopicCard data={topic} />
              </div>
            ))}

            {topics.length === 0 &&
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 animate-pulse">
                  <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
                  <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                  <div className="flex-1"></div>
                  <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                </div>
              ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-lg shadow-blue-900/20 text-white">
            <h3 className="text-2xl font-bold mb-2">
              Daily Technical Exercise
            </h3>
            <p className="text-blue-100 max-w-lg">
              Reinforce algorithmic thinking with a carefully selected problem designed to build depth, not speed.
            </p>
            <button className="mt-6 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Begin Practice
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
