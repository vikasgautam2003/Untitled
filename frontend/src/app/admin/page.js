"use client";

import React from "react";
import Link from "next/link";
import AdminProblemList from "./components/AdminProblemList";

export default function AdminPage() {
  return (
    // FIXED: w-full and overflow-hidden here ensure this component conforms to the parent layout
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full overflow-hidden">
      
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-400">Welcome back. Here is what’s happening with your students today.</p>
      </div>

      {/* Grid adapts to screen size, no fixed min-widths that cause scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Card 1 */}
        <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-indigo-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Users</h3>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-white">1,284</span>
              <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/50 rounded-full mt-5 overflow-hidden">
              <div className="h-full w-[60%] bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-purple-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Problems Solved</h3>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-white">845</span>
              <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+24%</span>
            </div>
            <div className="flex gap-1.5 mt-5 h-8 items-end opacity-80">
              {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-purple-500/40 rounded-sm hover:bg-purple-400 transition-colors"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-cyan-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Revenue</h3>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-white">$45k</span>
              <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+8%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/50 rounded-full mt-5 overflow-hidden">
              <div className="h-full w-[80%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-3xl bg-[#0B1121]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-[#0B1121]/60 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-blue-500 transform translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">New Signups</h3>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-white">18</span>
              <span className="text-emerald-400 text-xs font-bold mb-1.5 flex items-center bg-emerald-500/10 px-2 py-1 rounded-md">+4 today</span>
            </div>
            <div className="flex -space-x-3 mt-5 pl-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#131b2e] bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all">U{i}</div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#131b2e] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+14</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-white">Problem Management</h2>
            <Link href="/admin/problems" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              View All &rarr;
            </Link>
          </div>
          <div className="bg-[#0B1121]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-1 shadow-2xl overflow-hidden w-full">
             <AdminProblemList />
          </div>
        </div>

        <div className="space-y-6 min-w-0">
          <h2 className="text-xl font-bold text-white px-1">Recent Activity</h2>
          <div className="bg-[#0B1121]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 shadow-2xl h-full min-h-[400px] w-full">
            <div className="space-y-0 relative">
              <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-white/5"></div>
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div key={i} className="flex gap-4 group py-3">
                  <div className="mt-1.5 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-[#0B1121] border-2 border-indigo-500/50 group-hover:border-indigo-400 group-hover:scale-110 transition-all"></div>
                  </div>
                  <div className="flex-1 -mt-1 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      User <span className="text-white font-semibold">Alex</span> submitted solution for <span className="text-indigo-300">"Two Sum"</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">{i * 5 + 2}m ago</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
               <button className="text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-wider font-semibold">View Full Log</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}