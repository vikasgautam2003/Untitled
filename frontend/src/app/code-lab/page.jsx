// "use client";

// import CodeReviewPanel from "../../components/codeReview/CodeReviewPanel";

// export default function CodeLabPage() {
//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-2">
//         Code Review Lab
//       </h1>

//       <p className="text-gray-600 mb-6">
//         Paste your code and get a structured explanation,
//         just like an interview code review.
//       </p>

//       <CodeReviewPanel />
//     </main>
//   );
// }







"use client";

import Link from "next/link";
import CodeReviewPanel from "../../components/codeReview/CodeReviewPanel";

export default function CodeLabPage() {
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
          <Link href="/dsa" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all group">
            <div className="p-1 rounded-md bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            Data Structures
          </Link>
          <Link href="/code-lab" className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-white bg-blue-600 shadow-md shadow-blue-900/20 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-100"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-1 rounded-md bg-white/20 text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              Code Lab
            </div>
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
        <div className="max-w-7xl mx-auto px-10 py-12">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-indigo-600"></span>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Analysis Engine</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Code Review Laboratory
              </h1>
              <p className="mt-3 text-lg text-slate-500 max-w-2xl">
                Paste your code snippets below to receive structured feedback, optimization tips, and interview-style analysis.
              </p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center min-w-[120px]">
                 <div className="text-2xl font-bold text-slate-900">AI</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Reviewer</div>
               </div>
            </div>
          </header>

          <div className="w-full h-px bg-slate-200 mb-10"></div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 bg-white/50 backdrop-blur-sm rounded-[20px] p-6 md:p-8">
              <CodeReviewPanel />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}