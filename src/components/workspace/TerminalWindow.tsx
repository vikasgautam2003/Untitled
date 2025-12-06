
'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSquare } from 'lucide-react';

const TerminalPanel = dynamic(() => import('@/components/workspace/terminal/TerminalPanel'), {
  ssr: false
});

interface TerminalWindowProps {
  open: boolean;
  height: number;
  startDrag: () => void;
  iframeUrl: string | null;
}

export default function TerminalWindow({ open, height, startDrag, iframeUrl }: TerminalWindowProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#080808] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20"
          style={{ height }}
        >
          <div
            onMouseDown={startDrag}
            className="absolute -top-[3px] left-0 w-full h-[6px] cursor-row-resize bg-transparent hover:bg-purple-500/50 transition-colors z-30"
          />

          <div className="px-5 py-2 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <TerminalSquare size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">System Logs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${iframeUrl ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-[10px] font-mono text-gray-600">
                {iframeUrl ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          <div className="h-full overflow-hidden p-2 bg-black/90">
            <TerminalPanel />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
