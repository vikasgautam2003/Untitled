



// "use client";

// import { useState } from "react";
// import EditorPane from "./EditorPane";
// import PreviewPane from "./PreviewPane";
// import { useAIStream } from "../../../hooks/useAIStream";

// export default function PlaygroundShell() {
//   const [activeView, setActiveView] = useState("editor");
//   const [prompt, setPrompt] = useState("");

//   const {
//   streamedCode,
//   finalCode,
//   editableCode,
//   setEditableCode,
//   isStreaming,
//   canPreview,
//   startStream,
//   regenerate,
//   applyEdits,
//   reset
// } = useAIStream();

//   return (
//     <div className="flex h-full min-h-0 bg-black text-gray-200">

//       <aside className="w-1/4 h-full min-h-0 border-r border-gray-800 p-4 bg-[#0d0d0d]">
//         <h2 className="font-semibold mb-2 text-white">Web Dev Playground</h2>
//         <p className="text-sm text-gray-400">
//           Describe a component to generate it.
//         </p>

//         <textarea
//           value={prompt}
//           onChange={e => setPrompt(e.target.value)}
//           placeholder="e.g. Create a responsive navbar with Tailwind"
//           className="mt-4 w-full h-28 p-2 text-sm rounded bg-[#111] border border-gray-700 text-gray-200 resize-none focus:outline-none"
//         />

//         <button
//           onClick={() => startStream(prompt)}
//           disabled={isStreaming || !prompt.trim()}
//           className="mt-3 w-full py-2 rounded text-sm bg-blue-600 text-white disabled:opacity-50"
//         >
//           {isStreaming ? "Generating…" : "Generate"}
//         </button>

//         <div className="mt-2 grid grid-cols-2 gap-2">
//           <button
//             onClick={regenerate}
//             disabled={isStreaming || !prompt.trim()}
//             className="py-2 rounded text-sm bg-[#1a1a1a] hover:bg-[#222] disabled:opacity-40"
//           >
//             Regenerate
//           </button>

//           <button
//             onClick={() => {
//               reset();
//               setPrompt("");
//               setActiveView("editor");
//             }}
//             disabled={isStreaming}
//             className="py-2 rounded text-sm bg-[#1a1a1a] hover:bg-[#222] disabled:opacity-40"
//           >
//             Reset
//           </button>
//         </div>

//         {isStreaming && (
//           <div className="mt-3 text-xs text-gray-400">
//             AI is generating…
//           </div>
//         )}
//       </aside>

//       <section className="w-3/4 h-full min-h-0 flex flex-col bg-[#0b0b0b]">
//         <div className="border-b border-gray-800 px-4 py-2 flex gap-2 bg-[#111]">
//           <button
//             onClick={() => setActiveView("editor")}
//             className={`px-3 py-1 rounded text-sm transition ${
//               activeView === "editor"
//                 ? "bg-blue-600 text-white"
//                 : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
//             }`}
//           >
//             Editor
//           </button>

//           <button
//             onClick={() => setActiveView("preview")}
//             disabled={!canPreview}
//             className={`px-3 py-1 rounded text-sm transition ${
//               activeView === "preview"
//                 ? "bg-blue-600 text-white"
//                 : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
//             } disabled:opacity-40 disabled:cursor-not-allowed`}
//           >
//             Preview
//           </button>
//         </div>

//         <div className="flex-1 min-h-0 overflow-hidden bg-black">
//   {activeView === "editor" ? (
//     <>
//       <EditorPane
//         code={canPreview ? editableCode : streamedCode}
//         isStreaming={isStreaming}
//         isEditable={canPreview}
//         onChange={setEditableCode}
//       />

//       {canPreview && (
//         <div className="border-t border-gray-800 p-2 flex justify-end bg-[#0b0b0b]">
//           <button
//             onClick={applyEdits}
//             className="px-3 py-1 rounded text-sm bg-green-600 text-white hover:bg-green-700"
//           >
//             Apply changes
//           </button>
//         </div>
//       )}
//     </>
//   ) : (
//     <PreviewPane code={finalCode} />
//   )}
// </div>

//       </section>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";
import ChatPanel from "./ChatPanel";
import { useAIStream } from "../../../hooks/useAIStream";

export default function PlaygroundShell() {
  const [activeView, setActiveView] = useState("editor");

  const {
    streamedCode,
    finalCode,
    editableCode,
    setEditableCode,
    isStreaming,
    canPreview,
    startStream,
    regenerate,
    applyEdits,
    reset
  } = useAIStream();

  return (
    <div className="flex h-full min-h-0 bg-black text-gray-200">

      {/* LEFT — CHAT */}
      <aside className="w-1/4 h-full min-h-0 border-r border-gray-800 p-4 bg-[#0d0d0d]">
        <h2 className="font-semibold mb-2 text-white">
          Web Dev Playground
        </h2>

        <p className="text-sm text-gray-400 mb-3">
          Describe a component to generate it.
        </p>

        <ChatPanel
          onGenerate={(prompt) => startStream(prompt)}
          onReset={() => {
            reset();
            setActiveView("editor");
          }}
        />
      </aside>

      {/* RIGHT — EDITOR / PREVIEW */}
      <section className="w-3/4 h-full min-h-0 flex flex-col bg-[#0b0b0b]">

        {/* TOGGLE */}
        <div className="border-b border-gray-800 px-4 py-2 flex gap-2 bg-[#111]">
          <button
            onClick={() => setActiveView("editor")}
            className={`px-3 py-1 rounded text-sm transition ${
              activeView === "editor"
                ? "bg-blue-600 text-white"
                : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
            }`}
          >
            Editor
          </button>

          <button
            onClick={() => setActiveView("preview")}
            disabled={!canPreview}
            className={`px-3 py-1 rounded text-sm transition ${
              activeView === "preview"
                ? "bg-blue-600 text-white"
                : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Preview
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-h-0 overflow-hidden bg-black">
          {activeView === "editor" ? (
            <>
              <EditorPane
                code={canPreview ? editableCode : streamedCode}
                isStreaming={isStreaming}
                isEditable={canPreview}
                onChange={setEditableCode}
              />

              {canPreview && (
                <div className="border-t border-gray-800 p-2 flex justify-end bg-[#0b0b0b]">
                  <button
                    onClick={applyEdits}
                    className="px-3 py-1 rounded text-sm bg-green-600 text-white hover:bg-green-700"
                  >
                    Apply changes
                  </button>
                </div>
              )}
            </>
          ) : (
            <PreviewPane code={finalCode} />
          )}
        </div>
      </section>
    </div>
  );
}
