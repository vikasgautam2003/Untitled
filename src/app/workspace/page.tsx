













// 'use client';

// import dynamic from 'next/dynamic';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { Loader2, Code2, Play, TerminalSquare, Cpu, Layers, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
// import FileExplorer from '@/components/workspace/file-tree/FileExplorer';
// import CodeEditor from '@/components/workspace/editor/CodeEditor';
// import { useWorkspace } from '@/hooks/use-workspace';
// import { fitAddonRef } from '@/components/workspace/terminal/TerminalPanel';

// const TerminalPanel = dynamic(() => import('@/components/workspace/terminal/TerminalPanel'), {
//   ssr: false
// });

// export default function WorkspacePage() {
//   const { activeTab, setActiveTab, isGenerating, iframeUrl, handleGenerate } = useWorkspace();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarWidth, setSidebarWidth] = useState(320);

//   const [terminalOpen, setTerminalOpen] = useState(true);
//   const [terminalHeight, setTerminalHeight] = useState(260);

//   const draggingSidebar = useRef(false);
//   const draggingTerminal = useRef(false);

//   const startSidebarDrag = () => (draggingSidebar.current = true);
//   const startTerminalDrag = () => (draggingTerminal.current = true);

//   const onSidebarDrag = (e: MouseEvent) => {
//     if (!draggingSidebar.current) return;
//     const w = Math.min(480, Math.max(180, e.clientX));
//     setSidebarWidth(w);
//   };

//   const onTerminalDrag = (e: MouseEvent) => {
//     if (!draggingTerminal.current) return;
//     const h = Math.min(500, Math.max(120, window.innerHeight - e.clientY));
//     setTerminalHeight(h);

//     setTimeout(() => {
//       fitAddonRef.current?.fit();
//     }, 0);
//   };

//   const stopDrag = () => {
//     draggingSidebar.current = false;
//     draggingTerminal.current = false;
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', onSidebarDrag);
//     window.addEventListener('mousemove', onTerminalDrag);
//     window.addEventListener('mouseup', stopDrag);

//     return () => {
//       window.removeEventListener('mousemove', onSidebarDrag);
//       window.removeEventListener('mousemove', onTerminalDrag);
//       window.removeEventListener('mouseup', stopDrag);
//     };
//   }, []);

//   return (
//     <div className="flex h-screen w-full bg-[#0A0A0A] text-gray-300 font-sans overflow-hidden">

//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.2 }}
//             style={{ width: sidebarWidth }}
//             className="h-full flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl relative"
//           >
//             <div className="h-14 flex items-center px-6 border-b border-white/10 bg-black/20">
//               <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
//               <span className="ml-3 font-mono text-[11px] tracking-[0.25em] text-gray-400">AI_ARCHITECT // V1</span>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-6">
//               <div className="p-5 rounded-lg border border-white/10 bg-white/5">
//                 <div className="flex justify-between items-start mb-4">
//                   <span className="text-xs font-mono text-purple-300">CURRENT_OBJECTIVE</span>
//                   <Cpu size={14} className="text-gray-500" />
//                 </div>
//                 <p className="text-sm text-gray-200 leading-relaxed">Build a Cyberpunk Coffee Shop Landing Page with neon accents.</p>
//               </div>

//               <button
//                 onClick={handleGenerate}
//                 disabled={isGenerating}
//                 className="relative w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
//               >
//                 <div className="relative flex items-center justify-center gap-2 text-sm">
//                   {isGenerating ? (
//                     <>
//                       <Loader2 className="animate-spin" size={16} />
//                       Initializing...
//                     </>
//                   ) : (
//                     <>
//                       <Code2 size={14} />
//                       Generate System
//                     </>
//                   )}
//                 </div>
//               </button>

//               <div className="flex-1 flex flex-col border border-white/10 rounded-lg bg-[#0B0B0B]/40 overflow-hidden">
//                 <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
//                   <Layers size={14} className="text-gray-500" />
//                   <span className="text-[10px] font-mono tracking-widest">FILE SYSTEM</span>
//                 </div>
//                 <div className="flex-1 overflow-y-auto p-2">
//                   <FileExplorer />
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-l-lg border border-white/10"
//             >
//               <ChevronLeft size={16} />
//             </button>

//             <div
//               onMouseDown={startSidebarDrag}
//               className="absolute right-0 top-0 w-[4px] h-full cursor-col-resize bg-transparent hover:bg-white/10"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!sidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="w-[32px] flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border-r border-white/10"
//         >
//           <ChevronRight size={16} />
//         </button>
//       )}

//       <div className="flex-1 flex flex-col min-w-0">

//         <header className="h-14 border-b border-white/10 bg-black/30 backdrop-blur-md px-6 flex items-center justify-between">
//           <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-lg border border-white/10">
//             <TabButton active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Code2 size={14} />} label="SOURCE" />
//             <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} icon={<Play size={14} />} label="PREVIEW" />
//           </div>

//           <button onClick={() => setTerminalOpen(!terminalOpen)} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
//             <ChevronsUpDown size={14} />
//             {terminalOpen ? "Hide Terminal" : "Show Terminal"}
//           </button>
//         </header>

//         <div className="flex-1 relative overflow-hidden">
//           <AnimatePresence mode="wait">
//             {activeTab === 'editor' ? (
//               <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
//                 <CodeEditor />
//               </motion.div>
//             ) : (
//               <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white">
//                 {iframeUrl ? (
//                   <iframe src={iframeUrl} className="w-full h-full border-none" />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-500">
//                     <Loader2 size={40} className="animate-spin opacity-50" />
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <AnimatePresence>
//           {terminalOpen && (
//             <motion.div
//               key="terminal"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.2 }}
//               className="relative bg-[#090909] border-t border-white/10"
//               style={{ height: terminalHeight }}
//             >
//               <div
//                 onMouseDown={startTerminalDrag}
//                 className="absolute -top-[3px] left-0 w-full h-[6px] cursor-row-resize bg-white/5 hover:bg-white/10"
//               />

//               <div className="px-5 py-2 border-b border-white/10 bg-black/30 flex items-center gap-2 text-gray-500">
//                 <TerminalSquare size={14} />
//                 <span className="text-[10px] font-mono tracking-widest">SYSTEM LOGS</span>
//               </div>

//               <div className="h-full overflow-hidden p-2 bg-black/90">
//                 <TerminalPanel />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// function TabButton({ active, onClick, icon, label }: any) {
//   const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-semibold transition-all";
//   const activeStyles = "bg-white/10 text-white border border-white/10 shadow-inner";
//   const inactiveStyles = "text-gray-400 hover:text-gray-200 hover:bg-white/5";

//   return (
//     <button onClick={onClick} className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}>
//       {icon}
//       {label}
//     </button>
//   );
// }









// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { AnimatePresence } from 'framer-motion';
// import { useWorkspace } from '@/hooks/use-workspace';
// import { fitAddonRef } from '@/components/workspace/terminal/TerminalPanel';

// import Sidebar from '@/components/workspace/Sidebar';
// import EditorPanel from '@/components/workspace/EditorPanel';
// import TerminalWindow from '@/components/workspace/TerminalWindow';

// export default function WorkspacePage() {
//   const { activeTab, setActiveTab, isGenerating, iframeUrl, handleGenerate } = useWorkspace();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarWidth, setSidebarWidth] = useState(320);
//   const [terminalOpen, setTerminalOpen] = useState(true);
//   const [terminalHeight, setTerminalHeight] = useState(260);

//   const draggingSidebar = useRef(false);
//   const draggingTerminal = useRef(false);

//   const startSidebarDrag = () => (draggingSidebar.current = true);
//   const startTerminalDrag = () => (draggingTerminal.current = true);

//   const onSidebarDrag = (e: MouseEvent) => {
//     if (!draggingSidebar.current) return;
//     const w = Math.min(480, Math.max(180, e.clientX));
//     setSidebarWidth(w);
//   };

//   const onTerminalDrag = (e: MouseEvent) => {
//     if (!draggingTerminal.current) return;
//     const h = Math.min(500, Math.max(120, window.innerHeight - e.clientY));
//     setTerminalHeight(h);
//     setTimeout(() => fitAddonRef.current?.fit(), 0);
//   };

//   const stopDrag = () => {
//     draggingSidebar.current = false;
//     draggingTerminal.current = false;
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', onSidebarDrag);
//     window.addEventListener('mousemove', onTerminalDrag);
//     window.addEventListener('mouseup', stopDrag);
//     return () => {
//       window.removeEventListener('mousemove', onSidebarDrag);
//       window.removeEventListener('mousemove', onTerminalDrag);
//       window.removeEventListener('mouseup', stopDrag);
//     };
//   }, []);

//   return (
//     <div className="flex h-screen w-full bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-purple-500/30">
//       <div
//         className="fixed inset-0 z-0 pointer-events-none opacity-20"
//         style={{
//           backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
//           backgroundSize: '24px 24px'
//         }}
//       />

//       <AnimatePresence>
//         <Sidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           sidebarWidth={sidebarWidth}
//           startSidebarDrag={startSidebarDrag}
//           isGenerating={isGenerating}
//           handleGenerate={handleGenerate}
//         />
//       </AnimatePresence>

//       <main className="flex-1 flex flex-col min-w-0 z-10 relative">
//         <EditorPanel
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           iframeUrl={iframeUrl}
//           terminalOpen={terminalOpen}
//           setTerminalOpen={setTerminalOpen}
//         />

//         <TerminalWindow
//           open={terminalOpen}
//           height={terminalHeight}
//           startDrag={startTerminalDrag}
//           iframeUrl={iframeUrl}
//         />
//       </main>
//     </div>
//   );
// }






'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Play, TerminalSquare, ChevronsUpDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useWorkspace } from '@/hooks/use-workspace';
import CodeEditor from '@/components/workspace/editor/CodeEditor';
import ChatSidebar from '@/components/workspace/ChatSidebar';
import FileSidebar from '@/components/workspace/FileSidebar';
import { fitAddonRef } from '@/components/workspace/terminal/TerminalPanel';

const TerminalPanel = dynamic(() => import('@/components/workspace/terminal/TerminalPanel'), { ssr: false });

export default function WorkspacePage() {
  const { activeTab, setActiveTab, isGenerating, iframeUrl, handleGenerate, handleUpdate } = useWorkspace();

  const [leftOpen, setLeftOpen] = useState(true);
  const [leftWidth, setLeftWidth] = useState(320);
  const [rightOpen, setRightOpen] = useState(true);
  const [rightWidth, setRightWidth] = useState(280);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(260);

  const draggingLeft = useRef(false);
  const draggingRight = useRef(false);
  const draggingTerminal = useRef(false);

  const startLeftDrag = () => (draggingLeft.current = true);
  const startRightDrag = () => (draggingRight.current = true);
  const startTerminalDrag = () => (draggingTerminal.current = true);

  const onMouseMove = (e: MouseEvent) => {
    if (draggingLeft.current) setLeftWidth(Math.min(500, Math.max(250, e.clientX)));
    if (draggingRight.current) setRightWidth(Math.min(400, Math.max(200, window.innerWidth - e.clientX)));
    if (draggingTerminal.current) {
      const h = Math.min(600, Math.max(100, window.innerHeight - e.clientY));
      setTerminalHeight(h);
      setTimeout(() => fitAddonRef.current?.fit(), 0);
    }
  };

  const onMouseUp = () => {
    draggingLeft.current = false;
    draggingRight.current = false;
    draggingTerminal.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-purple-500/30">
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <ChatSidebar
        open={leftOpen}
        width={leftWidth}
        onResize={startLeftDrag}
        onToggle={() => setLeftOpen(!leftOpen)}
        isGenerating={isGenerating}
        onGenerate={(prompt) => {
          console.log('Chat Prompt:', prompt);
          if (iframeUrl) {
              handleUpdate(prompt); // Evolution Mode
          } else {
              handleGenerate(prompt);; // Genesis Mode (ignoring prompt for now, or pass it)
          }
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <header className="h-14 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#000]/50 p-1 rounded-lg border border-white/5">
            <TabButton active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Code2 size={14} />} label="SOURCE" />
            <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} icon={<Play size={14} />} label="PREVIEW" />
          </div>

          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="text-[10px] font-mono text-gray-500 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/5 transition-colors"
          >
            <ChevronsUpDown size={14} />
            {terminalOpen ? 'HIDE' : 'SHOW'} LOGS
          </button>
        </header>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' ? (
              <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1e1e1e]">
                <CodeEditor />
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white">
                {iframeUrl ? (
                  <iframe src={iframeUrl} className="w-full h-full border-none" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs font-mono">WAITING FOR SERVER...</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: terminalHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative bg-[#090909] border-t border-white/10"
            >
              <div onMouseDown={startTerminalDrag} className="absolute -top-[3px] left-0 w-full h-[6px] cursor-row-resize bg-transparent hover:bg-purple-500/50 z-30" />

              <div className="px-5 py-2 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <TerminalSquare size={14} />
                  <span className="text-[10px] font-mono tracking-widest">SYSTEM OUTPUT</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${iframeUrl ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              </div>

              <div className="h-full p-2 bg-black/90 overflow-hidden">
                <TerminalPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FileSidebar open={rightOpen} width={rightWidth} onResize={startRightDrag} onToggle={() => setRightOpen(!rightOpen)} />
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold tracking-wider transition-all ${
        active ? 'bg-[#1e1e1e] text-white border border-white/5' : 'text-gray-500 hover:bg-white/5'
      }`}
    >
      {icon} {label}
    </button>
  );
}
