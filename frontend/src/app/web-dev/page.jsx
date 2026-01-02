"use client";

import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Cpu,
  Sparkles
} from "lucide-react";

export default function WebDevPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">

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
          <Link
            href="/web-dev"
            className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-white bg-blue-600 rounded-xl shadow-md shadow-blue-900/20"
          >
            Web Engineering
          </Link>

          <Link
            href="/dsa"
            className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all"
          >
            Data Structures
          </Link>

          <Link
            href="/code-lab"
            className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-all"
          >
            Code Lab
          </Link>
        </nav>

        <div className="p-4 bg-[#162032]">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            Sign out
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        <div className="max-w-6xl mx-auto px-14 py-14 space-y-14">

          <header className="space-y-5">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Module: Web Fundamentals
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              Web Development <span className="text-slate-400">Lab</span>
            </h1>

            <p className="max-w-3xl text-xl text-slate-500 leading-relaxed">
              Learn how the web actually works and build real interfaces with confidence.
              Choose the learning style that fits how you think.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <Link href="/web-dev/playground" className="group h-full">
              <div className="bg-white rounded-3xl border border-slate-200 p-10 hover:shadow-xl transition h-full">
                <Terminal className="w-9 h-9 text-blue-600 mb-5" />

                <h2 className="text-2xl font-bold mb-3">
                  Playground Mode
                </h2>

                <p className="text-lg text-slate-500 mb-5 leading-relaxed">
                  A hands-on coding environment where you actively build,
                  modify, and experiment with real web technologies.
                </p>

                <ul className="text-base text-slate-500 space-y-2 leading-relaxed">
                  <li>• Write and edit HTML, CSS, and JavaScript</li>
                  <li>• See instant visual feedback as your code runs</li>
                  <li>• Learn debugging by fixing broken UI</li>
                </ul>
              </div>
            </Link>

            <Link href="/web-dev/explore" className="group h-full">
              <div className="bg-white rounded-3xl border border-slate-200 p-10 hover:shadow-xl transition h-full">
                <BookOpen className="w-9 h-9 text-emerald-600 mb-5" />

                <h2 className="text-2xl font-bold mb-3">
                  Explanatory Mode
                </h2>

                <p className="text-lg text-slate-500 mb-5 leading-relaxed">
                  A concept-first learning path focused on understanding
                  how the web works before writing complex code.
                </p>

                <ul className="text-base text-slate-500 space-y-2 leading-relaxed">
                  <li>• Clear explanations of browser behavior</li>
                  <li>• Visual breakdowns of core web concepts</li>
                  <li>• Strong foundations for interviews</li>
                </ul>
              </div>
            </Link>

          </div>

          <div className="pt-8 border-t border-slate-200 text-sm text-slate-400 flex items-center gap-3">
            <Cpu className="w-5 h-5" />
            Engineering-focused learning, not surface-level tutorials
          </div>

        </div>
      </main>
    </div>
  );
}
