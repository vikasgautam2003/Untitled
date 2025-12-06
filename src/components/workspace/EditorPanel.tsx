'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Code2, Play, ChevronsUpDown } from 'lucide-react';
import CodeEditor from '@/components/workspace/editor/CodeEditor';

interface EditorPanelProps {
  activeTab: 'editor' | 'preview';
  setActiveTab: (tab: 'editor' | 'preview') => void;
  iframeUrl: string | null;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
}

export default function EditorPanel({
  activeTab,
  setActiveTab,
  iframeUrl,
  terminalOpen,
  setTerminalOpen
}: EditorPanelProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#050505] relative h-full">
      <header className="h-14 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-[#000]/50 p-1 rounded-lg border border-white/5">
          <TabButton
            active={activeTab === 'editor'}
            onClick={() => setActiveTab('editor')}
            icon={<Code2 size={14} />}
            label="SOURCE"
          />
          <TabButton
            active={activeTab === 'preview'}
            onClick={() => setActiveTab('preview')}
            icon={<Play size={14} />}
            label="PREVIEW"
          />
        </div>

        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="text-[10px] font-mono text-gray-500 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/5 transition-colors"
        >
          <ChevronsUpDown size={14} />
          {terminalOpen ? "HIDE_TERMINAL" : "SHOW_TERMINAL"}
        </button>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'editor' ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <CodeEditor />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            >
              {iframeUrl ? (
                <iframe src={iframeUrl} className="w-full h-full border-none" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <Loader2 size={40} className="animate-spin opacity-20" />
                  <span className="font-mono text-xs tracking-widest opacity-50">
                    WAITING FOR SIGNAL...
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold tracking-wider transition-all duration-200
        ${
          active
            ? "bg-[#1e1e1e] text-white shadow-lg shadow-black/50 border border-white/5"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}
