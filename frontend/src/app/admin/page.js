// "use client";

// import React from "react";
// import Link from "next/link";
// import AdminProblemList from "./components/AdminProblemList";

// export default function AdminPage() {
//   return (
//     // FIXED: w-full and overflow-hidden here ensure this component conforms to the parent layout
//     <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full overflow-hidden">
      
//       <div className="flex flex-col gap-1">
//         <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h2>
//         <p className="text-slate-400">Welcome back. Here is what’s happening with your students today.</p>
//       </div>

//       {/* Grid adapts to screen size, no fixed min-widths that cause scroll */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
//         {/* Card 1 */}
//         <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <svg className="w-24 h-24 text-indigo-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
//           </div>
//           <div className="relative z-10">
//             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Users</h3>
//             <div className="flex items-end gap-3 mt-2">
//               <span className="text-4xl font-bold text-white">1,284</span>
//               <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
//             </div>
//             <div className="h-1.5 w-full bg-slate-800/50 rounded-full mt-5 overflow-hidden">
//               <div className="h-full w-[60%] bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
//             </div>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <svg className="w-24 h-24 text-purple-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
//           </div>
//           <div className="relative z-10">
//             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Problems Solved</h3>
//             <div className="flex items-end gap-3 mt-2">
//               <span className="text-4xl font-bold text-white">845</span>
//               <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+24%</span>
//             </div>
//             <div className="flex gap-1.5 mt-5 h-8 items-end opacity-80">
//               {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
//                 <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-purple-500/40 rounded-sm hover:bg-purple-400 transition-colors"></div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <svg className="w-24 h-24 text-cyan-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
//           </div>
//           <div className="relative z-10">
//             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Revenue</h3>
//             <div className="flex items-end gap-3 mt-2">
//               <span className="text-4xl font-bold text-white">$45k</span>
//               <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+8%</span>
//             </div>
//             <div className="h-1.5 w-full bg-slate-800/50 rounded-full mt-5 overflow-hidden">
//               <div className="h-full w-[80%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
//             </div>
//           </div>
//         </div>

//         {/* Card 4 */}
//         <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <svg className="w-24 h-24 text-blue-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
//           </div>
//           <div className="relative z-10">
//             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">New Signups</h3>
//             <div className="flex items-end gap-3 mt-2">
//               <span className="text-4xl font-bold text-white">18</span>
//               <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+4 today</span>
//             </div>
//             <div className="flex -space-x-3 mt-5 pl-1">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-9 h-9 rounded-full border-2 border-[#131b2e] bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all">U{i}</div>
//               ))}
//               <div className="w-9 h-9 rounded-full border-2 border-[#131b2e] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+14</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
//         <div className="lg:col-span-2 space-y-6 min-w-0">
//           <div className="flex items-center justify-between px-1">
//             <h2 className="text-xl font-bold text-white">Problem Management</h2>
//             <Link href="/admin/problems" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
//               View All &rarr;
//             </Link>
//           </div>
//           <div className="bg-[#0B1121]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-1 shadow-2xl overflow-hidden w-full">
//              <AdminProblemList />
//           </div>
//         </div>

//         <div className="space-y-6 min-w-0">
//           <h2 className="text-xl font-bold text-white px-1">Recent Activity</h2>
//           <div className="bg-[#0B1121]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 shadow-2xl h-full min-h-[400px] w-full">
//             <div className="space-y-0 relative">
//               <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-white/5"></div>
//               {[1, 2, 3, 4, 5].map((item, i) => (
//                 <div key={i} className="flex gap-4 group py-3">
//                   <div className="mt-1.5 relative z-10">
//                     <div className="w-4 h-4 rounded-full bg-[#0B1121] border-2 border-indigo-500/50 group-hover:border-indigo-400 group-hover:scale-110 transition-all"></div>
//                   </div>
//                   <div className="flex-1 -mt-1 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
//                     <p className="text-sm text-slate-300 leading-relaxed">
//                       User <span className="text-white font-semibold">Alex</span> submitted solution for <span className="text-indigo-300">"Two Sum"</span>
//                     </p>
//                     <p className="text-xs text-slate-500 mt-1 font-mono">{i * 5 + 2}m ago</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 pt-4 border-t border-white/5 text-center">
//                <button className="text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-wider font-semibold">View Full Log</button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }



















"use client";

import React from "react";
import Link from "next/link";
import AdminProblemList from "./components/AdminProblemList";
import { 
  Users, 
  CheckCircle2, 
  DollarSign, 
  UserPlus, 
  ArrowRight, 
  Activity,
  MoreHorizontal
} from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
        <p className="text-lg text-slate-500">Welcome back. Here is the daily system performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Card 1: Active Users */}
        <div className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Users size={22} />
             </div>
             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
               +12%
             </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">1,284</div>
            <h3 className="text-slate-500 text-sm font-medium mt-1">Active Users</h3>
          </div>
          {/* Progress Bar Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
             <div className="h-full bg-indigo-500 w-[60%]"></div>
          </div>
        </div>

        {/* Card 2: Problems Solved */}
        <div className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <CheckCircle2 size={22} />
             </div>
             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
               +24%
             </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">845</div>
            <h3 className="text-slate-500 text-sm font-medium mt-1">Problems Solved</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
             <div className="h-full bg-purple-500 w-[75%]"></div>
          </div>
        </div>

        {/* Card 3: Revenue */}
        <div className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-cyan-50 rounded-xl text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <DollarSign size={22} />
             </div>
             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
               +8%
             </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">$45.2k</div>
            <h3 className="text-slate-500 text-sm font-medium mt-1">Total Revenue</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
             <div className="h-full bg-cyan-500 w-[85%]"></div>
          </div>
        </div>

        {/* Card 4: Signups */}
        <div className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UserPlus size={22} />
             </div>
             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
               +4 today
             </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">18</div>
            <h3 className="text-slate-500 text-sm font-medium mt-1">New Signups</h3>
          </div>
          {/* Avatar Pile */}
          <div className="flex -space-x-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                    U{i}
                </div>
              ))}
              <div className="w-6 h-6 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">+12</div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
        
        {/* Left Column: Problem Management */}
        <div className="xl:col-span-2 space-y-6 min-w-0">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Problem Management
            </h2>
            <Link href="/admin/problems" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Table Container - Assuming AdminProblemList handles its own rows, we just style the wrapper */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
             <AdminProblemList />
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="space-y-6 min-w-0">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full w-full">
            <div className="space-y-0 relative">
              {/* Timeline Line */}
              <div className="absolute top-3 bottom-3 left-[15px] w-0.5 bg-gray-100"></div>
              
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div key={i} className="flex gap-4 group py-3 relative">
                  <div className="mt-1.5 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <div className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
                    </div>
                  </div>
                  <div className="flex-1 -mt-1 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-default border border-transparent hover:border-gray-100">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900">Alex</span> submitted solution for <span className="text-indigo-600 font-medium">"Two Sum"</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <Activity size={12} className="text-slate-400" />
                        <p className="text-xs text-slate-400 font-medium">{i * 12 + 2}m ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
               <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-wider">
                   View Full Log
               </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}