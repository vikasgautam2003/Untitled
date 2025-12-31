"use client";

import { useState } from "react";

const END_MARKER = "<!-- END_COMPONENT -->";

export function useAIStream() {
  const [streamedCode, setStreamedCode] = useState("");
  const [finalCode, setFinalCode] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [canPreview, setCanPreview] = useState(false);

  const startStream = async (prompt) => {
    setStreamedCode("");
    setFinalCode(null);
    setCanPreview(false);
    setIsStreaming(true);

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
        setCanPreview(true);
        break;
      }
    }

    setIsStreaming(false);
  };

  return {
    streamedCode,
    finalCode,
    isStreaming,
    canPreview,
    startStream
  };
}
