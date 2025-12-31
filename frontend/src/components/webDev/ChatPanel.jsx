// "use client";

// import { useState } from "react";
// import { usePlaygroundChat } from "../../../hooks/usePlaygroundChat";

// export default function ChatPanel({ onGenerate, onReset }) {
//   const [input, setInput] = useState("");
//   const { messages, addUser, addButler, resetChat } =
//     usePlaygroundChat();

//   const sendPrompt = async () => {
//     if (!input.trim()) return;

//     const prompt = input.trim();
//     setInput("");

//     addUser(prompt);
//     onGenerate(context ? context : prompt);


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

//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         placeholder="Describe the component..."
//         className="mt-2 w-full h-20 p-2 bg-[#111] border border-gray-700 rounded resize-none"
//       />

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

import { useState } from "react";
import { usePlaygroundChat } from "../../../hooks/usePlaygroundChat";

export default function ChatPanel({ onGenerate, onReset }) {
  const [input, setInput] = useState("");

  const {
    messages,
    context,
    addUser,
    addButler,
    resetChat
  } = usePlaygroundChat();

  const sendPrompt = async () => {
    if (!input.trim()) return;

    const prompt = input.trim();
    setInput("");

    // 1. Store user message + extend context
    addUser(prompt);

    // 2. Build contextual prompt for generator
    const finalPrompt = context
      ? `${context}\nThen, ${prompt}`
      : prompt;

    // 3. Trigger code generation (unchanged flow)
    onGenerate(finalPrompt);

    // 4. Get playful butler response (UX only)
    const res = await fetch("/api/chat/butler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    if (data.reply) addButler(data.reply);
  };

  const handleReset = () => {
    resetChat();
    onReset?.();
  };

  return (
    <div className="flex flex-col h-full">

      {/* CHAT HISTORY */}
      <div className="flex-1 space-y-2 overflow-y-auto text-sm">
        {messages.map(m => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "text-white"
                : "text-gray-400 italic"
            }
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Describe the component..."
        className="mt-2 w-full h-20 p-2 bg-[#111] border border-gray-700 rounded resize-none focus:outline-none"
      />

      {/* ACTIONS */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={sendPrompt}
          className="flex-1 py-2 bg-blue-600 text-white rounded"
        >
          Generate
        </button>

        <button
          onClick={handleReset}
          className="py-2 px-4 bg-[#1a1a1a] rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
