// "use client";

// import { useEffect, useState } from "react";
// import api from "../../lib/api-client";

// export default function UserDashboard() {
  
//   const [progress, setProgress] = useState(null);
//   const [progressLoading, setProgressLoading] = useState(true);

  
//   const [requestLoading, setRequestLoading] = useState(false);
//   const [requestStatus, setRequestStatus] = useState(null); // success | error

 
//   useEffect(() => {
//     api
//       .get("/api/user/progress/summary")
//       .then(res => setProgress(res.data))
//       .catch(() => setProgress(null))
//       .finally(() => setProgressLoading(false));
//   }, []);


//   const requestAdmin = async () => {
//     try {
//       setRequestLoading(true);
//       setRequestStatus(null);

//       await api.post("/api/user/request-admin");

//       setRequestStatus("success");
//     } catch {
//       setRequestStatus("error");
//     } finally {
//       setRequestLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      
//       <section className="border rounded-md p-4">
//         <h2 className="text-sm font-semibold mb-2">Your Progress</h2>

//         {progressLoading && (
//           <p className="text-sm text-gray-500">Loading progress…</p>
//         )}

//         {!progressLoading && !progress && (
//           <p className="text-sm text-red-600">
//             Failed to load progress summary.
//           </p>
//         )}

//         {progress && (
//           <>
//             <p className="text-sm text-gray-700">
//               Solved{" "}
//               <span className="font-semibold">
//                 {progress.totalSolved}
//               </span>{" "}
//               out of{" "}
//               <span className="font-semibold">
//                 {progress.totalProblems}
//               </span>{" "}
//               problems
//             </p>

//             {progress.totalProblems === 0 && (
//               <p className="mt-2 text-xs text-gray-500">
//                 Progress tracking will unlock after you start submitting
//                 solutions.
//               </p>
//             )}
//           </>
//         )}
//       </section>

//       {/* =============================
//           Admin Request
//       ============================= */}
//       <section className="border rounded-md p-4">
//         <h2 className="text-sm font-semibold mb-2">
//           Admin Access
//         </h2>

//         <button
//           onClick={requestAdmin}
//           disabled={requestLoading || requestStatus === "success"}
//           className={`
//             w-full rounded-md px-4 py-2 text-sm font-medium
//             transition-all duration-200
//             ${
//               requestLoading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : requestStatus === "success"
//                 ? "bg-green-600 cursor-not-allowed"
//                 : "bg-black hover:bg-gray-900"
//             }
//             text-white
//           `}
//         >
//           {requestLoading
//             ? "Submitting request..."
//             : requestStatus === "success"
//             ? "Request Submitted"
//             : "Request Admin Access"}
//         </button>

//         {requestStatus === "success" && (
//           <p className="mt-2 text-xs text-green-700">
//             Your request has been sent to a Super Admin.
//           </p>
//         )}

//         {requestStatus === "error" && (
//           <p className="mt-2 text-xs text-red-600">
//             Failed to submit request. Please try again later.
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }
















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import api from "../../lib/api-client";

// export default function UserDashboard() {
//   const [progress, setProgress] = useState(null);
//   const [progressLoading, setProgressLoading] = useState(true);
//   const [requestLoading, setRequestLoading] = useState(false);
//   const [requestStatus, setRequestStatus] = useState(null);

//   useEffect(() => {
//     api
//       .get("/api/user/progress/summary")
//       .then(res => setProgress(res.data))
//       .catch(() => setProgress(null))
//       .finally(() => setProgressLoading(false));
//   }, []);

//   const requestAdmin = async () => {
//     try {
//       setRequestLoading(true);
//       setRequestStatus(null);
//       await api.post("/api/user/request-admin");
//       setRequestStatus("success");
//     } catch {
//       setRequestStatus("error");
//     } finally {
//       setRequestLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#030508] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
//       </div>

//       <aside className="w-72 bg-[#0a0f1c]/60 backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-20">
//         <div className="px-8 py-8 border-b border-white/5">
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              
//             <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-3-3 3-3M16 7l3 3-3 3M14 3l-4 18" />
//             </svg>
//             </div>
//             <div className="text-xl font-bold tracking-tight text-white">
//               Dev Prep
//             </div>
//           </div>
//           <div className="flex items-center gap-2 mt-2 px-1">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//             </span>
//             <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
//               Student Workspace
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-2">
//           <Link href="/web-dev" className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
//             <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
//             </div>
//             Web Engineering
//           </Link>
//           <Link href="/dsa" className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
//             <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
//             </div>
//             Data Structures
//           </Link>
//           <Link href="/code-lab" className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
//             <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             </div>
//             Code Lab
//           </Link>
//         </nav>

//         <div className="px-4 py-6 border-t border-white/5">
//           <Link
//             href="/login"
//             className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-all hover:pl-5"
//           >
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             Sign out
//           </Link>
//         </div>
//       </aside>

//       <main className="flex-1 px-12 py-12 space-y-12 overflow-y-auto relative z-10">
        
//         <header className="flex items-end justify-between animate-in fade-in slide-in-from-top-4 duration-700">
//           <div>
//             <h1 className="text-3xl font-bold text-white tracking-tight">
//               Student Overview
//             </h1>
//             <p className="text-slate-400 mt-2 flex items-center gap-2">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
//               Track progress, performance, and access controls
//             </p>
//           </div>
//           <div className="text-right hidden md:block">
//             <div className="text-xs font-mono text-slate-500 mb-1">CURRENT SESSION</div>
//             <div className="text-sm font-mono text-indigo-400">ACTIVE_LEARNING_MODE</div>
//           </div>
//         </header>

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
//           <div className="group rounded-2xl bg-[#0a0f1c]/60 border border-white/5 p-6 hover:bg-[#0a0f1c]/80 transition-all hover:-translate-y-1 hover:border-indigo-500/30 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
//               <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
//             </div>
//             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Problems Solved</div>
//             <div className="text-4xl font-bold text-white mt-2">
//               {progressLoading ? <span className="animate-pulse">...</span> : progress?.totalSolved ?? 0}
//             </div>
//             <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
//                <div className="h-full bg-indigo-500 w-[45%] rounded-full shadow-[0_0_10px_#6366f1]"></div>
//             </div>
//           </div>

//           <div className="group rounded-2xl bg-[#0a0f1c]/60 border border-white/5 p-6 hover:bg-[#0a0f1c]/80 transition-all hover:-translate-y-1 hover:border-cyan-500/30 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
//               <svg className="w-16 h-16 text-cyan-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
//             </div>
//             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Problems</div>
//             <div className="text-4xl font-bold text-white mt-2">
//               {progressLoading ? <span className="animate-pulse">...</span> : progress?.totalProblems ?? 0}
//             </div>
//             <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
//                <div className="h-full bg-cyan-500 w-[70%] rounded-full shadow-[0_0_10px_#06b6d4]"></div>
//             </div>
//           </div>

//           <div className="group rounded-2xl bg-[#0a0f1c]/60 border border-white/5 p-6 hover:bg-[#0a0f1c]/80 transition-all hover:-translate-y-1 hover:border-emerald-500/30 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
//               <svg className="w-16 h-16 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
//             </div>
//             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Completion Rate</div>
//             <div className="text-4xl font-bold text-white mt-2">
//               {!progress || progress.totalProblems === 0
//                 ? "0%"
//                 : `${Math.round((progress.totalSolved / progress.totalProblems) * 100)}%`}
//             </div>
//             <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
//                <div className="h-full bg-emerald-500 w-[30%] rounded-full shadow-[0_0_10px_#10b981]"></div>
//             </div>
//           </div>
//         </section>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
//           <section className="rounded-3xl bg-[#0a0f1c]/60 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//               </div>
//               <h2 className="text-lg font-bold text-white">Progress Summary</h2>
//             </div>

//             {progressLoading && (
//               <div className="flex flex-col gap-2">
//                 <div className="h-4 bg-white/5 rounded animate-pulse w-3/4"></div>
//                 <div className="h-4 bg-white/5 rounded animate-pulse w-1/2"></div>
//               </div>
//             )}

//             {!progressLoading && !progress && (
//               <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
//                 Unable to sync progress data with the neural core.
//               </div>
//             )}

//             {progress && (
//               <div className="space-y-6">
//                 <p className="text-slate-300 leading-relaxed">
//                   You have successfully conquered <span className="font-bold text-white">{progress.totalSolved}</span> technical challenges out of the <span className="font-bold text-white">{progress.totalProblems}</span> available in the curriculum.
//                 </p>
                
//                 <div className="relative pt-2">
//                   <div className="flex mb-2 items-center justify-between">
//                     <div>
//                       <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
//                         Proficiency
//                       </span>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xs font-semibold inline-block text-indigo-400">
//                         {progress.totalProblems > 0 ? Math.round((progress.totalSolved / progress.totalProblems) * 100) : 0}%
//                       </span>
//                     </div>
//                   </div>
//                   <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-900/20">
//                     <div style={{ width: `${progress.totalProblems > 0 ? (progress.totalSolved / progress.totalProblems) * 100 : 0}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-1000 ease-out"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>

//           <section className="rounded-3xl bg-[#0a0f1c]/60 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//               </div>
//               <h2 className="text-lg font-bold text-white">Administrative Access</h2>
//             </div>

//             <p className="text-sm text-slate-400 mb-8">
//               Request elevated privileges to access the instructor dashboard and content management system.
//             </p>

//             <button
//               onClick={requestAdmin}
//               disabled={requestLoading || requestStatus === "success"}
//               className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all transform active:scale-95 shadow-lg ${
//                 requestLoading
//                   ? "bg-slate-800 text-slate-500 cursor-wait border border-white/5"
//                   : requestStatus === "success"
//                   ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
//                   : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20"
//               }`}
//             >
//               {requestLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                   Establishing Uplink...
//                 </span>
//               ) : requestStatus === "success" ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//                   Request Acknowledged
//                 </span>
//               ) : (
//                 "Request Access Token"
//               )}
//             </button>

//             {requestStatus === "success" && (
//               <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                 Ticket forwarded to Super Admin for validation.
//               </div>
//             )}

//             {requestStatus === "error" && (
//               <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
//                 Connection refused. Please retry transmission.
//               </div>
//             )}
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }



















"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api-client";
import { 
  Code2, 
  Terminal, 
  Layout, 
  LogOut, 
  CheckCircle2, 
  Target, 
  BarChart3, 
  ShieldAlert,
  ShieldCheck,
  Server
} from "lucide-react";

export default function UserDashboard() {
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    api
      .get("/api/user/progress/summary")
      .then(res => setProgress(res.data))
      .catch(() => setProgress(null))
      .finally(() => setProgressLoading(false));
  }, []);

  const requestAdmin = async () => {
    try {
      setRequestLoading(true);
      setRequestStatus(null);
      await api.post("/api/user/request-admin");
      setRequestStatus("success");
    } catch {
      setRequestStatus("error");
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-indigo-500/20">
      
      {/* SIDEBAR — Kept Dark/Premium */}
      <aside className="w-72 bg-[#0F172A] border-r border-white/5 flex flex-col relative z-20 shrink-0 text-slate-300">
        <div className="px-6 py-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50 text-white">
              <Code2 size={20} />
            </div>
            <div className="text-xl font-bold tracking-tight text-white">
              Dev Prep
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 px-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              Student Workspace
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          <Link href="/web-dev" className="group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Layout size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            Web Engineering
          </Link>
          <Link href="/dsa" className="group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Terminal size={18} className="text-slate-500 group-hover:text-orange-400 transition-colors" />
            Data Structures
          </Link>
          <Link href="/code-lab" className="group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Code2 size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            Code Lab
          </Link>
        </nav>

        <div className="px-4 py-6 border-t border-white/5">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT — Clean Professional Light Theme */}
      <main className="flex-1 px-8 py-10 overflow-y-auto bg-gray-50 text-slate-900">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <header className="flex items-end justify-between border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Welcome back. Here is your learning velocity.
              </p>
            </div>
            <div className="text-right hidden md:block bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Current Session</div>
              <div className="text-xs font-mono font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 ACTIVE
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={24} />
                 </div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solved</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {progressLoading ? <span className="animate-pulse text-gray-300">--</span> : progress?.totalSolved ?? 0}
              </div>
              <p className="text-sm text-slate-500 mt-1">Problems completed</p>
              
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-6 overflow-hidden">
                 <div className="h-full bg-indigo-600 w-[45%] rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Target size={24} />
                 </div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {progressLoading ? <span className="animate-pulse text-gray-300">--</span> : progress?.totalProblems ?? 0}
              </div>
               <p className="text-sm text-slate-500 mt-1">Problems available</p>

              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-6 overflow-hidden">
                 <div className="h-full bg-cyan-500 w-[70%] rounded-full"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <BarChart3 size={24} />
                 </div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rate</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {!progress || progress.totalProblems === 0
                  ? "0%"
                  : `${Math.round((progress.totalSolved / progress.totalProblems) * 100)}%`}
              </div>
              <p className="text-sm text-slate-500 mt-1">Completion rate</p>
              
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-6 overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[30%] rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Lower Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Progress Summary */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <BarChart3 size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Progress Analysis</h2>
              </div>

              {progressLoading && (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                </div>
              )}

              {!progressLoading && !progress && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  Unable to sync progress data.
                </div>
              )}

              {progress && (
                <div className="space-y-8">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    You have successfully solved <strong className="text-indigo-600">{progress.totalSolved}</strong> technical challenges out of <strong className="text-slate-900">{progress.totalProblems}</strong> available.
                  </p>
                  
                  <div>
                    <div className="flex mb-2 items-center justify-between text-sm font-medium">
                      <span className="text-slate-600">Overall Proficiency</span>
                      <span className="text-indigo-600">
                        {progress.totalProblems > 0 ? Math.round((progress.totalSolved / progress.totalProblems) * 100) : 0}%
                      </span>
                    </div>
                    <div className="overflow-hidden h-3 rounded-full bg-gray-100">
                      <div 
                        style={{ width: `${progress.totalProblems > 0 ? (progress.totalSolved / progress.totalProblems) * 100 : 0}%` }} 
                        className="h-full bg-indigo-600 rounded-full shadow-sm transition-all duration-1000 ease-out"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Admin Access */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <Server size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Instructor Access</h2>
                </div>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    Request elevated privileges to access the content management system and student analytics.
                </p>
              </div>

              <div className="mt-auto">
                <button
                  onClick={requestAdmin}
                  disabled={requestLoading || requestStatus === "success"}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all shadow-sm ${
                    requestLoading
                      ? "bg-gray-100 text-gray-400 cursor-wait border border-gray-200"
                      : requestStatus === "success"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200 hover:shadow-md active:translate-y-0.5"
                  }`}
                >
                  {requestLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : requestStatus === "success" ? (
                    <span className="flex items-center justify-center gap-2">
                      <ShieldCheck size={16} />
                      Request Sent
                    </span>
                  ) : (
                    "Request Access Token"
                  )}
                </button>

                {requestStatus === "success" && (
                  <div className="mt-4 text-center text-xs font-medium text-emerald-600 animate-in fade-in slide-in-from-bottom-2">
                    Ticket forwarded to validation queue.
                  </div>
                )}

                {requestStatus === "error" && (
                  <div className="mt-4 text-center text-xs font-medium text-red-500 animate-in fade-in slide-in-from-bottom-2">
                    Connection failed. Please try again.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}