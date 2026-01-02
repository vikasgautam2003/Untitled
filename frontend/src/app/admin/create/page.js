









// "use client";

// import { useState, useEffect } from "react";
// import api from "../../../lib/api-client";
// import { createPortal } from "react-dom";


// export default function CreateProblem() {
//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     topic: "ARRAYS",
//     difficulty: "EASY",
//     description: "",
//     testCases: [{ stdin: "", expectedOutput: "" }]
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);


//   const [notification, setNotification] = useState(null);
// const [mounted, setMounted] = useState(false);

// useEffect(() => {
//   setMounted(true);
// }, []);



// const notify = (type, message) => {
//   setNotification({ type, message });
//   setTimeout(() => setNotification(null), 4000);
// };


//   const updateTestCase = (i, field, value) => {
//     const next = [...form.testCases];
//     next[i][field] = value;
//     setForm({ ...form, testCases: next });
//   };

//   const addTestCase = () => {
//     setForm({
//       ...form,
//       testCases: [...form.testCases, { stdin: "", expectedOutput: "" }]
//     });
//   };

//   const removeTestCase = i => {
//     setForm({
//       ...form,
//       testCases: form.testCases.filter((_, idx) => idx !== i)
//     });
//   };

//   const submit = async () => {
//     setIsSubmitting(true);
//     try {
//       await api.post("/api/problems", form);
//       notify("success", "Problem successfully created");

//     } catch (e) {
//        notify("error", "Failed to create problem. Please review inputs.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#050505] text-slate-200 font-sans selection:bg-fuchsia-500/30 relative overflow-x-hidden">
      
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[120px]" />
//         <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-900/10 rounded-full blur-[120px]" />
//         <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/05 rounded-full blur-[100px]" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
//         <header className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
//           <div className="flex-1 space-y-6">
//             <div className="space-y-2">
//               <h1 className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">Challenge Architect</h1>
//               <input 
//                 placeholder="Untitled Challenge" 
//                 className="w-full bg-transparent text-5xl md:text-7xl font-black text-white placeholder:text-white/10 focus:outline-none transition-all tracking-tight leading-tight"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//               />
//             </div>
            
//             <div className="flex items-center gap-3 text-slate-500 font-mono text-sm bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
//               <span className="text-indigo-400">/problems/</span>
//               <input 
//                 placeholder="slug-goes-here" 
//                 className="bg-transparent text-slate-300 focus:text-white focus:outline-none min-w-[200px] placeholder:text-slate-600"
//                 value={form.slug}
//                 onChange={e => setForm({ ...form, slug: e.target.value })}
//               />
//             </div>
//           </div>

//           <button 
//             onClick={submit}
//             disabled={isSubmitting}
//             className="hidden md:flex group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
//             <span className="relative flex items-center gap-2 z-10">
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                   Processing
//                 </>
//               ) : (
//                 <>
//                   Launch
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </>
//               )}
//             </span>
//           </button>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
//           <div className="lg:col-span-8 space-y-12">
            
//             <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-bold text-white flex items-center gap-3">
//                   <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
//                   Mission Briefing
//                 </h3>
//               </div>
              
//               <div className="group relative bg-[#0A0A0A] rounded-3xl p-1 transition-all duration-300 hover:shadow-[0_0_50px_rgba(99,102,241,0.1)] border border-white/5 hover:border-white/10">
//                 <textarea
//                   placeholder="Describe the algorithm constraints, narrative, and objectives..."
//                   className="w-full min-h-[400px] bg-[#0A0A0A] rounded-[20px] p-8 text-lg text-slate-300 leading-relaxed placeholder:text-slate-700 focus:outline-none resize-none custom-scrollbar"
//                   value={form.description}
//                   onChange={e => setForm({ ...form, description: e.target.value })}
//                 />
//               </div>
//             </section>

//             <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-bold text-white flex items-center gap-3">
//                   <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"></span>
//                   Test Protocol
//                 </h3>
//                 <span className="text-xs font-mono text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">{form.testCases.length} SUITES</span>
//               </div>

//               <div className="grid grid-cols-1 gap-4">
//                 {form.testCases.map((tc, i) => (
//                   <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 transition-all hover:bg-[#0F0F0F] hover:border-white/10 hover:shadow-2xl hover:shadow-black/50">
//                     <div className="flex justify-between items-center mb-6">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold font-mono text-slate-400 border border-white/5 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-colors">
//                           {String(i + 1).padStart(2, '0')}
//                         </div>
//                         <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">I/O Pair</span>
//                       </div>
//                       <button 
//                         onClick={() => removeTestCase(i)}
//                         className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all transform hover:scale-110"
//                         title="Remove Test Case"
//                       >
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider ml-1">Input (stdin)</label>
//                         <div className="relative group/input">
//                           <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500/20 rounded-l-lg group-focus-within/input:bg-indigo-500 transition-colors"></div>
//                           <textarea
//                             value={tc.stdin}
//                             onChange={e => updateTestCase(i, "stdin", e.target.value)}
//                             className="w-full bg-[#151515] hover:bg-[#1a1a1a] rounded-r-xl py-4 pl-4 pr-4 text-sm font-mono text-slate-200 placeholder:text-slate-700 focus:outline-none focus:bg-[#202020] transition-colors resize-none h-24 border border-transparent focus:border-white/5"
//                             placeholder="e.g. [2,7,11,15], 9"
//                           />
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider ml-1">Expected Output</label>
//                         <div className="relative group/input">
//                           <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500/20 rounded-l-lg group-focus-within/input:bg-emerald-500 transition-colors"></div>
//                           <textarea
//                             value={tc.expectedOutput}
//                             onChange={e => updateTestCase(i, "expectedOutput", e.target.value)}
//                             className="w-full bg-[#151515] hover:bg-[#1a1a1a] rounded-r-xl py-4 pl-4 pr-4 text-sm font-mono text-slate-200 placeholder:text-slate-700 focus:outline-none focus:bg-[#202020] transition-colors resize-none h-24 border border-transparent focus:border-white/5"
//                             placeholder="e.g. [0,1]"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <button 
//                   onClick={addTestCase}
//                   className="w-full py-6 border border-dashed border-white/10 rounded-3xl flex items-center justify-center gap-3 text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all group duration-300"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//                   </div>
//                   <span className="font-bold text-sm tracking-widest uppercase">Add Test Suite</span>
//                 </button>
//               </div>
//             </section>
//           </div>

//           <div className="lg:col-span-4 relative">
//             <div className="sticky top-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
              
//               <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
//                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Configuration</h3>
                
//                 <div className="space-y-8">
//                   <div className="space-y-3">
//                     <label className="text-sm font-bold text-white flex items-center gap-2">
//                       <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//                       Topic Domain
//                     </label>
//                     <div className="relative group">
//                       <select 
//                         onChange={e => setForm({ ...form, topic: e.target.value })}
//                         className="w-full appearance-none bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-sm font-medium text-slate-300 focus:outline-none focus:border-indigo-500 focus:text-white transition-all cursor-pointer hover:bg-[#1a1a1a]"
//                       >
//                         <option>ARRAYS</option>
//                         <option>STRINGS</option>
//                         <option>GRAPH</option>
//                         <option>DP</option>
//                       </select>
//                       <div className="absolute right-4 top-4 pointer-events-none text-slate-500 group-hover:text-white transition-colors">
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <label className="text-sm font-bold text-white flex items-center gap-2">
//                       <svg className="w-4 h-4 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                       Difficulty Matrix
//                     </label>
//                     <div className="grid grid-cols-1 gap-2 bg-[#151515] p-1.5 rounded-2xl border border-white/5">
//                       {['EASY', 'MEDIUM', 'HARD'].map((level) => (
//                         <button
//                           key={level}
//                           onClick={() => setForm({ ...form, difficulty: level })}
//                           className={`relative text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group overflow-hidden ${
//                             form.difficulty === level 
//                               ? level === 'EASY' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
//                               : level === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
//                               : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]'
//                               : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
//                           }`}
//                         >
//                           <span className="relative z-10">{level}</span>
//                           {form.difficulty === level && (
//                             <span className="relative z-10 w-2 h-2 rounded-full bg-current shadow-[0_0_10px_currentColor]"></span>
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                     {/* Hidden select for logic compatibility */}
//                     <select 
//                       className="hidden" 
//                       value={form.difficulty} 
//                       onChange={e => setForm({ ...form, difficulty: e.target.value })}
//                     >
//                        <option>EASY</option>
//                        <option>MEDIUM</option>
//                        <option>HARD</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-white/5 block md:hidden">
//                   <button 
//                     onClick={submit}
//                     disabled={isSubmitting}
//                     className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl shadow-xl shadow-white/10 active:scale-95 transition-transform"
//                   >
//                     {isSubmitting ? "Processing..." : "Launch Challenge"}
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-indigo-900/10 to-fuchsia-900/10 border border-white/5 rounded-3xl p-6 text-center">
//                  <p className="text-xs font-medium text-slate-400 leading-relaxed">
//                    "Great challenges push the boundaries of logic. Ensure your edge cases are covered."
//                  </p>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//       {mounted && notification && createPortal(
//   <div className="fixed top-6 right-6 z-[9999] animate-in slide-in-from-right-6 duration-300">
//     <div
//       className={`flex items-start gap-4 px-6 py-5 rounded-2xl border shadow-2xl backdrop-blur-xl ${
//         notification.type === "success"
//           ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
//           : "bg-rose-500/10 border-rose-500/30 text-rose-300"
//       }`}
//     >
//       <div className="flex-1">
//         <div className="font-bold text-sm tracking-wide">
//           {notification.type === "success" ? "Success" : "Action Failed"}
//         </div>
//         <div className="text-xs opacity-80 mt-1">
//           {notification.message}
//         </div>
//       </div>
//     </div>
//   </div>,
//   document.body
// )}

//     </div>
//   );
// }












"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/api-client";
import { createPortal } from "react-dom";
import { 
  FilePlus, 
  Terminal, 
  Save, 
  Trash2, 
  Plus, 
  AlignLeft, 
  Database, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function CreateProblem() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    topic: "ARRAYS",
    difficulty: "EASY",
    description: "",
    testCases: [{ stdin: "", expectedOutput: "" }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateTestCase = (i, field, value) => {
    const next = [...form.testCases];
    next[i][field] = value;
    setForm({ ...form, testCases: next });
  };

  const addTestCase = () => {
    setForm({
      ...form,
      testCases: [...form.testCases, { stdin: "", expectedOutput: "" }]
    });
  };

  const removeTestCase = (i) => {
    setForm({
      ...form,
      testCases: form.testCases.filter((_, idx) => idx !== i)
    });
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("/api/problems", form);
      notify("success", "Problem successfully created");
    } catch (e) {
      notify("error", "Failed to create problem. Please review inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-slate-900 font-sans selection:bg-indigo-100 relative overflow-x-hidden">
      
      {/* Background Ambience (Subtle Light Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-wider text-xs uppercase mb-2">
                 <FilePlus size={16} />
                 Challenge Architect
              </div>
              <input
                placeholder="Untitled Challenge"
                className="w-full bg-transparent text-4xl md:text-6xl font-extrabold text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all tracking-tight leading-tight"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-mono text-sm bg-white w-fit px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <span className="text-slate-400 select-none">/problems/</span>
              <input
                placeholder="slug-goes-here"
                className="bg-transparent text-slate-700 focus:text-slate-900 focus:outline-none min-w-[200px] placeholder:text-slate-300"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={isSubmitting}
            className="hidden md:flex group items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold text-lg rounded-xl transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </>
            ) : (
              <>
                Launch
                <Save size={20} />
              </>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Description Section */}
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                    <AlignLeft size={20} />
                  </div>
                  Mission Briefing
                </h3>
              </div>

              <div className="group relative bg-white rounded-2xl p-1 transition-all duration-300 shadow-sm border border-gray-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50/50">
                <textarea
                  placeholder="Describe the algorithm constraints, narrative, and objectives..."
                  className="w-full min-h-[400px] bg-white rounded-xl p-6 text-lg text-slate-600 leading-relaxed placeholder:text-slate-300 focus:outline-none resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </section>

            {/* Test Cases Section */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                   <div className="p-1.5 bg-fuchsia-50 rounded-lg text-fuchsia-600">
                    <Terminal size={20} />
                  </div>
                  Test Protocol
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    {form.testCases.length} SUITES
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {form.testCases.map((tc, i) => (
                  <div
                    key={i}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:shadow-md hover:border-gray-300"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold font-mono text-slate-500 border border-gray-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                          I/O Pair
                        </span>
                      </div>
                      <button
                        onClick={() => removeTestCase(i)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all transform hover:scale-110"
                        title="Remove Test Case"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider ml-1">
                          Input (stdin)
                        </label>
                        <div className="relative group/input">
                          <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500/20 rounded-l-lg group-focus-within/input:bg-indigo-500 transition-colors"></div>
                          <textarea
                            value={tc.stdin}
                            onChange={(e) =>
                              updateTestCase(i, "stdin", e.target.value)
                            }
                            className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-r-xl py-4 pl-4 pr-4 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all resize-none h-24"
                            placeholder="e.g. [2,7,11,15], 9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider ml-1">
                          Expected Output
                        </label>
                        <div className="relative group/input">
                          <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500/20 rounded-l-lg group-focus-within/input:bg-emerald-500 transition-colors"></div>
                          <textarea
                            value={tc.expectedOutput}
                            onChange={(e) =>
                              updateTestCase(i, "expectedOutput", e.target.value)
                            }
                            className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-r-xl py-4 pl-4 pr-4 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all resize-none h-24"
                            placeholder="e.g. [0,1]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addTestCase}
                  className="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all group duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-transform shadow-sm">
                    <Plus size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase">
                    Add Test Suite
                  </span>
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">
                  Configuration
                </h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Database size={16} className="text-indigo-600" />
                      Topic Domain
                    </label>
                    <div className="relative group">
                      <select
                        onChange={(e) =>
                          setForm({ ...form, topic: e.target.value })
                        }
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-white"
                      >
                        <option>ARRAYS</option>
                        <option>STRINGS</option>
                        <option>GRAPH</option>
                        <option>DP</option>
                      </select>
                      <div className="absolute right-4 top-4 pointer-events-none text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-fuchsia-500" />
                      Difficulty Matrix
                    </label>
                    <div className="grid grid-cols-1 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                      {["EASY", "MEDIUM", "HARD"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setForm({ ...form, difficulty: level })}
                          className={`relative text-xs font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-between group overflow-hidden ${
                            form.difficulty === level
                              ? level === "EASY"
                                ? "bg-white text-emerald-600 shadow-sm border border-emerald-200 ring-1 ring-emerald-100"
                                : level === "MEDIUM"
                                ? "bg-white text-amber-600 shadow-sm border border-amber-200 ring-1 ring-amber-100"
                                : "bg-white text-rose-600 shadow-sm border border-rose-200 ring-1 ring-rose-100"
                              : "text-slate-500 hover:text-slate-900 hover:bg-white/50 border border-transparent"
                          }`}
                        >
                          <span className="relative z-10">{level}</span>
                          {form.difficulty === level && (
                            <span className="relative z-10 w-2 h-2 rounded-full bg-current shadow-sm"></span>
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Hidden select for logic compatibility */}
                    <select
                      className="hidden"
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm({ ...form, difficulty: e.target.value })
                      }
                    >
                      <option>EASY</option>
                      <option>MEDIUM</option>
                      <option>HARD</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 block md:hidden">
                  <button
                    onClick={submit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-transform"
                  >
                    {isSubmitting ? "Processing..." : "Launch Challenge"}
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                <p className="text-xs font-medium text-indigo-600 leading-relaxed">
                  "Great challenges push the boundaries of logic. Ensure your edge cases are covered."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        notification &&
        createPortal(
          <div className="fixed top-6 right-6 z-[9999] animate-in slide-in-from-right-6 duration-300">
            <div
              className={`flex items-start gap-4 px-6 py-5 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                notification.type === "success"
                  ? "bg-white border-emerald-100 text-emerald-700 shadow-emerald-100"
                  : "bg-white border-rose-100 text-rose-700 shadow-rose-100"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                  {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm tracking-wide">
                  {notification.type === "success" ? "Success" : "Action Failed"}
                </div>
                <div className="text-xs opacity-80 mt-1">
                  {notification.message}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}