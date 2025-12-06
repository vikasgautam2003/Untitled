'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles, ChevronLeft, Send, Bot, User, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatSidebarProps {
  open: boolean;
  width: number;
  onResize: (e: any) => void;
  onToggle: () => void;
  isGenerating: boolean;
  onGenerate: (prompt: string) => void;
}

export default function ChatSidebar({
  open,
  width,
  onResize,
  onToggle,
  isGenerating,
  onGenerate
}: ChatSidebarProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "System Online. Ready to architect. What are we building?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || isGenerating) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    onGenerate(input);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!open) {
    return (
      <div className="w-[50px] border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl flex flex-col items-center py-4 z-20">
        <button onClick={onToggle} className="p-3 rounded-xl hover:bg-white/10 text-purple-400 hover:text-white transition-all shadow-glow">
          <Sparkles size={20} />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: width, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="h-full flex flex-col border-r border-white/5 bg-[#0a0a0a]/90 backdrop-blur-2xl relative z-20 shadow-2xl"
    >
      <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-gray-300">AI_ARCHITECT</span>
        </div>
        <button onClick={() => setMessages([])} className="text-gray-600 hover:text-red-400 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'}`}>
              {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`p-3 rounded-lg text-xs leading-relaxed font-mono ${msg.role === 'ai' ? 'bg-white/5 text-gray-300' : 'bg-blue-500/10 text-blue-100 border border-blue-500/20'}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center shrink-0">
              <Loader2 className="animate-spin text-purple-400" size={16} />
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-gray-400 text-xs font-mono animate-pulse">
              Analyzing Neural Pathways...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
            placeholder="Instruct the system..."
            className="w-full bg-[#111] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors text-gray-200 placeholder:text-gray-700 font-mono resize-none h-[50px] group-hover:border-white/20"
          />
          <button
            onClick={handleSubmit}
            disabled={isGenerating || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-500/20"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      <div onMouseDown={onResize} className="absolute right-0 top-0 w-[4px] h-full cursor-col-resize hover:bg-purple-500/50 transition-colors z-30" />

      <button onClick={onToggle} className="absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-10 flex items-center justify-center bg-[#0a0a0a] border-y border-r border-white/10 rounded-r-md text-gray-500 hover:text-white hover:bg-white/5 z-10">
        <ChevronLeft size={14} />
      </button>
    </motion.div>
  );
}
