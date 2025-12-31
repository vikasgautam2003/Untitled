"use client";

import { useState } from "react";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";

export default function PlaygroundShell() {
  const [activeView, setActiveView] = useState("editor");

  return (
    <div className="flex h-full min-h-0 bg-black text-gray-200">

      {/* LEFT — CHAT (1/4) */}
      <aside className="w-1/4 h-full min-h-0 border-r border-gray-800 p-4 bg-[#0d0d0d]">
        <h2 className="font-semibold mb-2 text-white">
          Web Dev Playground
        </h2>

        <p className="text-sm text-gray-400">
          Describe a component to generate it.
        </p>

        <div className="mt-4 text-gray-500 text-sm">
          Chat coming in next phase.
        </div>
      </aside>

      {/* RIGHT — EDITOR / PREVIEW (3/4) */}
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
            className={`px-3 py-1 rounded text-sm transition ${
              activeView === "preview"
                ? "bg-blue-600 text-white"
                : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
            }`}
          >
            Preview
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-h-0 overflow-hidden bg-black">
          {activeView === "editor" ? <EditorPane /> : <PreviewPane />}
        </div>

      </section>
    </div>
  );
}
