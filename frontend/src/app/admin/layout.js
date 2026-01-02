







// "use client";

// import { useAuth } from "../../providers/auth.provider";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function AdminLayout({ children }) {
//   const { token } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     if (!token) router.push("/login");
//   }, [token, router]);

//   if (!mounted) return null;

//   const isActive = (path) => pathname === path;

//   return (
//     <div className="flex h-screen w-full max-w-[100vw] bg-[#02040a] text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[120px]" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px]" />
//       </div>

//       <aside className="w-72 bg-[#0B1121]/50 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20 shrink-0 h-full">
//         <div className="p-8 flex items-center gap-3">
//           <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 shrink-0">
//             <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//             </svg>
//           </div>
//           <span className="text-2xl font-bold tracking-tight text-white truncate">
//             Dev Prep
//           </span>
//         </div>

//         <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
//           <div>
//             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
//               Learning Hub
//             </div>
//             <ul className="space-y-2">
//               {[
//                 { path: "/web-dev", label: "Web Kit", color: "blue" },
//                 { path: "/dsa", label: "DSA Leet", color: "orange" },
//                 { path: "/code-lab", label: "Codex Lab", color: "purple" }
//               ].map(({ path, label, color }) => (
//                 <li key={path}>
//                   <Link
//                     href={path}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                       isActive(path)
//                         ? `bg-${color}-500/10 text-${color}-300 border border-${color}-500/20`
//                         : "text-slate-400 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <span className="font-medium">{label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
//               Instructor Mode
//             </div>
//             <ul className="space-y-2">
//               {[
//                 { path: "/admin", label: "Dashboard", color: "emerald" },
//                 { path: "/admin/create", label: "Create Challenge", color: "emerald" },
//                 { path: "/admin/problems", label: "Problem Matrix", color: "indigo" }
//               ].map(({ path, label, color }) => (
//                 <li key={path}>
//                   <Link
//                     href={path}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                       isActive(path)
//                         ? `bg-${color}-500/10 text-${color}-300 border border-${color}-500/20`
//                         : "text-slate-400 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <span className="font-medium">{label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         <div className="p-6 border-t border-white/5">
//           <Link
//             href="/login"
//             className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full"
//           >
//             <span className="font-medium">Sign Out</span>
//           </Link>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative z-10 bg-[#02040a]">
//         {children}
//       </main>
//     </div>
//   );
// }












"use client";

import { useAuth } from "../../providers/auth.provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!token) router.push("/login");
  }, [token, router]);

  if (!mounted) return null;

  // Exact match only — prevents accidental multi-highlight
  const isActive = (path) => pathname === path;

  return (
    <div className="flex h-screen w-full max-w-[100vw] bg-[#02040a] text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Ambient playful gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[45vw] h-[45vw] bg-indigo-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-900/20 rounded-full blur-[140px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-[#0B1121]/60 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20 shrink-0 h-full">

        {/* Brand / Logo */}
        <div className="p-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-500 flex items-center justify-center shadow-xl ring-1 ring-white/10">
            {/* Friendly coder mascot */}
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-3-3 3-3M16 7l3 3-3 3M14 3l-4 18" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-xl font-extrabold tracking-tight">Dev Prop</div>
            <div className="text-xs text-cyan-300/80 font-medium">Learn • Build • Level-Up</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* Learning */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">
              Learning Arena
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/web-dev"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/web-dev")
                      ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">Web Playground</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dsa"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/dsa")
                      ? "bg-orange-500/10 text-orange-300 border border-orange-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">DSA Arena</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/code-lab"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/code-lab")
                      ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">Code Lab</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Instructor */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">
              Instructor Zone
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/admin")
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/create"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/admin/create")
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">Create Challenge</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/problems"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/admin/problems")
                      ? "bg-indigo-600/10 text-indigo-300 border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">Problem Matrix</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/5">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full"
          >
            <span className="font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative z-10 bg-[#02040a]">
        {children}
      </main>
    </div>
  );
}
