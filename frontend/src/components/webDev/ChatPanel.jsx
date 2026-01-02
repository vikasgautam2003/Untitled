






// "use client";

// import { useState } from "react";
// import { usePlaygroundChat } from "../../../hooks/usePlaygroundChat";

// export default function ChatPanel({ onGenerate, onReset }) {
//   const [input, setInput] = useState("");

//   const {
//     messages,
//     context,
//     addUser,
//     addButler,
//     resetChat
//   } = usePlaygroundChat();

//   const sendPrompt = async () => {
//     if (!input.trim()) return;

//     const prompt = input.trim();
//     setInput("");

//     // 1. Store user message + extend context
//     addUser(prompt);

//     // 2. Build contextual prompt for generator
//     const finalPrompt = context
//       ? `${context}\nThen, ${prompt}`
//       : prompt;

//     // 3. Trigger code generation (unchanged flow)
//     onGenerate(finalPrompt);

//     // 4. Get playful butler response (UX only)
//     const res = await fetch("/api/chat/butler", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt })
//     });

//     const data = await res.json();
//     if (data.reply) addButler(data.reply);
//   };

//   const handleReset = () => {
//     resetChat();
//     onReset?.();
//   };

//   return (
//     <div className="flex flex-col h-full">

//       {/* CHAT HISTORY */}
//       <div className="flex-1 space-y-2 overflow-y-auto text-sm">
//         {messages.map(m => (
//           <div
//             key={m.id}
//             className={
//               m.role === "user"
//                 ? "text-white"
//                 : "text-gray-400 italic"
//             }
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       {/* INPUT */}
//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         placeholder="Describe the component..."
//         className="mt-2 w-full h-20 p-2 bg-[#111] border border-gray-700 rounded resize-none focus:outline-none"
//       />

//       {/* ACTIONS */}
//       <div className="mt-2 flex gap-2">
//         <button
//           onClick={sendPrompt}
//           className="flex-1 py-2 bg-blue-600 text-white rounded"
//         >
//           Generate
//         </button>

//         <button
//           onClick={handleReset}
//           className="py-2 px-4 bg-[#1a1a1a] rounded"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }


















"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Bot, User, Sparkles } from "lucide-react";
import { usePlaygroundChat } from "../../../hooks/usePlaygroundChat";

export default function ChatPanel({ onGenerate, onReset }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const {
    messages,
    context,
    addUser,
    addButler,
    resetChat
  } = usePlaygroundChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPrompt = async () => {
    if (!input.trim()) return;
    const prompt = input.trim();
    setInput("");
    addUser(prompt);

    const finalPrompt = context ? `${context}\nThen, ${prompt}` : prompt;
    onGenerate(finalPrompt);

    try {
      const res = await fetch("/api/chat/butler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.reply) addButler(data.reply);
    } catch {}
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  const handleReset = () => {
    resetChat();
    onReset?.();
  };

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-hidden">

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm font-medium">Describe what you want to build</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role !== "user" && (
              <div className="w-8 h-8 rounded-full bg-black border border-gray-800 flex items-center justify-center text-blue-500">
                <Bot size={14} />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-white text-black rounded-2xl rounded-br-sm"
                  : "bg-[#111] border border-gray-800 text-gray-200 rounded-2xl rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <User size={14} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-900 bg-black px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Prompt
          </span>
          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-red-500 transition"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the component or UI behavior…"
            className="w-full h-[78px] px-4 py-3 pr-12 text-sm text-white bg-[#0b0b0b] border border-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition placeholder:text-gray-500"
          />

          <button
            onClick={sendPrompt}
            disabled={!input.trim()}
            className="absolute right-2 bottom-2 w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition shadow-sm"
          >
            <Send size={15} />
          </button>
        </div>

        <div className="mt-2 text-center text-[10px] text-gray-600">
          Press <span className="font-mono bg-[#111] px-1 rounded text-gray-400">Enter</span> to send
        </div>
      </div>
    </div>
  );
}
