








// 'use client';

// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import { useTerminalStore } from '@/stores/useTerminalStore';
// import { getWebContainerInstance } from '@/lib/webcontainer/instance';
// import { mountFiles, parseJsonToTree } from '@/lib/webcontainer/mount';
// import { model } from '@/lib/ai/model';
// import { getSystemPrompt } from '@/lib/ai/prompts';
// import { HumanMessage } from "@langchain/core/messages";
// import { jsonrepair } from 'jsonrepair';
// import FileExplorer from '@/components/workspace/file-tree/FileExplorer';
// import { useFileStore } from '@/stores/useFileStore';
// import CodeEditor from '@/components/workspace/editor/CodeEditor';

// // Modularized Imports
// import { BACKUP_FILES } from '@/lib/consts';
// import { fixJsonWithGroq } from '@/lib/ai/repair';
// import { applySafetyOverrides } from '@/lib/webcontainer/safety';

// const TerminalPanel = dynamic(
//   () => import('@/components/workspace/terminal/TerminalPanel'),
//   { ssr: false }
// );

// export default function WorkspacePage() {
//   const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  
//   const { addLog } = useTerminalStore();

//   // -------------------------------------------------------------------------
//   // 🛠️ HELPER: The "Universal Parser" (Cleans -> Repairs -> Groq)
//   // -------------------------------------------------------------------------
//   const robustParse = async (rawContent: string, stepName: string): Promise<any> => {
//     // 1. Strip Markdown
//     let cleanJson = rawContent;
//     if (rawContent.includes('```json')) {
//       cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '');
//     } else if (rawContent.includes('```')) {
//       cleanJson = rawContent.replace(/```/g, '');
//     }

//     // 2. Extract JSON Object (Find first { and last })
//     const firstBrace = cleanJson.indexOf('{');
//     const lastBrace = cleanJson.lastIndexOf('}');
//     if (firstBrace !== -1 && lastBrace !== -1) {
//       cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
//     }

//     // 3. Try Parse -> Heuristic -> Groq
//     try {
//       return JSON.parse(cleanJson);
//     } catch (e) {
//       addLog(`⚠️ ${stepName}: Syntax Error. Attempting Repair...`);
//       try {
//         const repaired = jsonrepair(cleanJson);
//         return JSON.parse(repaired);
//       } catch (repairError) {
//         addLog(`🚨 ${stepName}: Heuristic Failed. Calling Groq Surgeon...`);
//         try {
//           const fixed = await fixJsonWithGroq(cleanJson);
//           return JSON.parse(fixed);
//         } catch (groqError) {
//           throw new Error(`${stepName} JSON is FUBAR.`);
//         }
//       }
//     }
//   };

//   // -------------------------------------------------------------------------
//   // 🧠 MAIN LOGIC: 2-Step Generation
//   // -------------------------------------------------------------------------
//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     setActiveTab('editor'); 
//     addLog('🧠 SYSTEM: Initializing AI Protocol (Chain-of-Thought)...');

//     try {
//       addLog('📡 CONNECTING: Phase 1 - Structural Blueprint...');
      
//       // STEP 1: Generate Configs
//       const structurePrompt = `
//         Generate ONLY the configuration files for a Next.js 14 App Router project.
//         DO NOT generate any page code yet.
        
//         REQUIRED FILES:
//         - package.json (React 18, Tailwind, Lucide)
//         - next.config.mjs
//         - postcss.config.js
//         - tailwind.config.ts
//         - .babelrc
//         - tsconfig.json
        
//         Return a valid JSON object where keys are filenames and values are file content.
//       `;

//       const response1 = await model.invoke([
//         getSystemPrompt('typescript'),
//         new HumanMessage(structurePrompt)
//       ]);
      
//       addLog('⚡ STRUCTURE RECEIVED. validating...');
//       const structureTree = await robustParse(response1.content as string, "Phase 1");

//       // STEP 2: Generate UI
//       addLog('🎨 PHASE 2: Generating Application Logic...');
//       const userPrompt = "Build a simple Next.js landing page for a Cyberpunk Coffee Shop. Use Tailwind CSS. Make it look dark and neon.";
      
//       const appPrompt = `
//         You are adding files to an existing Next.js config.
//         Generate ONLY the application source code for: "${userPrompt}"
        
//         REQUIRED FILES:
//         - src/app/globals.css (Tailwind directives)
//         - src/app/layout.tsx (Root layout)
//         - src/app/page.tsx (The main landing page code)
        
//         Return a valid JSON object. DO NOT include configs (package.json, etc) again.
//       `;

//       const response2 = await model.invoke([
//         getSystemPrompt('typescript'), 
//         new HumanMessage(appPrompt)
//       ]);

//       addLog('⚡ UI RECEIVED. Merging Systems...');
//       const appTree = await robustParse(response2.content as string, "Phase 2");

//       // MERGE & EXECUTE
//       const fullTree = { ...structureTree, ...appTree };

//       // Apply Safety Patches
//       applySafetyOverrides(fullTree, addLog);

//       addLog('💾 FILESYSTEM: Writing files to virtual memory...');
//       await mountFiles(fullTree);
      
//       const treeStruct = parseJsonToTree(fullTree);
//       useFileStore.getState().setFileTree(treeStruct);

//       addLog('✅ FILESYSTEM: Write Complete.');
//       await startDevServer();

//     } catch (error: any) {
//       addLog(`❌ FATAL ERROR: ${error.message || error}`);
//       console.error(error);
      
//       // OPTIONAL: Load Backup if total failure
//       // addLog('🛡️ ENGAGING FALLBACK PROTOCOL...');
//       // await mountFiles(BACKUP_FILES);
//       // await startDevServer();
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const startDevServer = async () => {
//     const instance = await getWebContainerInstance();
    
//     // Check if node_modules exists to skip install
//     let shouldInstall = true;
//     try {
//       await instance.fs.readdir('node_modules');
//       shouldInstall = false;
//       addLog('⚡ SPEED MODE: "node_modules" detected. Skipping install.');
//     } catch (error) {
//       shouldInstall = true;
//     }

//     if (shouldInstall) {
//       addLog('📦 PACKAGE MANAGER: Installing dependencies...');
//       const installProcess = await instance.spawn('npm', [
//         'install', 
//         '--prefer-offline',
//         '--no-audit',
//         '--no-progress'
//       ]);

//       installProcess.output.pipeTo(new WritableStream({
//         write(data) { 
//           const ignored = ['|', '/', '-', '\\', 'swc', 'bad platform', 'skipping optional'];
//           if (!ignored.some(i => data.toLowerCase().includes(i))) {
//              addLog(`[npm]: ${data}`); 
//           }
//         }
//       }));

//       const installExitCode = await installProcess.exit;
//       if (installExitCode !== 0) {
//         addLog('❌ INSTALL FAILED: Dependency error. Check logs above.');
//         return;
//       }
//       addLog('✅ INSTALL COMPLETE.');
//     }

//     addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
//     const devProcess = await instance.spawn('npm', ['run', 'dev']);

//     devProcess.output.pipeTo(new WritableStream({
//       write(data) { addLog(`[Server]: ${data}`); }
//     }));

//     instance.on('server-ready', (port, url) => {
//       addLog(`🌐 SERVER ONLINE: App running at ${url}`);
//       setIframeUrl(url);
//       setActiveTab('preview');
//     });
//   };

//   return (
//     <div className="flex h-screen w-full bg-neutral-950 text-white font-sans overflow-hidden">
//       <aside className="w-[350px] lg:w-[400px] border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
//         <div className="p-4 border-b border-neutral-800 font-mono text-xs text-green-500 tracking-widest">
//            // AI_NEURAL_LINK
//         </div>
        
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex flex-col gap-4">
//             <div className="bg-neutral-900 p-4 rounded text-sm text-neutral-400">
//               Current Objective: <br/>
//               <span className="text-white">"Build a Cyberpunk Coffee Shop Landing Page"</span>
//             </div>

//             <button 
//               onClick={handleGenerate}
//               disabled={isGenerating}
//               className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-mono text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isGenerating ? (
//                 <>
//                   <span className="animate-spin">⚙️</span> PROCESSING...
//                 </>
//               ) : (
//                 <>⚡ GENERATE APP</>
//               )}
//             </button>
//           </div>

//           <div className="flex-1 overflow-hidden border-t border-neutral-800 flex flex-col">
//              <div className="px-4 py-2 bg-neutral-900/50 text-xs font-mono text-neutral-400 border-b border-neutral-800">
//                 EXPLORER
//              </div>
//              <FileExplorer />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col min-w-0">
//         <div className="h-10 border-b border-neutral-800 bg-neutral-950 flex items-center px-4 gap-4">
//           <button 
//             onClick={() => setActiveTab('editor')}
//             className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'editor' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             CODE_EDITOR
//           </button>
//           <button 
//              onClick={() => setActiveTab('preview')}
//              className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'preview' ? 'bg-blue-900/20 text-blue-400 border border-blue-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             LIVE_PREVIEW
//           </button>
//         </div>

//         <div className="flex-1 bg-[#1e1e1e] relative">
//           {activeTab === 'editor' ? (
//             <div className="absolute inset-0 bg-[#1e1e1e]">
//                <CodeEditor />
//             </div>
//           ) : (
//             <div className="absolute inset-0 bg-white">
//               {iframeUrl ? (
//                 <iframe src={iframeUrl} className="w-full h-full border-none" />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-black font-mono">
//                   [Waiting for Server Start...]
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="h-64 border-t border-neutral-800 flex flex-col">
//            <div className="px-4 py-1 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400 font-mono flex justify-between items-center">
//              <span>TERMINAL STREAM</span>
//              <span className="text-green-500">● {iframeUrl ? 'Live' : 'Idle'}</span>
//            </div>
//            <div className="flex-1 bg-black overflow-hidden relative">
//              <TerminalPanel />
//            </div>
//         </div>
//       </main>
//     </div>
//   );
// }




















// 'use client';

// import dynamic from 'next/dynamic';
// import FileExplorer from '@/components/workspace/file-tree/FileExplorer';
// import CodeEditor from '@/components/workspace/editor/CodeEditor';
// import { useWorkspace } from '@/hooks/use-workspace';

// const TerminalPanel = dynamic(
//   () => import('@/components/workspace/terminal/TerminalPanel'),
//   { ssr: false }
// );

// export default function WorkspacePage() {
//   const { 
//     activeTab, 
//     setActiveTab, 
//     isGenerating, 
//     iframeUrl, 
//     handleGenerate 
//   } = useWorkspace();

//   return (
//     <div className="flex h-screen w-full bg-neutral-950 text-white font-sans overflow-hidden">
      
//       {/* LEFT SIDEBAR */}
//       <aside className="w-[350px] lg:w-[400px] border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
//         <div className="p-4 border-b border-neutral-800 font-mono text-xs text-green-500 tracking-widest">
//            // AI_NEURAL_LINK
//         </div>
        
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex flex-col gap-4">
//             <div className="bg-neutral-900 p-4 rounded text-sm text-neutral-400">
//               Current Objective: <br/>
//               <span className="text-white">"Build a Cyberpunk Coffee Shop Landing Page"</span>
//             </div>

//             <button 
//               onClick={handleGenerate}
//               disabled={isGenerating}
//               className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-mono text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isGenerating ? (
//                 <>
//                   <span className="animate-spin">⚙️</span> PROCESSING...
//                 </>
//               ) : (
//                 <>⚡ GENERATE APP</>
//               )}
//             </button>
//           </div>

//           <div className="flex-1 overflow-hidden border-t border-neutral-800 flex flex-col">
//              <div className="px-4 py-2 bg-neutral-900/50 text-xs font-mono text-neutral-400 border-b border-neutral-800">
//                 EXPLORER
//              </div>
//              <FileExplorer />
//           </div>
//         </div>
//       </aside>

//       {/* RIGHT MAIN AREA */}
//       <main className="flex-1 flex flex-col min-w-0">
        
//         {/* TABS */}
//         <div className="h-10 border-b border-neutral-800 bg-neutral-950 flex items-center px-4 gap-4">
//           <button 
//             onClick={() => setActiveTab('editor')}
//             className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'editor' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             CODE_EDITOR
//           </button>
//           <button 
//              onClick={() => setActiveTab('preview')}
//              className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'preview' ? 'bg-blue-900/20 text-blue-400 border border-blue-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             LIVE_PREVIEW
//           </button>
//         </div>

//         {/* EDITOR / PREVIEW */}
//         <div className="flex-1 bg-[#1e1e1e] relative">
//           {activeTab === 'editor' ? (
//             <div className="absolute inset-0 bg-[#1e1e1e]">
//                <CodeEditor />
//             </div>
//           ) : (
//             <div className="absolute inset-0 bg-white">
//               {iframeUrl ? (
//                 <iframe src={iframeUrl} className="w-full h-full border-none" />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-black font-mono">
//                   [Waiting for Server Start...]
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* TERMINAL */}
//         <div className="h-64 border-t border-neutral-800 flex flex-col">
//            <div className="px-4 py-1 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400 font-mono flex justify-between items-center">
//              <span>TERMINAL STREAM</span>
//              <span className="text-green-500">● {iframeUrl ? 'Live' : 'Idle'}</span>
//            </div>
//            <div className="flex-1 bg-black overflow-hidden relative">
//              <TerminalPanel />
//            </div>
//         </div>
//       </main>
//     </div>
//   );
// }















// 'use client';

// import dynamic from 'next/dynamic';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Code2, Play, TerminalSquare, Cpu, Layers } from 'lucide-react';
// import FileExplorer from '@/components/workspace/file-tree/FileExplorer';
// import CodeEditor from '@/components/workspace/editor/CodeEditor';
// import { useWorkspace } from '@/hooks/use-workspace';

// const TerminalPanel = dynamic(() => import('@/components/workspace/terminal/TerminalPanel'), {
//   ssr: false
// });

// export default function WorkspacePage() {
//   const { activeTab, setActiveTab, isGenerating, iframeUrl, handleGenerate } = useWorkspace();

//   return (
//     <div className="flex h-screen w-full bg-[#0A0A0A] text-gray-300 font-sans overflow-hidden selection:bg-purple-500/30">

//       {/* Soft Overlay Grid */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none opacity-10"
//         style={{
//           backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
//           backgroundSize: '22px 22px'
//         }}
//       />

//       {/* LEFT SIDEBAR */}
//       <aside className="w-[310px] lg:w-[360px] z-10 flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">

//         <div className="h-14 flex items-center px-6 border-b border-white/10 bg-black/20">
//           <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
//           <span className="ml-3 font-mono text-[11px] tracking-[0.25em] text-gray-400">
//             AI_ARCHITECT // V1
//           </span>
//         </div>

//         <div className="flex-1 flex flex-col p-4 gap-6 overflow-y-auto">

//           {/* Objective Card */}
//           <div className="p-5 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-inner">
//             <div className="flex justify-between items-start mb-4 opacity-90">
//               <span className="text-xs font-mono text-purple-300">CURRENT_OBJECTIVE</span>
//               <Cpu size={14} className="text-gray-500" />
//             </div>
//             <p className="text-sm text-gray-200 leading-relaxed">
//               Build a Cyberpunk Coffee Shop Landing Page with neon accents.
//             </p>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className="relative w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
//                        hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg 
//                        disabled:opacity-40 disabled:cursor-not-allowed text-[11px] font-mono font-bold tracking-wide"
//           >
//             <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />

//             <div className="relative flex items-center justify-center gap-2">
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="animate-spin" size={16} />
//                   <span>INITIALIZING...</span>
//                 </>
//               ) : (
//                 <>
//                   <Code2 size={16} />
//                   <span>GENERATE SYSTEM</span>
//                 </>
//               )}
//             </div>
//           </button>

//           {/* File Explorer */}
//           <div className="flex-1 flex flex-col min-h-0 border border-white/10 rounded-lg bg-[#0B0B0B]/40 shadow-inner">
//             <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
//               <Layers size={14} className="text-gray-500" />
//               <span className="text-[10px] font-mono text-gray-500 tracking-widest">
//                 FILE SYSTEM
//               </span>
//             </div>
//             <div className="flex-1 overflow-y-auto p-2">
//               <FileExplorer />
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN PANEL */}
//       <main className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A] relative">

//         {/* Top Navigation */}
//         <header className="h-14 border-b border-white/10 bg-black/30 backdrop-blur-md px-6 flex items-center justify-between shadow">
//           <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-lg border border-white/10">
//             <TabButton
//               active={activeTab === 'editor'}
//               onClick={() => setActiveTab('editor')}
//               icon={<Code2 size={14} />}
//               label="SOURCE"
//             />
//             <TabButton
//               active={activeTab === 'preview'}
//               onClick={() => setActiveTab('preview')}
//               icon={<Play size={14} />}
//               label="PREVIEW"
//             />
//           </div>

//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-600/20">
//             <div className={`w-2 h-2 rounded-full ${iframeUrl ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
//             <span className="text-[10px] font-mono text-green-400">
//               {iframeUrl ? 'ONLINE' : 'STANDBY'}
//             </span>
//           </div>
//         </header>

//         {/* Dynamic Workspace Area */}
//         <div className="flex-1 relative overflow-hidden">
//           <AnimatePresence mode="wait">
//             {activeTab === 'editor' ? (
//               <motion.div
//                 key="editor"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.18 }}
//                 className="absolute inset-0"
//               >
//                 <CodeEditor />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="preview"
//                 initial={{ opacity: 0, scale: 0.97 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 1.02 }}
//                 transition={{ duration: 0.22 }}
//                 className="absolute inset-0 bg-white"
//               >
//                 {iframeUrl ? (
//                   <iframe src={iframeUrl} className="w-full h-full border-none" />
//                 ) : (
//                   <div className="flex items-center justify-center h-full flex-col gap-4 text-gray-500">
//                     <Loader2 size={40} className="animate-spin opacity-30" />
//                     <span className="font-mono text-sm tracking-wide">
//                       WAITING FOR SIGNAL...
//                     </span>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Terminal */}
//         <div className="h-64 border-t border-white/10 bg-[#090909] shadow-inner flex flex-col relative">
//           <div className="px-5 py-2 border-b border-white/10 bg-black/30 flex items-center gap-2">
//             <TerminalSquare size={14} className="text-gray-500" />
//             <span className="text-[10px] font-mono tracking-widest text-gray-400">
//               SYSTEM LOGS
//             </span>
//           </div>
//           <div className="flex-1 overflow-hidden bg-black/90 p-2 font-mono text-xs">
//             <TerminalPanel />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function TabButton({ active, onClick, icon, label }: any) {
//   const base =
//     'flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-semibold tracking-wider transition-all duration-200';
//   const activeStyles =
//     'bg-white/10 text-white shadow-inner border border-white/10';
//   const inactiveStyles =
//     'text-gray-400 hover:text-gray-200 hover:bg-white/5';

//   return (
//     <button onClick={onClick} className={`${base} ${active ? activeStyles : inactiveStyles}`}>
//       {icon}
//       {label}
//     </button>
//   );
// }



















'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Loader2, Code2, Play, TerminalSquare, Cpu, Layers, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import FileExplorer from '@/components/workspace/file-tree/FileExplorer';
import CodeEditor from '@/components/workspace/editor/CodeEditor';
import { useWorkspace } from '@/hooks/use-workspace';
import { fitAddonRef } from '@/components/workspace/terminal/TerminalPanel';

const TerminalPanel = dynamic(() => import('@/components/workspace/terminal/TerminalPanel'), {
  ssr: false
});

export default function WorkspacePage() {
  const { activeTab, setActiveTab, isGenerating, iframeUrl, handleGenerate } = useWorkspace();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);

  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(260);

  const draggingSidebar = useRef(false);
  const draggingTerminal = useRef(false);

  const startSidebarDrag = () => (draggingSidebar.current = true);
  const startTerminalDrag = () => (draggingTerminal.current = true);

  const onSidebarDrag = (e: MouseEvent) => {
    if (!draggingSidebar.current) return;
    const w = Math.min(480, Math.max(180, e.clientX));
    setSidebarWidth(w);
  };

  const onTerminalDrag = (e: MouseEvent) => {
    if (!draggingTerminal.current) return;
    const h = Math.min(500, Math.max(120, window.innerHeight - e.clientY));
    setTerminalHeight(h);

    setTimeout(() => {
      fitAddonRef.current?.fit();
    }, 0);
  };

  const stopDrag = () => {
    draggingSidebar.current = false;
    draggingTerminal.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onSidebarDrag);
    window.addEventListener('mousemove', onTerminalDrag);
    window.addEventListener('mouseup', stopDrag);

    return () => {
      window.removeEventListener('mousemove', onSidebarDrag);
      window.removeEventListener('mousemove', onTerminalDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-gray-300 font-sans overflow-hidden">

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{ width: sidebarWidth }}
            className="h-full flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl relative"
          >
            <div className="h-14 flex items-center px-6 border-b border-white/10 bg-black/20">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <span className="ml-3 font-mono text-[11px] tracking-[0.25em] text-gray-400">AI_ARCHITECT // V1</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="p-5 rounded-lg border border-white/10 bg-white/5">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-purple-300">CURRENT_OBJECTIVE</span>
                  <Cpu size={14} className="text-gray-500" />
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">Build a Cyberpunk Coffee Shop Landing Page with neon accents.</p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="relative w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
              >
                <div className="relative flex items-center justify-center gap-2 text-sm">
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Initializing...
                    </>
                  ) : (
                    <>
                      <Code2 size={14} />
                      Generate System
                    </>
                  )}
                </div>
              </button>

              <div className="flex-1 flex flex-col border border-white/10 rounded-lg bg-[#0B0B0B]/40 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
                  <Layers size={14} className="text-gray-500" />
                  <span className="text-[10px] font-mono tracking-widest">FILE SYSTEM</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  <FileExplorer />
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-l-lg border border-white/10"
            >
              <ChevronLeft size={16} />
            </button>

            <div
              onMouseDown={startSidebarDrag}
              className="absolute right-0 top-0 w-[4px] h-full cursor-col-resize bg-transparent hover:bg-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-[32px] flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border-r border-white/10"
        >
          <ChevronRight size={16} />
        </button>
      )}

      <div className="flex-1 flex flex-col min-w-0">

        <header className="h-14 border-b border-white/10 bg-black/30 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-lg border border-white/10">
            <TabButton active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Code2 size={14} />} label="SOURCE" />
            <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} icon={<Play size={14} />} label="PREVIEW" />
          </div>

          <button onClick={() => setTerminalOpen(!terminalOpen)} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <ChevronsUpDown size={14} />
            {terminalOpen ? "Hide Terminal" : "Show Terminal"}
          </button>
        </header>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' ? (
              <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                <CodeEditor />
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white">
                {iframeUrl ? (
                  <iframe src={iframeUrl} className="w-full h-full border-none" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <Loader2 size={40} className="animate-spin opacity-50" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#090909] border-t border-white/10"
              style={{ height: terminalHeight }}
            >
              <div
                onMouseDown={startTerminalDrag}
                className="absolute -top-[3px] left-0 w-full h-[6px] cursor-row-resize bg-white/5 hover:bg-white/10"
              />

              <div className="px-5 py-2 border-b border-white/10 bg-black/30 flex items-center gap-2 text-gray-500">
                <TerminalSquare size={14} />
                <span className="text-[10px] font-mono tracking-widest">SYSTEM LOGS</span>
              </div>

              <div className="h-full overflow-hidden p-2 bg-black/90">
                <TerminalPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-semibold transition-all";
  const activeStyles = "bg-white/10 text-white border border-white/10 shadow-inner";
  const inactiveStyles = "text-gray-400 hover:text-gray-200 hover:bg-white/5";

  return (
    <button onClick={onClick} className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}>
      {icon}
      {label}
    </button>
  );
}
