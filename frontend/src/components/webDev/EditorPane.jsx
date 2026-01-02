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

export default function EditorPane({
  code,
  isStreaming,
  isEditable,
  onChange
}) {
  return (
    <Editor
      height="100%"
      language="javascript"
      theme="vs"
      value={code || ""}
      onChange={value => {
        if (isEditable && onChange) onChange(value ?? "");
      }}
      options={{
        readOnly: isStreaming || !isEditable,
        minimap: { enabled: false },
        fontSize: 15,
        lineHeight: 22,
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        roundedSelection: true,
        padding: { top: 12, bottom: 12 },
        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        },
        overviewRulerBorder: false,
        renderLineHighlight: "all",
        renderWhitespace: "none"
      }}
    />
  );
}
