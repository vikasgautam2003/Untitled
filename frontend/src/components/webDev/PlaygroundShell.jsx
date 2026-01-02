








// "use client";

// import { useState } from "react";
// import EditorPane from "./EditorPane";
// import PreviewPane from "./PreviewPane";
// import ChatPanel from "./ChatPanel";
// import { useAIStream } from "../../../hooks/useAIStream";

// export default function PlaygroundShell() {
//   const [activeView, setActiveView] = useState("editor");

//   const {
//     streamedCode,
//     finalCode,
//     editableCode,
//     setEditableCode,
//     isStreaming,
//     canPreview,
//     startStream,
//     applyEdits,
//     reset
//   } = useAIStream();

//   return (
//     <div className="flex h-full min-h-0 bg-[#F8FAFC] text-slate-800">

//       {/* LEFT SIDEBAR - Fixed Structure */}
//       <aside className="w-1/4 h-full min-h-0 border-r border-slate-200 bg-white flex flex-col">
        
//         {/* Header Section (Fixed Height) */}
//         <div className="p-5 border-b border-slate-100 flex-shrink-0">
//           <h2 className="font-semibold mb-2 text-slate-900">
//             Web Dev Playground
//           </h2>
         
//         </div>

//         {/* Chat Section (Fills Remaining Height) */}
//         <div className="flex-1 min-h-0 relative">
//           <ChatPanel
//             onGenerate={(prompt) => startStream(prompt)}
//             onReset={() => {
//               reset();
//               setActiveView("editor");
//             }}
//           />
//         </div>
//       </aside>

//       {/* RIGHT MAIN SECTION */}
//       <section className="w-3/4 h-full min-h-0 flex flex-col bg-[#F8FAFC]">

//         {/* Toolbar */}
//         <div className="border-b border-slate-200 px-4 py-3 flex gap-2 bg-white flex-shrink-0">
//           <button
//             onClick={() => setActiveView("editor")}
//             className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
//               activeView === "editor"
//                 ? "bg-blue-600 text-white shadow-sm"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//             }`}
//           >
//             Editor
//           </button>

//           <button
//             onClick={() => setActiveView("preview")}
//             disabled={!canPreview}
//             className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
//               activeView === "preview"
//                 ? "bg-blue-600 text-white shadow-sm"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//             } disabled:opacity-40 disabled:cursor-not-allowed`}
//           >
//             Preview
//           </button>
//         </div>


//         <div className="flex-1 min-h-0 overflow-hidden bg-[#F8FAFC] relative">
//           {activeView === "editor" ? (
//             <div className="h-full flex flex-col">
//               <div className="flex-1 min-h-0">
//                 <EditorPane
//                     code={canPreview ? editableCode : streamedCode}
//                     isStreaming={isStreaming}
//                     isEditable={canPreview}
//                     onChange={setEditableCode}
//                 />
//               </div>

//               {canPreview && (
//                 <div className="border-t border-slate-200 px-4 py-3 flex justify-end bg-white flex-shrink-0">
//                   <button
//                     onClick={applyEdits}
//                     className="px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
//                   >
//                     Apply changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <PreviewPane code={finalCode} />
//           )}
//         </div>
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
    applyEdits,
    reset
  } = useAIStream();

  return (
    <div className="flex h-full min-h-0 bg-black text-gray-300">

      {/* LEFT SIDEBAR - Fixed Structure */}
      <aside className="w-1/4 h-full min-h-0 border-r border-gray-800 bg-[#0a0a0a] flex flex-col">
        
        {/* Header Section (Fixed Height) */}
        <div className="p-5 border-b border-gray-800 flex-shrink-0">
          <h2 className="font-semibold mb-2 text-white">
            Web Dev Playground
          </h2>
        </div>

        {/* Chat Section (Fills Remaining Height) */}
        <div className="flex-1 min-h-0 relative">
          <ChatPanel
            onGenerate={(prompt) => startStream(prompt)}
            onReset={() => {
              reset();
              setActiveView("editor");
            }}
          />
        </div>
      </aside>

      {/* RIGHT MAIN SECTION */}
      <section className="w-3/4 h-full min-h-0 flex flex-col bg-black">

        {/* Toolbar */}
        <div className="border-b border-gray-800 px-4 py-3 flex gap-2 bg-[#0a0a0a] flex-shrink-0">
          <button
            onClick={() => setActiveView("editor")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              activeView === "editor"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-[#1f1f1f] text-gray-400 hover:bg-[#2a2a2a]"
            }`}
          >
            Editor
          </button>

          <button
            onClick={() => setActiveView("preview")}
            disabled={!canPreview}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              activeView === "preview"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-[#1f1f1f] text-gray-400 hover:bg-[#2a2a2a]"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Preview
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden bg-black relative">
          {activeView === "editor" ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <EditorPane
                    code={canPreview ? editableCode : streamedCode}
                    isStreaming={isStreaming}
                    isEditable={canPreview}
                    onChange={setEditableCode}
                />
              </div>

              {canPreview && (
                <div className="border-t border-gray-800 px-4 py-3 flex justify-end bg-[#0a0a0a] flex-shrink-0">
                  <button
                    onClick={applyEdits}
                    className="px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Apply changes
                  </button>
                </div>
              )}
            </div>
          ) : (
            <PreviewPane code={finalCode} />
          )}
        </div>
      </section>
    </div>
  );
}