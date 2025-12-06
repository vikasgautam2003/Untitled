'use client';

import { motion } from 'framer-motion';
import { Layers, ChevronRight } from 'lucide-react';
import FileExplorer from '@/components/workspace/file-tree/FileExplorer';

interface FileSidebarProps {
  open: boolean;
  width: number;
  onResize: (e: any) => void;
  onToggle: () => void;
}

export default function FileSidebar({ open, width, onResize, onToggle }: FileSidebarProps) {
  if (!open) {
    return (
      <div className="w-[40px] border-l border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl flex flex-col items-center py-4 z-20">
        <button onClick={onToggle} className="p-2 rounded-md hover:bg-white/10 text-gray-500 hover:text-white">
          <Layers size={18} />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: width, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="h-full flex flex-col border-l border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.3)]"
    >
      <div className="h-14 flex items-center px-4 border-b border-white/5 bg-white/2 gap-3">
        <Layers size={14} className="text-blue-400" />
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          File System
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <FileExplorer />
      </div>

      <div
        onMouseDown={onResize}
        className="absolute left-0 top-0 w-[4px] h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-30"
      />

      <button
        onClick={onToggle}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-10 flex items-center justify-center bg-[#0a0a0a] border-y border-l border-white/10 rounded-l-md text-gray-500 hover:text-white hover:bg-white/5 z-10"
      >
        <ChevronRight size={14} />
      </button>
    </motion.div>
  );
}
