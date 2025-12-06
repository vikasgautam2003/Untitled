'use client';

import { motion } from 'framer-motion';
import { Loader2, Code2, Cpu, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import FileExplorer from '@/components/workspace/file-tree/FileExplorer';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  sidebarWidth: number;
  startSidebarDrag: () => void;
  isGenerating: boolean;
  handleGenerate: () => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarWidth,
  startSidebarDrag,
  isGenerating,
  handleGenerate
}: SidebarProps) {
  if (!sidebarOpen) {
    return (
      <div className="w-[40px] border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl flex flex-col items-center py-4 z-10">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      style={{ width: sidebarWidth }}
      className="z-10 h-full flex flex-col border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl relative shadow-2xl"
    >
      <div className="h-14 flex items-center px-6 border-b border-white/5 bg-white/2">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
        <span className="ml-3 font-mono text-[10px] font-bold tracking-[0.25em] text-gray-400">
          AI_ARCHITECT // V1
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="p-5 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] font-mono text-purple-400 tracking-wider">CURRENT_OBJECTIVE</span>
            <Cpu size={14} className="text-gray-600" />
          </div>
          <p className="text-sm text-gray-300 font-medium leading-relaxed relative z-10">
            "Build a Cyberpunk Coffee Shop Landing Page."
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="group relative w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative flex items-center justify-center gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                <span>INITIALIZING NEURAL LINK...</span>
              </>
            ) : (
              <>
                <Code2 size={14} />
                <span>GENERATE SYSTEM</span>
              </>
            )}
          </div>
        </button>

        <div className="flex-1 flex flex-col min-h-0 border border-white/5 rounded-xl bg-[#000]/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 bg-white/2 flex items-center gap-2">
            <Layers size={14} className="text-gray-600" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">File System</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <FileExplorer />
          </div>
        </div>
      </div>

      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center bg-[#0a0a0a] border border-white/10 rounded-r-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors z-20"
      >
        <ChevronLeft size={14} />
      </button>

      <div
        onMouseDown={startSidebarDrag}
        className="absolute right-0 top-0 w-[4px] h-full cursor-col-resize hover:bg-purple-500/50 transition-colors z-30"
      />
    </motion.div>
  );
}
