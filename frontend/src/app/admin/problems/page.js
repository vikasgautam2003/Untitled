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
import { 
  Search, 
  Trash2, 
  LayoutGrid, 
  Layers, 
  AlertTriangle,
  FileText,
  Activity
} from "lucide-react";

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
      case 'DP': return 'bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-100';
      case 'GRAPH': return 'bg-pink-50 text-pink-700 border-pink-200 ring-1 ring-pink-100';
      case 'ARRAYS': return 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-200 ring-1 ring-slate-100';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold tracking-wider text-xs uppercase">
                <LayoutGrid size={16} />
                Admin Console
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Problem Matrix</h2>
          </div>
          
          {/* Live Stats Row */}
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-extrabold text-slate-900">{stats.total}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
            </div>
            <div className="px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-extrabold text-slate-900">{stats.topics}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Topics</span>
            </div>
            <div className="hidden sm:flex px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl flex-col items-center min-w-[100px]">
              <span className="text-2xl font-extrabold text-rose-500">{stats.hardCount}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hard</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
            placeholder="Search by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {loading ? (
            // Skeleton Loading
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-white rounded-3xl border border-gray-200 shadow-sm animate-pulse" />
            ))
          ) : filteredProblems.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                 <Search size={24} />
              </div>
              <p className="text-slate-500 font-medium">No problems found matching your criteria.</p>
            </div>
          ) : (
            filteredProblems.map((p) => (
              <div 
                key={p._id} 
                className="group relative bg-white hover:bg-white border border-gray-200 hover:border-indigo-200 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getTopicColor(p.topic)}`}>
                    {p.topic}
                  </span>
                  
                  {/* Difficulty Dot */}
                  {p.difficulty && (
                     <div 
                       className={`w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                         p.difficulty === 'HARD' ? 'bg-rose-500 shadow-sm shadow-rose-200' :
                         p.difficulty === 'MEDIUM' ? 'bg-amber-500 shadow-sm shadow-amber-200' :
                         'bg-emerald-500 shadow-sm shadow-emerald-200'
                       }`} 
                       title={p.difficulty}
                     />
                  )}
                </div>

                <div className="space-y-1 mb-6">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <FileText size={12} />
                        <span className="truncate max-w-[200px]">/problems/{p.slug || p._id}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Activity size={14} />
                    <span>Active</span>
                  </div>
                  
                  <button 
                    onClick={() => initiateDelete(p)}
                    className="p-2 -mr-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                    title="Delete Problem"
                  >
                    <Trash2 size={18} />
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
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={cancelDelete} />
          
          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6 ring-4 ring-rose-50">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Problem?</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="text-slate-900 font-bold">"{targetProblem.title}"</span>? This action is irreversible.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 rounded-xl bg-white border border-gray-200 text-slate-700 text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 transform active:scale-95"
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