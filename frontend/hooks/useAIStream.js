






// "use client";

// import { useState } from "react";

// const END_MARKER = "<!-- END_COMPONENT -->";

// export function useAIStream() {
//   const [streamedCode, setStreamedCode] = useState("");
//   const [finalCode, setFinalCode] = useState(null);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [canPreview, setCanPreview] = useState(false);
//   const [lastPrompt, setLastPrompt] = useState("");

//   const reset = () => {
//     setStreamedCode("");
//     setFinalCode(null);
//     setCanPreview(false);
//     setIsStreaming(false);
//     setLastPrompt("");
//   };

//   const startStream = async (prompt) => {
//     setStreamedCode("");
//     setFinalCode(null);
//     setCanPreview(false);
//     setIsStreaming(true);
//     setLastPrompt(prompt);

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/web-dev/generate`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ prompt })
//       }
//     );

//     const reader = res.body.getReader();
//     const decoder = new TextDecoder("utf-8");

//     let buffer = "";

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });
//       buffer += chunk;
//       setStreamedCode(buffer);

//       if (buffer.includes(END_MARKER)) {
//         const clean = buffer.replace(END_MARKER, "").trim();
//         setFinalCode(clean);
//         setCanPreview(true);
//         break;
//       }
//     }

//     setIsStreaming(false);
//   };

//   const regenerate = () => {
//     if (!lastPrompt || isStreaming) return;
//     startStream(lastPrompt);
//   };

//   return {
//     streamedCode,
//     finalCode,
//     isStreaming,
//     canPreview,
//     startStream,
//     regenerate,
//     reset
//   };
// }






"use client";

import { useState } from "react";

const END_MARKER = "<!-- END_COMPONENT -->";

export function useAIStream() {
  const [streamedCode, setStreamedCode] = useState("");
  const [finalCode, setFinalCode] = useState(null);
  const [editableCode, setEditableCode] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [canPreview, setCanPreview] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");

  const reset = () => {
    setStreamedCode("");
    setFinalCode(null);
    setEditableCode(null);
    setCanPreview(false);
    setIsStreaming(false);
    setLastPrompt("");
  };

  const startStream = async (prompt) => {
    setStreamedCode("");
    setFinalCode(null);
    setEditableCode(null);
    setCanPreview(false);
    setIsStreaming(true);
    setLastPrompt(prompt);

    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/web-dev/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      }
    );

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      setStreamedCode(buffer);

      if (buffer.includes(END_MARKER)) {
        const clean = buffer.replace(END_MARKER, "").trim();
        setFinalCode(clean);
        setEditableCode(clean);     // 🔓 unlock editor with initial content
        setCanPreview(true);
        break;
      }
    }

    setIsStreaming(false);
  };

  const regenerate = () => {
    if (!lastPrompt || isStreaming) return;
    startStream(lastPrompt);
  };

  const applyEdits = () => {
    if (!editableCode) return;
    setFinalCode(editableCode);     // 🔒 safe re-commit
    setCanPreview(true);
  };

  return {
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
  };
}
