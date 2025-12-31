"use client";

import { useState } from "react";

export function useAIStream() {
  const [code, setCode] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = async (prompt) => {
    setCode("");
    setIsStreaming(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setIsStreaming(false);
      throw new Error("User not authenticated");
    }

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

    if (!res.ok) {
      setIsStreaming(false);
      const err = await res.json();
      throw new Error(err.message || "Request failed");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setCode(prev => prev + chunk);
    }

    setIsStreaming(false);
  };

  return {
    streamedCode: code,
    isStreaming,
    startStream
  };
}
