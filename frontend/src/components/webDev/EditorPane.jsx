"use client";

import Editor from "@monaco-editor/react";

const SAMPLE_CODE = `export default function SampleCard() {
  return (
    <div className="p-6 bg-[#111] text-gray-200 rounded shadow">
      <h2 className="text-xl font-semibold text-white">Hello World</h2>
      <p className="text-gray-400 mt-2">
        This is a sample component.
      </p>
    </div>
  );
}`;


export default function EditorPane() {
  return (
    <Editor
      height="100%"
      language="javascript"
      theme="vs-dark"
      value={SAMPLE_CODE}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false
      }}
    />
  );
}
