// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../lib/api-client";

// export default function AdminProblems() {
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     api.get("/api/problems").then(res => setProblems(res.data));
//   }, []);

//   const del = async (id) => {
//     await api.delete(`/problems/${id}`);
//     setProblems(p => p.filter(x => x._id !== id));
//   };

//   return (
//     <main style={{ padding: 20 }}>
//       <h2>All Problems</h2>

//       {problems.map(p => (
//         <div key={p._id}>
//           {p.title} ({p.topic})
//           <button onClick={() => del(p._id)}>Delete</button>
//         </div>
//       ))}
//     </main>
//   );
// }















"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import api from "../../../lib/api-client";

export default function AdminProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  
  // Deletion State
  const [targetProblem, setTargetProblem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    api.get("/api/problems")
      .then(res => {
        setProblems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 2. Delete Logic
  const initiateDelete = (problem) => {
    setTargetProblem(problem);
  };

  const cancelDelete = () => {
    setTargetProblem(null);
  };

  const confirmDelete = async () => {
    if (!targetProblem) return;
    setIsDeleting(true);
    try {
      await api.delete(`/api/problems/${targetProblem._id}`);
      setProblems(p => p.filter(x => x._id !== targetProblem._id));
      setTargetProblem(null);
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      setIsDeleting(false);
    }
  };

  // 3. Computed Stats & Filtered Data
  const stats = useMemo(() => {
    const total = problems.length;
    const topics = new Set(problems.map(p => p.topic)).size;
    // Assuming 'difficulty' might exist based on CreateProblem form, fallback if not
    const hardCount = problems.filter(p => p.difficulty === 'HARD').length; 
    return { total, topics, hardCount };
  }, [problems]);

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for badges
  const getTopicColor = (topic) => {
    switch (topic) {
      case 'DP': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'GRAPH': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'ARRAYS': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-900/05 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-2">Admin Console</h1>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Problem Matrix</h2>
          </div>
          
          {/* Live Stats Row */}
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-[#0A0A0A] border border-white/5 rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-bold text-white">{stats.total}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</span>
            </div>
            <div className="px-6 py-3 bg-[#0A0A0A] border border-white/5 rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-bold text-white">{stats.topics}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Topics</span>
            </div>
            <div className="hidden sm:flex px-6 py-3 bg-[#0A0A0A] border border-white/5 rounded-2xl flex-col items-center min-w-[100px]">
              <span className="text-2xl font-bold text-rose-400">{stats.hardCount}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hard</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Search by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {loading ? (
            // Skeleton Loading
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-[#0A0A0A] rounded-3xl border border-white/5 animate-pulse" />
            ))
          ) : filteredProblems.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-500">No problems found matching your criteria.</p>
            </div>
          ) : (
            filteredProblems.map((p) => (
              <div 
                key={p._id} 
                className="group relative bg-[#0A0A0A] hover:bg-[#0F0F0F] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getTopicColor(p.topic)}`}>
                    {p.topic}
                  </span>
                  
                  {/* Difficulty Dot (if exists) */}
                  {p.difficulty && (
                     <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${
                       p.difficulty === 'HARD' ? 'bg-rose-500 text-rose-500' :
                       p.difficulty === 'MEDIUM' ? 'bg-amber-500 text-amber-500' :
                       'bg-emerald-500 text-emerald-500'
                     }`} />
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-200 transition-colors">
                  {p.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
                  <span className="truncate max-w-[200px]">/problems/{p.slug || p._id}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    Edited recently
                  </span>
                  
                  <button 
                    onClick={() => initiateDelete(p)}
                    className="p-2 -mr-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                    title="Delete Problem"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Portal */}
      {targetProblem && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={cancelDelete} />
          
          <div className="relative w-full max-w-sm bg-[#0A0A0A] rounded-2xl border border-rose-500/20 shadow-[0_0_50px_rgba(225,29,72,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600" />
            
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 ring-1 ring-rose-500/20">
                <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Delete Problem?</h3>
              <p className="text-sm text-slate-400 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">"{targetProblem.title}"</span>? This cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 text-slate-300 text-sm font-bold hover:bg-white/10 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-500 shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isDeleting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}







